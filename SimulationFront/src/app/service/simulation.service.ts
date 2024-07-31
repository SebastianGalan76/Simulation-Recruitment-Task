import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimulationDto } from '../model/SimulationDto';
import { Simulation } from '../model/Simulation';
import { Response } from '../model/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private readonly URL = "http://localhost:8080/api/simulation";

  constructor(private http: HttpClient) { 
  }

  loadAllSimulations(): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(this.URL);
  }

  getSimulation(simulationId: number): Observable<Simulation>{
    return this.http.get<Simulation>(this.URL+"/"+simulationId);
  }

  deleteSimulation(simulationId: number){
    this.http.delete(this.URL + '/'+simulationId).subscribe();
  }

  createSimulation(simulation: SimulationDto): Observable<Response>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Response>(this.URL, simulation, { headers });
  }

  editSimulation(simulationId: number, simulation: SimulationDto): Observable<Response>{
    return this.http.put<Response>(this.URL +"/"+simulationId, simulation);
  }
}
