// This is the response for the edit room component as we dont need all the
// transaction history
package com.saad.Seaside_Hotel.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomWOBResponse {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String picture;


    public RoomWOBResponse(
            Long id, String roomType,
            BigDecimal roomPrice, Blob pictureBlob
          ) throws SQLException {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;

        this.picture = pictureBlob != null ? Base64.encodeBase64String(
                pictureBlob.getBytes(1,(int) pictureBlob.length())) : null;
    }
}
