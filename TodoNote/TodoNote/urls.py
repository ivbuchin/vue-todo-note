from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers

from tasks.views import ProjectViewSet, TaskViewSet
from notes.views import NotebookViewSet, NoteViewSet
from users.views import UserViewSet


router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectViewSet, basename='Project')
router.register('tasks', TaskViewSet, basename='Task')
router.register('notebooks', NotebookViewSet, basename='Notebook')
router.register('notes', NoteViewSet, basename='Note')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken'))
]
