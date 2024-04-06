# Clean up generated files and directories
clean:
	@echo "Cleaning up..."
	find . -type d -name "__pycache__" -exec rm -rf {} +

format:
	@echo "Fixing imports..."
	ruff . --fix
	isort .

pyre:
	@echo "Running Pyre..."
	watchman watch .
	pyre

local-frontend:
	@echo "Starting frontend server..."
	cd te-frontend && npm start

local-backend:
	@echo "Starting backend server..."
	cd te-backend && ./prestart.sh

build:
	@echo "Building Docker containers..."
	docker-compose build --no-cache

run:
	@echo "Running Docker containers..."
	docker-compose up

container:
	@echo "Building Docker containers..."
	docker-compose build --no-cache

	@echo "Running Docker containers..."
	docker-compose up


# Phony targets
.PHONY: install api clean fix-imports pyre server build run format all

# Default target
all: install api
