import React from 'react';
import { Button, TextField, Grid, MenuItem } from '@material-ui/core'
import Title from './Title';
import PropTypes from 'prop-types';
import { post_sensor_data } from '../../Services'

const FormData = ({
    reading, type, timestamp,
    handleReading,
    handleType,
    handleTimestamp,
    sensors,
    handleNotify
}) => {

    const handleSubmit = async() => {
       const request = {
           reading : reading,
           type : type,
           timestamp : timestamp
       }
       const resp = await post_sensor_data(request)
       if (resp) {
           handleNotify()
           const event = {
               target : {
                   value: ''
               }
           }
           handleReading(event)
           handleTimestamp(event)
           handleType(event)
       }
    }
    
    return (
        <React.Fragment>
            <Title>Post Sensor Data</Title>
            <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField select label="1. Type" value={type} onChange={handleType} style={{width:110}}>
                {sensors.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>)
                    )}
                </TextField>
                </Grid>
                <Grid item xs={4}>
                <TextField label="2. Reading" value={reading} onChange={handleReading}></TextField>
                </Grid>
                
                <Grid item xs={4}>
                <TextField label="3. Timestamp" value={timestamp} onChange={handleTimestamp}></TextField>
                </Grid>
                <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={handleSubmit}>POST</Button>
                </Grid>
            </Grid>
            
            </React.Fragment>
    )
}

FormData.propTypes = {
   reading : PropTypes.string.isRequired,
   type : PropTypes.string.isRequired,
   timestamp : PropTypes.number.isRequired,

  };

export default FormData