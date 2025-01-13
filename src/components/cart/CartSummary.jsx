import { useRecoilValue } from "recoil";
import {
  cartItemCounterSelector,
  cartTotalSelector,
} from "../../selectors/cartSelector";

function CartSummary() {
  const total = useRecoilValue(cartTotalSelector);
  const count = useRecoilValue(cartItemCounterSelector);
  return (
    <div>
      <p>총 삼품 수 : {count}</p>
      <p>
        총 금액 : {total} <b>dollar?!</b>
      </p>
    </div>
  );
}
export default CartSummary;
