package com.saad.Seaside_Hotel.response;

import com.saad.Seaside_Hotel.model.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoomResponse {
    private Long bookingId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private String guestEmail;
    private int noOfAdults;
    private int noOfChildrens;
    private int totalNoOfGuests;
    private String bookingConfirmationCode;
    private Room room;

    public BookedRoomResponse(Long bookingId, LocalDate checkInDate,
                              LocalDate checkOutDate, String bookingConfirmationCode) {
        this.bookingId = bookingId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
