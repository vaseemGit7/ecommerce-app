import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/API";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      console.log("get product by id is called");
      try {
        const data = await getProductDetail(id);
        setProduct(data.product);
      } catch (error) {
        console.log(error);
      }
    };

    getProductById();
  }, [id]);

  console.log(product);

  return (
    <div className="grid items-start justify-center mx-28">
      <div className="grid grid-cols-2 p-2 justify-items-center bg-slate-50 border-2 border-purple-700 text-neutral-900 rounded">
        {product && (
          <>
            <div className="w-5/6">
              <img
                className="border-2  border-green-500"
                src={product.articlesList[0].galleryDetails[0].baseUrl}
              />
            </div>
            <div className="p-5 flex flex-col gap-2 border-2 border-green-500">
              <p className="text-xl font-semibold">{product.name}</p>
              <p className="text-lg font-medium">
                $ {product.whitePrice.price}
              </p>
              <p className="text-base font-normal">{product.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
