import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from './Product.module.scss';

export const Product = () => {
  const [product, setProduct] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/parser/${id}`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const { title, url, wish, rating, review, img, variants: _variants } =
    product || {};

  const variants = _variants && JSON.parse(_variants);

  return (
    <div>
      <img style={{ width: '200px', height: '200px' }} src={img} alt="" />
      <div>Url: {url}</div>
      <div>Название: {title}</div>
      <div>Желанное: {wish}</div>
      <div>Рейтинг: {rating}</div>
      <div>Отзывы: {review}</div>
      <div>
        Варианты:{' '}
        <ul className={s.list}>
          {variants &&
            variants.map(
              (
                {
                  price,
                  oldPrice,
                  discount,
                  shipping,
                  status,
                  firstVariable,
                  secondVariable,
                  whValue,
                },
                ind
              ) => (
                <li key={ind}>
                  <div>Склад: {whValue}</div>
                  <div>Опция1: {firstVariable}</div>
                  <div>Опция2: {secondVariable}</div>
                  <div>Цена: {price}</div>
                  <div>Цена без скидки: {oldPrice}</div>
                  <div>Скидка: {discount}</div>
                  <div>Доставка: {JSON.stringify(shipping)}</div>
                  <div>Статус: {status}</div>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
};
