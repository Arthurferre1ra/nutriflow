import type { AtividadeRepository } from "../../application/interfaces/AtividadeRepository.js";
import { Atividade } from "../../domain/entities/Atividade.js";

export class AtividadeRepositoryMemory implements AtividadeRepository {
  private atividades: Map<string, Atividade[]> = new Map();

  async buscarPorPeriodo(usuarioId: string, inicio: Date, fim: Date): Promise<Atividade[]> {
    const atividadesDoUsuario = this.atividades.get(usuarioId) || [];
    return atividadesDoUsuario.filter(
      (atividade) => atividade.data >= inicio && atividade.data <= fim
    );
  }

  async salvar(usuarioId: string, atividade: Atividade): Promise<void> {
    const atividadesDoUsuario = this.atividades.get(usuarioId) || [];
    atividadesDoUsuario.push(atividade);
    this.atividades.set(usuarioId, atividadesDoUsuario);
  }
}
