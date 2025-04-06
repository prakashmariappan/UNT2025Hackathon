## Run the web service on container startup. Here we use the gunicorn
## webserver, with one worker process and 8 threads.
## For environments with multiple CPU cores, increase the number of workers
## to be equal to the cores available.
## Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
#CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app

# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.9

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies and system libraries
RUN apt-get update \
    && apt-get install -y libsm6 libxext6 libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies including opencv-python
RUN pip install --upgrade pip \
    && pip install -r requirements.txt \
    && pip install gunicorn

# Run the web service on container startup using Gunicorn
CMD exec gunicorn --bind :$PORT --workers 4 --threads 8 --timeout 0 app:app
