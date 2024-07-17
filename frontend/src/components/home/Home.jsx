import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackImg from '../../assets/images/beach.png';
import resortImg from '../../assets/images/resort.png'
import { getThreeRoomsForHomePage } from "../utils/apiFunctions";
import RoomCard from "../room/RoomCard";
const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchThreeRooms = async () => {
    setIsLoading(true);
    try {
      const data = await getThreeRoomsForHomePage();
      setRooms(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchThreeRooms();
  }, []);
  
    return (
      <>
        <section className="relative h-screen w-full mt-[-4rem] z-10">
          <div className="absolute inset-0 overflow-clip">
            <img
              src={BackImg}
              className="w-full h-full object-cover lg:object-fill"
              alt="Background"
            />
          </div>
          <div className="relative z-20 container mx-auto text-center pt-64">
            <p className=" md:text-xl lg:text-2xl mx-auto font-LakesNeueRegular text-[#EFEDE7]">
              WELCOME TO
            </p>
            <h2 className="mb-7 z-20 text-4xl md:text-7xl lg:text-8xl font-bold text-[#FFAFDA] font-CinzelRegular">
              SEASIDE HOTEL
            </h2>
            <Link
              to="/about"
              className="hover:text-[#FFAFDA] hover:ring-[#FFAFDA] text-xs md:text-sm lg:text ring-1 text-[#EFEDE7] ring-[#EFEDE7] font-LakesNeueRegular rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              LEARN MORE
            </Link>
          </div>
        </section>

        <section className="flex justify-around relative h-screen w-full bg-[#032B22]">
          <div className="relative w-full">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
              <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                <h1 className="text-center font-CinzelRegular  mt-8 text-3xl font-bold tracking-tight text-[#40FFB5] md:text-4xl lg:text-6xl">
                  Welcome to your luxirious home away from home
                </h1>
                <p className="mt-8 text-lg text-[#EFEDE7] font-TypewcondRegular text-center">
                  Escape to the seaside where luxury meets tranquility. Bask in
                  the serene sounds of the waves, and enjoy breathtaking ocean
                  views from every corner. Our resort offers an exquisite blend
                  of comfort and natural beauty, designed to provide you with an
                  unforgettable coastal retreat.
                </p>
              </div>
              <div className="relative my-auto lg:col-span-5 lg:-mr-8 xl:col-span-6">
                <img
                  className="aspect-[3/2] h-52 mx-auto rounded-xl bg-gray-50 object-cover lg:h-[460px] lg:w-[307px]"
                  src={resortImg}
                  alt="Resort"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-around relative h-fit  w-full bg-[#EFEDE7]">
          <div className="relative w-full">
            <div className="mx-0 flex flex-col">
              <div>
                <h1 className="text-center font-CinzelRegular  mt-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                  Accomodation
                </h1>
              </div>
              {isLoading ? (
                <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                  <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row justify-around">
                  {rooms.map((room) => (
                    <RoomCard room={room} key={room.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
}

export default Home;