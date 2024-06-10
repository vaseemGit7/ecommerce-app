import { useEffect, useState } from "react";

const Home = () => {
  const [index, setIndex] = useState(1);

  const bannerTexts = {
    1: "Level up your style with our latest and trending collections",
    2: "Refresh your look and explore our latest styles together.",
    3: "Discover your new favourite looks in our men’s arrivals.",
    4: "Stylish and comfortable with our latest kids collection.",
    5: "Redefine your wardrobe with our must-have styles for women.",
  };

  const carouselDots = [];

  for (let i = 1; i <= 5; i++) {
    carouselDots.push(
      <div
        key={i}
        className={`rounded-full bg-neutral-50 ${
          index === i ? "h-3 w-3" : "h-2 w-2"
        }`}
      ></div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex >= 5 ? 1 : prevIndex + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div
        className="relative h-5/6 w-full rounded"
        style={{
          backgroundImage: `url('../src/assets/banners/carousel-banner-${index}.jpg`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute z-1 top-0 left-0 h-full w-full bg-neutral-950/40 rounded" />
        <p className="absolute bottom-10 text-center text-6xl text-balance text-neutral-50 font-semibold">
          {bannerTexts[index]}
        </p>
        <div className="absolute z-1 flex bottom-3 right-1/2 items-center gap-1">
          {carouselDots}
        </div>
      </div>
    </div>
  );
};

export default Home;
