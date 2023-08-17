import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletefavitem, handleBasket } from "../Config/BasketSlice";
import "./Favpage.scss";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "./CloseButton";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Favpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([0]);

  const [deletee, setDeletee] = useState();
  const [wish, setWish] = useState([]);
  const FAV = useSelector((state) => state.basketitem.favstate);
  const Favcount = useSelector((state) => state.basketitem.favcount);
  useEffect(() => {
    let userWish = JSON.parse(localStorage.getItem("user"));
    setWish(userWish?.userwishlist);
  }, [Favcount]);

  const handleBuy = (item) => {
    dispatch(handleBasket(item));
  };
  const handleDetail = (id) => {
    navigate(`/view/${id}`);
  };
  const handleDelete = (item) => {
    dispatch(deletefavitem(item));
  };
  return (
    <div className="Favpage">
      <Helmet>
        <title>Saved Page</title>
      </Helmet>
      <ToastContainer />
      <div className="title">
        <p>Saved Items</p>
      </div>
      <div className="products">
        <Container>
          <div className="items">{Favcount} Items </div>

          <div className="fav_products">
            {Favcount === 0 ? (
              <div className="fav-empty">
                <div className="empty">
                  <img src="https://cdn-icons-png.flaticon.com/512/42/42901.png" />
                </div>
                <div className="text-empty">
                  <h2>You have no Saved Items</h2>
                  <p>
                    Sign in to sync your Saved Items across all your devices.
                  </p>

                  <Link to={"/Shop"}>
                    <button className="button-6">Continue shopping </button>
                  </Link>
                </div>
              </div>
            ) : (
              (wish || []).map((item) => (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={item.dataa._id}
                    positionTransition
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                  >
                    <div className="fav_pro" key={item.dataa._id}>
                      <div className="fav_img">
                        <img className="picture" src={item.dataa.image1} />
                        <CloseButton
                          close={() =>
                            setNotifications(
                              handleDelete(item.dataa, item.dataa._id)
                            )
                          }
                        />
                      </div>
                      <div className="fav_name">
                        <p onClick={() => handleDetail(item.dataa._id)}>
                          {item.dataa.name}
                        </p>
                      </div>
                      <div className="fav_price">
                        <span>${item.dataa.price}</span>
                      </div>
                      <div className="fav_color">
                        <p>{item.dataa.color}</p>
                      </div>
                      <div className="size-select">
                        <select>
                          <option>Select size</option>

                          <option>{item.dataa.size?.size1}</option>
                          <option>{item.dataa.size?.size2}</option>
                          <option>{item.dataa.size?.size3}</option>
                          <option>{item.dataa.size?.size4}</option>
                        </select>
                      </div>
                      <div className="move_bag">
                        <button
                          onClick={() => {
                            handleBuy(item.dataa);
                          }}
                        >
                          Move to Bag
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
