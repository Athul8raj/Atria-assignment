import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('Jan 2020', 0),
  createData('Feb 2020', 300),
  createData('Mar 2020', 600),
  createData('Apr 2020', 800),
  createData('Jun 2020', 1500),
  createData('Jul 2020', 2000),
  createData('Aug 2020', 2400),
  createData('Sept 2020', 2400),
  createData('Oct 2020', undefined),
];

const Chart = ({sensor,details}) => {
  const theme = useTheme();

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