package com.saad.Seaside_Hotel.service;

import com.saad.Seaside_Hotel.exception.InternalServerException;
import com.saad.Seaside_Hotel.exception.ResourceNotFoundException;
import com.saad.Seaside_Hotel.model.Room;
import com.saad.Seaside_Hotel.repository.RoomRepository;
import com.saad.Seaside_Hotel.response.RoomWOBResponse;
import com.saad.Seaside_Hotel.response.RoomTableResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService{
    private final RoomRepository roomRepository;

    @Override
    public Room addNewRoom(MultipartFile picture, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Blob pictureBlob = null;
        if(!picture.isEmpty()) {
            byte[] pictureBytes = picture.getBytes();
            pictureBlob = new SerialBlob(pictureBytes);
        }
        Room room = Room.builder()
                .roomPrice(roomPrice)
                .roomType(roomType)
                .picture(pictureBlob)
                .build();
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public void deleteRoomById(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public List<RoomTableResponse> getAllRoomsForTable() {
        return roomRepository.findAllForTable();
    }

    @Override
    public Room editRoom(Long id, String roomType, BigDecimal roomPrice, byte[] pictureBytes) {

        // TODO - This method needs optimization as it first query the data then update then insert.

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Error : Room not found"));
        if(roomType != null) room.setRoomType(roomType);
        if(roomPrice != null) room.setRoomPrice(roomPrice);
        if(pictureBytes != null && pictureBytes.length > 0){
            try{
                room.setPicture(new SerialBlob(pictureBytes));
            }catch (SQLException exception){
                throw new InternalServerException("Error : Editing room");
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public RoomWOBResponse getRoomEditResponseById(Long id) {
        return roomRepository.getRoomEditResponseById(id);
    }

    @Override
    public List<RoomWOBResponse> getThreeRoomsForHomePage() {
        Pageable pageable = PageRequest.of(0, 3);
        return roomRepository.getThreeRoomsForHomePage(pageable);
    }
}
