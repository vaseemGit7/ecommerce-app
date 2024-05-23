import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <>
      <p>This is a product detail page of the product with id {id}</p>
    </>
  );
};

export default ProductDetail;
