from rest_framework import serializers

from .models import Note, Notebook


class NotebookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notebook
        fields = ('id', 'name', 'user')


class NoteSerializer(serializers.ModelSerializer):
    updated_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S", required=False)

    class Meta:
        model = Note
        fields = ('id', 'title', 'text', 'notebook', 'updated_at')
