import React, { useContext } from "react";

import { Select } from "antd";

import "./addUser.scss";
import * as Yup from "yup";
import { useFormik, Field, Form, Formik } from "formik";
import UserContext from "../../context/UserContext";
import Close from "../../assets/images/close.png";
const { Option } = Select;

function UserModal({ action, deleteAction, show, close, title }) {
  const { deleteUser, addUser } = useContext(UserContext);
  const handleSubmit = (values) => {
    const newUser = {
      name: values.name,
      email: values.email,
      role: values.role,
      status: "active",
    };
    addUser(newUser);
  };
  const userForm = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),
    role: Yup.string().min(2, "Role is required!").required("required!"),
  });
  return (
    <div className="modal">
      <div
        className={`modal-container ${show ? "show" : ""} `}
        onClick={() => close()}
      >
        {show && (
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title">
                {action == "delete" ? "Delete User" : title}
              </h2>
              <button className="close" onClick={() => close()}>
                <img src={Close} alt="close" />
              </button>
            </header>
            <main className="modal_content">
              {action == "delete" ? (
                <>
                  <div className="delete-content form-field name">
                    {deleteAction[1]?.name}
                    <span> {deleteAction[1]?.status}</span>
                  </div>
                  <div className="delete-wrapper">
                    <button
                      className="delete-btn submit-btn "
                      type="submit"
                      onClick={() => {
                        deleteUser(deleteAction[0]);
                        close();
                      }}
                    >
                      Delete User
                    </button>
                  </div>
                </>
              ) : (
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    role: " ",
                  }}
                  validationSchema={userForm}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                    close();
                  }}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <Form>
                      <>
                        <Field
                          name="name"
                          placeholder={"Name"}
                          onChange={handleChange}
                          value={values.name}
                          className={"form-field name"}
                        />
                        {errors.name && touched.name ? (
                          <div className="error">{errors.name}</div>
                        ) : null}
                        <Field
                          name="email"
                          type="email"
                          placeholder={"E-mail"}
                          onChange={handleChange}
                          value={values.email}
                          className={"form-field mail"}
                        />
                        {errors.email && touched.email ? (
                          <div className="error">{errors.email}</div>
                        ) : null}
                        <Select
                          style={{
                            width: "100%",
                          }}
                          name="role"
                          placeholder="Role"
                          optionFilterProp="children"
                          onChange={(input, option) =>
                            setFieldValue("role", option.children)
                          }
                        >
                          <Option value="1">User</Option>
                          <Option value="2">Admin</Option>
                        </Select>{" "}
                        {errors.role && touched.role ? (
                          <div className="error">{errors.role}</div>
                        ) : null}
                        <button className="submit-btn" type="submit">
                          Add user
                        </button>
                      </>
                    </Form>
                  )}
                </Formik>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserModal;
