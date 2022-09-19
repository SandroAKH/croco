import React, { useContext, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/Modal.scss";
import "./EditUser.scss";
import Close from "../../assets/images/close.png";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import UserContext from "../../context/UserContext";
import { Switch, Select } from "antd";

const { Option } = Select;

function EditUser({ show, close, title, editAction }) {
  const { updateUser } = useContext(UserContext);
  const ref = useRef();
  const [submit, setSubmit] = useState(false);
  const userForm = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),
    role: Yup.string().min(2, "Role is required!").required("required!"),
  });

  const handleSubmit = (values) => {
    const editUser = {
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
    };
    updateUser(editAction.id, editUser);
  };
  return ReactDOM.createPortal(
    <>
      <div
        className={`modal-container ${show ? "show" : ""} `}
        onClick={() => close()}
      >
        {show && (
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title">{title}</h2>
              <button className="close " onClick={() => close()}>
                <img src={Close} alt="close" />
              </button>
            </header>
            <main className="modal_content modal_edit_content">
              <div
                className={`${
                  ref?.current?.className.includes("hide-btn") && "hide-pic"
                } user-container edit-pic`}
              >
                <div
                  style={{ marginRight: "21px" }}
                  className="profile-pic"
                ></div>
                <div className="name-wrapper">
                  <p style={{ display: "flex", marginBottom: "0" }}>
                    {editAction.name}
                    <span className="role-wrapper">
                      {editAction.role == "Admin" && <span></span>}
                    </span>
                  </p>
                  <span> {editAction.email} </span>
                </div>
              </div>{" "}
              <Formik
                initialValues={{
                  name: editAction?.name,
                  email: editAction?.email,
                  role: editAction?.role,
                  status: editAction?.status,
                }}
                validationSchema={userForm}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values);
                  if (submit) {
                    resetForm();
                    close();
                    setSubmit(false);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  values,
                  handleChange,
                  setFieldValue,
                  submitForm,
                }) => (
                  <Form>
                    <>
                      <div className="details">
                        <p>Details</p>
                        <div className="status-wrapper">
                          <p className="user-status">This user is</p>
                          <span>{values.status}</span>
                          <Switch
                            defaultChecked={
                              values.status == "active" ? true : false
                            }
                            onClick={submitForm}
                            onChange={(event, checked) => {
                              setFieldValue(
                                "status",
                                event ? "active" : "inactive"
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="field-wrapper">
                        <Field
                          name="name"
                          placeholder={"name"}
                          onChange={handleChange}
                          value={values.name}
                          className={"form-field name"}
                          disabled={values.status == "inactive"}
                        />
                        {errors.name && touched.name ? (
                          <div className="error">{errors.name}</div>
                        ) : null}
                        <Field
                          name="email"
                          type="email"
                          placeholder={"email"}
                          onChange={handleChange}
                          value={values.email}
                          className={"form-field mail"}
                          disabled={values.status == "inactive"}
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
                          defaultValue={values.role}
                          onChange={(input, option) =>
                            setFieldValue("role", option.children)
                          }
                          disabled={values.status == "inactive"}
                        >
                          <Option value="1">User</Option>
                          <Option value="2">Admin</Option>
                        </Select>{" "}
                        {errors.role && touched.role ? (
                          <div className="error">{errors.role}</div>
                        ) : null}
                      </div>
                      <button
                        ref={ref}
                        className={`submit-btn ${
                          values.status == "inactive" ? "hide-btn" : ""
                        }`}
                        type="submit"
                        onClick={() => setSubmit(true)}
                      >
                        Save changes
                      </button>
                    </>
                  </Form>
                )}
              </Formik>
            </main>
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default EditUser;
