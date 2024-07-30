import { Population } from "./Population";

export class Simulation {
  id: number;
  n: string;
  p: number;
  i: number;
  r: number;
  m: number;
  ti: number;
  tm: number;
  ts: number;

  populationList: Population[];

  constructor(
    id: number,
    n: string,
    p: number,
    i: number,
    r: number,
    m: number,
    ti: number,
    tm: number,
    ts: number,
    populationList: Population[]
  ) {
    this.id = id;
    this.n = n;
    this.p = p;
    this.i = i;
    this.r = r;
    this.m = m;
    this.ti = ti;
    this.tm = tm;
    this.ts = ts;
    this.populationList = populationList;
  }
}