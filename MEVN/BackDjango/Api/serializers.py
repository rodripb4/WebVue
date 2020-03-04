from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    fields = ('id','stars','user','video','comments')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id','username','password', 'first_name', )
    extra_kwargs = {'password':{'write_only':True,'required':True}}

  def create(self, validated_data):
      user = User.objects.create_user(**validated_data)
      print(user)
      Token.objects.create(user=user)
      return user