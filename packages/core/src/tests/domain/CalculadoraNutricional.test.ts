import { CalculadoraNutricional } from "../../domain/services/CalculadoraNutricional.js";
import { DistribuicaoMacronutrientes } from "../../domain/entities/DistribuicaoMacronutrientes.js";

describe("CalculadoraNutricional", () => {
  let calculadora: CalculadoraNutricional;

  beforeEach(() => {
    calculadora = new CalculadoraNutricional();
  });

  it("deve calcular macronutrientes corretamente com a distribuicao padrao (55%, 25%, 20%)", () => {
    const totalKcal = 1000;
    const distribuicao = new DistribuicaoMacronutrientes();
    
    // Esperado:
    // Carboidratos: (1000 * 0.55) / 4 = 137.5g
    // Proteinas: (1000 * 0.25) / 4 = 62.5g
    // Gorduras: (1000 * 0.20) / 9 = 22.22g

    const resultado = calculadora.calcular(totalKcal, distribuicao);

    expect(resultado.carboidratos).toBe(137.5);
    expect(resultado.proteinas).toBe(62.5);
    expect(resultado.gorduras).toBe(22.22);
  });

  it("deve calcular macronutrientes corretamente com distribuicao customizada (40%, 40%, 20%)", () => {
    const totalKcal = 2500;
    const distribuicao = new DistribuicaoMacronutrientes(0.40, 0.40, 0.20);
    
    // Esperado:
    // Carboidratos: (2500 * 0.40) / 4 = 250g
    // Proteinas: (2500 * 0.40) / 4 = 250g
    // Gorduras: (2500 * 0.20) / 9 = 55.56g

    const resultado = calculadora.calcular(totalKcal, distribuicao);

    expect(resultado.carboidratos).toBe(250);
    expect(resultado.proteinas).toBe(250);
    expect(resultado.gorduras).toBe(55.56);
  });

  it("deve lançar erro se a soma dos percentuais não for 100%", () => {
    expect(() => {
      new DistribuicaoMacronutrientes(0.50, 0.40, 0.20); // 110%
    }).toThrow("A soma dos percentuais deve ser exatamente 1 (100%)");
  });
});
