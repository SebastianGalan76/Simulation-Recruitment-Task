package com.task.Simulation.database.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Simulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String n;
    int p;
    int i;
    float r;
    float m;
    int ti;
    int tm;
    int ts;

    @OneToMany(mappedBy = "simulation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Population> populationList;
}
