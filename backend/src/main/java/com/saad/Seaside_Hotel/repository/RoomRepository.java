package com.saad.Seaside_Hotel.repository;

import com.saad.Seaside_Hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room,Long> {
}
