import { describe } from "mocha";
import { expect } from "chai";
import { from } from "rxjs";
import { mock, instance, when } from "ts-mockito";
import Calculadora from "../src/index";
import { ExternalService } from "../src/services/fetch";

describe("Prueba de Api", () => {
  it("Leer fecha", async function () {
    // Definir los mocks
    // 1.
    const mockedServiceCase: ExternalService = mock(ExternalService);

    // 2.
    const respuestaFicti = {
      unixtime: 1630611559,
    };
    when(mockedServiceCase.get(Calculadora.URL)).thenResolve(respuestaFicti);
    // 3.
    const mockedService: ExternalService = instance(mockedServiceCase);

    // Invocar la función de código nuestra
    const calc = new Calculadora(mockedService);

    const fecha = await calc.procesarTiempo();

    console.log(fecha);
  });

  it("Asegurar que cuando el servicio tercero está dañado, me retorne la fecha 0", async function () {
    // Definir los mocks
    // 1.
    const mockedServiceCase: ExternalService = mock(ExternalService);

    // 2.
    when(mockedServiceCase.get(Calculadora.URL)).thenReject(
      new Error("Timeout")
    );
    // 3.
    const mockedService: ExternalService = instance(mockedServiceCase);

    // Invocar la función de código nuestra
    const calc = new Calculadora(mockedService);

    const fecha = await calc.procesarTiempo();

    // Verificación de respuesta esperada
    expect(fecha.getTime()).to.equal(0);
  });

  it("Leer fecha con observables", async function () {
    // Definir los mocks
    // 1.
    const mockedServiceCase: ExternalService = mock(ExternalService);

    // 2.
    const respuestaFicti = Promise.resolve({
      unixtime: 1630611559,
    });
    const observable = from(respuestaFicti);
    when(mockedServiceCase.getObs(Calculadora.URL)).thenReturn(observable);
    // 3.
    const mockedService: ExternalService = instance(mockedServiceCase);

    // Invocar la función de código nuestra
    const calc = new Calculadora(mockedService);

    const fecha = await calc.getTimeObs();

    console.log(fecha);
  });
});
