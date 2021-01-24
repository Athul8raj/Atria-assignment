from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import *
from rest_framework import authentication,generics
from datetime import datetime
from django.utils import timezone
import numpy as np
from rest_framework.status import HTTP_400_BAD_REQUEST,HTTP_200_OK

class SensorView(APIView):
    serializer_class = SensorDataSerializer

    def get(self, request):
        '''GET request for query API
        API : REST API request having CSRF token header for Authentication
        input parameters :
            @from - start date - datetime string
            @to - end date - datetime string
            @type - sensor type - string
        output parameter :
            @JSON response
            @detail key - list of tuple (reading,timestamp)
            @stats key - list of stats (min,max,mean)
        '''
        try:
            if isinstance(int(request.GET['from']),int): #A way of dealing with bad user input ("from date" blank)
                from_date = 1
        except:
            from_date = request.GET['from']
        try:
            if isinstance(int(request.GET['to']),int): #A way of dealing with bad user input ("from date" blank)
                to_date = 1
        except:
            to_date = request.GET['to']
        if from_date == 1 and to_date == 1: #gets all readings from db
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type']).order_by('timestamp')
        elif from_date == 1: #gets readings less than or equal to current datetime
            to_date = datetime.strptime(to_date, "%Y-%m-%dT%H:%M")
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type'],
                                                 timestamp__lte=to_date).order_by('timestamp')
        elif to_date == 1: #gets readings less than or equal to current datetime and from date
            from_date = datetime.strptime(from_date, "%Y-%m-%dT%H:%M")
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type'],
                                                 timestamp__lte=timezone.now(),timestamp__gte=from_date).order_by('timestamp')
        else: #gets readings less than or equal to current datetime and greater than or equal to from date
            to_date = datetime.strptime(to_date, "%Y-%m-%dT%H:%M")
            from_date = datetime.strptime(from_date, "%Y-%m-%dT%H:%M")
            readings = SensorData.objects.filter(sensor_type__sensor_type=request.GET['type'],
                                                 timestamp__lte=to_date,timestamp__gte=from_date).order_by('timestamp')
        details = [(reading.reading,reading.timestamp) for reading in readings]
        readings = [reading[0] for reading in details]
        if readings: # if only reading is not empty we gets stats values
            stats = [np.min(readings).astype(float),np.max(readings).astype(float),np.mean(readings).astype(float)]
        else:
            stats = ['CBD','CBD','CBD'] # CBD - Cannot Be Determined

        return Response({'details':details,'stats':stats})

    def post(self, request):
        '''POST request for POST API
        API : REST API request having CSRF token header for Authentication
        input parameters :
            @timestamp - reading timestamp - unix datetime string
            @type - sensor type - string
            @reading - sensor reading - float string
        output parameter :
            @JSON response
            success - serializer response
            error - 400 bad request
        '''
        try:
            timestamp = datetime.utcfromtimestamp(int(
                            request.data['timestamp'])/10**3) # Dividing the
                                    # microseconds to get a valid unix timestamp
        except OSError:
            return Response({'error':'Timestamp not entered correct','status':HTTP_400_BAD_REQUEST})
        else:
            sensor = Sensor.objects.filter(sensor_type=request.data['type'])
            data = {'timestamp':timestamp,'reading':float(request.data['reading']),
                    'sensor_type':sensor.first().id}
            serializer = SensorDataSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'data': serializer.data,'status':HTTP_200_OK})
            else:
                return Response({'error':'Bad Request','status':HTTP_400_BAD_REQUEST})



class GetSensorView(generics.ListCreateAPIView):
    '''GET request for listing all sensor types'''
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
