package com.saad.Seaside_Hotel.repository;

import com.saad.Seaside_Hotel.model.Room;
import com.saad.Seaside_Hotel.response.RoomWOBResponse;
import com.saad.Seaside_Hotel.response.RoomTableResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findRoomTypes();

    @Query("SELECT new com.saad.Seaside_Hotel.response.RoomTableResponse" +
            "(r.id, r.roomType, r.roomPrice, r.isBooked) FROM Room r")
    List<RoomTableResponse> findAllForTable();

    @Query("SELECT new com.saad.Seaside_Hotel.response.RoomWOBResponse" +
            "(r.id, r.roomType, r.roomPrice, r.picture) FROM Room r WHERE r.id = :id")
    RoomWOBResponse getRoomEditResponseById(Long id);

    @Query("SELECT new com.saad.Seaside_Hotel.response.RoomWOBResponse" +
            "(r.id, r.roomType, r.roomPrice, r.picture) FROM Room r")
    List<RoomWOBResponse> getThreeRoomsForHomePage(Pageable pageable);
}
