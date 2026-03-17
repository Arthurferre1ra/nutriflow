import { Atividade } from "../../domain/entities/Atividade.js";

export interface AtividadeRepository {
  buscarPorPeriodo(usuarioId: string, inicio: Date, fim: Date): Promise<Atividade[]>;
}
