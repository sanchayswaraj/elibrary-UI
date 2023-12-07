import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TopSubscribers = ({ subscribers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribers.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell>{subscriber.name}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopSubscribers;
