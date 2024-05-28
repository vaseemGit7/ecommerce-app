import ProductCard from "./ProductCard";
import { getHMProducts } from "../api/API";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductLoading from "./ProductLoading";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);

  // const getProducts = async () => {
  //   try {
  //     const data = await getAll(0);
  //     setProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getProductsHM = async () => {
    try {
      const data = await getHMProducts(0, 12);
      setProducts(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsHM();
  }, []);

  const fetchMoreData = async () => {
    try {
      const data = await getHMProducts(index, 12);
      setProducts((prevItems) => [...prevItems, ...data.results]);
      data.results.length > 0 ? setHasMore(true) : setHasMore(false);
    } catch (error) {
      console.log(error);
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  console.log(products);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<ProductLoading />}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "30px",
        }}
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product.defaultArticle.code} product={product} />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default Home;
