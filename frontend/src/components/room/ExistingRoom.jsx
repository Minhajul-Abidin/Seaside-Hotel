import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/apiFunctions";
import RoomPaginator from "../common/RoomPaginator";

const ExistingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllRooms();
  }, []);

  const calculateTotalPages = (roomsPerPage, rooms) =>
    Math.ceil(rooms.length / roomsPerPage);

  const indexOfLastRoom = currentpage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const fetchAllRooms = async () => {
    setIsLoading(true);
    try {
      const data = await getAllRooms();
      setRooms(data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      <h2 className="mt-20 mb-8 text-2xl font-bold mx-auto size-fit">Existing rooms</h2>
                        
      {isLoading ? (
        <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
          <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-600 border-8 h-10 w-10"></div>
        </div>
      ) : (
        <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Room Type
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Starting Rate/Night
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {currentRooms.map((room) =>(
                <tr key={room.id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{room.roomType}</div>
                    <div className="text-gray-400">Id : {room.id}</div>
                  </div>
                </th>
                {!room.isBooked ? (
                <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                  Vacant
                </span>
              </td>
                ) : (
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                    Occupied
                  </span>
                </td>)}
                <td className="px-6 py-4">₹{room.roomPrice}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button>
                      {/* TODO - Add delete room fuctionality */}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={"1.5"}
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                      
                    <button>
                      {/* TODO - Add update room fuctionality */}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={"1.5"}
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button>
                      {/* TODO - Add view room details and history fuctionality */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={"1.5"}
                      stroke="currentColor"
                      className="h-6 w-6"
                      x-tooltip="tooltip"
                    >
                      <path
                        d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    </button>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator currentPage={currentpage} 
          totalPages={calculateTotalPages(roomsPerPage,rooms)}
          onPageChange={handlePaginationClick} 
        />
        </div>
      )}
    </>
  );
};

export default ExistingRoom
