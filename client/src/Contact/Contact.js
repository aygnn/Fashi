import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { GoMail } from "react-icons/go";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Helmet } from "react-helmet";

import "./Contact.scss";

const SendSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required!")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please entered correct email!"
    ),
  name: Yup.string().required("Name is required!"),
  message: Yup.string().required("Your message is important!"),
});

export default function Contact() {
  const notify = () =>
    toast.success(" Your message was sended succesfully!", {
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
    <div className="contact">
      <Helmet>
        <title>Contact Page</title>
      </Helmet>
      <Container>
        <div class="text">
          <Link to={"/"}>
            <FaHome /> Home
          </Link>
          <span>Contact</span>
        </div>

        <div className="map">
          <iframe
            className="maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24079.17495638111!2d-74.11532844279638!3d41.027512175107425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e440473470d7%3A0xcaf503ca2ee57958!2sSaddle%20River%2C%20NJ%2007458%2C%20USA!5e0!3m2!1sen!2s!4v1676731189402!5m2!1sen!2s"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="contact-area">
          <Row>
            <Col sm={5}>
              <div className="contact-title">
                <h4>Contacts Us</h4>
                <p>
                  Contrary to popular belief, Lorem Ipsum is simply random text.
                  It has roots in a piece of classical Latin literature from 45
                  BC, maki years old.
                </p>
              </div>

              <div className="contact-widget">
                <div className="widget-item">
                  <div className="icon">
                    <SlLocationPin />
                  </div>
                  <div className="contact-text">
                    <span>Address:</span>
                    <p>60-49 Road 11378 New York</p>
                  </div>
                </div>
              </div>

              <div className="contact-widget">
                <div className="widget-item">
                  <div className="icon">
                    <MdOutlinePhoneIphone />
                  </div>
                  <div className="contact-text">
                    <span>Phone:</span>
                    <p>+65 11.188.888</p>
                  </div>
                </div>
              </div>

              <div className="contact-widget">
                <div className="widget-item">
                  <div className="icon">
                    <GoMail />
                  </div>
                  <div className="contact-text">
                    <span>Email:</span>
                    <p>hellocolorlib@gmail.com</p>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={7}>
              <div className="contact-title">
                <h4>Leave A Comment</h4>
                <p>Our staff will call back later and answer your questions.</p>
              </div>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  message: "",
                }}
                validationSchema={SendSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                  notify();
                  resetForm();
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="comment-inputs">
                      <div className="part1">
                        <div>
                          <Field placeholder="Your name" name="name" />
                          {errors.name && touched.name && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "16px",
                                textAlign: "left",
                              }}
                            >
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div>
                          <Field placeholder="Your email" name="email" />
                          {errors.email && touched.email && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "16px",
                                textAlign: "left",
                              }}
                            >
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="part2">
                        <div>
                          <Field placeholder="Your message" name="message" />
                          {errors.message && touched.message && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "16px",
                                textAlign: "left",
                              }}
                            >
                              {errors.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="part3">
                        <button type="submit" className="site-btn">
                          <button className="toastt">Send Message</button>
                        </button>

                        <ToastContainer />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
