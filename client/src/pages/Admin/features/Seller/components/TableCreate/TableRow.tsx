import React, { useState } from "react";
import TableForm from "./TableForm";

import { Account } from "./index";

interface Props {
  account: Account;
  index: number;
  onRemove: (data: Account) => void;
  onEdit: (data: Account) => void;
}

const TableRow: React.FC<Props> = ({ account, onRemove, onEdit }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleEdit = (data: Account) => {
    setIsEdit(false);
    onEdit(data);
  };

  return (
    <>
      {isEdit ? (
        <TableForm
          initialValue={account}
          onCancel={handleCancel}
          onConfirm={handleEdit}
        />
      ) : (
        <>
          <td>{account._id}</td>
          <td>
            <span onClick={() => setIsEdit(true)}>{account.username}</span>
          </td>
          <td>
            <span onClick={() => setIsEdit(true)}>{account.password}</span>
          </td>
          <td>
            <div className="accountAction">
              <div
                className="edit accountAction-btn"
                onClick={() => setIsEdit(true)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
              <div
                className="remove accountAction-btn"
                onClick={() => onRemove(account)}
              >
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </td>
        </>
      )}
    </>
  );
};

export default TableRow;
