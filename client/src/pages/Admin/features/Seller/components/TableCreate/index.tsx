import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../../../../../grapql-client/mutations";
import ExportToExcel from "../../../../components/ExportToExcel";
import TableForm from "./TableForm";
import TableRow from "./TableRow";
import "./TableCreateStyle.scss";
import Table from "../../../../components/Table";
import { IHeaderTableItem } from "../../../../components/Table/index";
interface DbAccount {
  username: string;
  password: string;
}

export interface Account extends DbAccount {
  _id: number;
}

const myAccountList: Account[] = [];
const headerContent: IHeaderTableItem[] = [
  { title: "#", column: 1 },
  { title: "User Name", column: 5 },
  { title: "Password", column: 5 },
  { title: "Action", column: 1 },
];

const AccountTable = () => {
  const [accountList, setAccountList] = useState<Account[]>(myAccountList);
  const [isAddNew, setIsAddNew] = useState<boolean>(false);
  const [accountSelect, setAccountSelect] = useState<Account>({
    _id: accountList.length + 1,
    username: "",
    password: "",
  });

  const [createAccount, dataMutaion] = useMutation(register);

  const handleAddNew = () => {
    setIsAddNew(true);
    setAccountSelect({
      _id: accountList.length + 1,
      username: "",
      password: "",
    });
  };
  const handleCancel = () => {
    setIsAddNew(false);
  };

  const handleAdd = (data: Account) => {
    let isUsernameInValid = accountList.some(
      (account) => account.username === data.username,
    );
    if (isUsernameInValid) {
      toast.error("username already exists");
      return;
    }

    setAccountList((list) => [...list, data]);
    setIsAddNew(false);
  };

  const handleRemove = (data: Account) => {
    let newAccountList: Account[] = [];
    accountList.map((account, index) => {
      if (account._id !== data._id) {
        newAccountList.push({
          _id: account._id > data._id ? account._id - 1 : account._id,
          username: account.username,
          password: account.password,
        });
      }
    });

    console.log(newAccountList);

    setAccountList(newAccountList);
  };

  const handleEdit = (data: Account) => {
    let isUsernameValid = true;
    const newAccountList = accountList.map((account) => {
      if (account._id === data._id) return data;
      else {
        if (account.username === data.username) isUsernameValid = false;
        return account;
      }
    });

    if (isUsernameValid) {
      setAccountList(newAccountList);
    } else {
      toast.error("username already exists");
    }
  };

  const handleSubmit = () => {
    if (accountList.length > 0) {
      let newAccountList: DbAccount[] = accountList.map((account) => {
        return { username: account.username, password: account.password };
      });

      createAccount({
        variables: {
          userInputs: newAccountList,
        },
      });
    }
  };
  useEffect(() => {
    if (!dataMutaion.error && dataMutaion.data) {
      toast.success("Create Accounts Successfully");
      setAccountList([]);
    }
  }, [dataMutaion.loading]);

  return (
    <>
      <ToastContainer />
      <Container className="d-flex flex-column  accountTable">
        <Table headerContent={headerContent}>
          <>
            {accountList.map((account: Account, index: number) => (
              <tr key={account._id}>
                <TableRow
                  account={account}
                  index={index}
                  onRemove={handleRemove}
                  onEdit={handleEdit}
                />
              </tr>
            ))}
            {isAddNew && (
              <tr>
                <TableForm
                  initialValue={accountSelect}
                  onCancel={handleCancel}
                  onConfirm={handleAdd}
                />
              </tr>
            )}
          </>
        </Table>
        {accountList.length <= 0 && (
          <>
            {!isAddNew && (
              <div className="container empty shadow">
                There is no account added
              </div>
            )}
          </>
        )}
        <div className="align-self-end mt-3 ">
          <ExportToExcel csvData={accountList} fileName={"AccountListFile"} />
          <Button
            variant="success"
            size="sm"
            onClick={handleAddNew}
            disabled={isAddNew}
          >
            Add New
          </Button>

          <Button
            className="ms-2"
            size="sm"
            disabled={accountList.length <= 0}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default AccountTable;
