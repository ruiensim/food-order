import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/UI/Cart.jsx";
import CheckOut from "./components/UI/CheckOut.jsx";
import {CartContextProvider} from './store/CartContext.jsx';
import {UserProgressContextProvider} from './store/UserProgressContext.jsx'


function App() {
  return (
    <>
    <UserProgressContextProvider>
     <CartContextProvider>
     <Header/>
     <Meals/>
     <Cart/>
     <CheckOut/>
     </CartContextProvider>
     </UserProgressContextProvider>
    </>
  
  );
}

export default App;
