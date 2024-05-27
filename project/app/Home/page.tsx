import Image from "next/image";
import Navbar from "../Navbar/page";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="bg-cover bg-center bg-no-repeat bg-Desktop object-cover h-screen">
        <Navbar />
        {/* Desktop view */}
        <div className="hidden sm:flex flex-col sm:flex-row justify-between px-8 py-8 sm:py-0">
          <div className="text-center sm:text-left sm:mr-4">
            <div className="text-white text-2xl sm:text-4xl md:text-6xl lg:text-8xl mt-10 sm:mt-20 ml-4 sm:ml-20">
              <span className="font-bold slideRight">Math Genie</span>
              <div className="text-4xl sm:text-6xl md:text-4xl lg:text-7xl mt-4">
                <span className="font-bold">Making Math</span>
                <br />
                <span className="font-bold">Magical!</span>
              </div>
            </div>
          </div>
          <div className="self-start pt-3 xl:mr-10 sm:mt-0 sm:mr-10 sm:ml-2 md:w-[39%] lg:w-[37%] xl:w-[27%] h-full">
            <Image
              src="/asserts/main_images.png"
              alt="Math Genie"
              layout="responsive"
              width={500}
              height={500}
              className="w-full h-full object-contain lg:w-full xl:w-full"
            />
          </div>
        </div>

        {/* Mobile view */}
        <div className="sm:hidden flex flex-col items-center justify-center px-4 py-4">
          <div className="pb-5">
            <Image
              src="/asserts/main_images.png"
              alt="image"
              width={120}
              height={120}
              className="custom-mobile-320 custom-mobile-375 custom-mobile-425"
            />
          </div>
          <div className="text-center">
            <div className="text-white text-xl sm:text-2xl mb-8">
              <span className="font-bold slideRight">Math Genie</span>
              <div className="text-xl sm:text-lg pb-2">
                <span className="font-bold">Making Math</span>
                <br />
                <span className="font-bold">Magical!</span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="ml-2 mb-4 bg-blue-700 rounded-full w-[130px]">
          <Button title="Book Now" className="text-sm sm:text-base" />
        </div> */}
      </div>
    </>
  );
};

export default Home;
