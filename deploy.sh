#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"
DEPLOY_ROOT="${DEPLOY_ROOT:-/var/www/echo-website}"
RELEASES_DIR="$DEPLOY_ROOT/releases"
CURRENT_LINK="$DEPLOY_ROOT/current"
PREVIOUS_LINK="$DEPLOY_ROOT/previous"
RELEASES_TO_KEEP="${RELEASES_TO_KEEP:-5}"

# shellcheck source=scripts/deploy-releases.sh
source "$SCRIPT_DIR/scripts/deploy-releases.sh"

if [[ ! "$RELEASES_TO_KEEP" =~ ^[0-9]+$ ]] || ((RELEASES_TO_KEEP < 2)); then
  echo "RELEASES_TO_KEEP must be an integer of at least 2" >&2
  exit 1
fi

release_id="$(date -u +%Y%m%dT%H%M%SZ)-$(git -C "$PROJECT_DIR" rev-parse --short=12 HEAD)"
staging_dir="$RELEASES_DIR/.staging-$release_id"
release_dir="$RELEASES_DIR/$release_id"

cleanup_staging() {
  if [[ -d "$staging_dir" ]]; then
    rm -rf -- "$staging_dir"
  fi
}
trap cleanup_staging EXIT

cd "$PROJECT_DIR"

echo "Installing locked dependencies"
npm ci

echo "Installing the browser used by end-to-end verification"
npx playwright install chromium

echo "Running the complete website gate"
npm run verify

mkdir -p -- "$RELEASES_DIR"
if [[ -e "$release_dir" ]]; then
  echo "Release already exists: $release_dir" >&2
  exit 1
fi

mkdir -- "$staging_dir"
cp -a dist/. "$staging_dir/"

for required_file in index.html 404.html manifest.webmanifest sitemap.xml; do
  if [[ ! -f "$staging_dir/$required_file" ]]; then
    echo "Release validation failed: missing $required_file" >&2
    exit 1
  fi
done

if command -v rg >/dev/null 2>&1 && rg -q 'EchoCoWork|/echocowork' "$staging_dir"; then
  echo "Release validation failed: stale product branding or route" >&2
  exit 1
fi

mv -- "$staging_dir" "$release_dir"

if command -v nginx >/dev/null 2>&1; then
  nginx -t
fi

previous_target=""
if [[ -L "$CURRENT_LINK" ]]; then
  previous_target="$(readlink "$CURRENT_LINK")"
fi

if [[ -n "$previous_target" ]]; then
  atomic_link "$previous_target" "$PREVIOUS_LINK"
fi
atomic_link "$release_dir" "$CURRENT_LINK"

if command -v nginx >/dev/null 2>&1 && ! nginx -s reload; then
  echo "Nginx reload failed; restoring the previous release" >&2
  if [[ -n "$previous_target" ]]; then
    atomic_link "$previous_target" "$CURRENT_LINK"
    nginx -s reload || true
  else
    rm -f -- "$CURRENT_LINK"
  fi
  exit 1
fi

prune_releases

trap - EXIT
echo "Published $release_dir"
echo "Current release: $(readlink "$CURRENT_LINK")"
if [[ -L "$PREVIOUS_LINK" ]]; then
  echo "Rollback release: $(readlink "$PREVIOUS_LINK")"
fi
