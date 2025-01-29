import { TableCell, TableRow } from "@mui/material";
import React from "react";
import TableForm from "./TableForm";
const TableRowGroup = ({ row, setData }) => {
  return (
    <>
      <TableRow>
        <TableCell>{row.label}</TableCell>
        <TableCell>{row.value}</TableCell>
        <TableForm label={row.id} setData={setData} />
      </TableRow>
      {row.children.map((child) => (
        <TableRow key={child.id}>
          <TableCell>{`--${child.label}`}</TableCell>
          <TableCell>{child.value}</TableCell>
          <TableForm label={child.id} setData={setData}></TableForm>
        </TableRow>
      ))}
    </>
  );
};

export default TableRowGroup;
