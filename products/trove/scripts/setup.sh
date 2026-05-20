#!/usr/bin/env bash
# Trove V2 — one-shot setup helper. Run on your local machine.
# Usage: bash scripts/setup.sh

set -euo pipefail

GREEN='\033[0;32m'; RED='\033[0;31m'; BOLD='\033[1m'; NC='\033[0m'
say() { echo -e "${GREEN}▸${NC} $*"; }
warn() { echo -e "${RED}!${NC} $*"; }

# 0. Tool check
for cmd in gh vercel node npm; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    warn "Missing: $cmd. Install with:"
    case "$cmd" in
      gh) echo "    brew install gh" ;;
      vercel) echo "    npm i -g vercel" ;;
      *) echo "    brew install $cmd" ;;
    esac
    exit 1
  fi
done

# 1. Confirm working dir
[[ -f package.json ]] || { warn "Run from Trove v2/ directory."; exit 1; }
PKG_NAME=$(node -p "require('./package.json').name")
[[ "$PKG_NAME" == "trove" ]] || { warn "Expected package 'trove', got '$PKG_NAME'."; exit 1; }
say "In Trove v2/ ✓"

# 2. Install + verify
say "Installing dependencies"
npm ci --no-audit --no-fund

say "Type check"
npm run typecheck

say "Lint"
npm run lint

say "Build"
NEXT_PUBLIC_SUPABASE_URL="https://placeholder.supabase.co" \
NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder" \
NEXT_PUBLIC_APP_URL="https://trove.vroelabs.com" \
npm run build

# 3. Auth
say "GitHub auth"
gh auth status || gh auth login

say "Vercel link"
vercel link --yes --project prj_vxc2Wt8Sg1BeS7kcvHXubuyWWkBc

say "Done. Next: paste secrets into Vercel env, then 'vercel --prod'."
