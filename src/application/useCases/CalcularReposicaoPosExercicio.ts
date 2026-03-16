import { DistribuicaoMacronutrientes } from "../../domain/entities/DistribuicaoMacronutrientes.js";
import { Macronutrientes } from "../../domain/entities/Macronutrientes.js";
import { CalculadoraNutricional } from "../../domain/services/CalculadoraNutricional.js";
import type { AtividadeRepository } from "../interfaces/AtividadeRepository.js";

export interface CalcularReposicaoInput {
  usuarioId: string;
  dataInicio: Date;
  dataFim: Date;
  percentualCarboidratos?: number;
  percentualProteinas?: number;
  percentualGorduras?: number;
}

export interface CalcularReposicaoOutput {
  totalKcalGasto: number;
  macronutrientesSugeridos: Macronutrientes;
}

export class CalcularReposicaoPosExercicioUseCase {
  constructor(
    private readonly atividadeRepository: AtividadeRepository,
    private readonly calculadoraNutricional: CalculadoraNutricional
  ) {}

  async executar(input: CalcularReposicaoInput): Promise<CalcularReposicaoOutput> {
    const atividades = await this.atividadeRepository.buscarPorPeriodo(
      input.usuarioId,
      input.dataInicio,
      input.dataFim
    );

    const totalKcalGasto = atividades.reduce(
      (soma, atividade) => soma + atividade.kcalGasto,
      0
    );

    const distribuicao = new DistribuicaoMacronutrientes(
      input.percentualCarboidratos,
      input.percentualProteinas,
      input.percentualGorduras
    );

    const macronutrientesSugeridos = this.calculadoraNutricional.calcular(
      totalKcalGasto,
      distribuicao
    );

    return {
      totalKcalGasto,
      macronutrientesSugeridos,
    };
  }
}
