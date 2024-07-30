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

    constructor(
        id: number,
        n: string,
        p: number,
        i: number,
        r: number,
        m: number,
        ti: number,
        tm: number,
        ts: number
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
      }
}