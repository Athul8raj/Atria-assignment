import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import moment from 'moment';

function createData(time, amount) {
  time = moment(time).format('MMM DD, YYYY HH:MM:SS');
  return { time, amount };
}

const Chart = ({sensor,details}) => {
  const theme = useTheme();

  const data = []
  details.map((detail) => {
    data.push(createData(detail[1],detail[0]))
    return ''
  })

  return (
    <React.Fragment>
      <Title>Sensor Chart for {sensor}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sensor Readings
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Chart