import { Helmet } from "react-helmet";

import { Container } from "react-bootstrap";
import "./RegisterPage.scss";
import { FaHome } from "react-icons/fa";
// import ReactDOM from "react-dom";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { object, string, ref } from "yup";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, checkIsAuth } from "../Config/BasketSlice";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

const Login = Yup.object().shape({
  email: Yup.string()
    .required("Please entered email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please entered correct email or username!"
    ),

  username: Yup.string().required("Please entered username"),
  password: Yup.string()
    .required("Please entered password")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password should min 8 letter password, with at least a symbol  uppercase letter and a number"
    ),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

export default function RegisterPage() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="register">
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <ToastContainer />

      <div className="top">
        <Container>
          <div className="text">
            <Link to={"/"}>
              <FaHome /> Home
            </Link>
            <span>Register</span>
          </div>
        </Container>
      </div>

      <div className="login-section">
        <Container>
          <div className="login-form">
            <h2>Register</h2>

            <Formik
              initialValues={{
                email: "",
                username: "",
                password: "",
                confirm_password: "",
              }}
              validationSchema={Login}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (values, { resetForm }) => {
                axios
                  .post("https://fashi-git-master-aygnn.vercel.app/auth", values)
                  .then((res) => console.log(res));
                resetForm();
                // console.log(values)
                toast.success("You are already have account!", {
                  position: "top-right",
                  autoClose: 2400,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                navigate("/login");
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="input">
                    <label>Email address *</label>
                    <Field
                      className="username"
                      name="email"
                      style={
                        errors.email && touched.email && { borderColor: "red" }
                      }
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div
                      style={
                        errors.email &&
                        touched.email && {
                          fontSize: "17px",
                          color: "red",
                          marginTop: "-20px",
                        }
                      }
                    >
                      {errors.email}
                    </div>
                  )}

                  <div className="input">
                    <label>Username *</label>
                    <Field
                      className="username"
                      name="username"
                      style={
                        errors.username &&
                        touched.username && { borderColor: "red" }
                      }
                    />
                  </div>
                  {errors.username && touched.username && (
                    <div
                      style={
                        errors.username &&
                        touched.username && {
                          fontSize: "17px",
                          color: "red",
                          marginTop: "-20px",
                        }
                      }
                    >
                      {errors.username}
                    </div>
                  )}

                  <div className="input">
                    <label>Password *</label>
                    <div
                      className="inputpassword"
                      style={
                        errors.password &&
                        touched.password && { borderColor: "red" }
                      }
                    >
                      <Field className="password" name="password" type={type} />
                      <span onClick={handleToggle}>
                        <Icon icon={icon} size={20} />
                      </span>
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <div
                      style={
                        errors.password &&
                        touched.password && {
                          fontSize: "17px",
                          color: "red",
                          marginTop: "-20px",
                        }
                      }
                    >
                      {errors.password}
                    </div>
                  )}
                  <div className="input">
                    <label>Confirm Password *</label>
                    <Field name="confirm_password" />
                  </div>
                  {errors.confirm_password && touched.confirm_password && (
                    <div
                      style={
                        errors.confirm_password &&
                        touched.confirm_password && {
                          fontSize: "17px",
                          color: "red",
                          marginTop: "-20px",
                        }
                      }
                    >
                      {errors.confirm_password}
                    </div>
                  )}
                  <button type="submit">Sign In</button>
                </Form>
              )}
            </Formik>
            <div className="switch-login">
              <Link to={"/login"}> Or Login</Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
