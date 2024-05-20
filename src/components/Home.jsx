import { pesudoProductData } from "../database/pesudoProductData";
import ProductCard from "./ProductCard";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {pesudoProductData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
