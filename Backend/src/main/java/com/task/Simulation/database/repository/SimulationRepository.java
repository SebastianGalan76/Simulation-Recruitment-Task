package com.task.Simulation.database.repository;

import com.task.Simulation.database.model.Simulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimulationRepository extends JpaRepository<Simulation, Long> {
}
