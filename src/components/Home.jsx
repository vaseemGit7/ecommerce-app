import ProductCard from "./ProductCard";
import { getAll } from "../api/API";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    try {
      const data = await getAll();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products && products[0]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "30px",
        }}
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Home;
