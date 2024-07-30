package com.task.Simulation.service;

import com.task.Simulation.data.Response;
import com.task.Simulation.database.model.Population;
import com.task.Simulation.database.model.Simulation;
import com.task.Simulation.database.repository.PopulationRepository;
import com.task.Simulation.database.repository.SimulationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SimulationService {
    final SimulationRepository simulationRepository;
    final PopulationRepository populationRepository;

    @Transactional
    public Response createSimulation(Simulation simulation){
        simulation = simulationRepository.save(simulation);
        simulation.setPopulationList(calculateSimulation(simulation));

        return Response.builder().status(HttpStatus.OK).build();
    }

    private List<Population> calculateSimulation(Simulation simulation) {
        int p = simulation.getP();
        int i = simulation.getI();
        float r = simulation.getR();
        float m = simulation.getM();
        int ti = simulation.getTi();
        int tm = simulation.getTm();
        int ts = simulation.getTs();

        List<Population> populationPerDay = new ArrayList<>();

        Population initialPopulation = new Population(i, p - i, 0, 0);
        populationPerDay.add(initialPopulation);
        initialPopulation.setSimulation(simulation);
        populationRepository.save(initialPopulation);

        int[] infectedPerDay = new int[ts];
        infectedPerDay[0] = i;

        for (int day = 1; day < simulation.getTs(); day++) {
            int newDeaths = 0, newInfected = 0, newRecoveries = 0;
            Population previousDay = populationPerDay.get(day - 1);

            if (day >= tm) {
                newDeaths = (int) (infectedPerDay[day - tm] * m);
            }
            if (day >= ti) {
                newRecoveries = (int) (infectedPerDay[day - ti] * (1 - m));
            }

            newInfected = (int) (previousDay.getPi() * r);
            newInfected = Math.min(newInfected, previousDay.getPv());
            infectedPerDay[day] = newInfected;

            Population population = new Population();
            population.setPi(previousDay.getPi() + newInfected - newDeaths - newRecoveries);
            population.setPm(previousDay.getPm() + newDeaths);
            population.setPr(previousDay.getPr() + newRecoveries);
            population.setPv(previousDay.getPv() - newInfected);
            population.setSimulation(simulation);

            populationPerDay.add(population);
            populationRepository.save(population);
        }

        return populationPerDay;
    }

    public Simulation getById(Long id) {
        return simulationRepository.findById(id).orElse(null);
    }

    @Transactional
    public Response editSimulation(Long id, Simulation simulation) {
        Simulation savedSimulation = getById(id);
        if(savedSimulation == null){
            return Response.builder().status(HttpStatus.BAD_REQUEST).build();
        }

        savedSimulation.setN(simulation.getN());
        savedSimulation.setP(simulation.getP());
        savedSimulation.setI(simulation.getI());
        savedSimulation.setR(simulation.getR());
        savedSimulation.setM(simulation.getM());
        savedSimulation.setTi(simulation.getTi());
        savedSimulation.setTm(simulation.getTm());
        savedSimulation.setTs(simulation.getTs());

        while (!savedSimulation.getPopulationList().isEmpty()) {
            savedSimulation.getPopulationList().remove(0);
        }

        savedSimulation.getPopulationList().addAll(calculateSimulation(savedSimulation));

        simulationRepository.save(savedSimulation);
        return Response.builder().status(HttpStatus.OK).build();
    }
}
