import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRoomsForClient } from "../utils/apiFunctions";
import RoomCard from "../room/RoomCard";
import RoomPaginator from "../common/RoomPaginator";


const AllRoom = () => {

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentpage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(9);

    const calculateTotalPages = (roomsPerPage, rooms) =>
      Math.ceil(rooms.length / roomsPerPage);
  
    const indexOfLastRoom = currentpage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  
    const handlePaginationClick = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  
    const fetchThreeRooms = async () => {
      setIsLoading(true);
      try {
        const data = await getAllRoomsForClient();
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
        <section className="flex flex-col relative h-fit w-full bg-[#EFEDE7]">
          <div className="relative flex justify-around">
            <div className="relative w-full">
              <div className="mx-0 flex flex-col">
                <div>
                  <h1 className="text-center font-CinzelRegular  mt-8 text-3xl font-bold tracking-tight text-[#00634D] md:text-4xl lg:text-6xl">
                      Rooms and Suites
                  </h1>
                </div>
                {isLoading ? (
                  <div className="size-fit mx-auto my-56 transform translate-x-1/2 translate-y-1/2 ">
                    <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#00634D] border-8 h-10 w-10 "></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 lg:flex-row justify-around">
                    {rooms.map((room) => (
                      <RoomCard room={room} key={room.id} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <RoomPaginator
            currentPage={currentpage}
            totalPages={calculateTotalPages(roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
          />
        </section>
        </>
    )
}

export default AllRoom