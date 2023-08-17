import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Viewbag.scss";
import { BiMinus } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {Helmet} from 'react-helmet'

import {
  decrementproduct,
  deleteitem,
  favitem,
  handleBasket,
} from "../Config/BasketSlice";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "../FavPage/CloseButton";

export default function Viewbag() {
  const [fav, setFav] = useState("save-fav");
  const [notifications, setNotifications] = useState([0]);

  const [active, setActive] = useState(null)


  const COUNT = useSelector((state) => state.basketitem.count);
  const TOTAL = useSelector((state) => state.basketitem.total);
  const HEART = useSelector((state) => state.basketitem.heart);

  const [basket, setBasket] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userBasket
  useEffect(() => {
     userBasket = JSON.parse(localStorage.getItem("user"));
    setBasket(userBasket ? userBasket.usercheckout : []);
  }, [COUNT]);

  const handleCheckout=()=>{
    if(basket.length===0){
      alert('You must add some product to basket!')
      navigate('/Shop')
      
    }
    else{
      navigate('/checkout')

    }

  }
  const handleDelete = (item) => {
    dispatch(deleteitem(item));
    console.log(item);
  };
  const handleDetail = (id) => {
    navigate(`/view/${id}`);
  };
  const handleFav = (item) => {
    dispatch(favitem(item));
    setActive(item)
    // basket.forEach(element => {
    //   if(item._id===element.dataa._id){
    //     setFav('save-active')
    //     console.log(element);
    //   }
      
      
    // });
  };
  const handleIncrement = (product) => {
    dispatch(handleBasket(product));
  };
  const handleDecrement = (product) => {
    dispatch(decrementproduct(product));
  };
  return (
    <div className="viewbag">
        <Helmet>
    <title>Basket Page</title>
      </Helmet>
      <ToastContainer />
      <Container>
        <Row>
          <Col sm={8}>
            <div className="bag-content">
              <h1>MY BAG</h1>
              <p>Items are reserved for 60 minutes</p>
            </div>

            <div className="content">
              {COUNT === 0 ? (
                <div className="fav-empty">
                  <div className="empty">
                    <img src="https://cdn-icons-png.flaticon.com/512/42/42901.png" />
                  </div>
                  <div className="text-empty">
                    <h2>Your Bag is Empty</h2>
                    <Link to={"/Shop"}>
                    <button className="button-6">Continue shopping </button>
                  </Link>
                  </div>
                </div>
              ) : (
                basket.map((item) => (
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={item.dataa._id}
                      positionTransition
                      initial={{ opacity: 0, y: 50, scale: 0.3 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                    >
                      <div className="bag-item" key={item.dataa._id}>
                        <div className="bag-left">
                          <img
                           src={
                              item.dataa.image1
                            }
                          />
                        </div>
                        <div className="bag-right">
                          <div className="price">
                            <span>${item.dataa.price}</span>
                          </div>
                          <div className="name">
                            <p onClick={() => handleDetail(item.dataa._id)}>
                              {item.dataa.name}
                            </p>
                          </div>
                          <div className="variable">
                            <span className="span1">{item.dataa.color}</span>
                            <span className="span2">
                              <select>
                                <option>{item.dataa.size?.size1}</option>
                                <option>{item.dataa.size?.size2}</option>
                                <option>{item.dataa.size?.size3}</option>
                                <option>{item.dataa.size?.size4}</option>
                              </select>
                            </span>

                            <span className="span3">
                              <button
                                onClick={() => handleDecrement(item.dataa)}
                              >
                                <BiMinus />
                              </button>
                              {item.count}
                              <button
                                onClick={() => handleIncrement(item.dataa)}
                              >
                                <AiOutlinePlus />
                              </button>
                            </span>
                          </div>
                          <div className="save">

                            
                            <button className={active===item.dataa  ? "save-active" : "save-fav"}
                               
                               onClick={() => {handleFav(item.dataa);
                              }}
                            >
                              Save for later
                            </button>
                          </div>
                        </div>

                        <div
                          onClick={() => handleDelete(item.dataa)}
                          className="bag-end"
                        >
                          {/* <button></button> */}
                          <CloseButton
                            close={() =>
                              setNotifications(
                                handleDelete(item.dataa, item.dataa._id)
                              )
                            }
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ))
              )}
            </div>

            <div className="bag-subtotal">
              <span className="bag-subtotal">Sub-total</span>
              <span className="bag-price">${TOTAL}</span>
            </div>
          </Col>
          <Col sm={4}>
            <div className="sub-total">
              <div className="main-total">
                <div className="title">
                  <h2>TOTAL</h2>
                </div>
                <div className="total">
                  <span className="total1">Sub-Total</span>
                  <span className="total2">${TOTAL}</span>
                </div>
                <div className="delivery">
                  <span>Delivery</span>
                  {/* <RiErrorWarningLine/> */}
                  <Link></Link>
                </div>
                <div className="check">
                  <p onClick={handleCheckout}>CheckOut</p>
                </div>
                <div className="accept">
                  <div className="we"> We Accept:</div>
                  <img src="https://assets.asosservices.com/asos-finance/images/marketing/single.png" />
                  <div className="code">
                    <p>Got a discount code? Add it in the next step.</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
