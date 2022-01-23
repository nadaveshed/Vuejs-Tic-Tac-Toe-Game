<template>

  <div class="container">
    <div class="title"> Tic tac toe</div>
<!--    <p id="demo">Player {{player}} turn</p>-->
    <div class="game">
      <div id="cell0" class="cell" @click="play(0, false);">{{ gameArray[0] }}</div>
      <div id="cell1" class="cell" @click="play(1, false)">{{ gameArray[1] }}</div>
      <div id="cell2" class="cell" @click="play(2, false)">{{ gameArray[2] }}</div>
      <div id="cell3" class="cell" @click="play(3, false)">{{ gameArray[3] }}</div>
      <div id="cell4" class="cell" @click="play(4, false)">{{ gameArray[4] }}</div>
      <div id="cell5" class="cell" @click="play(5, false)">{{ gameArray[5] }}</div>
      <div id="cell6" class="cell" @click="play(6, false)">{{ gameArray[6] }}</div>
      <div id="cell7" class="cell" @click="play(7, false)">{{ gameArray[7] }}</div>
      <div id="cell8" class="cell" @click="play(8, false)">{{ gameArray[8] }}</div>
    </div>
    <div class="gameResult">
      <div id="winner" v-if="gameOver"> Winner is {{winner}} </div>
      <div v-if="tie"> Game is Tie </div>
    </div>
    <button class="resetButton" @click="resetBoard()" v-if="gameOver || tie">RESET BOARD</button>

  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io("http://localhost:3000")
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      gameArray: ["", "", "", "", "", "", "", "", ""],
      currentTurn: "",
      winner: "",
      tie: false,
      player: "1",
      playerTurn: true,
      gameOver: false,
    }
  },
  methods: {
    play(index, drawFromOther) {

      if(!this.gameOver) {
        if (this.playerTurn) {
          this.gameArray[index] = "X"
        } else {
          this.gameArray[index] = "O"
        }
        document.getElementById(`cell${index}`).innerHTML = this.gameArray[index];
        if (!drawFromOther) {
          socket.emit("play", index, this.player)
        }
        console.log("content", this.gameArray)
        this.playerTurn = !this.playerTurn;
        // this.playing();
        this.checkForWin();
        this.checkForTie();
      }
    },
    playing() {
      if(this.playerTurn) {
        this.player = " player 1"
      } else {
        this.player = " player 2"
      }
    },
    checkForWin() {
      const winsCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

      for (let i = 0; i < winsCombinations.length; i++) {
        let firstIndex = winsCombinations[i][0];
        let secondIndex = winsCombinations[i][1];
        let thirdIndex = winsCombinations[i][2];
        if(this.gameArray[firstIndex] == this.gameArray[secondIndex] &&
            this.gameArray[firstIndex] == this.gameArray[thirdIndex] &&
            this.gameArray[firstIndex] != "") {
          this.gameOver = true;

          this.winner = this.gameArray[firstIndex];
        }
      }
    },
    checkForTie(){
      for (let i = 0 ; i<= 8 ; i++) {
        if(this.gameArray[i] == "") {
          return
        }
      }
      this.tie = true;
    },
    resetBoard() {
      for (let i=0; i<= 8; i++) {
        this.gameArray[i] = ""
        this.gameOver = false;
        this.winner = ""
        this.tie = false
        document.getElementById(`cell${i}`).innerHTML = this.gameArray[i];
      }
    }
  },
  created() {
    socket.on("play", (index) => {
      console.log("received index", index)
      this.play(index, true, "player 1")
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.game {
  display: grid;
  width: 300px;
  height: 300px;
  grid-template-columns: auto auto auto;
}

.cell {
  display: flex;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  border: 3px solid black;
  transition: background 0.2s ease-in-out;
}

#cell0,
#cell1,
#cell2 {
  border-top: none;
}
#cell0,
#cell3,
#cell6 {
  border-left: none;
}
#cell6,
#cell7,
#cell8 {
  border-bottom: none;
}
#cell2,
#cell5,
#cell8 {
  border-right: none;
}

.resetButton {
  border: 4px solid green;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
}
</style>