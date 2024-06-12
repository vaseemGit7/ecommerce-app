import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link to={`/dashboard/product/${product.defaultArticle.code}`}>
        <div className="flex flex-col justify-between gap-1 outline outline-1 outline-neutral-200 bg-slate-50 text-neutral-800 rounded-sm hover:drop-shadow-md hover:scale-[1.02]">
          <img src={product.defaultArticle.images[0].url} />
          <div className="flex flex-col p-2 justify-between">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-base font-medium text-neutral-700">
              {product.price.formattedValue}
            </p>
            <div className="flex gap-2">
              {product?.rgbColors?.map((color) => (
                <div
                  key={color}
                  className="h-[0.625rem] w-[0.625rem] rounded-full outline outline-[0.5px] outline-neutral-800/25"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
