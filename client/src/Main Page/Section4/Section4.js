import React, {  useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Section4.scss";
import { BsHeart } from "react-icons/bs";
import { BsBagDash } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Fade from 'react-reveal/Fade';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";




import { favitem, handleBasket } from "../../Config/BasketSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function Section4() {
  const [searchParams, setSearchParams] = useSearchParams();
      
  function handleSubmit() {
 searchParams.get('gender');
  }
    const [products, setProducts] = useState([]);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    

    const handleBuy=(item)=>{
      let user= JSON.parse( localStorage.getItem('user'))
      // console.log(user);
  
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
      .get("https://final-code-project-server.vercel.app/products")
      .then((res) => setProducts(res.data));
  };
  useEffect(() => {
    getProducts();
  }, []);
  const responsive = {
    superLargeDesktop: {
     
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
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
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="section4">
      <Container>
        <Row>
          <Col sm={8}>
            <div className="filter-control">
            <ul>
                <li className="active">Men's Best Sellers</li>
             
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
                  if (item.gender === "man" ) {
                    return (
                      <div key={item._id}>
                        <div className="item">
                          <div className="pic">
                            <img src={item.image1} />
                            <div  onClick={()=>{handleFav(item)}}  className="icon">
                              <BsHeart />
                            </div>
                            <ul>
                              <li className="active">
                                <a onClick={()=>{handleBuy(item)}}  >
                                <HiOutlineShoppingBag />
                                </a>
                              </li>
                              <li onClick={()=>handleDetail(item._id)} className="quick-view">
                                <a>+ Quick View</a>
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
          <Fade  right>

          <Col sm={3}>
            <Link to={'/Shop?gender=man'} onClick={handleSubmit}>
            <div  className="woman">
              <h2>Men’s</h2>
              <Link to={'/Shop?gender=man'} onClick={handleSubmit} >Discover More</Link>
            </div>
            </Link>
          </Col>
          </Fade>
        </Row>
      </Container>
    </div>
  );
}
