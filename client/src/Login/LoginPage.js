import { Container } from "react-bootstrap";
import "./LoginPage.scss";
import { FaHome } from "react-icons/fa";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import React, { useState, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkIsAuth } from "../Config/BasketSlice";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

import axios from "axios";

const Login = Yup.object().shape({
  username: Yup.string().required("Please entered username"),
  password: Yup.string()
    .required("Please entered the Correct password!")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Please entered the Correct password!"
    ),
    
});

export default function LoginPage() {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    axios.get("https://fashi-pbtgesky2-aygnn.vercel.app/auth").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="login">
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <ToastContainer />

      <div className="top">
        <Container>
          <div className="text">
            <Link to={"/"}>
              <FaHome /> Home
            </Link>
            <span>Login</span>
          </div>
        </Container>
      </div>

      <div className="login-section">
        <Container>
          <div className="login-form">
            <h2>Login</h2>

            <div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                // validationSchema={Login}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={Login}  
                onSubmit={async (values) => {
                  axios
                    .post("https://fashi-git-master-aygnn.vercel.app/login", values)
                    .then((res) => {
                      console.log(res.data);
                      users.forEach((element) => {
                        if (element.username === res.data.data.username) {
                          localStorage.setItem("user", JSON.stringify(element));
                          sessionStorage.setItem(
                            "userlogin",
                            JSON.stringify(true)
                          );
                          navigate("/");
                          window.location.reload();
                        }
                      });
                    })
                    .catch((error) => {
                      if (error.response.status === 500) {
                        alert("Not found");
                      } else {
                        toast.error(`${error.response.data.message}`, {
                          position: "top-right",
                          autoClose: 2400,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }
                    });
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="input">
                      <label>Username *</label>
                      <div className="input-username">
                        <Field
                          className="username"
                          name="username"
                          style={
                            errors.username &&
                            touched.username && { borderColor: "red" }
                          }
                        />
                      </div>
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
                        <Field
                          className="password"
                          name="password"
                          type={type}
                        />
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
                    <button type="submit">Sign In</button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="switch-login">
              <Link to={"/register"}> Or Create An Account</Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
