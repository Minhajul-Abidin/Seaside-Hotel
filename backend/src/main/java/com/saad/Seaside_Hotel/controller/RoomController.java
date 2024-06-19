package com.saad.Seaside_Hotel.controller;

import com.saad.Seaside_Hotel.exception.PictureRetrievalException;
import com.saad.Seaside_Hotel.model.BookedRoom;
import com.saad.Seaside_Hotel.model.Room;
import com.saad.Seaside_Hotel.response.BookedRoomResponse;
import com.saad.Seaside_Hotel.response.RoomResponse;
import com.saad.Seaside_Hotel.service.IBookedRoomService;
import com.saad.Seaside_Hotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {
    private final IRoomService roomService;
    private final IBookedRoomService bookedRoomService;

    // function to add room in the database
    @PostMapping
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("picture") MultipartFile picture,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice
    ) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(picture,roomType,roomPrice);
        RoomResponse roomResponse = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());

        return ResponseEntity.ok(roomResponse);

    }

    // function to get all room types
    @GetMapping("/room-types")
    public List<String> getRoomTypes(){
        return roomService.getAllRoomTypes();
    }

    // function to get all rooms
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms(){
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for(Room room : rooms){
            RoomResponse roomResponse = getRoomResponse(room);
            roomResponses.add(roomResponse);
        }
        return ResponseEntity.ok(roomResponses);
    }

    // helper method to convert room object to roomResponse object to send to frontend
    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        List<BookedRoomResponse> bookingInfo = bookings.stream()
                .map(booking -> new BookedRoomResponse(booking.getBookingId(),booking.getCheckInDate()
                ,booking.getCheckOutDate(), booking.getBookingConfirmationCode()))
                .toList();
        byte[] pictureByte = null;
        Blob pictureBlob = room.getPicture();
        try{
            pictureByte  = pictureBlob.getBytes(1,(int) pictureBlob.length());
        }
        catch(SQLException e){
            throw new PictureRetrievalException("Error : Retrieving picture");
        }
        return new RoomResponse(room.getId(),
                room.getRoomType(), room.getRoomPrice(),
                room.isBooked(), pictureByte, bookingInfo);
    }

    // currently a helper function to get all the bookings of a particular room by its id
    private List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return bookedRoomService.getAllBookingsByRoomId(id);
    }

}
