import React, { useState } from "react";
import { addRoom } from "../utils/apiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import ExistingRoom from "./ExistingRoom"
import { getAllRoomsForTable } from "../utils/apiFunctions";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        picture : null,
        roomType : "",
        roomPrice : ""
    })
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    // rooms is defined here so that submit also has access to it and passed to ExistingRoom component via props
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllRooms = async () => {
        setIsLoading(true);
        try {
          const data = await getAllRoomsForTable();
          setRooms(data);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("")
           }, 5000);
        }
      };

    const handleRoomInputChange = (e) =>{
        const name = e.target.name
        let value = e.target.value
        if(name == "roomPrice"){
            if(!isNaN(value)){
                value = parseInt(value)
            }
            else{
                value = ""
            }
        }
        setNewRoom({...newRoom,[name] : value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const success = await addRoom(newRoom.picture, newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setSuccessMessage("Room added successfully")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                setNewRoom({picture : null,  roomType : "" ,roomPrice : ""})
                setErrorMessage("")
                setImagePreview("")
                fetchAllRooms()
            }
            else{
                setErrorMessage("Error adding room")
                setTimeout(() => {
                    setErrorMessage("")
                }, 5000);
            }
        }
        catch(error){
            setErrorMessage(error.message)
            setTimeout(() => {
                setErrorMessage("")
            }, 5000);
        }
    }

    const handleNotification = () => {
        setErrorMessage("")
        setSuccessMessage("")
    }

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, picture : selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    return (
        <>
            <section className="container mx-auto mt-20 mb-20">
            {successMessage && 
                    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div class="p-4">
                                    <div class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div class="ml-3 w-0 flex-1 pt-0.5">
                                            <p class="text-sm font-medium text-gray-900">{successMessage}</p>
                                        </div>
                                        <div class="ml-4 flex flex-shrink-0">
                                            <button type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={handleNotification}>
                                            <span class="sr-only">Close</span>
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                            </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    errorMessage && 
                    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div class="p-4">
                                    <div class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <circle cx="12" cy="12" r="9" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9L9 15M9 9l6 6" />
                                            </svg>
                                        </div>
                                        <div class="ml-3 w-0 flex-1 pt-0.5">
                                            <p class="text-sm font-medium text-gray-900">{errorMessage}</p>
                                        </div>
                                        <div class="ml-4 flex flex-shrink-0">
                                            <button type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={handleNotification}>
                                            <span class="sr-only">Close</span>
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                            </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <h2 className="mt-20 mb-8 text-2xl font-bold mx-auto size-fit">Add a new room</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="roomType" className="block text-gray-700 font-bold mb-2">Room type</label>
                                <div>
                                    <RoomTypeSelector 
                                    handleRoomInputChange={handleRoomInputChange} 
                                    newRoom={newRoom}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="roomPrice" className="block text-gray-700 font-bold mb-2">Room price</label>
                                <input
                                    required
                                    type="number"
                                    className="shadow appearance-none w-full py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                    id="roomPrice"
                                    name="roomPrice"
                                    placeholder="Enter room price"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-4">

                                <label htmlFor="picture" className="block text-gray-700 font-bold mb-2">
                                    Room picture
                                </label>

                                <input 
                                type="file" 
                                name="picture" 
                                id="picture" 
                                className="shadow focus:ring-indigo-500 focus:border-indigo-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <div className="flex flex-row justify-between">
                                    <p className="my-auto font-bold">Image preview : </p>
                                    <img 
                                    src={imagePreview}
                                    alt="Room Picture"
                                    style={{maxWidth : "400px", maxHeight : "400px"}}
                                    className="mb-4 mt-2 border-solid border-4  border-gray-600 border-spacing-8 hover:p-1" />
                                    </div>
                                )}
                            </div>
                            <div  className="flex justify-between mt-4">
                                <button type="submit" 
                                className=" bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:bg-indigo-500
                                 text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                 focus:shadow-outline">Save room</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ExistingRoom rooms = {rooms}
                fetchAllRooms ={fetchAllRooms}
                isLoading = {isLoading}
                />
            </section>
        </>

    )

}

export default AddRoom