import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import SharedLayout from "./Pages/SharedLayout";
import Home from "./Pages";
import Products from "./Pages/products";
import SingleProduct from "./Pages/singleProduct";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartInfo } from "./component/state/CartState";
import { faveInfo } from "./component/state/FavoriteState";
import Cart from "./Pages/cart";
import Favorites from "./Pages/favorites";
import Flutter from "./component/Flutter";
import { TotalAmountState } from "./component/state/TotalAmountState";
import { FetchData } from "./libs/fetchers/getDatas";

function App() {
  const [cartItem, setCartItem] = useRecoilState(cartInfo);
  const [favorite, setFavorite] = useRecoilState(faveInfo);
  const [total, setTotal] = useRecoilState(TotalAmountState);
  const set = [...new Set(cartItem)];

  const { data, error, isLoading } = FetchData(
    "https://fakestoreapi.com/products"
  );

  const totalAmount = () => {
    const updatedCart = data
      ?.filter((pr) => set?.includes(pr.id))
      ?.map((cart) => {
        return {
          ...cart,
          // price:Number(cart.price),
          amount: cartItem.filter((carts) => carts === cart.id).length,
        };
      });
    // console.log(updatedCart);

    let  totalPrice = updatedCart?.reduce(
      (total, cart) => {
        const { price, amount } = cart;
        const priceSum = price * amount;

        total.totalPrice += priceSum;

        return total;
      },
      {
        totalPrice: 0,
      }
    );

    // console.log(totalPrice)
    setTotal(totalPrice?.totalPrice);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    setCartItem(cart);
    setFavorite(favorite);
  }, []);
  useEffect(() => {
    totalAmount();
  }, [cartItem]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route exact path="products" element={<Products />} />
        <Route path="products/:productId" element={<SingleProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favorites" element={<Favorites />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );

  // return <Flutter />;
  return <RouterProvider router={router} />;
}

export default App;
