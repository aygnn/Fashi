import React from 'react'
import "./Section5.scss";
import Reveal from 'react-reveal/Reveal';
import { BsInstagram } from 'react-icons/bs';

export default function Section5() {
  return (
    <div className="section5">
     <div className="section-title">
          <h2>Our Popular Customers</h2>
        </div>

    

      <Reveal className="celebrity" effect="fadeInUp">

      <div className="customers">
        <div className="customer img1">
          <img src="https://i.pinimg.com/736x/9f/62/cc/9f62cc315a644c5c54ffdbc4c2a1dbac.jpg" />
          <div class="inside-text">
            <BsInstagram/>
            <h5>
              <a href="https://www.instagram.com/kendalljenner/?hl=en">kendalljenner</a>
            </h5>
          </div>
        </div>


        <div className="customer img1">
          <img src="https://i.pinimg.com/750x/31/c4/d1/31c4d14c8309f485a70f68f03f830228.jpg" />
          <div class="inside-text main">
            <BsInstagram/>
            <h5>
              <a href="https://www.instagram.com/bellahadid/?hl=en">hadidbella</a>
            </h5>
          </div>
        </div>

        <div className="customer">
          <img src="  https://i.pinimg.com/564x/ab/4f/f5/ab4ff5e6e272a36273402990aecf185d.jpg" />
          <div class="inside-text main">
            <BsInstagram/>
            <h5>
              <a href="https://www.instagram.com/kyliejenner/?hl=en">kyliejenner</a>
            </h5>
          </div>
        </div>

        <div className="customer img1">
          <img src="https://i.pinimg.com/564x/8f/1c/2d/8f1c2d99ffc2693b5a549de2801a392e.jpg" />
          <div class="inside-text main">
            <BsInstagram/>
            <h5>
              <a href="https://www.instagram.com/gigihadid/?hl=en">gigihadid</a>
            </h5>
          </div>
        </div>

        <div className="customer">
          <img src="https://i.pinimg.com/564x/57/8d/0e/578d0ef3b3a0ad856fcbbdd107b809ef.jpg" />
          <div class="inside-text">
            <BsInstagram/>
            <h5>
              <a href="https://www.instagram.com/selenagomez/">selenagomez</a>
            </h5>
          </div>
        </div>

        <div className="customer">
          <img src="https://i.pinimg.com/564x/a1/67/67/a16767cee7964a58eeda37bfc6c42098.jpg" />
          <div class="inside-text">
            <BsInstagram/>
            <h5>
              <a href="https://www.instagram.com/realbarbarapalvin/?hl=en">realbarbarapalvin</a>
            </h5>
          </div>
        </div>
        
      </div>
      </Reveal>
   
    </div>
  );
}
