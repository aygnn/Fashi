import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Section2.scss';
import { useSearchParams } from "react-router-dom";


export default function Section2() {
  const [searchParams, setSearchParams] = useSearchParams();
      
  function handleSubmit() {
 searchParams.get('gender');
 
}
  return (
    <div className="section2">
  
        <Row>
          <Col sm={4}>
          <Link to={'/Shop?gender=man'} onClick={handleSubmit}>
            <div className="card1">
              <img src="https://preview.colorlib.com/theme/fashi/img/banner-1.jpg.webp" />
              <div className='text'><h4>Men's</h4></div>
            </div>

          </Link>
          </Col>
          <Col sm={4}>
            <Link to={'/Shop?gender=woman'} onClick={handleSubmit}>
            
            <div className="card1">
              <img src="https://preview.colorlib.com/theme/fashi/img/banner-2.jpg.webp" />
              <div  className='text'> <h4>Women's</h4></div>
              </div>
              </Link>
          </Col>

          <Col sm={4}>
            <Link to={'/Shop?gender=kids'} onClick={handleSubmit}>
            <div className="card1">
              <img src="https://preview.colorlib.com/theme/fashi/img/banner-3.jpg.webp" />
              <div  className='text'><h4>Kid's</h4></div>
              </div>
            </Link>
          </Col>
        </Row>
   
    </div>
  );
}
