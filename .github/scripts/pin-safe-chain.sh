#!/usr/bin/env bash
# Refreshes SAFE_CHAIN_INSTALLER_SHA512 for SAFE_CHAIN_INSTALLER_VERSION. Run by Renovate.
set -euo pipefail

file="${1:-.github/actions/setup-safe-chain/action.yml}"

version=$(sed -n "s/^[[:space:]]*SAFE_CHAIN_INSTALLER_VERSION:[[:space:]]*[\"']\{0,1\}\([^\"'[:space:]]*\).*$/\1/p" "$file" | head -n 1)
if [ -z "$version" ]; then
  echo "pin-safe-chain: no SAFE_CHAIN_INSTALLER_VERSION found in ${file}" >&2
  exit 1
fi

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

curl -fsSL "https://github.com/AikidoSec/safe-chain/releases/download/${version}/install-safe-chain.sh" -o "$tmp"
sha512=$(sha512sum "$tmp" | cut -d' ' -f1)

sed -i "s/^\([[:space:]]*SAFE_CHAIN_INSTALLER_SHA512:[[:space:]]*\).*$/\1${sha512}/" "$file"
if ! grep -q "SAFE_CHAIN_INSTALLER_SHA512:[[:space:]]*${sha512}$" "$file"; then
  echo "pin-safe-chain: SAFE_CHAIN_INSTALLER_SHA512 not updated in ${file}" >&2
  exit 1
fi

echo "pin-safe-chain: ${version} -> ${sha512}"
