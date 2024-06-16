import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail } from "../api/API";
import { useDispatch } from "react-redux";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProductToCart } from "../actions/userActions";
import DetailLoading from "./DetailLoading";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const hasFetched = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let productData = undefined;

  const handleVariantSelection = (code) => {
    const selectedVariant = product?.articlesList?.find(
      (item) => item.code === code
    );
    setCurrentVariant(selectedVariant);
  };

  useEffect(() => {
    const getProductById = async () => {
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
      quantity: 1,
    };
  }

  const addProduct = () => {
    selectedSize === null ? setSizeError(true) : setSizeError(false);
    if (selectedSize !== null) {
      dispatch(addProductToCart(productData));
      toast.success(`${productData.name} is added to cart`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        className: "toastify-message",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <div
        className="absolute top-20 left-4 flex gap-1 items-center"
        onClick={() => navigate(-1)}
      >
        <IonIcon icon={arrowBackOutline} className="text-lg" />
        <p className="text-lg text-neutral-800 font-medium">Go back</p>
      </div>
      <div className={`grid mx-28 ${loading ? "h-screen" : "justify-center"}`}>
        {loading ? (
          <DetailLoading />
        ) : (
          <div className="grid grid-cols-2 p-7 justify-items-center bg-neutral-50 outline outline-1 outline-neutral-200  text-neutral-800 rounded">
            <div className="w-5/6">
              <img
                className="rounded"
                src={currentVariant?.galleryDetails[0]?.baseUrl}
              />
            </div>
            <div className="p-5 flex flex-col gap-2 overflow-y-scroll">
              <div>
                <p className="text-xl font-semibold">{product.name}</p>
                <p className="text-lg font-medium">
                  ₹{product.whitePrice.price}
                </p>
              </div>
              <p className="text-base font-medium text-neutral-700">
                {currentVariant?.colourDescription}
              </p>
              <div className="flex h-60 gap-2 p-2 overflow-x-scroll">
                {product &&
                  product.articlesList.map((item) => (
                    <img
                      key={item.code}
                      src={item?.galleryDetails[0]?.baseUrl}
                      className={`cursor-pointer outline outline-1 hover:outline-neutral-500 rounded ${
                        currentVariant?.code === item.code
                          ? "outline-neutral-700"
                          : "outline-neutral-300"
                      }`}
                      onClick={() => handleVariantSelection(item.code)}
                    />
                  ))}
              </div>
              <p className="text-base font-medium">SIZES</p>
              {sizeError && (
                <p className="text-sm text-red-600 font-normal">
                  *Please select a size
                </p>
              )}
              <div className="flex gap-2">
                {currentVariant &&
                  currentVariant.variantsList.map((item) => (
                    <div
                      className={`p-2 w-1/5 text-center text-sm font-medium outline outline-1 outline-neutral-400 rounded-sm hover:scale-[1.04] hover:shadow-md cursor-pointer ${
                        selectedSize === item.size.name
                          ? "bg-neutral-300 scale-[1.04]"
                          : ""
                      }`}
                      key={item.code}
                      onClick={() => {
                        setSelectedSize(item.size.name);
                        setSizeError(false);
                      }}
                    >
                      {item.size.name}
                    </div>
                  ))}
              </div>
              <button
                className="mt-2 py-2 px-3 w-3/5 text-center self-center text-base font-medium text-neutral-50 bg-neutral-700 rounded hover:bg-neutral-800"
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
    </>
  );
};

export default ProductDetail;
