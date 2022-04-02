import React, { useState } from "react";
import AccountTableForm from "./AccountTableForm";

import { Account } from "./index";

interface Props {
  account: Account;
  index: number;
  onRemove: (data: Account) => void;
  onEdit: (data: Account) => void;
}

const AccountTableRow: React.FC<Props> = ({
  account,
  onRemove,
  onEdit,
  index,
}) => {
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
        <AccountTableForm
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

export default AccountTableRow;
