from django.db import models
from django.contrib.auth.models import User

class Rating(models.Model):
  user = models.ForeignKey (User, on_delete=models.CASCADE)
  stars = models.IntegerField()
  comments = models.TextField(max_length=300)

  class Meta:
    unique_together = (('user'),)
    index_together = (('user'),)

# Create your models here.
