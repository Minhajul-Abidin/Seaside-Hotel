import React, { useEffect, useState } from "react";
import { getAllRoomTypes } from "../utils/apiFunctions";

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(()=>{
        getAllRoomTypes()
        .then((responseData)=>{
            setRoomTypes(responseData)
        })
    },[])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)        
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
        {roomTypes.length > 0 && (
            <div>
                <select 
                name="roomType" 
                className="block w-full px-3 py-2 mb-4 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
                id="roomType"
                value ={newRoom.roomType}
                onChange={(e) => {
                    if(e.target.value === "Add new"){
                        setShowNewRoomTypeInput(true)
                    }
                    else{
                        setShowNewRoomTypeInput(false)
                        handleRoomInputChange(e)
                    }
                }}
                >   
                    <option value={""}>Select room type</option>
                    <option value={"Add new"}>Add new</option>
                    {roomTypes.map((type,index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {showNewRoomTypeInput && (
                    <div className="relative text-gray-700">
                        <input type="text" 
                        className="shadow appearance-none w-full py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                        placeholder="Enter new room type"
                        onChange={handleNewRoomTypeInputChange}/>
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:bg-indigo-500 "
                            type="button"
                            onClick={handleAddNewRoomType}
                        >Add room</button>
                    </div>
                )}
            </div>
        )}
        </>
    )
}










export default RoomTypeSelector