from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from .serializers import RatingSerializer
from .models import Rating

class RatingViewSet(viewsets.ModelViewSet):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer
  authentication_classes = (TokenAuthentication,)
  permission_classes = (IsAuthenticated, )

  def delete(self,request,*args,**kwargs):
    response = {'message':'Rating cannot be updated like this'}
    return Response(response, status = status.HTTP_400_BAD_REQUEST)

  def create(self,request,*args,**kwargs):
    response = {'message':'Rating cannot be created like this'}
    return Response(response, status = status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = (AllowAny, )