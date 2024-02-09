#!/usr/bin/env bash

set -ueo pipefail

green() { echo "$(tput setaf 2)$*$(tput sgr0)"; }
yellow() { echo "$(tput setaf 3)$*$(tput sgr0)"; }
blue() { echo "$(tput setaf 4)$*$(tput sgr0)"; }
pink() { echo "$(tput setaf 5)$*$(tput sgr0)"; }

pink "Creating service from docker-compose.yml file..."
docker compose up -d
green "Done..."

blue "Service is now active, visit the application at http://localhost:3001"