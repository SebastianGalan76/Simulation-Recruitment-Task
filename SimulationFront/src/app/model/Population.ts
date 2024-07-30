export class Population {
  id: number;
  pi: number;
  pv: number;
  pm: number;
  pr: number;

  constructor(
    id: number,
    pi: number,
    pv: number,
    pm: number,
    pr: number,
  ) {
    this.id = id;
    this.pi = pi;
    this.pv = pv;
    this.pm = pm;
    this.pr = pr;
  }
}