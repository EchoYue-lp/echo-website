#!/bin/bash
# echo-website 部署脚本
# 用法: ./deploy.sh

set -e

PROJECT_DIR="/root/ylp-agent/echo-website"
DEPLOY_DIR="/var/www/echo-website"

echo "📥 拉取最新代码..."
cd "$PROJECT_DIR"
git pull

echo "🔨 构建..."
npm run build

echo "🚀 部署..."
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp -r dist/* "$DEPLOY_DIR/"

echo "🔄 重载 Nginx..."
nginx -s reload

echo "✅ 部署完成！"
