import { from } from "rxjs";
import { ExternalService } from "./services/fetch";
import { FechaModel } from "./model/Fecha";

export async function main() : Promise<string> {
  const libreriaReal = new ExternalService();
  const calc = new Calculadora(libreriaReal);
  const pet1 = await calc.getTimeObs();
  const pet2 = await calc.procesarTiempo();
  return `${pet1.toISOString()} - ${pet2.toISOString()}`;
}

export class Calculadora {
  static URL = "https://worldtimeapi.org/api/timezone/America/Bogota";
  externalService: ExternalService;

  constructor(externalService: ExternalService) {
    this.externalService = externalService;
  }

  async procesarTiempo(): Promise<Date> {
    console.log("procesarTiempo");
    try {
      const data = await this.externalService.get(Calculadora.URL);
      console.log(data);
      return new Date(data.unixtime * 1000);
    } catch (e) {
      // Enviar correo avisando que falló
      console.log("Averiguar qué está pasando porque falló");
      // Otra cosa
      return new Date(0);
    }
  }

  testRxJs() : void {
    const promesa = this.externalService.get(Calculadora.URL);
    const data = from(promesa);
    data.subscribe({
      next(response: FechaModel) {
        console.log("Response: " + response);
      },
      error(err: Error) {
        console.error("Error: " + err);
      },
      complete() {
        console.log("Completed");
      },
    });
  }

  async getTimeObs(): Promise<Date> {
    const data = await this.externalService.getObs(Calculadora.URL).toPromise();
    console.log("data", data);
    if (data && data.unixtime) {
      return new Date(data.unixtime * 1000);
    }
    return new Date(0);
  }
}

main().then((rta) => {
  console.log(rta);
});

export default Calculadora;
