function getRandomValue(min, max){
    return Math.floor(Math.random()* (max-min))+min;
}

const app = Vue.createApp({
    data() {
        return {
          playerHealth : 100,
          monsterHealth : 100,
          currentRound: 0,
          winner : null,
          logMessages : []
        };
    },
    computed : {
        monsterBarStyle(){
            return {width: this.monsterHealth+'%'}
        },
        playerBarStyle(){
            return {width: this.playerHealth+'%'}
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch : {
        playerHealth(value){
            // Draw condition
            if(value === 0 && this.monsterHealth === 0){
                this.winner = 'draw';
            } 
            // Player lost
            else if( value === 0 ){
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            // Draw Condition
            if(value === 0 && this.playerHealth === 0){
                this.winner = 'draw';
            }
            // Monster lost
            else if(value === 0){
                this.winner = 'player';
            }
        }
    },
    methods : {
        attackMonster() {
            console.log("Attacked Monster!!");
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.monsterHealth = (this.monsterHealth>0) ? this.monsterHealth : 0;
            this.attackPlayer(); 
            this.addLogMessage('player', 'attack', attackValue);
        },
        attackPlayer() {
            console.log("Monster Attacked You!!")
            const attackValue = getRandomValue(7,14);
            this.playerHealth -= attackValue;
            this.playerHealth = (this.playerHealth>0) ? this.playerHealth : 0;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            console.log("Special Attack from your side!!");
            this.currentRound++;
            const attackValue = getRandomValue(10,17);
            this.monsterHealth -= attackValue;
            this.monsterHealth = (this.monsterHealth>0) ? this.monsterHealth : 0;
            this.attackPlayer();
            this.addLogMessage('player', 'attack', attackValue);
        },
        healPlayer(){
            console.log("You healed yourself");
            this.currentRound++;
            const healValue = getRandomValue(7,18);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addLogMessage('player', 'heal', healValue);
        },
        surrenderPlayer() {
            this.winner = 'monster'
        },
        startNewGame(){
            location.reload();
        },
        addLogMessage (who, what, value){
            this.logMessages.unshift({
                actionBy : who,
                actionType : what,
                actionValue : value
            });


        }
    }
})

app.mount('#game')