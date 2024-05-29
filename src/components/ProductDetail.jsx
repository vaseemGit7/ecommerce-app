import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/API";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../actions/userActions";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const hasFetched = useRef(false);
  const dispatch = useDispatch();
  let productData = undefined;

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

    if (!hasFetched.current) {
      getProductById(id);
      hasFetched.current = true;
    }
  }, [id]);

  if (product) {
    productData = {
      name: product.name,
      price: product.whitePrice.price,
      image: product.articlesList[0].galleryDetails[0].baseUrl,
    };
  }

  const addProduct = () => {
    dispatch(addProductToCart(productData));
  };

  console.log(product);

  return (
    <div className="grid items-start justify-center mx-28">
      <div className="grid grid-cols-2 p-7 justify-items-center bg-slate-100  text-neutral-800 rounded">
        {product && (
          <>
            <div className="w-5/6">
              <img
                className="rounded"
                src={product.articlesList[0].galleryDetails[0].baseUrl}
              />
            </div>
            <div className="p-5 flex flex-col gap-2 ">
              <p className="text-xl font-semibold">{product.name}</p>
              <p className="text-lg font-medium">₹{product.whitePrice.price}</p>
              <button
                className="py-2 px-3 w-3/5 text-center align-middle bg-neutral-800 text-base text-neutral-50 font-normal rounded"
                onClick={addProduct}
              >
                Add
              </button>
              <div>
                <p className="text-lg font-medium">DESCRIPTION</p>
                <p className="text-sm font-normal">{product.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
