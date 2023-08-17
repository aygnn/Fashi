import React from 'react'
import { Col, Row } from 'react-bootstrap';
import "./Footer1.scss";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Footer1() {
  return (
    <div className='footer1'>
        <Row>
        <Carousel
  additionalTransfrom={2}
//   arrows
  autoPlay
  autoPlaySpeed={1000}
  centerMode={false}
  className="heyyo"
  containerClass="container-with-dots"
  dotListClass=""
//   draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
//   minimumTouchDrag={80}
//   pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
//   showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
>


        <Col sm={2}>
            <img src='https://preview.colorlib.com/theme/fashi/img/logo-carousel/logo-1.png.webp '/>
        </Col >
        <Col  sm={2}>
            <img src='https://preview.colorlib.com/theme/fashi/img/logo-carousel/logo-2.png.webp'/>
        </Col>
        <Col sm={2}>
            <img src='https://preview.colorlib.com/theme/fashi/img/logo-carousel/logo-3.png.webp'/>

        </Col>
        <Col sm={2}>
            <img src='https://preview.colorlib.com/theme/fashi/img/logo-carousel/logo-4.png.webp'/>
        </Col>
        <Col sm={2}>
            <a href='https://www.armani.com/countries/index'>

            <img  src='https://preview.colorlib.com/theme/fashi/img/logo-carousel/logo-5.png.webp' />
            </a>

        </Col>
        </Carousel>
        </Row>
    </div>
  )
}
