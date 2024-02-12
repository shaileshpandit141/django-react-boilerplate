# Pull the official base image
FROM python


# Setting the woring directory
WORKDIR /backend


# Copy requirements file
COPY ./requirements.txt .


# Installing dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


# Copy project files
COPY . .


# Expose the port with 8000
EXPOSE 8000


# Run the django server
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]