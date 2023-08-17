// import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Section6.scss";
import { FaRegCalendarAlt ,FaRegComment} from 'react-icons/fa';
import { BsCreditCard2Back } from "react-icons/bs";
import Fade from 'react-reveal/Fade';
import { motion, AnimatePresence, spring } from "framer-motion";
import axios from "axios";
import { useState } from "react";


export default function Section6() {
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <div className="section6">

      <Container>
        <div className="section-title">
          <h2>From The Blog.</h2>
        </div>
        <Fade>
        <div className="blogs">
          <Row>
            <Col sm={4}>
              <motion.div 
              transition={{
                layout:{
                  duration:1,
                  // type:spring
                
                }
              }} 
              layout onClick={()=>setOpen(!open)} className="blog">
                <motion.img Layout="position"
                  src="https://preview.colorlib.com/theme/fashi/img/latest-1.jpg.webp"
                  alt=""
                />
                {open && (
                <motion.div className="latest-text">
                  <div className="tag-list">
                    <div className="tag-item">
                      <div className="icon">
                        <FaRegCalendarAlt />
                      </div>
                      May 4,2019
                    </div>
                    <div className="tag-item">
                      <div className="icon">
                        <FaRegComment />
                      </div>
                      5
                    </div>
                  </div>
                  <a >
                    <h4>The Best Street Style From London Fashion Week</h4>
                  </a>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat
                  </p>
                </motion.div>
                ) }
              </motion.div>
            </Col>

            <Col sm={4}>
              <motion.div 
              transition={{
                layout:{
                  duration:1,
                  type:spring
                
                }
              }} 
              layout onClick={()=>setOpen1(!open1)}className="blog">
                <motion.img Layout="position"
                  src="https://preview.colorlib.com/theme/fashi/img/latest-2.jpg.webp"
                  alt=""
                />
                {open1 && (
                <motion.div className="latest-text">
                  <div className="tag-list">
                    <div className="tag-item">
                      <div className="icon">
                        <FaRegCalendarAlt />
                      </div>
                      May 4,2019
                    </div>
                    <div className="tag-item">
                      <div className="icon">
                        <FaRegComment />
                      </div>
                      5
                    </div>
                  </div>
                  <a href="#">
                    <h4>Vogue's Ultimate Guide To Autumn/Winter 2019 Shoes</h4>
                  </a>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat
                  </p>
                </motion.div>
                )}
              </motion.div>
            </Col>

            <Col sm={4}>
              <motion.div 
              transition={{
                layout:{
                  duration:1,
                  type:spring
                
                }
              }} 
              layout onClick={()=>setOpen2(!open2)} className="blog">
                <motion.img Layout="position"
                  src="https://preview.colorlib.com/theme/fashi/img/latest-3.jpg.webp"
                  alt=""
                />
                 {open2 && (
                <motion.div className="latest-text">
                  <div className="tag-list">
                    <div className="tag-item">
                      <div className="icon">
                        <FaRegCalendarAlt />
                      </div>
                      May 4,2019
                    </div>
                    <div className="tag-item">
                      <div className="icon">
                        <FaRegComment />
                      </div>
                      5
                    </div>
                  </div>
                  <a href="#">
                    <h4>How To Brighten Your Wardrobe With A Dash Of Lime</h4>
                  </a>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat
                  </p>
                </motion.div>
                 )}
              </motion.div>
            </Col>
          </Row>
        </div>

        </Fade>

      

        <div className="deliveries">
          <Row>
            <Col sm={4}>
                <div className="delivery">

              <div className="icon-delivery">
             <img src="https://preview.colorlib.com/theme/fashi/img/icon-1.png.webp"/>
              </div>
              <div className="text-delivery">
                <h6>Free Shipping</h6>
                <p>For all order over 99$</p>
              </div>
                </div>
            </Col>

            <Col sm={4}>
            <div className="delivery">

<div className="icon-delivery">
<img src="https://preview.colorlib.com/theme/fashi/img/icon-2.png.webp"/>
</div>
<div className="text-delivery">
  <h6>DELIVERY ON TIME</h6>
  <p>If good have prolems

</p>
</div>
  </div>
            </Col>

            <Col sm={4}>
            <div className="delivery">

<div className="icon-delivery">
    <BsCreditCard2Back/>
{/* <img src="https://preview.colorlib.com/theme/fashi/img/icon-1.png.webp"/> */}
</div>
<div className="text-delivery">
  <h6>SECURE PAYMENT</h6>
  <p>100% secure payment</p>
</div>
  </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
