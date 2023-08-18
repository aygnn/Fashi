
import "./Users.scss";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Users() {
  const[users,setUsers]=useState([])

const getUsers=()=>{
  axios.get('https://fashi-git-master-aygnn.vercel.app/auth')
  .then(res=>setUsers(res.data))

}
useEffect(()=>{
  getUsers()
},[])
console.log(users);
  return (
    <div>
      {
        users.map((item)=>{
         <Card sx={{ maxWidth: 345 }} key={item._id}>
     
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         USERNAME: {item.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          PASSWORD:{item.password}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          EMAIL:{item.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

        })
      }
    </div>
  )
}
