import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
  
  const productId = props.match.params.id;
  const qItems = cartItems.reduce((a, c) => a + c.qty, 0); 
  const queryInfo = props.location.search ? props.location.search.split("&") : ['qty=1','color=white','smell=none','varied=square'];
  console.log(props.location.search,queryInfo);
  const qty = Number(queryInfo[0].split('=')[1]);
  const color = queryInfo[1].split('=')[1];
  const smell = queryInfo[2].split('=')[1];
  const varied = queryInfo[3].split('=')[1];
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, color, smell, varied));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  const itemsGramCheck = (x) => {
    if (x%10 == 1) {
      return 'товар ';
    } else if (x%10 < 5 && x%10 != 1 && x%10 != 0) {
      return 'товара ';
    } else {
      return 'товаров ';
    }
  }

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Корзина
          </h3>
          <div>
            Цена
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Корзина пуста
          </div>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Кол-во:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, parseInt(e.target.value)))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Удалить
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                ₽{item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
        Итого: {qItems} {itemsGramCheck(qItems)} 
        за
        ₽{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Оформление заказа
      </button>

    </div>

  </div>

}

export default CartScreen;