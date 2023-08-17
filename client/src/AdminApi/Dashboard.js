import React from 'react'
import "./Dashboard.scss";
import {Helmet} from 'react-helmet'
import { Link, Outlet } from "react-router-dom";
import AddPage from "./AddPage";
import { FiUsers } from 'react-icons/fi';

export default function Dashboard() {
  let user=JSON.parse(localStorage.getItem('user')) 

  return (
    <div>
             
             <Helmet>
    <title>Admin Page</title>
      </Helmet>
         {
    user && user?.isAdmin===true?
         <div className="navbar">
        <h4>Admin Dashboard</h4>
        <div>         
          <Link className='view_users' to={'users'}><h5>View Users <FiUsers/></h5></Link>
        </div>
      </div>
   
   : <div className="not_found"><h1>You are not Admin!</h1></div>
   
   
}
<Outlet/>
    </div>
  )
}
