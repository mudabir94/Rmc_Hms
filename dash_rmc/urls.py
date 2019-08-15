from django.conf.urls import url, include
from django.urls import path
from . import views 
urlpatterns = [

  path('', views.mainHome.as_view(), name='mainhomepage'),
  path("test",views.Test,name="test")
]