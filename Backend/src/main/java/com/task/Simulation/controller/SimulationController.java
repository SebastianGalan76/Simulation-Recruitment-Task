package com.task.Simulation.controller;

import com.task.Simulation.data.Response;
import com.task.Simulation.database.model.Simulation;
import com.task.Simulation.service.SimulationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Data
@RequestMapping("/api/simulation")
@RequiredArgsConstructor
public class SimulationController {
    final SimulationService simulationService;

    @PostMapping
    public Response createSimulation(@RequestBody Simulation simulation){
        return simulationService.createSimulation(simulation);
    }

    @GetMapping
    public List<Simulation> getAllSimulations(){
        return simulationService.getAll();
    }

    @GetMapping("/{id}")
    public Simulation getSimulationById(@PathVariable Long id){
        return simulationService.getById(id);
    }

    @PutMapping("/{id}")
    public Response editSimulation(@PathVariable Long id, @RequestBody Simulation simulation){
        return simulationService.editSimulation(id, simulation);
    }

    @DeleteMapping("/{id}")
    public void deleteSimulationById(@PathVariable Long id){
        simulationService.delete(id);
    }
}
