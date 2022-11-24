from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Notebook, Note
from .serializers import NotebookSerializer, NoteSerializer


class NotebookViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotebookSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def get_queryset(self):
        return self.request.user.notebooks.all()
    

class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
      serializer.save(user = self.request.user)

    def get_queryset(self):
      return self.request.user.notes.all().order_by('-id')
