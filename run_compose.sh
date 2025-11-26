#!/bin/sh
# Run docker compose up and ensure docker compose down on exit (Ctrl+C or error).
set -e

cleanup() {
  echo "Stopping containers..."
  docker compose down
}

trap cleanup INT TERM EXIT

echo "Starting docker compose up..."
docker compose up
