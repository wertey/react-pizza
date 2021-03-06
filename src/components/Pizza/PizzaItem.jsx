import React, { useState } from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import {ButtonTemplate} from "../index";
import {addPizzaToCart} from "../../redux/actions/cart";
import { useDispatch } from "react-redux";

const typeNames = ['тонкое', 'традиционное'];
const avaliableSizes = [26, 30, 40];

const PizzaItem = ({imageUrl, name, price, category, rating, types, sizes, id, addedPizza}) => {
    const dispatch = useDispatch();

    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);
    const onSelectType = (index) => {
        setActiveType(index);
    }
    const onSelectSize = (size) => {
        setActiveSize(size);
    }

    const addToCart = (id, imageUrl, name, price) => {
        const pizza = {
            id,
            name,
            imageUrl,
            price,
            size: avaliableSizes[activeSize],
            type: typeNames[activeType],
        }
        dispatch(addPizzaToCart(pizza))
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">
                { name }
            </h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        typeNames.map((item, index) => {
                            return (
                                <li
                                    key={item}
                                    className={
                                        classNames(
                                            {'active': activeType === index },
                                            {'disabled': !types.includes(index)}
                                        )
                                    }
                                    onClick={() => onSelectType(index)}
                                >{ item }</li>
                            )
                        })
                    }
                </ul>
                <ul>
                    {
                        avaliableSizes.map((size, index) => {
                            return (
                                <li
                                    key={size}
                                    className={
                                        classNames(
                                            {'active': activeSize === size },
                                            {'disabled': !sizes.includes(size)}
                                        )
                                    }
                                    onClick={() => onSelectSize(size)}
                                > { size } см.</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от { price } ₽</div>
                <ButtonTemplate
                    className="button--add"
                    outline
                    onClick={() => addToCart(id, imageUrl, name, price)}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {
                        addedPizza ? <i>
                            { addedPizza }
                        </i> : null
                    }
                </ButtonTemplate>
            </div>
        </div>
    )
}

PizzaItem.propTypes  = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.number),
    sizes: PropTypes.arrayOf(PropTypes.number),
    addToCart: PropTypes.func,
    addedPizza: PropTypes.number,
}

PizzaItem.defaultProps = {
    types: [],
    sizes: [],
    price: 0,
    name: '----',
}

export default PizzaItem;
