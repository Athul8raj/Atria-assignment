from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from sensor.views import *

urlpatterns = [
	path('admin/', admin.site.urls),
	path('sensor/', SensorView.as_view(), name="sensor"),
    path('get-sensors/',GetSensorView.as_view(),name='get-sensors')
]
