python ./app/prestart/db_start.py

alembic revision --autogenerate -m "Tables revision"
alembic upgrade head

python ./app/prestart/initial_data.py

uvicorn app.main:app --host 0.0.0.0 --port 8000