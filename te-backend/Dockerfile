FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10

ENV CONTAINER_HOME=/var/www

ADD . $CONTAINER_HOME
WORKDIR $CONTAINER_HOME

RUN pip install -r $CONTAINER_HOME/requirements.txt

COPY init.json $CONTAINER_HOME/

