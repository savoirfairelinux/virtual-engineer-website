#!/usr/bin/env bash
# Thin proxy: always fetches and runs main's current installer, nothing to keep in sync here.
set -euo pipefail

RAW_URL="https://raw.githubusercontent.com/savoirfairelinux/virtual-engineer/main/scripts/install.sh"

script="$(curl -fsSL "$RAW_URL")" || {
  echo "error: failed to download installer from $RAW_URL" >&2
  exit 1
}

exec bash -c "$script" -- "$@"
