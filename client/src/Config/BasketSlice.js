import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import round from "lodash.round";
// let sublength = String(Math.floor(subtotal)).length

let user = JSON.parse(localStorage.getItem("user"));
let counter = 0;
let subtotal = 0;
(user?.usercheckout || []).forEach((element) => {
  counter += element.count;
  subtotal += element.count * element.dataa?.price?.toFixed(2) ;
});

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  value: user?.usercheckout || [],
  count: counter,
 
  favstate: user?.userwishlist || [],
  favcount: user?.userwishlist.length || 0,
  total: subtotal /*.toPrecision((String(Math.floor(subtotal)).length)+2)*/,
};

const Basketslice = createSlice({
  name: "basketitem",
  initialState,
  reducers: {
    handleBasket: (state, actions) => {
      if (state.value.some((x) => x.dataa?._id === actions.payload._id)) {
        state.value.forEach((element) => {
          if (element.dataa?._id === actions.payload._id) {
            element.count = element.count + 1;
            state.count += 1;
            state.total = state.total + actions.payload.price;
          }
        });
      } else {
        state.value.push({ count: 1, dataa: actions.payload });
        state.total += actions.payload.price
        state.count += 1;
      }
      let userr = {
        username: user.username,
        password: user.password,
        posts: user.posts,
        userwishlist: state.favstate,
        usercheckout: state.value,
        basketCount: state.count,
        subtotal: state.total,
        _id: user._id,
      };
      localStorage.setItem("user", JSON.stringify(userr));
   axios.put(`https://fashi-virid.vercel.app/auth/${user._id}`, userr, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      toast.success(" Product added Basket!", {
        position: "top-right",
        autoClose: 2400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },

    deleteitem: (state, actions) => {
      state.value = state.value.filter(
        (x) => x.dataa?._id !== actions.payload._id
      );
      let user = JSON.parse(localStorage.getItem("user"));
      user.usercheckout?.forEach((element) => {
        if (element.dataa._id === actions.payload._id) {
          state.total = state.total - element.count * element.dataa.price;
        }
        let userr = {
          username: user.username,
          password: user.password,
          posts: user.posts,
          userwishlist: state.favstate,
          usercheckout: state.value,
          basketCount: state.count,
          subtotal: state.total,
          _id: user._id,
        };
        localStorage.setItem("user", JSON.stringify(userr));
      });

      state.count = state.value.length;
      console.log(actions.payload);
      const deleteitem = {
        username: user.username,
        password: user.password,
        posts: user.posts,
        userwishlist: state.favstate,
        usercheckout: state.value,
        basketCount: state.count,
        subtotal: state.total,
        _id: user._id,
      };
      localStorage.setItem("user", JSON.stringify(deleteitem));
    },

    favitem: (state, actions) => {
      if (state.favstate.some((x) => x.dataa?._id === actions.payload._id)) {
        toast.error(" Already added Favs!", {
          position: "top-right",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.favstate.push({ dataa: actions.payload });
        state.favcount = state.favcount + 1;
        
        const fav = {
          username: user.username,
          password: user.password,
          posts: user.posts,
          userwishlist: state.favstate,
          usercheckout: state.value,
          _id: user._id,
        };
        localStorage.setItem("user", JSON.stringify(fav));
        // axios.put(`http://localhost:6060/auth/${user._id}`, fav)
        toast.success(" Product added Favs!", {
          position: "top-right",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    deletefavitem: (state, actions) => {
      state.favstate = state.favstate.filter(
        (x) => x.dataa?._id !== actions.payload._id
      );
      state.favcount = state.favstate.length;

      const fav = {
        username: user.username,
        password: user.password,
        usercheckout: user.usercheckout,
        posts: user.posts,
        userwishlist: state.favstate,
        _id: user._id,
      };
      localStorage.setItem("user", JSON.stringify(fav));
      // axios.put(`http://localhost:6060/auth/${user._id}`, fav)

    },

    decrementproduct: (state, actions) => {
      state.value.forEach((element) => {
        if (element.dataa._id === actions.payload._id) {
          state.total = state.total - element.dataa.price;
          element.count = element.count - 1;
          if (element.count === 0) {
            state.value = state.value.filter(
              (x) => x.elem._id !== actions.payload._id
            );
          }

          let userr = {
            username: user.username,
            password: user.password,
            posts: user.posts,
            userwishlist: state.favstate,
            usercheckout: state.value,
            basketCount: state.count,
            subtotal: state.total,
            _id: user._id,
          };
          localStorage.setItem("user", JSON.stringify(userr));
        }
      });
      state.count -= 1;
    },
  },
});
export const {
  handleBasket,
  deleteitem,
  decrement,
  favitem,
  deletefavitem,
  decrementproduct,
} = Basketslice.actions;
export default Basketslice.reducer;
