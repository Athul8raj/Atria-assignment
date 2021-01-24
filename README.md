# Atria-assignment

## Simple App for posting and querying sensor data with chart and table display

## Frameworks used - 
  Frontend - React library  
  Backend - Django REST
  
## Database used - 
  SQLITE - Django default backend
  
## Libraries used - 
  React - react-moment, react-router-dom, material-ui, recharts, axios  
  Django REST - rest_framework, django, numpy, gunicorn (for docker hosting)

## About the app - 
  Frontend is hosted at 3000 and backend at 8000. By default,app shows temperature sensor data in chart and table on component mount
  <div align="center">
    <img src="https://github.com/Athul8raj/Atria-assignment/blob/main/images/app_screenshot.JPG" width="1000px" height="500px"</img> 
</div>  

  App is capable of posting sensor data as JSON api with readings, sensor type and unix timestamp as input parameters.
  <div align="center">
    <img src="https://github.com/Athul8raj/Atria-assignment/blob/main/images/post_save_success.JPG" width="1000px" height="500px"</img> 
</div>  

  User can query sensor data using the query panel by providing the sensor type and date range
  <div align="center">
    <img src="https://github.com/Athul8raj/Atria-assignment/blob/main/images/query%20request.jpg" width="1000px" height="500px"</img> 
</div>  

  Once the query is success( readings are present for the given time range), same will be shown in the <b>Line chart</b> and <b>Table</b>  
  <div align="center">
    <img src="https://github.com/Athul8raj/Atria-assignment/blob/main/images/table%20and%20chart.JPG" width="1000px" height="500px"</img> 
</div> 
  
  ## Authentication and CSRF attack prevention -
   Authentication and CSRF prevention is handled based on token and is added to request header and verified by django rest session authentication
   User input sanitation is handled only at a basic level.
   
  ## Docker Support - 
  Backend can be hosted on docker containers with the help of docker images built via the dockerfile. 
  
  ## PS -
      1) Frontend - Query API will work even if "from" and "to" dates are not provided by the user (mentioned in backend code specifying the handling).
                    Infinite scrolling/ Line Chart scaling - If query result gives too many data points, displaying them all at once might affect UI/UX experience. This is not taken care currently
                    Custom error page shown when visting unknown urls
      2) Backend (Django + DB) - 400 bad request in case of bad paramters or post data not valid
                                 SQLite DB - although lightweight and in-memory, not ideal for sensor data posted every second(or milliseconds)
                                 
    
  
