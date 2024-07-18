import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { editRoom, getRoomByIdForEdit } from "../utils/apiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import ErrorNotification from '../common/ErrorNotification'
import SuccessNotification from '../common/SuccessNotification'

const EditRoom = () => {
    const [room, setRoom] = useState({
        picture : null,
        roomType : "",
        roomPrice : ""
    })
    
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const {roomId} = useParams()

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setRoom({...room, picture : selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (e) => {
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
        setRoom({...room, [name] : value})
    }

    useEffect(() => {
        const fetchRoom = async () =>{
            try {
                const roomData = await getRoomByIdForEdit(roomId)
                setRoom(roomData)
                setImagePreview(`data:image/jpeg;base64,${roomData.picture}`)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRoom()
    },[roomId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await editRoom(roomId, room.roomType, room.roomPrice, room.picture)
            if(response.status === 200){
                setSuccessMessage("Room edited sucessfully")
                setTimeout(() => {
                    setSuccessMessage("")
                }, 5000);
                const editedRoomData = await getRoomByIdForEdit(roomId)
                setRoom(editedRoomData)
                setImagePreview(`data:image/jpeg;base64,${editedRoomData.picture}`)
                setErrorMessage("")                
            }else{
                setErrorMessage("Error editing room")
                setTimeout(() => {
                    setErrorMessage("")
                }, 5000);
            }
        } catch (error) {
            console.error(error)
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

    return (
        <>
            <section className="container mx-auto">
            {successMessage && (
                <SuccessNotification successMessage={successMessage}
                handleNotification={handleNotification}/>
            )}
            {errorMessage && (
                <ErrorNotification errorMessage={errorMessage}
                handleNotification={handleNotification}/>
            )}
                <div className="flex flex-col w-2/3 mx-auto">
                    <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#00634D] size-fit mb-5">
                    Edit room
                    </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="roomType" className="block text-gray-700 font-bold mb-2">Room type</label>
                                <div>
                                    <RoomTypeSelector 
                                    handleRoomInputChange={handleInputChange} 
                                    newRoom={room}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="roomPrice" className="block text-gray-700 font-bold mb-2">Room price</label>
                                <input
                                    required
                                    type="number"
                                    className="shadow appearance-none w-full py-2 px-3 focus:ring-[#00634D] focus:border-[#00634D] placeholder-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                    id="roomPrice"
                                    name="roomPrice"
                                    placeholder="Enter room price"
                                    value={room.roomPrice}
                                    onChange={handleInputChange}
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
                                className="shadow focus:ring-[#00634D] focus:border-[#00634D] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <div  className="flex justify-around mt-4">
                                <div>
                                    <Link to={"/admin/room/all"}>
                                    <button
                                        className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                            text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                            focus:shadow-outline">Back
                                                
                                        </button>
                                    </Link>
                                </div>
                                <div>
                                <button type="submit" 
                                className=" bg-[#00634D] rounded-lg hover:bg-[#16473d] focus:bg-[#00634D]
                                 text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                 focus:shadow-outline">Edit room</button>
                            </div>
                            </div>
                        </form>
                </div>
            </section>
        </>
    )
}

export default EditRoom