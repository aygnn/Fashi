import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./AllProduct.scss";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";

export default function AllProduct() {
    const [products,setProducts]=useState([])

    const getProducts=()=>{
        axios.get('https://final-code-project-server.vercel.app/products')
        .then(res=>setProducts(res.data))
    }
    useEffect(()=>{
        getProducts()
    
    },[])

    const handleDelete= async(id)=>{
        await axios.delete(`https://final-code-project-server.vercel.app/products/${id}`)
        getProducts()
        
    }
    const handleDetail=(id)=>{
        // navigate(`/detail/${id}`)
    
    }
  return (
    <div>
          <div className='kartlar'>
        {
            products.map((item)=>(
        <div className='kart' key={item._id}>
            <div className='kartimg'>
              <img src= {item.image1}/>
            </div>
        <div className='price'>
            <h3>{item.name}</h3>
           <div> <h4>{item.type}</h4>
            <p>${item.price}</p>
            </div>
            <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={()=>handleDelete(item._id)} >
        Delete
      </Button>
      {/* <Button variant="contained"  onClick={()=>handleDetail(item._id)}>
        Detail
      </Button> */}
                    </Stack>
           
        </div>
        </div>

            ))
        }
        

    </div>

    </div>
  )
}
