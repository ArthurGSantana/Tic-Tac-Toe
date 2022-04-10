import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Gamelogic } from './classes/gamelogic';

@Component({
  selector: 'tic-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  @ViewChild('currentStatus') currentStatus!: ElementRef;

  constructor(
    public gameLogic: Gamelogic
  ) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.gameLogic.gameStart();
    const currentPlayer = `Jogador da Rodada: Jogador ${this.gameLogic.currentTurn}`;
    this.currentStatus.nativeElement.innerHTML = currentPlayer;
  };

  async clickSubfield(subfield: any): Promise<void> {
    if(this.gameLogic.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');

      const isExist = this.gameLogic.setField(position, this.gameLogic.currentTurn);

      console.log(isExist)

      if(!isExist) {
        const color = this.gameLogic.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);
        subfield.target.firstChild.className = (this.gameLogic.currentTurn === 1) ? 'fas fa-dot-circle' : 'fas fa-times ';
      };
    };

    await this.gameLogic.checkGameEndWinner().then((answer: boolean) => {
      if(this.gameLogic.gameStatus === 1 && answer) {
        this.currentStatus.nativeElement.innerHTML = `Ganhador: Jogador ${this.gameLogic.currentTurn}`;
        this.gameLogic.gameStatus = 0;
      };
    });

    await this.gameLogic.checkGameEndFull().then((answer: boolean) => {
      if(this.gameLogic.gameStatus === 0 && answer) {
        this.currentStatus.nativeElement.innerHTML = 'Nenhum Ganhador!';
      };
    });

    this.gameLogic.changePlayer();

    if(this.gameLogic.gameStatus === 1) {
      const currentPlayer = `Jogador da Rodada: Jogador ${this.gameLogic.currentTurn}`;
      this.currentStatus.nativeElement.innerHTML = currentPlayer;
    };
  };

}
