import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Basket.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteitem } from "../../Config/BasketSlice";


export default function Basket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [basket, setBasket] = useState([]);
  const COUNT = useSelector((state) => state.basketitem.count);
  const TOTAL = useSelector((state) => state.basketitem.total);
  let userBasket
  useEffect(() => {
  userBasket = JSON.parse(localStorage.getItem("user"));
    setBasket(userBasket ? userBasket.usercheckout : []);
  }, [COUNT,TOTAL]);
  // console.log(userBasket);
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
  };
  const handleDetail = (id) => {
    navigate(`/view/${id}`);
  };
  

  return (
    <div className="bags">
      <div className="basket">
        <div className="top">
          <h4>My Bag,</h4>
          <p>{COUNT} items</p>
        </div>
        {COUNT === 0 ? (
          <div className="fav-empty">
            <div className="empty">
              <img src="https://cdn-icons-png.flaticon.com/512/42/42901.png" />
            </div>
            <div className="text-empty">
              <h2>Your Bag is Empty</h2>
            </div>
          </div>
        ) : (
          (basket || []).map((item) => (
            <div className="main" key={item.dataa?._id}>
              <div className="cardd">
                <div className="imagee">
                  <img src={item.dataa?.image1} />
                </div>
                <div className="abouts">
                  <div className="price">
                    <p>${item.dataa?.price} </p>
                  </div>
                  <div className="name">
                    <p onClick={() => handleDetail(item.dataa?._id)}>
                      {item.dataa?.name}
                    </p>
                  </div>
                  <div className="variable">
                    <div className="color">
                      <p>{item.dataa?.color}</p>
                    </div>
                    <div className="size">
                      <p>{item.dataa?.size.size1}</p>
                    </div>
                    <div className="count">
                      <p>Qty:{item.count}</p>
                    </div>
                  </div>
                  <div
                    onClick={() => handleDelete(item.dataa)}
                    className="delete"
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="sub-total">
        <div className="text">
          <p>Sub-total</p>
        </div>
        <div className="total">
          <p>{TOTAL}$</p>
        </div>
      </div>
      <div className="view_checkout">
        <div className="view">
          <Link to={"viewBag"}>
            <span>View Bag </span>
          </Link>
        </div>
        <div className="checkout">
          <p onClick={handleCheckout}>
            <span>Checkout</span>
          </p>
        </div>
      </div>
    </div>
  );
}
