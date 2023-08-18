import React from "react";
import { Col, Row } from "react-bootstrap";
import "./AddPage.scss";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { RiErrorWarningFill } from "react-icons/ri";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from 'axios'
import AllProduct from "./AllProduct";
import {Helmet} from 'react-helmet'
import { Link } from "react-router-dom";



const Add = Yup.object().shape({
  image1: Yup.string().required("Image link is required"),
  // img: Yup.string().required("Image link is required"),
  gender: Yup.string().required(),
  type: Yup.string().required("Type is required"),
  gender: Yup.string().required(),
  product_details: Yup.string().required(),
  about: Yup.string().required(),
  color: Yup.string().required(),
  name: Yup.string().required(),
  price: Yup.number().required(),
  size:Yup.object().shape({
    size1: Yup.string().required(),
    size2: Yup.string().required(),
    size3: Yup.string().required(),
    size4: Yup.string().required(),

  }),
  image:Yup.object().shape({
    img: Yup.string().required("Image link is required")
  })
});
export default function Admin() {
  let user=JSON.parse(localStorage.getItem('user')) 
  

  return (

    <div className="dashboard">
         {/* <Helmet>
    <title>Admin Page</title>
      </Helmet> */}
      {
        user && user?.isAdmin===true?
        <div>
      {/* <div className="navbar">
        <h4>Admin Dashboard</h4>

        <div>
          
          <Link to={'users'}><h5>View Users</h5></Link>
        </div>
      </div> */}
      <Row>
        <Col sm={3}>
          <div className="add">
            <div className="title">
              <h5 className="button-85">Add Product</h5>
            </div>
            <div>
              <Formik
                initialValues={{
                  image1: "",
                  gender: "",
                  type: "",
                  product_details: "",
                  about: "",
                  color: "",
                  name: "",
                  price: "",
                  size: {
                    size1: "",
                    size2: "",
                    size3: "",
                    size4: "",
                  },
                  image:{
                    img:'',
                    img:'',
                    img:'',
                    img:'',
                  }
                }}
                validationSchema={Add}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={ async(values,{ resetForm })=>{
                  await axios.post('https://fashi-git-master-aygnn.vercel.app/products',values)
                  .then(res=>console.log(res.data))
                  console.log(values);
                resetForm();
                window.location.reload(false);
                  
                  
                }}>
                {({ errors, touched }) => (
                  <Form>
                    <div className="images1">
                      {/* <div
                        className="image"
                        style={
                          errors.image1 &&
                          touched.image1 && { borderColor: "red" }
                        }
                      > */}
                        <Field placeholder="Main Image link" name="image1" />
                        {errors.image1 && touched.image1 && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                        <Field placeholder="Image1 link" name="image.img" />
                        {errors.image?.img && touched.image?.img && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}


                      {/* </div> */}

                      <div
                        className="image"
                        style={
                          errors.image?.img&&
                          touched.image?.img && { borderColor: "red" }
                        }
                      >
                        <Field className='input' placeholder="Image2 link" name="image.img" />
                        {errors.image?.img && touched.image?.img && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="images2">
                      <div
                        className="image"
                        style={
                          errors.image?.img &&
                          touched.image?.img && { borderColor: "red" }
                        }
                      >
                        <Field  className='input'  placeholder="Image3 link" name="image.img" />
                        {errors.image?.img && touched.image?.img && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>

                      <div
                        className="image"
                        style={
                          errors.image?.img &&
                          touched.image?.img && { borderColor: "red" }
                        }
                      >
                        <Field className='input'  placeholder="Image4 link" name="image.img" />
                        {errors.image?.img && touched.image?.img && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="radio-wrapper">
                      <span
                        className="radio"
                        style={
                          errors.gender &&
                          touched.gender && { borderColor: "red" }
                        }
                      >
                        <label>
                          Man
                          <Field className='input'  type="radio" name="gender" value="man" />
                        </label>
                      </span>

                      <span
                        className="radio"
                        style={
                          errors.gender &&
                          touched.gender && { borderColor: "red" }
                        }
                      >
                        <label>
                          Woman
                          <Field className='input'  type="radio" name="gender" value="woman" />
                        </label>
                      </span>
                      <span
                        className="radio"
                        style={
                          errors.gender &&
                          touched.gender && { borderColor: "red" }
                        }
                      >
                        <label>
                          Kids
                          <Field className='input'  type="radio" name="gender" value="kids" />
                        </label>
                      </span>
                    </div>

                    <div
                      className="image"
                      style={
                        errors.type && touched.type && { borderColor: "red" }
                      }
                    >
                      <Field className='input'  placeholder="Product Type" name="type" />
                      {errors.type && touched.type && (
                        <div className="warning">
                          <RiErrorWarningFill />
                        </div>
                      )}
                    </div>

                    <Field
                      className="details"
                      as={TextField}
                      label="Product Details"
                      name="product_details"
                      multiline
                      maxRows={4}
                    />

                    <Field
                      as={TextField}
                      className="details"
                      label="About"
                      name="about"
                      multiline
                      maxRows={4}
                    />

                    <div className="color_price">
                      <div
                        className="image"
                        style={
                          errors.color &&
                          touched.color && { borderColor: "red" }
                        }
                      >
                        <Field placeholder="Color" name="color" />
                        {errors.color && touched.color && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>

                      <div
                        className="image"
                        style={
                          errors.price &&
                          touched.price && { borderColor: "red" }
                        }
                      >
                        <Field placeholder="Price $" name="price" />
                        {errors.price && touched.price && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="image"
                      style={
                        errors.name && touched.name && { borderColor: "red" }
                      }
                    >
                      <Field placeholder="Product name" name="name" />
                      {errors.name && touched.name && (
                        <div className="warning">
                          <RiErrorWarningFill />
                        </div>
                      )}
                    </div>

                    <div className="sizes">
                      <div
                        className="size"
                        style={
                          errors.size?.size1 &&
                          touched.size?.size1 && { borderColor: "red" }
                        }
                      >
                        <Field placeholder="size" name="size.size1" />
                        {errors.size?.size1 && touched.size?.size1 && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>

                      <div
                        className="size"
                        style={
                          errors.size?.size2 &&
                          touched.size?.size2 && { borderColor: "red" }
                        }
                      >
                        <Field placeholder="size" name="size.size2" />
                        {errors.size?.size2 && touched.size?.size2 && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>
                      <div
                        className="size"
                        style={
                          errors.size?.size3 &&
                          touched.size?.size3 && { borderColor: "red" }
                        }
                      >
                        <Field placeholder="size" name="size.size3" />
                        {errors.size?.size3 && touched.size?.size3 && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>
                      <div
                        className="size"
                        style={
                          errors.size?.size4 &&
                          touched.size?.size4 && { borderColor: "red" }
                        }
                      >
                        <Field placeholder="size" name="size.size4" />
                        {errors.size?.size4 && touched.size?.size4 && (
                          <div className="warning">
                            <RiErrorWarningFill />
                          </div>
                        )}
                      </div>
                    </div>

                    <Stack spacing={2} direction="row">
                      <Button type='submit' variant="contained">
                        Add
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>

        <Col sm={9}>
          <AllProduct/>
        </Col>
      </Row>
          </div>
       : <div className="not_found"><h1>You are not Admin!</h1></div>


      }

    </div>
  );
}
