import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "../../components/UI/products/ProductCard"
import { products } from '../../data/Products';
import { createSelector } from 'reselect';
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/common/CommonSection"
import { clearFavorites } from '../../redux/slices/favsSlice';
import { FaHeart } from "react-icons/fa"
import "./favoritos.css"

const getFavorites = (state) => state.favs.favorites ?? [];

const getProducts = (state) => products;

const getFavoriteProducts = createSelector(
    [getFavorites, getProducts],
    (favorites, products) =>
        products.filter((product) => favorites.includes(product.id))
);

const Favoritos = () => {

    const dispatch = useDispatch();

    const handleClearFavorites = () => {
        const confirmed = window.confirm('¿Seguro deseas eliminar todos los Favoritos?');
        if (confirmed) {
            dispatch(clearFavorites());
        }
    };

    const favoriteProducts = useSelector(getFavoriteProducts);
    const isButtonDisabled = favoriteProducts.length === 0;

    return (
        <Helmet title="Favoritos">
            <CommonSection title="Favoritos" />
            <section className='favoritos__section'>
                <div className='favoritos__container'>
                    {favoriteProducts.length === 0 ? (
                        <p className='favs-p'>Aún no hay productos agregados a favoritos</p>
                    ) : (
                        favoriteProducts.map((product) => (
                            <ProductCard {...product} key={product.id} />
                        ))
                    )}
                </div>
                <button onClick={handleClearFavorites} className='fav__btn' disabled={isButtonDisabled}>Borrar todos los Favoritos <FaHeart className='fav__btn-icon' /></button>
            </section>
        </Helmet>
    );
}

export default Favoritos;