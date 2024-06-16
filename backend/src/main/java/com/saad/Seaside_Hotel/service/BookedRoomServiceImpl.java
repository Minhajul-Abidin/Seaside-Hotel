package com.saad.Seaside_Hotel.service;

import com.saad.Seaside_Hotel.model.BookedRoom;
import com.saad.Seaside_Hotel.repository.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedRoomService{
    private final BookedRoomRepository bookedRoomRepository;
    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return bookedRoomRepository.findByRoomId(id);
    }
}
