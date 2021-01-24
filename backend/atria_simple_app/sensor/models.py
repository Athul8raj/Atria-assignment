from django.db import models

class Sensor(models.Model):
    sensor_type = models.CharField(max_length=200, null=False, blank=False,unique=True)

class SensorData(models.Model):
    reading = models.FloatField()
    sensor_type = models.ForeignKey(Sensor,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(null=False,blank=False)
