import React from "react";
import {
  Table as STable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { TableColumnsType } from "@/type";
import { Checkbox } from "./ui/checkbox";

type TablePropsType = {
  columns: TableColumnsType[];
  rows: any[];
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
        {rows.length ? (
          rows.map((item, i) => (
            <TableRow
              key={i}
              onClick={() => {
                item.onClick(item);
              }}
            >
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
          ))
        ) : (
          <div className="w-full text-center text-muted-foreground">
            No data found.
          </div>
        )}
      </TableBody>
    </STable>
  );
};

export default Table;
