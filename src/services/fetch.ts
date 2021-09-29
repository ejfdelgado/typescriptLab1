import fetch from "node-fetch";
import { from, Observable, map } from "rxjs";
import { FechaModel } from "../model/Fecha";

export class ExternalService {
  async get(url: string): Promise<FechaModel> {
    const rta = fetch(url);
    const content = await rta.then((res) => res.json());
    const fecha: FechaModel = {
      unixtime: content.unixtime,
    };
    return fecha;
  }

  getObs(url: string): Observable<FechaModel> {
    const rta = fetch(url);
    const parsed = from(rta.then((res) => res.json()));
    console.log("parsed", parsed);
    const answer = parsed.pipe(map((x: FechaModel) => <FechaModel>x));
    console.log("answer", answer);
    return answer;
  }
}
