import { useContext } from "react"
import CartContext from "../../store/CartContext"
import { formatter } from "../../util/formatting"
import Button from "./Button";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "./Modal";
import CartItem from "./CartItem";

export default function Cart(){
    let conButtton;
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((ItemPrice,item) =>{
        return ItemPrice + item.price * item.quantity;
    },0);

    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    function clearCart(){
        cartCtx.clearItem();
        userProgressCtx.hideCart();
    }

    function handleCheckOut(){
        userProgressCtx.showCheckOut();
    }

    if(cartCtx.items.length > 0)
    {
        conButtton =  <>
        <Button onClick={clearCart}>Empty Cart</Button> 
        <Button onClick={handleCheckOut}>Go to checkout</Button>
        </>
    }

    return <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart'? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
        {cartCtx.items.map((item) =>
            <CartItem 
            key={item.id} 
            quantity={item.quantity} 
            name={item.name} 
            price={item.price}
            onDecrease={()=>{cartCtx.removeItem(item)}}
            onIncrease={()=>{cartCtx.addItem(item)}}
            />
        )
        }
        </ul>
        <p className="cart-total">{formatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button onClick={handleCloseCart} textOnly>Close</Button>
            {conButtton}
        </p>
    </Modal>
}