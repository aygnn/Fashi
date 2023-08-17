import React from "react";
import "./Section1.scss";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link} from "react-router-dom";


import "animate.css";

export default function Section1() {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <div className="karusel1">
            <Container>
              <Row>
                <Col sm={5}>
                  <span>Bag,Kids</span>
                  <h1 className=" animate__animated animate__slideInUp animate__delay-0.9s ">
                    Black friday
                  </h1>
                  <p className=" animate__animated animate__slideInUp animate__delay-0.9s ">
                    Find The Best Product from Our Shop
                  </p>
                  <Link 
                    className=" shopnow animate__animated animate__slideInUp animate__delay-0.9s "
                   to={'shop'}
                  >
                    Shop Now
                  </Link>
                </Col>
              </Row>
              <div className="sale animate__animated animate__zoomIn animate__delay-0.9s">
                {" "}
                <h2>Sale</h2> <span>50%</span>
              </div>
            </Container>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="karusel2">
            <Container>
              <Row>
                <Col sm={5}>
                  <span>Bag,Kids</span>
                  <h1 className=" animate__animated animate__slideInUp animate__delay-0.9s ">
                    Black friday
                  </h1>
                  <p className=" animate__animated animate__slideInUp animate__delay-0.9s ">
                    Find The Best Product from Our Shop
                  </p>
                  <Link
                    className=" shopnow animate__animated animate__slideInUp animate__delay-0.9s "
                   to={'shop'}
                  >
                    Shop Now
                  </Link>
                </Col>
              </Row>
              <div className="sale animate__animated animate__zoomIn animate__delay-0.9s">
                {" "}
                <h2>Sale</h2> <span>50%</span>
              </div>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
