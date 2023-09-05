import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import round from "lodash.round";
// let sublength = String(Math.floor(subtotal)).length

let counter = 0;
let subtotal = 0;
let user = JSON.parse(localStorage.getItem("user"));
if (user?.usercheckout?.length === 0) {
  user.subtotal = 0;
  user.basketCount = 0;
  counter = 0;
  subtotal = 0;
  localStorage.setItem("user", JSON.stringify(user));
} else {
  (user?.usercheckout || []).forEach((element) => {
    user.basketCount += element.count;
    counter += element.count;
    user.subtotal += element.count * element.dataa?.price;
    subtotal += element.count * element.dataa?.price;
    // console.log('element.count:', element.count);
    // console.log('element.dataa?.price:', element.dataa?.price);
  });
  console.log(counter, subtotal);
}

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  value: user?.usercheckout || [],
  count: counter || 0,
  total: subtotal || 0,
  favstate: user?.userwishlist || [],
  favcount: user?.userwishlist.length || 0,
};

const Basketslice = createSlice({
  name: "basketitem",
  initialState,
  reducers: {
    handleBasket: (state, actions) => {
      if (state.value.some((x) => x.dataa?._id === actions.payload?._id)) {
        state.value.forEach((element) => {
          if (element.dataa?._id === actions.payload._id) {
            element.count += 1;
            state.count += 1;
            state.total = state.total + actions.payload.price;
            console.log(state.value);
          }
        });
      } else {
        state.value.push({ count: 1, dataa: actions.payload });
        state.total += actions.payload.price;
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
          "Content-Type": "application/json",
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
      let user = JSON.parse(localStorage.getItem("user"));
      state.value = state.value.filter(
        (x) => x.dataa?._id !== actions.payload?._id
      );
      state.count = state.value.length;
      // user.usercheckout?.forEach((element) => {
      //   if (element.dataa?._id === actions.payload?._id) {
      //     state.total = state.total - element.count * element.dataa?.price;
      //     // console.log(state.total);
      //   }

      //   let userr = {
      //     username: user.username,
      //     password: user.password,
      //     posts: user.posts,
      //     userwishlist: state.favstate,
      //     usercheckout: state.value,
      //     basketCount: state.count,
      //     subtotal: state.total,
      //     _id: user._id,
      //   };
      //   localStorage.setItem("user", JSON.stringify(userr));

      // });

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
      axios.put(`https://fashi-virid.vercel.app/auth/${user._id}`, deleteitem, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
