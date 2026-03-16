export class Atividade {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly kcalGasto: number,
    public readonly data: Date
  ) {}
}
