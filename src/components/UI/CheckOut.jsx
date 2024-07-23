import { useContext } from "react";
import CartContext from "../../store/CartContext";
import { formatter } from "../../util/formatting"
import Input from "./Input";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "./Modal";
import Button from "./Button";
import useHttp from "../../hooks/useHttp";
import Error from "../Error";

const requestConfig = {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
};

export default function CheckOut(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    } = useHttp('orders',requestConfig);

    const cartTotal = cartCtx.items.reduce((ItemPrice,item) =>{
        return ItemPrice + item.price * item.quantity;
    },0);

    function handleClose(){
        userProgressCtx.hideCheckOut();
    }

    function handleFinish(){
        userProgressCtx.hideCheckOut();
        cartCtx.clearItem();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(JSON.stringify({
            order:{
                items: cartCtx.items,
                customer:customerData
            }
        }))
    }

    let action = 
    <> 
    <Button onClick={handleClose} textOnly type="button"> Close</Button>
    <Button>Submit Order</Button>
    </>

    if(isLoading)
    {
        action = <span>Sending order data...</span>
    }

    if(data && !error)
    {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order has submitted successfully</p>
            <p>We will get back to you with more detials via email within the next minute</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}> Okay</Button>
            </p>
        </Modal>
    }

    return <Modal open={userProgressCtx.progress === 'checkout'}>
        <form onSubmit={handleSubmit}> 
            <h2>CheckOut</h2>
            <p>Total Amout: {formatter.format(cartTotal)}</p>
            <Input label = "Full Name" type="text" id="name"/>
            <Input label = "E-Mail Address" type="email" id="email"/>
            <Input label = "Street" type="text" id="street"/>
            <div className="control-row">
            <Input label = "Post Code" type="text" id="postal-code"/>
            <Input label = "City" type="text" id="city"/>
            </div>
            {error && <Error title="Failed to submit order" message={error}/>}
            <p className="modal-actions"> 
               {action}
            </p>
        </form>
    </Modal>
}