from rest_framework import serializers

from .models import Project, Task


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'user')


class TaskSerializer(serializers.ModelSerializer):
    datetime_of_completion = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", required=False, allow_null=True)

    class Meta:
        model = Task
        fields = ('id', 'description', 'project', 'datetime_of_completion', 'priority', 'status')
