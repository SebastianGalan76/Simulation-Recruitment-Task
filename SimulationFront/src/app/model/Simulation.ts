export class Simulation {
    n: string;
    p: number;
    i: number;
    r: number;
    m: number;
    ti: number;
    tm: number;
    ts: number;

    constructor(
        n: string,
        p: number,
        i: number,
        r: number,
        m: number,
        ti: number,
        tm: number,
        ts: number
      ) {
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