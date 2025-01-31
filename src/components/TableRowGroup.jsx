import { TableCell, TableRow } from "@mui/material";
import React from "react";
import TableForm from "./TableForm";
const TableRowGroup = ({ row, setData }) => {
  return (
    <>
      <TableRow>
        <TableCell>{row.label}</TableCell>
        <TableCell>{row.value}</TableCell>
        <TableForm id={row.id} variance={row.variance} setData={setData} />
      </TableRow>
      {row.children.map((child) => (
        <TableRow key={child.id}>
          <TableCell>{`--${child.label}`}</TableCell>
          <TableCell>{child.value}</TableCell>
          <TableForm
            id={child.id}
            variance={child.variance}
            setData={setData}
          ></TableForm>
        </TableRow>
      ))}
    </>
  );
};

export default TableRowGroup;
