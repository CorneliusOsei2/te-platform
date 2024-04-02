# Install dependencies using pip and requirements.txt
install:
	@echo "Installing dependencies..."
	pip install -r requirements.txt

# Run the API using prestart.sh
api:
	@echo "Starting API..."
	./prestart.sh

# Clean up generated files and directories
clean:
	@echo "Cleaning up..."
	find . -type d -name "__pycache__" -exec rm -rf {} +

# Fix imports using isort
fix-imports:
	@echo "Fixing imports..."
	isort .

# Run Pyre for static type checking
pyre:
	@echo "Running Pyre..."
	watchman watch .
	pyre

# Run the server using uvicorn
local:
	@echo "Starting server..."
	uvicorn app.main:app --reload

# Build Docker containers using docker-compose
build:
	@echo "Building Docker containers..."
	docker-compose build

# Run Docker containers using docker-compose
run:
	@echo "Running Docker containers..."
	docker-compose up

# Format code using Ruff
format:
	@echo "Formatting code..."
	ruff . --fix

# Phony targets
.PHONY: install api clean fix-imports pyre server build run format all

# Default target
all: install api
