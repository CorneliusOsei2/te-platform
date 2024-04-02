# Clean up generated files and directories
clean:
	@echo "Cleaning up..."
	find . -type d -name "__pycache__" -exec rm -rf {} +

format:
	@echo "Fixing imports..."
	ruff . --fix
	isort .

# Run Pyre for static type checking
pyre:
	@echo "Running Pyre..."
	watchman watch .
	pyre

# local:
# 	@echo "Starting server..."
# 	uvicorn app.main:app --reload

container:
	@echo "Building Docker containers..."
	docker-compose build --no-cache

	@echo "Running Docker containers..."
	docker-compose up


# Phony targets
.PHONY: install api clean fix-imports pyre server build run format all

# Default target
all: install api
