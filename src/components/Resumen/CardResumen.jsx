import { formatPrice } from "../../utils";
import "./cardResumen.css"

const CardResumen = ({ title, desc, quantity, price, pricesale }) => {

    const totalPrice = pricesale ? pricesale * quantity : price * quantity;

    return (

        <div className="product">
            <div className="product-left left-resumen">
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
            <div className="price-container-resumen">
                <p>{quantity}U</p>
                <span className="product-price-resumen">{formatPrice(totalPrice)}</span>
            </div>
        </div>
    );
};

export default CardResumen;