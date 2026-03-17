export class Macronutrientes {
  constructor(
    public readonly carboidratos: number,
    public readonly proteinas: number,
    public readonly gorduras: number,
    public readonly totalKcal: number = 0
  ) {}
}
