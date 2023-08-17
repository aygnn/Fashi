import React, { Component,useState } from "react";
import "./Navbar2.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Container } from "react-bootstrap";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


/*class Navbar2 extends Component*/
// state={clicked :false};
// searchParams={}
// handleClick=()=>{
  //   this.setState({clicked:
  //     !this.state.clicked})
  //   }
  //   render() {
    export default function Navbar2() {
      const [searchParams, setSearchParams] = useSearchParams();
      
    function handleSubmit() {
    const Gender= searchParams.get('gender');
   
    console.log(searchParams);
  }

   return (
    <div className="navbar2">
      <div className="nav-item">
        <Container>
          <nav className="nav-menu mobile-menu">
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="checkbtn">
            <i style={{color:'white'}} id='bar' className= "fas fa-bars" ></i>

            </label>
            <ul id="navbar" /*className={this.state.clicked ? '#navbar active' : "#navbar"}*/>
              <li className="active">
              <Link to={'/'}>Home</Link>
              </li>
              <li>
                {/* <a href="./shop.html">Shop</a> */}
                <Link to={'Shop'}>Shop</Link>
              </li>
              <li>
                <a href="#">Collection</a>
                <ul className="dropdown">
                  <li>
                    <Link to={'/Shop?gender=man'} onClick={handleSubmit}  >Men's</Link>
                  </li>
                  <li>
                    <Link to={'/Shop?gender=woman'} onClick={handleSubmit} >Women's</Link>
                  </li>
                  <li>
                    <Link to={'/Shop?gender=kids'} onClick={handleSubmit} >Kid's</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to={'contact'}>Contact</Link>
              </li>
              <li>
                <a href="#">Pages</a>
                <ul className="dropdown">
                  <li>
                    <Link to={"viewBag"}>Shopping Cart</Link>
                  </li>
                  <li>
                    <Link to={'checkout'}>Checkout</Link>
                  </li>
                  <li>
                    <Link to={"register"}>Register</Link>
                  </li>
                  <li>
                  <Link to={'login'}>Login</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="mobile" /*onClick={this.handleClick}*/>
              <i id='bar'/* className={this.state.clicked ? "fas fa-times" : "fas fa-bars" }*/></i>
            


            </div>
          </nav>
        </Container>
      </div>
    </div>
  );
}
// }
