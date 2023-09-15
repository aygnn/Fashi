import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import axios from "axios";
import { useDispatch } from "react-redux";

import Container from "react-bootstrap/esm/Container";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";

import { Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { handleCheckout } from "../Config/BasketSlice";

const SendSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please entered correct email!"
    ),
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  postcode: Yup.number().required().min(4, "Zip code must be 4 digits"),
  phone: Yup.string().required(),
  cardNumber: Yup.string()
  .label('Card number')
  .max(16, "Please entered acceptable Card!")
  .required(),
  card_month: Yup.string().required(),
  card_year: Yup.string().required(),
});

export default function Checkout() {
  const dispatch = useDispatch();

  const COUNT = useSelector((state) => state.basketitem.count);
  // const TOTAL = useSelector((state) => state.basketitem.total);
  const [basket, setBasket] = useState([]);
  const [order,setOrder]=useState([])
  let userBasket = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setBasket(userBasket ? userBasket.usercheckout : []);
  }, [COUNT]);

  let total=0
  userBasket?.usercheckout?.forEach(element => {
    try {
      total+=element.count*element.dataa.price
      total.toFixed(2)
      // console.log(total);
    } catch (error) {
      console.log(error);
      
    }
    
  });

  const handleOrder=()=>{
    // if(userBasket.usercheckout.length!==0){
    //   notify()
    //   userBasket.usercheckout.forEach((item) => {
    //     userBasket.posts.push(item.dataa);
    //   });
    //   userBasket.usercheckout = [];
    //   localStorage.setItem("user", JSON.stringify(userBasket));
    //   axios.put(`https://fashi-virid.vercel.app/users/${userBasket._id}`, userBasket.posts,
    //   {
    //    headers: {
    //      "Content-Type": "application/json",
    //    },
    //  });

    // }
    if(userBasket.usercheckout.length!==0){
      dispatch(handleCheckout())
      notify()
    }
    else{
      error()
    }
  }
  const notify = () =>
    toast.success(" Your order has been received!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const error = () =>
    toast.success(" You haven't added anything to your cart yet.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <div className="checkout">
      <Helmet>
        <title>Checkout Page</title>
      </Helmet>
      <ToastContainer />
      <div className="top">
        <Container>
          <div class="text">
            <Link to={"/"}>
              <FaHome /> Home
            </Link>
            <Link to={"/Shop"}>Shop</Link>
            <span>Checkout</span>
          </div>
        </Container>
      </div>

      <div className="order">
        <Container>
          <Row>
            <Col sm={6}>
              <div className="checkout-content">
                <Link to="/login" className="content-btn">
                  Click Here To Login
                </Link>
              </div>
              <h4>Billing Details</h4>

              <div className="form">
                <Formik
                  initialValues={{
                    firstname: "",
                    lastname: "",
                    postcode: 0,
                    email: "",
                    phone: "",
                    cardnumber: 0,
                    card_month: "",
                    card_year: "",
                  }}
                  validationSchema={SendSchema}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    // notify();
                    resetForm();
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div class="row">
                        <div class="col-lg-6">
                          <label for="fir">
                            First Name<span>*</span>
                            {errors.firstname && touched.firstname && (
                              <div className="warningg">
                                <RiErrorWarningFill />
                              </div>
                            )}
                          </label>

                          <Field
                            type="text"
                            id="fir"
                            style={
                              errors.firstname &&
                              touched.firstname && { borderColor: "red" }
                            }
                            name="firstname"
                          />
                        </div>
                        <div class="col-lg-6">
                          <label for="last">
                            Last Name<span>*</span>{" "}
                            {errors.firstname && touched.firstname && (
                              <div className="warningg">
                                <RiErrorWarningFill />
                              </div>
                            )}
                          </label>
                          <Field
                            type="text"
                            id="last"
                            style={
                              errors.lastname &&
                              touched.lastname && { borderColor: "red" }
                            }
                            name="lastname"
                          />
                        </div>
                        <div class="col-lg-12">
                          <label for="zip">
                            Postcode / ZIP (optional){" "}
                            {errors.postcode && touched.postcode && (
                              <div className="warningg">
                                <RiErrorWarningFill />
                              </div>
                            )}
                          </label>
                          <Field
                            type="text"
                            id="zip"
                            style={
                              errors.postcode &&
                              touched.postcode && { borderColor: "red" }
                            }
                            name="postcode"
                          />
                          {errors.postcode && touched.postcode ? (
                            <div style={{ color: "red", fontSize: 14 }}>
                              {errors.postcode}
                            </div>
                          ) : null}
                        </div>
                        <div class="col-lg-6">
                          <label for="email">
                            Email Address<span>*</span>{" "}
                            {errors.firstname && touched.firstname && (
                              <div className="warningg">
                                <RiErrorWarningFill />
                              </div>
                            )}
                          </label>
                          <Field
                            type="text"
                            id="email"
                            style={
                              errors.email &&
                              touched.email && { borderColor: "red" }
                            }
                            name="email"
                          />
                        </div>
                        <div class="col-lg-6">
                          <label for="phone">
                            Phone<span>*</span>{" "}
                            {errors.firstname && touched.firstname && (
                              <div className="warningg">
                                <RiErrorWarningFill />
                              </div>
                            )}
                          </label>
                          <Field
                            type="text"
                            id="phone"
                            style={
                              errors.phone &&
                              touched.phone && { borderColor: "red" }
                            }
                            name="phone"
                          />
                        </div>

                        <div class="col-lg-6">
                          <label for="email">
                            Card Number<span>*</span>{" "}
                            {errors.firstname && touched.firstname && (
                              <div className="warningg">
                                <RiErrorWarningFill />
                              </div>
                            )}
                          </label>
                          <Field
                            type="text"
                            id="card"
                            placeholder="1234 5678 9123 4567"
                            style={
                              errors.cardnumber &&
                              touched.cardnumber && { borderColor: "red" }
                            }
                            name="cardnumber"
                          />
                          {errors.cardnumber && touched.cardnumber && (
                            <div style={{ color: "red", fontSize: 14 }}>
                              {errors.cardnumber}
                            </div>
                          )}
                        </div>

                        <div class="col-lg-6 card-numb">
                          <div className="expiration">
                            <label for="email">
                              Expiration Date<span>*</span>{" "}
                              {errors.firstname && touched.firstname && (
                                <div className="warningg">
                                  <RiErrorWarningFill />
                                </div>
                              )}
                            </label>
                          </div>
                          <div className="datas">
                            <div className="mm">
                              <Field
                                type="text"
                                id="card"
                                placeholder="MM"
                                style={
                                  errors.card_month &&
                                  touched.card_month && { borderColor: "red" }
                                }
                                name="card_month"
                              />
                            </div>
                            <div className="yy">
                              <Field
                                type="text"
                                id="card"
                                placeholder="YY"
                                style={
                                  errors.card_year &&
                                  touched.card_year && { borderColor: "red" }
                                }
                                name="card_year"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="order-btn">
                          <button type="submit" class="site-btn place-btn">
                            Save Data
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
            <Col sm={6}>
              <div class="checkout-content">
                <input type="text" placeholder="Enter Your Coupon Code" />
              </div>

              <div class="place-order">
                <h4>Your Order</h4>
                <div class="order-total">
                  <ul class="order-table">
                    <li>
                      Product <span>Total</span>
                    </li>
                    {(userBasket.usercheckout || []).map((item) => (
                      <div>
                        <li class="fw-normal">
                          {item.dataa.name}{" "}
                          <span>
                            {item.count} x ${item.dataa.price}
                          </span>
                        </li>
                      </div>
                    ))}
                    <li class="fw-normal">
                      Subtotal <span>${total}</span>
                    </li>

                    <li class="total-price">
                      Total <span>${total}</span>
                    </li>
                  </ul>
                  <div class="order-btn">
                    <button
                      onClick={handleOrder}
                      type="submit"
                      class="site-btn place-btn"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
