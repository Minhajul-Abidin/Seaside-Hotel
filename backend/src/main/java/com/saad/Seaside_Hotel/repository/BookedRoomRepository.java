package com.saad.Seaside_Hotel.repository;

import com.saad.Seaside_Hotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookedRoomRepository extends JpaRepository<BookedRoom,Long> {
    List<BookedRoom> findByRoomId(Long roomId);
}
