import { Button, Table } from 'react-bootstrap';
import { useState, useEffect } from "react";
import RemoveCartItem from './RemoveCartItem';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


export default function CartTable({cartProp, fetchCart}) {
	console.log(cartProp);

	const [ { cartItems:[{productId, name, price, quantity, subtotal}] } ] = cartProp
	const [qty, setQty] = useState(`${quantity}`);
	const [isFunctional, setIsFunctional] = useState(false);

	const plus = () => {
	    if (qty < 10) {
	      setQty(prevValue => prevValue + 1);
	    } else {
	      Swal.fire({
	        title: "Oops!",
	        icon: "warning",
	        text: "Alert: Maximum of 10pcs per product only."
	      })
	     setQty(quantity);
	    }
  	};

  	const minus = () => {
    	setQty(prevValue => Math.max(prevValue - 1, 1)); // Prevent negative values
  	};


  	const changedQty = (event) => {
	    const newQty = parseInt(event.target.value, 10);
	    if (!isNaN(newQty) && newQty >= 0) {
	      setQty(newQty);
	    }
  	};


  	function updateCartQuantity(productId){
	    fetch("http://ec2-13-59-17-101.us-east-2.compute.amazonaws.com/b4/carts/update-cart-quantity", {
	      method: "PATCH",
	      headers: {
	        "Content-Type": "application/json",
	        Authorization: `Bearer ${localStorage.getItem("token")}`
	      },
	      body: JSON.stringify({
	        productId: productId,
	        quantity: qty
	      })
	    })
	    .then(res => res.json())
	    .then(data => {
	    // 	console.log(data);
	      // console.log(data.message);

	      if(data.message === 'Item quantity updated successfully'){

	        Swal.fire({
	          title: "Item quantity updated successfully!",
	          icon: "success",
	          text: `Updated quantity in cart: ${qty}`
	        });
	        fetchCart()

	      }else {

	        Swal.fire({
	          title: "Error",
	          icon: "error",
	          text: "Something went wrong. Please try again. If the error persists, please consult with the Administrator."
	        });
	        fetchCart()

	      }
	    })
  	}

  	useEffect(() => {
	    if (
	      qty !== quantity &&
	      qty !== 0 &&
	      qty <= 10
	    ) {
	      setIsFunctional(true);
	    } else {
	      setIsFunctional(false);
	    }
  	}, [qty]);


	return (
		<>
			<h1 className="text-center my-4">Your Shopping Cart</h1>
	            
	            <Table striped bordered hover responsive>
	                <thead>
	                    <tr className="text-center">
	                        <th>Name</th>
	                        <th>Price</th>
	                        <th>Quantity</th>
	                        <th>Edit</th>
	                        <th>Subtotal</th>
	                        <th>Delete</th>
	                    </tr>
	                </thead>
	                <tbody>
	            
	                		
		               		<tr key={productId}>
		               			<td><Link to={`/products/${productId}`}>{name}</Link></td>
			                    <td className="text-center">₱{price}</td>
			                    <td>
			                    	<div className="plus-minus d-flex justify-content-center my-1">
                						<Button onClick={minus} className="btn btn-dark">-</Button>
                  						<input type="number" value={qty} onChange={changedQty} className="form-control" style={{ width: '4rem', textAlign:'center' }}/>
                						<Button onClick={plus} className="btn btn-dark">+</Button>
                						
              						</div>

              					</td>
              					<td>
              						{ isFunctional ? (
	              							<div className="d-flex justify-content-center">
							                    <Button variant="primary" onClick={() => updateCartQuantity(productId)}>
							                      Save
							                    </Button>
							                </div>
						                ) : (
							                <div className="d-flex justify-content-center">
							                    <Button variant="danger" disabled>
							                      Save
							                    </Button>
						                	</div>
						                )} 


              					</td>
			                    <td className="text-center">₱{subtotal}</td>
			                    <td>
			                    	<RemoveCartItem itemId={productId} fetchCart={fetchCart} />
			                    </td>
	                		</tr>
	                </tbody>
	            </Table>
        </>
	);
}
