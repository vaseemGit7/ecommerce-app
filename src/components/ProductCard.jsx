import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link to={`/dashboard/product/${product.defaultArticle.code}`}>
        <div className="flex flex-col gap-1 p-2 bg-slate-50 text-neutral-900 rounded hover: drop-shadow-md hover:scale-105">
          <img src={product.defaultArticle.images[0].url} />
          <div className="flex flex-col justify-between">
            <p className="text-base font-medium">{product.name}</p>
            <p className="text-base font-normal">
              {product.price.formattedValue}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
