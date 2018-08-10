export class Ingredient {
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}

// The above is the same as the shortcut below:
// export class Ingredient {
//   constructor(public name: string, public: amount: number) {}
// }