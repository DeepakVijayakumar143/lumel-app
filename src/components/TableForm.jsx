import React, { useState } from "react";
import { TableCell, Button } from "@mui/material";

const TableForm = ({ label, setData }) => {
  const [value, setValue] = useState("");
  const [variance, setVariance] = useState(0);

  const calAllocPercent = (percent, label) => {
    const numPercent = Number(percent);
    if (numPercent == null || isNaN(numPercent)) return;

    setData((prevData) => {
      let newVariance = 0;

      const updatedRows = prevData.rows.map((item) => {
        if (item.id === label) {
          const increment = (item.value * numPercent) / 100;
          const newParentValue = item.value + increment;
          newVariance = ((newParentValue - item.value) / item.value) * 100;

          const updatedChildren = item.children.map((child) => {
            const childContributionPercent = child.value / item.value;
            const newChildValue =
              Math.round(childContributionPercent * newParentValue * 100) / 100;
            return { ...child, value: newChildValue };
          });

          return { ...item, value: newParentValue, children: updatedChildren };
        }
        const updatedChildren = item.children.map((child) => {
          if (child.id === label) {
            const increment = (child.value * numPercent) / 100;
            const newChildValue = child.value + increment;
            newVariance = ((newChildValue - child.value) / child.value) * 100;

            return { ...child, value: newChildValue };
          }
          return child;
        });

        // Update parent variance
        const newParentValue = updatedChildren.reduce(
          (total, child) => total + child.value,
          0
        );
        const parentVariance =
          ((newParentValue - item.value) / item.value) * 100;

        return {
          ...item,
          value: newParentValue,
          children: updatedChildren,
          variance: parentVariance.toFixed(2),
        };
      });

      setVariance(newVariance.toFixed(2));
      return { ...prevData, rows: updatedRows };
    });
  };

  const calAllocVal = (val, label) => {
    const numVal = Number(val);
    if (numVal == null || isNaN(numVal)) return;

    setData((prevData) => {
      let newVariance = 0;

      const updatedRows = prevData.rows.map((item) => {
        if (item.id === label) {
          // Update parent
          const newParentValue = item.value + numVal;
          newVariance = ((newParentValue - item.value) / item.value) * 100;

          const updatedChildren = item.children.map((child) => {
            const childContributionPercent = child.value / item.value;
            const newChildValue =
              Math.round(childContributionPercent * newParentValue * 100) / 100;
            return { ...child, value: newChildValue };
          });

          return { ...item, value: newParentValue, children: updatedChildren };
        }
        const updatedChildren = item.children.map((child) => {
          if (child.id === label) {
            const newChildValue = child.value + numVal;
            newVariance = ((newChildValue - child.value) / child.value) * 100;
            return { ...child, value: newChildValue };
          }
          return child;
        });
        const newParentValue = updatedChildren.reduce(
          (total, child) => total + child.value,
          0
        );
        const parentVariance =
          ((newParentValue - item.value) / item.value) * 100;

        return {
          ...item,
          value: newParentValue,
          children: updatedChildren,
          variance: parentVariance.toFixed(2),
        };
      });

      setVariance(newVariance.toFixed(2));
      return { ...prevData, rows: updatedRows };
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
        <Button
          variant="outlined"
          onClick={() => calAllocPercent(value, label)}
        >
          Calculate Allocation %
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outlined" onClick={() => calAllocVal(value, label)}>
          Calculate Allocation Val
        </Button>
      </TableCell>
      <TableCell>{variance} %</TableCell>
    </>
  );
};

export default TableForm;
