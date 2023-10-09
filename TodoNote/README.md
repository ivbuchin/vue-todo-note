To configure, **follow the steps**:
1. Install dependencies:

        pip install -r requirements.txt

2. Generate a SECRET KEY (for example, on the website https://djecrety.ir /) and paste it into the project settings
3. Create and perform migrations: 

        python manage.py makemigrations users tasks notes
        python manage.py migrate

4. Create a Superuser:

        python manage.py createsuperuser

5. Start the local server:

        python manage.py runserver

6. Open the project website by typing in the browser address bar: 127.0.0.1:8000
7. To access the admin panel, enter in the address bar: 127.0.0.1:8000/admin
