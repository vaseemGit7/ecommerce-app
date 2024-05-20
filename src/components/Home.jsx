import { pesudoProductData } from "../database/pesudoProductData";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "10px",
        }}
      >
        {pesudoProductData.map((product) => (
          <div
            className="p-2 bg-slate-50 text-neutral-900 rounded"
            key={product.id}
          >
            {product.product_name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
