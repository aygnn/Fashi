import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Section3.scss";
import axios from "axios";
import { BsHeart } from "react-icons/bs";
import { BsBagDash } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Fade from 'react-reveal/Fade';
import { favitem, handleBasket } from "../../Config/BasketSlice";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: { 
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 391, min: 0 },
    items: 1,
  }
}
export default function Section3() {
  const [searchParams, setSearchParams] = useSearchParams();
      
  function handleSubmit() {
 searchParams.get('gender');
  }
  const [products, setProducts] = useState([]);
  const dispatch=useDispatch()
  const navigate=useNavigate()
const BASKET=useSelector(state=>state.basketitem.value)
const total=useSelector(state=>state.basketitem.total)
const FAV=useSelector(state=>state.basketitem.favstate)
console.log(FAV);

  const handleBuy=(item)=>{
    let user= JSON.parse( localStorage.getItem('user'))

    if(user===null){
      alert('You must login first!')
      navigate('/login')
      
    }
    else{
      dispatch(handleBasket(item))
    
    }


  }
  const handleFav=(item)=>{

    let userWish = JSON.parse( localStorage.getItem('user'))
      console.log(userWish);

      if(userWish===null){
        alert('You must login first!')
        navigate('/login')
        
      }
      else{
        dispatch(favitem(item))
      }

  }

const handleDetail=(id)=>{
  navigate(`/view/${id}`)

}


  const getProducts = () => {
    axios
      .get("https://fashi-git-master-aygnn.vercel.app/products")
      .then((res) => setProducts(res.data));
  };
  useEffect(() => {
    getProducts();
  }, []);


  
  return (
    <div className="section3">
     <ToastContainer />

      <Container>
        <Row>
        <Fade  left>
          <Col sm={3}>
            <Link  to={'/Shop?gender=woman'} onClick={handleSubmit} >
            <div className="woman">
              <h2>Women’s</h2>
              <Link to={'/Shop?gender=woman'} onClick={handleSubmit} >Discover More</Link>
            </div>
            </Link>
          </Col>

        </Fade>
          <Col sm={8}>
            <div className="filter-control">
              <ul>
                <li className="active">Women's Best Sellers</li>
             
              </ul>
            </div>

            <div className="carusel">
              <Carousel
                autoPlay={true}
                autoPlaySpeed={3000}
                infinite={true}
                responsive={responsive}
              >
                {products.map((item) => {
                  if (item.type === "coat" || item.type === "dress") {
                    return (
                      <div key={item._id}>
                        <div className="item">
                          <div className="pic">
                            <img src={item.image1} />
                            <div onClick={()=>{handleFav(item)}}  className="icon">
                              <BsHeart />
                            </div>
                            <ul>
                              <li onClick={()=>{handleBuy(item)}}   className="active">
                                <a>
                                <HiOutlineShoppingBag />
                                </a>
                              </li>
                              <li className="quick-view">
                                <a onClick={()=>handleDetail(item._id)}>+ Quick View</a>
                              </li>
                            </ul>
                          </div>

                          <div className="text">
                            <div className="catagory-name">{item.type}</div>
                            <a href="#">
                              <h5>{item.name}</h5>
                            </a>
                            <div className="product-price">${item.price}</div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
