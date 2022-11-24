from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def get_queryset(self):
        return self.request.user.projects.all()
    

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    def get_queryset(self):
        return self.request.user.tasks.all().order_by('-id')
