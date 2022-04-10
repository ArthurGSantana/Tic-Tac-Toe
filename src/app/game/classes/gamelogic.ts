import { Status } from './gameStatus.enum';

export class Gamelogic {

  gameField: number[] = [];
  currentTurn!: number;
  gameStatus!: Status;

  winSituationOne: Array<number[]> = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
  ];

  winSituationTwo: Array<number[]> = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 2],
    [0, 0, 2, 0, 2, 0, 2, 0, 0],
    [2, 0, 0, 0, 2, 0, 0, 0, 2],
  ];

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  gameStart(): void {
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    this.gameStatus = Status.START;
  };

  randomPlayerStart(): number {
    const startPlayer = Math.floor(Math.random() * 2) + 1;
    return startPlayer;
  };

  setField(position: number, player: number): boolean {
    let isExist = this.gameField[position] !== 0;
    if(this.gameField[position] === 0) this.gameField[position] = player;

    return isExist;
  };

  getPlayerColorClass(): string {
    const colorClass = (this.currentTurn === 2) ? 'player2' : 'player1';
    return colorClass;
  };

  changePlayer(): void {
    this.currentTurn = this.currentTurn === 2 ? 1 : 2;
  };

  arrayEquals(a: any[], b: any[]): boolean {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => (value !== 0) ? value === b[index] : true);
  };

  async checkGameEndWinner(): Promise<boolean> {
    let isWinner = false;

    const checkArray = (this.currentTurn === 1) ? this.winSituationOne : this.winSituationTwo;

    const currentArray: any[] = [];

    this.gameField.forEach((subField, index) => {
      subField !== this.currentTurn ? currentArray[index] = 0 : currentArray[index] = subField;
    });

    checkArray.forEach((checkField, checkIndex) => {
      if(this.arrayEquals(checkField, currentArray)) isWinner = true;
    });

    return isWinner;
  };

  async checkGameEndFull(): Promise<boolean> {
    let isFull = true;

    if(this.gameField.includes(0)) isFull = false;

    if(isFull) this.gameEnd();

    return isFull;
  };

  gameEnd(): void {
    this.gameStatus = Status.STOP;
  };
}
