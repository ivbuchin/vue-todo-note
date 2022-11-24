from django.db import models

from users.models import User


class Project(models.Model):      
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=50)
    

class Task(models.Model):
    HIGH = 'high'
    MEDIUM = 'medium'
    NONE = 'none'
    
    TODO = 'todo'
    DONE = 'done'
    
    PRIORITY_CHOICES = (
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (NONE, 'None'),
    )

    STATUS_CHOICES = (
        (TODO, 'Todo'),
        (DONE, 'Done')
    )

    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='tasks')
    project = models.ForeignKey(Project, null=True, on_delete=models.CASCADE, related_name='tasks')
    description = models.CharField(max_length=255)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default=NONE)
    datetime_of_completion = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=TODO)
