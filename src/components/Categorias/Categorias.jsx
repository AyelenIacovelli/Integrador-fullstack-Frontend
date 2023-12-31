import { useSelector } from "react-redux";
import Categoria from "./Categoria";
import "./categorias.css"


const Categorias = () => {

    const { categories, selectedCategory } = useSelector((state) => state.categories);

    return (
        <div className="categorias-container">
            {categories.map((category) => {
                return (
                    <Categoria {...category} key={category.id} isSelected={category.category === selectedCategory} />
                );
            })}
        </div>
    );
};

export default Categorias;