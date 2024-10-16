import React from "react";
import {
  Table as STable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { TableColumnsType, TableRowsType } from "@/type";
import { Checkbox } from "./ui/checkbox";
import { useNavigate } from "@tanstack/react-router";

type TablePropsType = {
  columns: TableColumnsType[];
  rows: TableRowsType[];
  isSelectable?: boolean;
  setRows?: () => void;
};

const Table = ({ columns, rows, isSelectable }: TablePropsType) => {
  return (
    <STable className="w-full">
      <TableHeader>
        <TableRow>
          {isSelectable && (
            <TableHead>
              <Checkbox
                checked={false}
                onCheckedChange={(value) => {}}
                aria-label="Select all"
              />
            </TableHead>
          )}
          {columns.map(({ title, textAlignment }: TableColumnsType) => (
            <TableHead
              key={title}
              className={`font-${textAlignment} font-medium whitespace-nowrap`}
            >
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item, i) => (
          <TableRow key={i}>
            {isSelectable && (
              <TableCell>
                <Checkbox
                  checked={false}
                  onCheckedChange={(value) => {}}
                  aria-label="Select all"
                />
              </TableCell>
            )}
            {columns.map(({ field, textAlignment }) => (
              <TableCell
                className={
                  "font-" + textAlignment + " font-medium whitespace-nowrap"
                }
              >
                {item[field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </STable>
  );
};

export default Table;
