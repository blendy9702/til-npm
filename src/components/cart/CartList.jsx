import { useRecoilValue } from "recoil";
import { cartAtom } from "../../atoms/cartAtoms";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { MdShoppingCart } from "react-icons/md";

function CartList() {
  const cart = useRecoilValue(cartAtom);
  return (
    <div>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        장바구니 <MdShoppingCart />
      </h1>
      <div>
        {cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}
export default CartList;
