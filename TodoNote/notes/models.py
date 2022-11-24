from django.db import models

from users.models import User


class Notebook(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, 
                             related_name='notebooks')
    name = models.CharField(max_length=50)


class Note(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, 
                             related_name='notes')
    notebook = models.ForeignKey(Notebook, null=True, on_delete=models.CASCADE,
                                 related_name='notes')
    title = models.CharField(max_length=150)
    text = models.TextField()
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
