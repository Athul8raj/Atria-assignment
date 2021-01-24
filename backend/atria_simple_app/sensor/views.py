from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import *
from rest_framework import authentication,generics
from datetime import datetime
from django.utils import timezone
import numpy as np

class SensorView(APIView):
    serializer_class = SensorDataSerializer
    # authentication_classes = [authentication.TokenAuthentication]

    def get(self, request):
        try:
            if isinstance(int(request.GET['from']),int):
                from_date = 1
        except:
            from_date = request.GET['from']
        try:
            if isinstance(int(request.GET['to']),int):
                to_date = 1
        except:
            to_date = request.GET['to']
        if from_date == 1 and to_date == 1:
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type']).order_by('-timestamp')
        elif from_date == 1:
            to_date = datetime.strptime(to_date, "%Y-%m-%dT%H:%M")
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type'],
                                                 timestamp__lte=to_date).order_by('-timestamp')
        elif to_date == 1:
            from_date = datetime.strptime(from_date, "%Y-%m-%dT%H:%M")
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type'],
                                                 timestamp__lte=timezone.now(),timestamp__gte=from_date).order_by('-timestamp')
        else:
            to_date = datetime.strptime(to_date, "%Y-%m-%dT%H:%M")
            from_date = datetime.strptime(from_date, "%Y-%m-%dT%H:%M")
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type'],
                                                 timestamp__lte=to_date,timestamp__gte=from_date).order_by('-timestamp')
        details = [(reading.reading,reading.timestamp) for reading in readings]
        readings = [reading[0] for reading in details]
        if readings:
            stats = [np.min(readings).astype(float),np.max(readings).astype(float),np.mean(readings).astype(float)]
        else:
            stats = ['CBD','CBD','CBD']

        return Response({'details':details,'stats':stats})

    def post(self, request):
        # print(request.data)
        timestamp = datetime.utcfromtimestamp(int(request.data['timestamp']))
        sensor = Sensor.objects.filter(sensor_type=request.data['type'])
        data = {'timestamp':timestamp,'reading':float(request.data['reading']),
                'sensor_type':sensor.first().id}
        serializer = SensorDataSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        else:
            print('Yes')
            return Response({'yes':1})


class GetSensorView(generics.ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
