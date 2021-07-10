import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import Colorful from '../components/colorful';
import Smellful from '../components/smellful';
import Varied from '../components/varied';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState('');
  const [smell, setSmell] = useState('');
  const [varied, setVaried] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    console.log(props.history);
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty + '&color=' + color.replace('#', '')  + '&smell=' + smell  + '&varied=' + varied );
  };

  const handleColor = (e) => {setColor(e.target.value)};
  const handleSmell = (e) => {setSmell(e.target.value)};
  const handleVaried = (e) => {setVaried(e.target.value)};

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  Стоимость: <b>₽{product.price}</b>
                </li>
                {product.isColorful ? <Colorful change={handleColor} value={color} /> : ''}
                {product.isSmellful ? <Smellful change={handleSmell} value={smell} /> : ''}
                {product.isVaried ? <Varied change={handleVaried} value={varied} /> : ''}
                <li>
                  Описание:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Стоимость: {product.price}</li>
                <li>
                  Статус:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Кол-во:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Добавить в корзину
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Отзывы</h2>
            {!product.reviews.length && <div>Отзывов пока нет</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Поделитесь своим мнением о мыле!</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Рейтинг</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Ужасно</option>
                          <option value="2">2- Плохо</option>
                          <option value="3">3- Хорошо</option>
                          <option value="4">4- Очень хорошо</option>
                          <option value="5">5- Блестяще</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Комментарий</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Отправить
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Пожалуйста, <Link to="/signin">авторизуйтесь</Link> для написания отзыва.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
