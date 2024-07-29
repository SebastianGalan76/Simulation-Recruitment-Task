package com.task.Simulation.controller;

import com.task.Simulation.data.Response;
import com.task.Simulation.database.model.Simulation;
import com.task.Simulation.service.SimulationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Data
@RequiredArgsConstructor
public class SimulationController {
    final SimulationService simulationService;

    @PostMapping("/api/simulation")
    public Response createSimulation(@RequestBody Simulation simulation){
        return simulationService.createSimulation(simulation);
    }
}
