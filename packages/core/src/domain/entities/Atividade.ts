export class Atividade {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly calorias: number,
    public readonly data: Date
  ) {}
}
