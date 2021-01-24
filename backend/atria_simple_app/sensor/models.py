from django.db import models

class Sensor(models.Model):
    '''Model for storing all different sensor types'''
    sensor_type = models.CharField(max_length=200, null=False, blank=False,unique=True)

class SensorData(models.Model):
    '''Model for storing sensor readings and their timestamps and has
        foreign key relationship with Sensor model'''
    reading = models.FloatField()
    sensor_type = models.ForeignKey(Sensor,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(null=False,blank=False)
