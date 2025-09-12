import Badge from "../ui/Badge";
import PriceFormat from "../ui/Price";

const ProductCard = ({product}) => {
    const {title, price, description, sticker} = product;

    return (
        <div className="p-3 rounded-lg shadow-xl shadow-cyan-500/50 border-2 border-gray-200 grid gap-3">
            <img src={`http://localhost:3000/images/${sticker}`} alt={title} className="rounded-t-md"/>
            <span className="text-lg">{title}</span>
            <p className="text-justify">{description}</p>
            <span className="block text-end">
                <Badge className='bg-blue-500 border-none text-white'>
                    <PriceFormat value={price} displayType="text" thousandSeparator="," suffix=" تومان"/>
                </Badge>
            </span>
        </div>
    )
}

export default ProductCard;