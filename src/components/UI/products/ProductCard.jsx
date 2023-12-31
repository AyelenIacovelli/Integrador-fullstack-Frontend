import React from 'react'
import { motion } from "framer-motion"
import "../products/productCard.css"
import { FaPlus } from "react-icons/fa"
import { AiTwotoneFire } from "react-icons/ai"
import "../../../data/Products"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from '../../../redux/slices/favsSlice'
import { FaHeart } from "react-icons/fa"
import { addToCart } from '../../../redux/slices/cartSlice'
import Button from "../../UI/Button/Button"

const ProductCard = ({ id, title, img, price, pricesale, category, desc }) => {

    const navigateToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const dispatch = useDispatch()

    const favorites = useSelector((state) => state.favs.favorites);
    const isFavorite = favorites.includes(id);

    const isPriceSale = pricesale !== undefined; // Comprueba si 'pricesale' está definido

    const showOfferFire = isPriceSale ? 'show' : '';

    const handleIconClick = () => {
        dispatch(toggleFavorite(id)); // Invierte el estado de favoritos individual al hacer clic
        if (!isFavorite) {
            toast.success('El producto se agregó correctamente a favoritos');
        } else {
            toast.success('El producto se quitó correctamente de favoritos');
        }
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ id, title, img, price, pricesale, category, desc }));
        toast.success('Se agregó correctamente el producto al carrito');
    }

    return (
        <div className={`product__item ${isFavorite ? 'favorite' : ''}`}>
            <div className='product__img' onClick={navigateToTop}>
                {isPriceSale && <span className={`offer-fire ${showOfferFire}`}><AiTwotoneFire /></span>}
                <Link to={`/tienda/${id}`}><motion.img whileHover={{ scale: 0.9 }} src={img} alt="producto" /></Link>
            </div>

            <div className='product__info'>
                <h3 className='product__name'><Link to={`/tienda/${id}`}>{title}</Link></h3>
                <motion.span whileTap={{ scale: 1.2 }} className={`favs ${isFavorite ? 'clicked' : ''}`}>
                    <FaHeart className={`favs__icon ${isFavorite ? 'clicked' : ''}`} onClick={handleIconClick} />
                </motion.span>
                <span>{category}</span>
            </div>

            <div className='product__card-bottom'>
                <span className="price">
                    <span className={`price-original ${isPriceSale ? 'strikethrough' : ''}`}>${price}</span>
                    {isPriceSale && <span className="price-sale">${pricesale}</span>}
                </span>
                <Button onClick={handleAddToCart}><FaPlus className='more_icon' /></Button>
            </div>
        </div>
    )
}

export default ProductCard