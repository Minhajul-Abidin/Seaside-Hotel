package com.saad.Seaside_Hotel.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookedRoom {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long bookingId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private String guestEmail;
    private int noOfAdults;
    private int noOfChildrens;
    private int totalNoOfGuests;
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roomId")
    private Room room;

    public void calculatTotalNoOfGuests(){
        this.totalNoOfGuests = this.noOfAdults + this.noOfChildrens;
    }

    public void setNoOfChildrens(int noOfChildrens) {
        this.noOfChildrens = noOfChildrens;
        calculatTotalNoOfGuests();
    }

    public void setNoOfAdults(int noOfAdults) {
        this.noOfAdults = noOfAdults;
        calculatTotalNoOfGuests();
    }

}
