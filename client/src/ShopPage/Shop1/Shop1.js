import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Shop1.scss";
import { FaHome } from "react-icons/fa";
import { Link,useSearchParams,useLocation } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";
import { HiOutlineShoppingBag } from "react-icons/hi";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import round from "lodash.round";
import { favitem, handleBasket } from "../../Config/BasketSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import useQuery from "./useQuery";
import Search from "../../Navbar1/Search";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const state = {
  gender: ["woman", "man", "kids"],
  size: ["XS", "S", "M", "L"],
  color: ["BLACK", "WHITE", "BLUE", "GREY", "BROWN", "GREEN", "ECRU"],
  kind: ["sweatshirt", "jacket", "coat", "dress", "shoes", "PANTS", "TSHIRT"],
};


export default function Shop1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fav, setFav] = useState("favitem");
  const [visible, setVisible] = useState(9);
  const [checked, setChecked] = useState(true);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [type, setType] = useState([]);
  const [color, setColor] = useState([]);
  const [defaultt, setDefaultt] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = React.useState("");
  const [active, setActive] = useState(null)

  let [loading, setLoading] = useState(true);

  useEffect(()=>{
     setLoading(true)
     setTimeout(()=>{
      setLoading(false)
     },3000)
  },[])

  console.log(useLocation());
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');

  const startsFrom = latest ? 80 : 1;


  const query = useQuery();

  query.get("gender");
  useEffect(() => {
    if (query.get("gender")) {
      setGender([...gender, query.get("gender")]);
      state.gender.forEach((elem) => {
        if (query.get("gender") === elem) {
        }
      });
    } else {
      setGender([]);
    }
  }, []);

  const handleGender = (item) => {
    if (gender.find((x) => x === item)) {
      setGender(gender.filter((x) => x != item));
    } else {
      setGender([...gender, item]);
    }
setChecked(false)
if(checked===false){
  setChecked(true)
}
console.log(checked);
  };
  
  const handleGender2 = (item) => {
    if (gender.find((x) => x === item)) {
      setGender(gender.filter((x) => x != item));
    } else {
      setGender([...gender, item]);
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleBuy = (item) => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      alert("You must login first!");
      navigate("/login");
    } else {
      dispatch(handleBasket(item));
    }
  };
  const handleFav = (item) => {
    let userWish = JSON.parse(localStorage.getItem("user"));
     setActive(item)

    if (userWish === null) {
      alert("You must login first!");
      navigate("/login");
    } else {
      dispatch(favitem(item));
    }
  };

  const handleDetail = (id) => {

    navigate(`/view/${id}`);
  };

  const showMore = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  const getProducts = () => {
    axios.get("https://final-code-project-server.vercel.app/products").then((res) => {
      setProducts(res.data);
      setFilter(res.data);
      setDefaultt(res.data);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handlesorttolittle = () => {
    const filter1 = [...products].sort((a, b) => b.price - a.price);
    setFilter(filter1);
  };
  const handlesorttobig = () => {
    const filter1 = [...products].sort((a, b) => a.price - b.price);
    setFilter(filter1);
  };

  const handleDefault = () => {
    setFilter([...defaultt]);
  };

  const handleColor = (item) => {
    if (color.find((x) => x === item)) {
      setColor(color.filter((x) => x != item));
    } else {
      setColor([...color, item]);
    }
  };

  const handleType = (item) => {
    if (type.find((x) => x === item)) {
      setType(type.filter((x) => x != item));
    } else {
      setType([...type, item]);
    }
  };

  useEffect(() => {
    setFilter(
      products.filter(
        (x) =>
          (color.length > 0 ? color.find((y) => y == x.color) : x) &&
          (gender.length > 0 ? gender.find((y) => y == x.gender) : x) &&
          (type.length > 0 ? type.find((y) => y == x.type) : x)
      )
    );
  }, [color, type, gender, products]);


  return (
    <div className="shopping">
      <Helmet>
        <title>Shop Page</title>
      </Helmet>
      <ToastContainer />
      <div className="top">
        <Container>
          <div class="text">
            <Link to={"/"}>
              <FaHome /> Home
            </Link>
            <span>Shop</span>
          </div>
        </Container>
      </div>

      <div className="products-section">
        <Container>
          <Row>
            <Col sm={3}>
              <div className="filter">
                <h4>Categories</h4>
                <ul>
                  {state.gender.map((item) => {
                    // let cey = 1
                    if(query.get('gender')===item ){
                      return(
                      <li className="gender">
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          checked={checked}
                          
                          onChange={() => handleGender(item)}
                        />
                        <label class="cs-women" htmlFor="cs-women">
                          {item}
                        </label>
                      </Form>
                    </li>
                        
                        )
                    }
                    else{
                      return(
                      <li className="gender">
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          onChange={() => handleGender2(item)}
                        />
                        <label class="cs-women" htmlFor="cs-women">
                          {item}
                        </label>
                      </Form>
                    </li>

                      )
                    }
                    })}
                </ul>
              </div>

              <div class="filter">
                <h4>Color</h4>
                <div className="color-choose">
                  {state.color.map((item) => (
                    <div class="cs-item">
                      <Checkbox
                        {...label}
                        onChange={() => handleColor(item)}
                        type="checkbox"
                        id="cs-black"
                      />
                      <label class="cs-black" htmlFor="cs-black">
                        {item}
                      </label>
                      <div
                        className="circle"
                        style={{ backgroundColor: item }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              <div class="filter">
                <h4 class="fw-title">Type</h4>
                <div class="fw-size-choose">
                  {state.kind.map((item) => (
                    <div class="sc-item">
                      <Checkbox
                        {...label}
                        onChange={() => handleType(item)}
                        type="checkbox"
                        id="s-size"
                      />
                      <label for="s-size">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col sm={9}>
              {
                filter.length!==0?
              <div className="sorting">
                <div className="sort">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="price_sort">
                    <InputLabel id="demo-select-small">Sort</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={age}
                      label="Sort"
                      onChange={handleChange}
                    >
                      <MenuItem onClick={handlesorttobig} value={10}>
                        Priced From Low To High
                      </MenuItem>
                      <MenuItem onClick={handlesorttolittle} value={20}>
                        Priced From High To Low
                      </MenuItem>
                      <MenuItem onClick={handleDefault} value={30}>
                        Default
                      </MenuItem>
                      
                    </Select>
                  </FormControl>
             
            {/* <Search  postQuery={postQuery} latest={latest} setSearchParams={setSearchParams}/> */}
                </div>
            

              </div>
              : ''

              }

              <div className="products">
                { filter.length!==0? 
                 loading?
               
                 <PulseLoader className="spinner" color={"#e7ab3c"} loading={loading} size={150}/>:
                filter.filter(
                            item => item.type.includes(postQuery) >= startsFrom
                        )/*.filter.slice(0, visible)*/
                        .map((item) => (
                              <div className="geyim" key={item._id}>
                                <div className="item">
                                  <div className="pic">
                                    <img src={item.image1} />
                                    <div
                                      className="icon"
                                      onClick={() => {
                                        handleFav(item);
                                      }}
                                    >
                                      <div className={active===item  ? "favitem-active" : "favitem"} ></div>
                                    </div>
                                    <ul>
                                      <li
                                        onClick={() => {
                                          handleBuy(item);
                                        }}
                                        className="active"
                                      >
                                        <a>
                                          <HiOutlineShoppingBag />
                                        </a>
                                      </li>
                                      <li className="quick-view">
                                        <a onClick={() => handleDetail(item._id)}>
                                          + Quick View
                                        </a>
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
                            )
                            ):
                <div className="not_found"><h1>Not Found Product!</h1></div>
               
               

              
                }
              </div>

              
              {/* {
                filter.length!==0? 
              <button onClick={showMore} className="button-35">
                Load More
              </button> : ""
              } */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
