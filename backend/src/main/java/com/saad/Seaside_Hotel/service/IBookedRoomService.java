package com.saad.Seaside_Hotel.service;

import com.saad.Seaside_Hotel.model.BookedRoom;

import java.util.List;

public interface IBookedRoomService {
    List<BookedRoom> getAllBookingsByRoomId(Long id);
}
