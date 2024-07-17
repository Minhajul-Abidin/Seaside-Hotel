import React from "react";

const RoomCard = ({room}) => {
    return (
      <div className="flex flex-col mt-5 mb-5 lg:mt-16 lg:mb-10">
        <img
          className="h-60 w-60 mx-auto  bg-gray-50 object-cover lg:h-80 lg:w-80"
          src={`data:image/jpeg;base64,${room.picture}`}
          alt="Room Picture"
        />
        <p className="mt-3 font-CinzelRegular text-[#00634D] font-bold text-2xl text-center">
          {room.roomType.toUpperCase()}
        </p>
        <p className="font-TypewcondRegular text-center text-sm">
          from ₹{room.roomPrice} a night
        </p>
      </div>
    );
}

export default RoomCard;