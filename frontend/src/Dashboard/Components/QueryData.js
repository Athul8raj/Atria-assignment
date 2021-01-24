import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, MenuItem, FormControl,Typography } from '@material-ui/core'
import Title from './Title';
import { query_data } from '../../Services'
import axios from 'axios'

const signal = axios.CancelToken.source()

 const Query = ({
  from,to, type,
  sensors,
  handleFrom,
  handleTo,
  handleType,
  handleSensor,
  handleDetails,
  handleQuery,
  handleStats,
  close,
  stats
}) => {
  const handleSubmit = async () => {
    // console.log(to);
    handleSensor(type)
    const resp = await query_data(type,from,to,signal.token)
    if (resp) {
      handleDetails(resp.data['details'])
      handleQuery()
      handleStats(resp.data['stats'])
    }
}

  return (
    <React.Fragment>
       <Title>Query Sensor Data</Title>
            <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl required>
                <TextField required select label="1. Type" value={type} onChange={handleType} style={{width:200}}>
                {sensors.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>)
                    )}
                </TextField>
                </FormControl>
                </Grid>                
                <Grid item xs={4}>
                <TextField label="2. From" value={from} onChange={handleFrom} type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}>
                </TextField>
                </Grid>
                <Grid item xs={4}>
                <TextField label="3. To" value={to} onChange={handleTo} type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}>
                </TextField>
                </Grid>
                <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={handleSubmit}>Query</Button>
                </Grid>
                {close && ( <Grid container spacing={1}>
                  <Grid item xs={12}>
                  <Typography>&#9679; Min - {stats[0]}</Typography>
                  <Typography>&#9679; Max - {stats[1]}</Typography>
                  <Typography>&#9679; Mean - {stats[2]}</Typography>
                </Grid>
                </Grid>)}
            </Grid>
    </React.Fragment>
  );
}

export default Query