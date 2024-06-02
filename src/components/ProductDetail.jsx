import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/API";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../actions/userActions";
import DetailLoading from "./DetailLoading";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const hasFetched = useRef(false);
  const dispatch = useDispatch();
  let productData = undefined;

  const handleVariantSelection = (code) => {
    const selectedVariant = product?.articlesList?.find(
      (item) => item.code === code
    );
    setCurrentVariant(selectedVariant);
  };

  useEffect(() => {
    const getProductById = async () => {
      console.log("get product by id is called");
      try {
        const data = await getProductDetail(id);
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!hasFetched.current) {
      getProductById(id);
      hasFetched.current = true;
    }
  }, [id]);

  useEffect(() => {
    handleVariantSelection(id);
  }, [product]);

  if (product) {
    productData = {
      id: product.code,
      name: product.name,
      price: product.whitePrice.price,
      image: currentVariant?.galleryDetails[0]?.baseUrl,
      color: currentVariant?.colourDescription,
      size: selectedSize,
    };
  }

  const addProduct = () => {
    dispatch(addProductToCart(productData));
    alert(`${productData.name} is added to cart`);
  };

  console.log(product);
  console.log(currentVariant);

  return (
    <div
      className={`grid items-start mx-28 ${
        loading ? "h-screen" : "justify-center"
      }`}
    >
      {loading ? (
        <DetailLoading />
      ) : (
        <div className="grid grid-cols-2 p-7 justify-items-center bg-slate-100  text-neutral-800 rounded">
          <div className="w-5/6">
            <img
              className="rounded"
              src={currentVariant?.galleryDetails[0]?.baseUrl}
            />
          </div>
          <div className="p-5 flex flex-col gap-2 ">
            <p className="text-xl font-semibold">{product.name}</p>
            <p className="text-lg font-medium">₹{product.whitePrice.price}</p>
            <p className="text-base font-medium">
              {currentVariant?.colourDescription}
            </p>
            <div className="flex h-1/5 gap-2 p-2 overflow-x-auto">
              {product &&
                product.articlesList.map((item) => (
                  <div
                    className={`flex items-center justify-center cursor-pointer hover:drop-shadow rounded ${
                      currentVariant?.code === item.code
                        ? "outline outline-neutral-500"
                        : ""
                    }`}
                    key={item.code}
                    onClick={() => handleVariantSelection(item.code)}
                  >
                    <img
                      className="h-full"
                      src={item?.galleryDetails[0]?.baseUrl}
                    />
                  </div>
                ))}
            </div>
            <p className="text-base font-medium">SIZES</p>
            <div className="flex gap-2">
              {currentVariant &&
                currentVariant.variantsList.map((item) => (
                  <div
                    className={`p-2 w-1/5 text-center text-sm font-medium border-2 border-neutral-400 hover:bg-neutral-200 ${
                      selectedSize === item.size.name ? "bg-neutral-300" : ""
                    }`}
                    key={item.code}
                    onClick={() => setSelectedSize(item.size.name)}
                  >
                    {item.size.name}
                  </div>
                ))}
            </div>
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
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
