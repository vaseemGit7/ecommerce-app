const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col gap-1 p-2 bg-slate-50 text-neutral-900 rounded hover: drop-shadow-md hover:scale-105">
      <img src={product.images[1]} />
      <div className="flex flex-col justify-between">
        <p className="text-base font-medium">{product.title}</p>
        <p className="text-base font-normal">$ {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
