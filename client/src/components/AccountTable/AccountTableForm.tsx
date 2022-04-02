import React, { useState } from "react";
import { Account } from "./index";

interface Props {
  initialValue: Account;
  onCancel: () => void;
  onConfirm: (data: Account) => void;
}

const AccountTableForm: React.FC<Props> = ({
  initialValue,
  onCancel,
  onConfirm,
}) => {
  const [newAccount, setNewAccount] = useState<Account>(initialValue);

  const handleError = () => {
    alert("Please fill full account details");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newAccount.username && newAccount.password) {
        onConfirm(newAccount);
      } else {
        handleError();
      }
    }
  };

  const handleConfirm = () => {
    if (newAccount.username && newAccount.password) {
      onConfirm(newAccount);
    } else {
      handleError();
    }
  };

  return (
    <>
      <td>
        <span className="d-flex align-items-center justify-content-center"></span>
      </td>
      <td>
        <input
          type="text"
          name="username"
          onChange={handleOnChange}
          value={newAccount.username}
          autoComplete="off"
          onKeyDown={handleEnter}
          autoFocus={true}
        />
      </td>
      <td>
        <input
          type="password"
          name="password"
          id=""
          onChange={handleOnChange}
          value={newAccount.password}
          onKeyDown={handleEnter}
          autoComplete="off"
        />
        <div className="accountAction">
          <div
            className="cancel accountAction-btn text-danger"
            onClick={onCancel}
          >
            <i className="fa-solid fa-circle-x"></i>
          </div>
          <div
            className={`remove accountAction-btn ${
              newAccount.username && newAccount.password
                ? "text-success"
                : "text-secondary"
            }`}
            onClick={handleConfirm}
          >
            <i className="fa-solid fa-circle-check"></i>
          </div>
        </div>
      </td>
    </>
  );
};

export default AccountTableForm;
