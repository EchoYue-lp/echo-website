#!/usr/bin/env bash

atomic_link() {
  local target="$1"
  local link_path="$2"
  local next_link="$link_path.next.$$"
  rm -f -- "$next_link"
  ln -s -- "$target" "$next_link"
  mv -Tf -- "$next_link" "$link_path"
}

release_name() {
  local target="$1"
  if [[ "$target" != "$RELEASES_DIR/"* ]]; then
    return 1
  fi
  local name="${target#"$RELEASES_DIR/"}"
  if [[ ! "$name" =~ ^[0-9]{8}T[0-9]{6}Z-[0-9a-f]{7,40}$ ]]; then
    return 1
  fi
  printf '%s\n' "$name"
}

prune_releases() {
  local current_name=""
  local previous_name=""
  local retained=0
  local candidate=""
  local name=""

  if [[ -L "$CURRENT_LINK" ]]; then
    current_name="$(release_name "$(readlink "$CURRENT_LINK")" || true)"
    if [[ -z "$current_name" ]]; then
      echo "Skipping release pruning: current symlink target is not a managed release" >&2
      return
    fi
  fi
  if [[ -L "$PREVIOUS_LINK" ]]; then
    previous_name="$(release_name "$(readlink "$PREVIOUS_LINK")" || true)"
    if [[ -z "$previous_name" ]]; then
      echo "Skipping release pruning: previous symlink target is not a managed release" >&2
      return
    fi
  fi
  if [[ -n "$current_name" ]]; then
    retained=1
  fi
  if [[ -n "$previous_name" && "$previous_name" != "$current_name" ]]; then
    retained=$((retained + 1))
  fi

  while IFS= read -r candidate; do
    name="${candidate#"$RELEASES_DIR/"}"
    if [[ ! "$name" =~ ^[0-9]{8}T[0-9]{6}Z-[0-9a-f]{7,40}$ ]]; then
      continue
    fi
    if [[ "$name" == "$current_name" || "$name" == "$previous_name" ]]; then
      continue
    fi
    if ((retained < RELEASES_TO_KEEP)); then
      retained=$((retained + 1))
      continue
    fi
    rm -rf -- "${RELEASES_DIR:?}/$name"
  done < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -print | sort -r)
}
