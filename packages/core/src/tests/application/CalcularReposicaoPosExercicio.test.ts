import { CalcularReposicaoPosExercicioUseCase } from "../../application/useCases/CalcularReposicaoPosExercicio.js";
import { Atividade } from "../../domain/entities/Atividade.js";
import { CalculadoraNutricional } from "../../domain/services/CalculadoraNutricional.js";
import { AtividadeRepositoryMemory } from "../../infrastructure/repositories/AtividadeRepositoryMemory.js";

describe("CalcularReposicaoPosExercicioUseCase", () => {
  let useCase: CalcularReposicaoPosExercicioUseCase;
  let repository: AtividadeRepositoryMemory;
  let calculadora: CalculadoraNutricional;

  beforeEach(() => {
    repository = new AtividadeRepositoryMemory();
    calculadora = new CalculadoraNutricional();
    useCase = new CalcularReposicaoPosExercicioUseCase(repository, calculadora);
  });

  it("deve calcular a reposição nutricional com base nas atividades do período", async () => {
    const usuarioId = "user-123";
    const dataInicio = new Date("2023-10-01T08:00:00Z");
    const dataFim = new Date("2023-10-01T12:00:00Z");

    await repository.salvar(usuarioId, new Atividade("1", "Corrida", 400, new Date("2023-10-01T09:00:00Z")));
    await repository.salvar(usuarioId, new Atividade("2", "Musculação", 300, new Date("2023-10-01T10:30:00Z")));
    await repository.salvar("outro-user", new Atividade("3", "Natação", 500, new Date("2023-10-01T09:30:00Z")));
    await repository.salvar(usuarioId, new Atividade("4", "Ciclismo", 600, new Date("2023-10-02T09:00:00Z"))); // Fora do período

    const resultado = await useCase.executar({
      usuarioId,
      dataInicio,
      dataFim
    });

    // Total kcal: 400 + 300 = 700 kcal
    // Distribuicao padrao: Carbs(55%) 385kcal=96.25g | Prot(25%) 175kcal=43.75g | Gord(20%) 140kcal=15.56g
    expect(resultado.totalKcalGasto).toBe(700);
    expect(resultado.macronutrientesSugeridos.carboidratosGramas).toBe(96.25);
    expect(resultado.macronutrientesSugeridos.proteinasGramas).toBe(43.75);
    expect(resultado.macronutrientesSugeridos.gordurasGramas).toBe(15.56);
  });
});
