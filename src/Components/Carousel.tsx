import { useState, useEffect } from "react";

const Carousel = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredImages = [
    'https://browsecat.net/sites/default/files/4k-sunset-wallpapers-41094-501-4705263.png',
    'https://browsecat.net/sites/default/files/4k-sunset-wallpapers-41094-510-2963162.png',
    'https://browsecat.net/sites/default/files/4k-sunset-wallpapers-41094-530-1323591.png',
    "https://browsecat.net/sites/default/files/4k-sunset-wallpapers-41094-536-3936263.png"];

  const handleManualOnNextClick = () => {
    if (currentIndex === featuredImages.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };


  const handleOnPrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(featuredImages.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /*const idkNotWorkingWithClick = () => {
    count = (count + 1) % (featuredImages.length);
    setCurrentIndex(count);
  }*/
  useEffect(() => {
    // set an interval timer if we are currently moused over

    const timer = setInterval(() => {
      // cycle prevCount using mod instead of checking for hard-coded length
      if (currentIndex === featuredImages.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 8000);
    // automatically clear timer the next time this effect is fired or
    // the component is unmounted
    return () => clearInterval(timer);

    // the dependency on mousedOver means that this effect is fired
    // every time mousedOver changes
  }, [currentIndex, featuredImages.length]);

  return (
    <div className="w-full h-min flex items-center justify-center">
      <div className="w-full relative select-none h-fit">
        <div className="aspect-w-15 aspect-h-14">
          <img src={featuredImages[currentIndex]} alt="" className="rounded-md" />
        </div>

        <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
          <button onClick={handleOnPrevClick}>Previous</button>
          <button onClick={handleManualOnNextClick}>Next</button>
        </div>
      </div>
    </div>
  )
};


export default Carousel;