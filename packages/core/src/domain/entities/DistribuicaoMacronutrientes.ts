export class DistribuicaoMacronutrientes {
  constructor(
    public readonly percentualCarboidratos: number = 0.55,
    public readonly percentualProteinas: number = 0.25,
    public readonly percentualGorduras: number = 0.20
  ) {
    this.validarProporcao();
  }

  private validarProporcao(): void {
    const total = this.percentualCarboidratos + this.percentualProteinas + this.percentualGorduras;
    if (Math.abs(total - 1.0) > 0.0001) {
      throw new Error("A soma dos percentuais deve ser exatamente 1 (100%)");
    }
  }
}
