from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
