import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { resetPassword } from "../../../../../grapql-client/mutations";
import Table, { IHeaderTableItem } from "../../../components/Table";
const headerContent: IHeaderTableItem[] = [
  { title: "#", column: 1 },
  { title: "User Name", column: 2 },

  { title: "Create At", column: 2 },
  { title: "Update At", column: 2 },
  { title: "State", column: 1 },
  { title: "Reset", column: 1 },
];
interface IAccount {
  _id: string;
  username: string;
  state: boolean;
  createAt: Date;
  updateAt: Date;
}

const myAccountList: IAccount[] = [
  {
    _id: "1",
    username: "1",
    state: true,
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "2",
    username: "2",
    state: true,
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "3",
    username: "3",
    state: true,
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "4",
    username: "4",
    state: true,
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "5",
    username: "5",
    state: false,
    createAt: new Date(),
    updateAt: new Date(),
  },
];
const List = () => {
  const [accountList, setAccountList] = useState<IAccount[]>(myAccountList);
  const [resetPasswordFn, dataMutaion] = useMutation(resetPassword);
  const handleReset = (username: string) => {
    resetPasswordFn({
      variables: {
        username: "a",
      },
    });
  };

  return (
    <Container>
      <Table headerContent={headerContent}>
        <>
          {accountList.map((account, index) => (
            <tr key={account._id}>
              <td>{index}</td>
              <td>{account.username}</td>
              <td>
                {account.createAt.getDate() +
                  "/" +
                  (account.createAt.getMonth() + 1) +
                  "/" +
                  account.createAt.getFullYear()}
              </td>
              <td>
                {account.createAt.getDate() +
                  "/" +
                  (account.createAt.getMonth() + 1) +
                  "/" +
                  account.createAt.getFullYear()}
              </td>

              <td>
                {account.state ? (
                  <div className="text-success">Active</div>
                ) : (
                  <div className="text-danger">Disabled</div>
                )}
              </td>

              <td>
                <Button size="sm" onClick={() => handleReset(account.username)}>
                  <i className="fa-regular fa-arrows-rotate"></i>
                </Button>
              </td>
            </tr>
          ))}
        </>
      </Table>
    </Container>
  );
};

export default List;
