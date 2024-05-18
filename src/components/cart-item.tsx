import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
// import { server } from "../redux/store";
// import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: any; //CartItem;
  // incrementHandler: (cartItem: CartItem) => void;
  // decrementHandler: (cartItem: CartItem) => void;
  // removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  // incrementHandler,
  // decrementHandler,
  // removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="cart-item">
        <img src={photo} alt={name}  />  {/*src={`${server}/${photo}`} alt={name} */}
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button >-</button>  {/* onClick={() => decrementHandler(cartItem)} */}
        <p>{quantity}</p>
         <button >+</button> {/*onClick={() => incrementHandler(cartItem)} */}
      </div>

     <button > {/* onClick={() => removeHandler(productId)} */}
        <FaTrash />
      </button>
      Card Item
    </div>
  );
};

export default CartItem;
