import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Moment from 'react-moment';

 const TableData = ({sensor,details}) => {
  return (
    <React.Fragment>
      <Title>Table Data for {sensor}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Reading</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <TableRow key={details.indexOf(detail)}>
              <TableCell><Moment format="DD-MMM-YYYY HH:MM:SS">{detail[1]}</Moment></TableCell>
              <TableCell>{detail[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default TableData