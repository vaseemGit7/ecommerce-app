import ProductCard from "./ProductCard";
import { getHMProducts } from "../api/API";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductLoading from "./ProductLoading";
import Filterbar from "./Filterbar";
import { useDispatch, useSelector } from "react-redux";
import { setResultData } from "../actions/dataActions";

const Home = () => {
  const [sortBy, setSortBy] = useState("stock");
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const dispatch = useDispatch();

  const paramsState = useSelector((state) => state.paramsReducer);

  const getProductsHM = async () => {
    try {
      const data = await getHMProducts(0, 12, sortBy, paramsState);
      dispatch(setResultData(data));
      setProducts(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsHM();
  }, [sortBy, paramsState]);

  const fetchMoreData = async () => {
    try {
      const data = await getHMProducts(index, 12, sortBy);
      dispatch(setResultData(data));
      setProducts((prevItems) => [...prevItems, ...data.results]);
      data.results.length > 0 ? setHasMore(true) : setHasMore(false);
    } catch (error) {
      console.log(error);
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  console.log(products);

  return (
    <div className="grid grid-cols-[max-content_4fr] gap-3">
      <Filterbar sortBy={sortBy} handleSortByChange={handleSortByChange} />
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
              <ProductCard
                key={product.defaultArticle.code}
                product={product}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
