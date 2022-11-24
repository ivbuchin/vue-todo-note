from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    avatar = models.ImageField("Avatar image", upload_to='users', null=True, blank=True)
