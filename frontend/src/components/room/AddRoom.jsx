import React, { useState } from "react";
import { addRoom } from "../utils/apiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import ExistingRoom from "./ExistingRoom"

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        picture : null,
        roomType : "",
        roomPrice : ""
    })
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

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
                setSuccessMessage("New room added successfully")
                setNewRoom({picture : null,  roomType : "" ,roomPrice : ""})
                setErrorMessage("")
                setImagePreview("")
            }
            else{
                setErrorMessage("Error : Adding room")
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
    }

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, picture : selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    return (
        <>
            <section className="container mx-auto mt-20 mb-20">
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
                <ExistingRoom/>
            </section>
        </>

    )

}

export default AddRoom