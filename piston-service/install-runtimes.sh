#!/usr/bin/env bash
# Run this once after your Piston service is live, pointing PISTON_URL at it.
# Usage: PISTON_URL=https://goyono-piston.onrender.com ./install-runtimes.sh

set -e
URL="${PISTON_URL:-http://localhost:2000}"

install() {
  echo "Installing $1 $2..."
  curl -s -X POST "$URL/api/v2/packages" \
    -H "Content-Type: application/json" \
    -d "{\"language\":\"$1\",\"version\":\"$2\"}"
  echo ""
}

install python 3.10.0
install javascript 18.15.0
install "c++" 10.2.0
install java 15.0.2

echo "Done. Verify with: curl $URL/api/v2/runtimes"
