install:
	# pip install poetry
	# poetry shell
	# poetry install
	pip install -r requirements.txt

api:
	./prestart.sh
	
clean:
			find . | grep -E "(/__pycache__)" | xargs rm -rf

fix-imports:
			isort .
			
pyre:
		watchman watch .
		pyre
		
server:
			uvicorn app.main:app --reload

build:
	docker-compose build
	docker-compose up

run:
	docker-compose up

format:
	ruff . --fix
