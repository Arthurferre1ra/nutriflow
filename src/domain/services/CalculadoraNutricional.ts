import { DistribuicaoMacronutrientes } from "../entities/DistribuicaoMacronutrientes.js";
import { Macronutrientes } from "../entities/Macronutrientes.js";

export class CalculadoraNutricional {
  private static readonly KCAL_POR_GRAMA_CARBOIDRATO = 4;
  private static readonly KCAL_POR_GRAMA_PROTEINA = 4;
  private static readonly KCAL_POR_GRAMA_GORDURA = 9;

  public calcular(
    totalKcal: number,
    distribuicao: DistribuicaoMacronutrientes
  ): Macronutrientes {
    const kcalCarboidratos = totalKcal * distribuicao.percentualCarboidratos;
    const kcalProteinas = totalKcal * distribuicao.percentualProteinas;
    const kcalGorduras = totalKcal * distribuicao.percentualGorduras;

    return new Macronutrientes(
      this.arredondar(kcalCarboidratos / CalculadoraNutricional.KCAL_POR_GRAMA_CARBOIDRATO),
      this.arredondar(kcalProteinas / CalculadoraNutricional.KCAL_POR_GRAMA_PROTEINA),
      this.arredondar(kcalGorduras / CalculadoraNutricional.KCAL_POR_GRAMA_GORDURA)
    );
  }

  private arredondar(valor: number): number {
    return Number(Math.round(Number(valor + "e2")) + "e-2");
  }
}
