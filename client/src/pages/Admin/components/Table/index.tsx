import React from "react";
import { Table as TableBT } from "react-bootstrap";
import "./TableStyle.scss";

export interface IHeaderTableItem {
  title: string;
  column: number;
}

interface Props {
  children: JSX.Element;
  headerContent: IHeaderTableItem[];
}

const Table: React.FC<Props> = ({ children, headerContent }) => {
  return (
    <TableBT hover className="mb-0 shadow-lg rounded-3 overflow-hidden table">
      <thead>
        <tr className="rounded">
          {headerContent.map((item) => (
            <th key={item.title} className={`col-${item.column}`}>
              {item.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableBT>
  );
};

export default Table;
