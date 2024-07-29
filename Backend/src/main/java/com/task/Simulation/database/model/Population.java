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

    public Population(Population other) {
        this.id = other.id;
        this.pi = other.pi;
        this.pv = other.pv;
        this.pm = other.pm;
        this.pr = other.pr;
        this.simulation = other.simulation;
    }

    public Population(int pi, int pv, int pm, int pr) {
        this.pi = pi;
        this.pv = pv;
        this.pm = pm;
        this.pr = pr;
    }
}
