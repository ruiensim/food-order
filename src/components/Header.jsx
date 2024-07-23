import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    const totalCartItems = cartCtx.items.reduce((totalItem,item)=>{
        return totalItem + item.quantity;
    },0);
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="foodlogo"/>
            <h1>Food Order Website</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
        </nav>
    </header>
}