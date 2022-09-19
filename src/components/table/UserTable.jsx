import React, { useContext, useState, useEffect } from "react";
import "./UserTable.scss";
import UserContext from "../../context/UserContext";
import { Switch } from "antd";
import "antd/dist/antd.min.css";
import { Table } from "antd";
import AddUser from "../addUser/addUser";

import { Route, Routes, Link } from "react-router-dom";
import EditUser from "../editUser/EditUser";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const { data, tableParams, setTableParams, updateUser } =
    useContext(UserContext);

  const [dataSource, setDataSource] = useState();
  const [inputValue, setInputValue] = useState("");
  const [action, setAction] = useState();
  const [deleteAction, setDeleteAction] = useState([]);
  const [editAction, setEditAction] = useState();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();

  const addToggle = () => setAddModal((prev) => !prev);
  const editToggle = () => {
    setEditModal((prev) => !prev);
    navigate("/");
  };

  useEffect(() => {
    setDataSource(data);
  }, [data]);
  useEffect(() => {}, [dataSource]);

  const columns = [
    {
      title: "",
      dataIndex: "",
    },
    {
      title: "NAME",
      dataIndex: "name",
      sorter: (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      defaultSortOrder: "",
      render: (text, record) => (
        <div className="user-container">
          <div className="profile-pic"></div>
          <p className="name-wrapper">
            {record.name} <span> {record.email} </span>
          </p>
        </div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      sorter: (a, b) =>
        a.role.toLowerCase().localeCompare(b.role.toLowerCase()),
      defaultSortOrder: "",
      render: (text, record) => {
        return (
          <div className="role-wrapper">
            {record.role} {record.role == "Admin" && <div></div>}
          </div>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      defaultSortOrder: "",
      sorter: (a, b) =>
        a.status.toLowerCase().localeCompare(b.status.toLowerCase()),
      render: (text, record, index) => {
        const onToggle = (checked) => {
          let status = checked ? "active" : "inactive";
          record["status"] = status;
          updateUser(record.id, record);
        };
        return (
          <Switch
            // defaultChecked={record.status === "active" ? true : false}
            onChange={onToggle}
            checked={record.status === "active" ? true : false}
          />
        );
      },
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      render: (text, record) => (
        <p className="status-wrapper">
          <Link
            to={`${record.id}`}
            onClick={() => {
              setEditAction(record);
              editToggle();
            }}
          >
            {" "}
            <span className="edit"></span>{" "}
          </Link>

          <span
            className="delete"
            onClick={() => {
              setDeleteAction([record.id, record]);
              addToggle();
              setAction("delete");
            }}
          ></span>
        </p>
      ),
    },
    {
      title: "",
      dataIndex: "",
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <div className="">
      <header className="user-header">
        <h1>Users</h1>
        <div className="input-container">
          <label></label>
          <input
            alt="search"
            placeholder="Type to filter the table..."
            value={inputValue}
            onChange={(e) => {
              const targetValue = e.target.value;
              setInputValue(targetValue);
              const filteredData = data.filter((item) =>
                item.name.toLowerCase().includes(targetValue.toLowerCase())
              );
              setDataSource(filteredData);
            }}
          />
        </div>
        <div
          className="add-user-btn"
          onClick={() => {
            addToggle();
            setAction("");
          }}
        >
          <div className="add-user-btn"></div>
        </div>
      </header>
      <Routes>
        <Route
          path={`/${editAction?.id}`}
          element={
            <EditUser
              editAction={editAction}
              show={editModal}
              close={editToggle}
              title="Edit User"
            />
          }
        />
      </Routes>

      <AddUser
        show={addModal}
        action={action}
        close={addToggle}
        deleteAction={deleteAction}
        title="Add User"
        setAction={setAction}
      />
      <div className="table-wrapper">
        <Table
          rowClassName={(record, index) =>
            record.status != "active" && "hidden-row"
          }
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={dataSource}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default UserTable;
