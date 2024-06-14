package com.saad.Seaside_Hotel.service;

import com.saad.Seaside_Hotel.model.Room;
import com.saad.Seaside_Hotel.repository.RoomRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
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
}
