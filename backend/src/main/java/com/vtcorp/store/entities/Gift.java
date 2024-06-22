package com.vtcorp.store.entities;

import com.fasterxml.jackson.annotation.JsonView;
import com.vtcorp.store.jsonview.Views;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gift")
public class Gift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.Cart.class)
    private long giftId;

    @JsonView(Views.Cart.class)
    private String name;
    private Integer point;
    private Integer stock;
    private String imagePath;
    private boolean active;

    @OneToMany(mappedBy = "gift", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GiftIncluding> giftIncludings;

}
