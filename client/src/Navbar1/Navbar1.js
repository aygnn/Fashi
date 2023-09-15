import React, { useEffect, useState } from 'react'
import './Navbar1.scss';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import Basket from '../Main Page/Basket/Basket';
import { Link,useSearchParams,useLocation } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../Config/BasketSlice'
import { toast } from 'react-toastify'
import Search from './Search';




export default function Navbar1() {
  const[display,setDisplay]=useState(false)
  const [wish,setWish] = useState([])
  const [user,setUser] = useState([])
  const active=JSON.parse(sessionStorage.getItem('userlogin'))
  const dispatch = useDispatch()
  const [basket,setWBasket] = useState([])
  const COUNT=useSelector(state=>state.basketitem.count)
  const FAV=useSelector(state=>state.basketitem.favcount)


  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');
  // const startsFrom = latest ? 80 : 1;


let userWish = JSON.parse( localStorage.getItem('user'))
  useEffect(()=>{
    setWish(userWish?.userwishlist.length)
    setUser(userWish?.username)
    setWBasket(userWish?.usercheckout)


},[])

const logoutHandler = () => {
  window.localStorage.removeItem("user")
    // sessionStorage.setItem('userlogin',JSON.stringify(false))
    window.location.reload()
  
      toast('You are logged out')
  }


  return (
    <div className='navbar1'>
      <div className='top-navbar'>
      <Container>
        <Row>
          <Col sm={2}>
            <div className="logo">
             <Link to={"/"}>
             <img src="https://preview.colorlib.com/theme/fashi/img/logo.png.webp" /></Link>
            
            </div>
          </Col>
          <Col sm={7}>
            {/* <div className="advanced-search">
              <div className="group">
                <input type="text" placeholder="What do you need?" />
                <button type="button">
                    <div>

                 <BsSearch/>
                    </div>
                </button>
              </div>
            </div> */}
            <Search  postQuery={postQuery} latest={latest} setSearchParams={setSearchParams}/>
          </Col>
          <Col sm={3}>
            <div className='icons'>
                <ul>
                    <li><Link to={'Saveditems'}><AiOutlineHeart/><sup className='fav'><span>{userWish? FAV  :0}</span></sup></Link></li>
                    <li onClick={()=>{setDisplay(!display)}}><BsBag/><sup className='basket'><span>{userWish? COUNT :0}</span></sup></li>
                    <li>
                      <div className='login-panel'><FaUserAlt/> {userWish ? (
                  
                    <Link className='user' >
                          <NavDropdown
                        id="nav-dropdown-dark-example"
                        title= {user}
                        menuVariant="dark"
                      >
                        <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>

                      </NavDropdown></Link>
                ) : (
                    <Link to={'login'}> Log In </Link>
                )}</div>
               
                    <div>
            </div></li>
         

                </ul>
            </div>
            <div className={ display ? 'basketactiveee' :'bag'} >
            <Basket/>

            </div>
          </Col>
        </Row>
      </Container>

      </div>
    </div>
  );
}
