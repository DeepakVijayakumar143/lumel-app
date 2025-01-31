import React, { useState } from "react";
import { TableCell, Button } from "@mui/material";

const TableForm = ({ id, setData, variance }) => {
  const [value, setValue] = useState("");

  const calAllocPercent = (percent, id) => {
    setData((prev) => {
      const newData = [...prev];
      for (const parent of newData) {
        if (parent.id === id) {
          parent.variance = percent;
          parent.value += (percent / 100) * parent.value;
          for (const child of parent.children) {
            child.variance = parent.variance;
            child.value += (percent / 100) * child.value;
          }
          break;
        } else {
          for (const child of parent.children) {
            if (child.id === id) {
              child.variance = percent;
              const existingChildValue = child.value;
              child.value += (percent / 100) * child.value;
              const existingParentValue = parent.value;
              parent.value += child.value - existingChildValue;
              parent.variance = (
                100 -
                (existingParentValue / parent.value) * 100
              ).toFixed(2);
            }
          }
        }
      }
      return newData;
    });
  };

  const calAllocVal = (val, id) => {
    setData((prev) => {
      const newData = [...prev];
      for (const parent of newData) {
        if (parent.id === id) {
          const variance = ((val / parent.value) * 100).toFixed(2);
          parent.variance = variance;
          parent.value = parent.value + Number(val);
          for (const child of parent.children) {
            child.variance = parent.variance;
            child.value += (child.variance / 100) * child.value;
          }
          break;
        } else {
          for (const child of parent.children) {
            if (child.id === id) {
              child.variance = ((val / child.value) * 100).toFixed(2);
              child.value += Number(val);
              const existingParentValue = parent.value;
              parent.value += Number(val);
              parent.variance = (
                100 -
                (existingParentValue / parent.value) * 100
              ).toFixed(2);
            }
          }
        }
      }
      return newData;
    });
  };

  return (
    <>
      <TableCell>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() => calAllocPercent(value, id)}>
          Calculate Allocation %
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() => calAllocVal(value, id)}>
          Calculate Allocation Val
        </Button>
      </TableCell>
      <TableCell>{variance} %</TableCell>
    </>
  );
};

export default TableForm;
