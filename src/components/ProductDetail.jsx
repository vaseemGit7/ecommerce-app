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
    <>
      <p>This is a product detail page of the product with id {id}</p>
    </>
  );
};

export default ProductDetail;
