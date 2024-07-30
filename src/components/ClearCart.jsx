import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ClearCart({ user, fetchCart }) {
  const deleteCart = (user) => {
    fetch("https://capstone2-eozr.onrender.com/b4/carts/clear-cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log("Response status: ", res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.message);

        if (data.message === "Cart cleared successfully") {
          Swal.fire({
            title: "Cart is now empty!",
            icon: "warning",
          });
          fetchCart();
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Something went wrong. Please try again. If the error persists, please consult with the Administrator.",
          });
          fetchCart();
        }
      });
  };

  return (
    <Button variant="danger" onClick={() => deleteCart(user)}>
      Clear Cart
    </Button>
  );
}
