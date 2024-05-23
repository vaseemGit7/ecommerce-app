import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/API";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const getProductById = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  console.log(product);

  return (
    <div className="grid grid-cols-2 bg p-2 bg-slate-50 text-neutral-900 rounded">
      {product && (
        <>
          <img src={product.images[1]} />
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">{product.title}</p>
            <p className="text-lg font-medium">$ {product.price}</p>
            <p className="text-base font-normal">{product.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
