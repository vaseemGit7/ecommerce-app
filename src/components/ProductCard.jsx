const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col gap-1 p-2 bg-slate-50 text-neutral-900 rounded hover: drop-shadow-md hover:scale-105">
      <img
        className="rounded"
        src="https://dummyimage.com/170x170/040404/fafafa.png"
      ></img>
      <p className="text-base font-medium">{product.product_name}</p>
      <p className="text-base font-normal">{product.brand_name}</p>
      <div className=" flex justify-between">
        <p className="text-sm font-normal">₹ {product.price}</p>
        <p className="text-sm font-medium">{product.rating}</p>
      </div>
    </div>
  );
};

export default ProductCard;
