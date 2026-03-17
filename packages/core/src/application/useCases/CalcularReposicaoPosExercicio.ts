import type { AtividadeRepository } from "../interfaces/AtividadeRepository.js";
import { CalculadoraNutricional } from "../../domain/services/CalculadoraNutricional.js";
import { DistribuicaoMacronutrientes } from "../../domain/entities/DistribuicaoMacronutrientes.js";
import { Macronutrientes } from "../../domain/entities/Macronutrientes.js";

export interface EntradaCalcularReposicao {
  usuarioId: string;
  dataInicio: Date;
  dataFim: Date;
  distribuicao?: DistribuicaoMacronutrientes;
}

export class CalcularReposicaoPosExercicioUseCase {
  constructor(
    private readonly atividadeRepository: AtividadeRepository,
    private readonly calculadoraNutricional: CalculadoraNutricional
  ) {}

  async executar(entrada: EntradaCalcularReposicao): Promise<{
    totalKcalGasto: number;
    macronutrientesSugeridos: {
      carboidratosGramas: number;
      proteinasGramas: number;
      gordurasGramas: number;
    };
  }> {
    const atividades = await this.atividadeRepository.buscarPorPeriodo(
      entrada.usuarioId,
      entrada.dataInicio,
      entrada.dataFim
    );

    const totalKcal = atividades.reduce(
      (acc, atividade) => acc + atividade.calorias,
      0
    );

    const macros = this.calculadoraNutricional.calcular(
      totalKcal,
      entrada.distribuicao || new DistribuicaoMacronutrientes()
    );

    return {
      totalKcalGasto: totalKcal,
      macronutrientesSugeridos: {
        carboidratosGramas: macros.carboidratos,
        proteinasGramas: macros.proteinas,
        gordurasGramas: macros.gorduras,
      },
    };
  }
}
