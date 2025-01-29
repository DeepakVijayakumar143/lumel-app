import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableRowGroup from "./TableRowGroup";
import React, { useState } from "react";
const MyTable = () => {
  const source = {
    rows: [
      {
        id: "electronics",
        label: "Electronics",
        value: 1500, //this value needs to be calculated from the children values (800+700)
        children: [
          {
            id: "phones",
            label: "Phones",
            value: 800,
          },
          {
            id: "laptops",
            label: "Laptops",
            value: 700,
          },
        ],
      },
      {
        id: "furniture",
        label: "Furniture",
        value: 1000, //this need to be calculated from the children values (300+700)
        children: [
          {
            id: "tables",
            label: "Tables",
            value: 300,
          },
          {
            id: "chairs",
            label: "Chairs",
            value: 700,
          },
        ],
      },
    ],
  };
  const [data, setData] = useState(source);

  return (
    <>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Input</TableCell>
            <TableCell>Allocation % </TableCell>
            <TableCell>Allocation Val</TableCell>
            <TableCell>Variance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((item) => {
            return (
              <TableRowGroup
                key={item.id}
                row={item}
                setData={setData}
              ></TableRowGroup>
            );
          })}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default MyTable;
