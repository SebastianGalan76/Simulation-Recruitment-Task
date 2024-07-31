package com.task.Simulation.database.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Population {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    int pi;
    int pv;
    int pm;
    int pr;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "simulation_id")
    private Simulation simulation;

    public Population(int pi, int pv, int pm, int pr) {
        this.pi = pi;
        this.pv = pv;
        this.pm = pm;
        this.pr = pr;
    }
}
