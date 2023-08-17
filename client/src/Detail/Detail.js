import "./Detail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import { Col, Container, Row } from "react-bootstrap";
import { RxDividerVertical } from "react-icons/rx";
import { AiOutlineMinus } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favitem, handleBasket } from "../Config/BasketSlice";
import { ToastContainer, toast } from "react-toastify";

export default function Detail() {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [fav, setFav] = useState("favitem");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [style, setStyle] = useState("none");

  const getProducts = () => {
    axios
      .get("https://final-code-project-server.vercel.app/products")
      .then((res) => setProducts(res.data));
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleBuy = (item) => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      alert("You must login first!");
      navigate("/login");
    } else {
      dispatch(handleBasket(item));
    }
  };
  const handleDetail = (id) => {
    navigate(`/view/${id}`);
    window.location.reload();
  };
  const handleFav = (item) => {
    let userWish = JSON.parse(localStorage.getItem("user"));
    console.log(userWish);

    if (userWish === null) {
      alert("You must login first!");
      navigate("/login");
    } else {
      dispatch(favitem(item));
    }
  };

  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  let { proID } = useParams();
  useEffect(() => {
    axios
      .get(`https://final-code-project-server.vercel.app/products/${proID}`)
      .then((res) => setProduct(res.data));
  }, []);
  console.log(product.image);

  const mainImgRef = useRef();
  const miniRef = useRef();
  const handleImg = (img) => {
    setStyle("border-style");
    mainImgRef.current.src = img;
    // console.log(mainImgRef.current);

    console.log(miniRef.current);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };
  const handleChange3 = (panel) => (event, isExpanded) => {
    setExpanded3(isExpanded ? panel : false);
  };

  return (
    <div className="viewpage">
      <Helmet>
        <title>Detail Page</title>
      </Helmet>
      <ToastContainer />

      <div className="top">
        <Container>
          <div className="text">
            <Link to={"/"}>
              <FaHome /> Home
            </Link>
            <span>view</span>
          </div>
        </Container>
      </div>

      <div>
        <Container>
          <Row>
            <Col sm={8}>
              <div className="pics">
                <div className="mini-pic">
                  {product.image?.map((item) => (
                    <div
                      onClick={() => handleImg(item.img)}
                      key={item._id}
                      className={style}
                    >
                      <img ref={miniRef} src={item.img} />
                    </div>
                  ))}
                </div>
                <div className="main-pic">
                  <img
                    ref={mainImgRef}
                    src={product.image && product.image[0].img}
                  />
                </div>
              </div>
            </Col>

            <Col sm={4}>
              <div className="about">
                <div className="name">
                  <p>{product.name}</p>
                </div>
                <div className="price">
                  <span>${product.price}</span>
                </div>
                <div className="color">
                  <h2>colour:</h2>
                  <p>{product.color}</p>
                </div>
                <div className="main-size">
                  <div className="size">
                    <label>size</label>
                  </div>
                  <div className="size-select">
                    <select>
                      <option>Please Select</option>

                      <option>{product.size?.size1}</option>
                      <option>{product.size?.size2}</option>
                      <option>{product.size?.size3}</option>
                      <option>{product.size?.size4}</option>
                    </select>
                  </div>
                </div>
                <div className="add">
                  <div className="bag">
                    <button
                      onClick={() => {
                        handleBuy(product);
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                  <div className="fav">
                    <div
                      className="click"
                      onClick={() => {
                        handleFav(product);
                      }}
                    >
                      <div className={fav}></div>
                      {/* <AiOutlineHeart /> */}
                    </div>
                  </div>
                </div>

                <div className="show_hide">
                  <Accordion
                    className="detail1"
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      className="acordion"
                      expandIcon={<RxDividerVertical className="divider" />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <AiOutlineMinus className="minus" />

                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Product Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{product.product_details}</Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    className="detail1"
                    expanded={expanded2 === "panel1"}
                    onChange={handleChange2("panel1")}
                  >
                    <AccordionSummary
                      className="acordion"
                      expandIcon={<RxDividerVertical className="divider" />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <AiOutlineMinus className="minus" />

                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Size&Fit
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text">
                        Model's height: 173cm/5'8" Model is wearing: UK S/ EU S/
                        US XS
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    className="detail1"
                    expanded={expanded3 === "panel1"}
                    onChange={handleChange3("panel1")}
                  >
                    <AccordionSummary
                      className="acordion"
                      expandIcon={<RxDividerVertical className="divider" />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <AiOutlineMinus className="minus" />

                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        About Me
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text">{product.about}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="related-section">
        <Container>
          <div className="also_like">
            <div className="title">
              <h2>YOU MIGHT ALSO LIKE</h2>
            </div>

            <div className="related_products">
              {products.map((item) => {
                if (
                  item.type === product.type &&
                  item.gender === product.gender
                ) {
                  return (
                    <div className="main">
                      <div className="rel_product" key={item._id}>
                        <div className="rel_img">
                          <img
                            onClick={() => handleDetail(item._id)}
                            src={item.image1}
                          />
                        </div>
                        <div className="rel_datas">
                          <div className="price">${item.price}</div>
                          <div
                            onClick={() => handleDetail(item._id)}
                            className="name"
                          >
                            <h3>{item.name}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
