FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --upgrade pip && pip install numpy && pip install --no-cache-dir -r requirements.txt

COPY ./atria_simple_app .

CMD ["sh","-c", "python manage.py makemigrations && python manage.py migrate && gunicorn -b 0.0.0.0:8000 atria_simple_app.wsgi"]