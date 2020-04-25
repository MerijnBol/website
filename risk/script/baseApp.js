window.onload = function() {
//Setup the dice objectclasses:
class baseDice { 
	constructor(name) {
		this._name = name;
		this._path = document.getElementById(name);
		this._value = 0;
		this.rollDice = function() { //prototype method
			this.value = random6();
			this.setDiceImage();
		}
	}
	get name() {
		return this._name;
	}
	get path() {
		return this._path;
	}
	get value() {
		return this._value;
	}
	set value(input) {
		this._value = input;
	}
}

class redDice extends baseDice {
	constructor(name) {
		super(name);
		this.setDiceImage = function() { //check for value and sets corr. icon.
			if (this.value == 1) {
			this.path.src = "library/dice_images/r1.png";
			} else if (this.value == 2) {
				this.path.src = "library/dice_images/r2.png";
			} else if (this.value == 3) {
				this.path.src = "library/dice_images/r3.png";
			} else if (this.value == 4) {
				this.path.src = "library/dice_images/r4.png";
			} else if (this.value == 5) {
				this.path.src = "library/dice_images/r5.png";
			} else if (this.value == 6) {
				this.path.src = "library/dice_images/r6.png";
			}
		}
		this.resetDice = function() {
			this.path.src = "library/dice_images/rBase.png";
			this.value = 0;
		}
	}
}

class blueDice extends baseDice {
	constructor(name) {
		super(name);
		this.setDiceImage = function() {
			if (this.value == 1) {
				this.path.src = "library/dice_images/b1.png";
			} else if (this.value == 2) {
				this.path.src = "library/dice_images/b2.png";
			} else if (this.value == 3) {
				this.path.src = "library/dice_images/b3.png";
			} else if (this.value == 4) {
				this.path.src = "library/dice_images/b4.png";
			} else if (this.value == 5) {
				this.path.src = "library/dice_images/b5.png";
			} else if (this.value == 6) {
				this.path.src = "library/dice_images/b6.png";
			}
		}
		this.resetDice = function() {
			this.path.src = "library/dice_images/bBase.png";
			this.value = 0;
		}
	}
}
	dice_r1 = new redDice('dice_r1');
	dice_r2 = new redDice('dice_r2');
	dice_r3 = new redDice('dice_r3');
	dice_b1 = new blueDice('dice_b1');
	dice_b2 = new blueDice('dice_b2');

runningConquest = false;

} // initialization ends here

function random6() {
	return Math.floor(Math.random()*6)+1;
}

var attackerRolled = false;
var attackerRolledOne = false; //defende can't throw 2 if attacker throws 1 dice.

function attackOne() { //activate rolldice, reset unrolled dice, reset defence
	if (attackerRolled) {
		window.alert("Defending turn")
	} else {
		dice_r1.rollDice();
		dice_r2.resetDice();
		dice_r3.resetDice();
		resetBoard();
		if (runningConquest) { //set next round number if active
			nextRound();
		}
		attackerRolled = true;
		attackerRolledOne = true;
	}
}
function attackTwo() {
	if (attackerRolled) {
		window.alert("Defending turn")
	} else {
		if (runningConquest) { //set next round number if active
			if (attacker.units <= 2 ) {
				window.alert("Not enough units");
				return;
			} else {
				nextRound();
				attackerRolled = true;
				attackerRolledOne = false;
			}
		}
		dice_r1.rollDice();
		dice_r2.rollDice();
		dice_r3.resetDice();
		resetBoard();
		attackerRolled = true;
		attackerRolledOne = false;
	}
}
function attackThree() {
	if (attackerRolled) {
		window.alert("Defending turn")
	} else {
		if (runningConquest) { //set next round number if active
			if (attacker.units <= 3 ) {
				window.alert("Not enough units");
				return;
			} else {
				nextRound();
				attackerRolled = true;
				attackerRolledOne = false;
			}
		}
		dice_r1.rollDice();
		dice_r2.rollDice();
		dice_r3.rollDice();
		resetBoard();
		attackerRolled = true;
		attackerRolledOne = false;
	}
}
function defendOne() {//roll defence and initiate calc result
	if (attackerRolled) {
		dice_b1.rollDice();
		calculateResult();
		if (runningConquest) { //run Conquest logic if active
			calculateUnits();
		}
	} else {
		window.alert("Attack first")
	}
}
function defendTwo() { //check if attacked and if attacked with >2
	if (attackerRolled) {
		if (attackerRolledOne) {
			window.alert("You can't throw 2");
		} else {
			if (runningConquest && defender.units <= 1) { //must have 2 units to defend with 2 (duh)
				window.alert("Not enough units");
				return;
			}
			dice_b1.rollDice();
			dice_b2.rollDice();
			calculateResult();
			if (runningConquest) { //run Conquest logic if active
			calculateUnits();
		}
		}
	} else {
		window.alert("Attack first")
	}
}
function resetBoard() {
	dice_b1.resetDice();
	dice_b2.resetDice();
	document.getElementById("attackerLost_1").style.display = "none";
	document.getElementById("attackerLost_2").style.display = "none";
	document.getElementById("defenderLost_1").style.display = "none";
	document.getElementById("defenderLost_2").style.display = "none";
	attackerRolled = false;
}
function resetAll() {
	dice_r1.resetDice();
	dice_r2.resetDice();
	dice_r3.resetDice();
	resetBoard();
}
function highestFirst(a,b) { //sorting function
	return b - a ;
}
function calculateResult() { //logic for deciding losses
	var attWinsRound1 = true;
	const attacker = new Array(dice_r1.value,dice_r2.value,dice_r3.value);
	const defender = new Array(dice_b1.value,dice_b2.value);
	attacker.sort(highestFirst);
	defender.sort(highestFirst);
	attackerUnitsLost = 0; //these are not needed here, they are for
	defenderUnitsLost = 0; //the logic of keeping track of conquests
	if (defender[0] >= attacker[0] ) { // determine first round
		document.getElementById("attackerLost_1").style.display = "inline-block";
		attWinsRound1 = false;
		attackerUnitsLost += 1;
	} else {
		document.getElementById("defenderLost_1").style.display = "inline-block";
		attWinsRound1 = true;
		defenderUnitsLost += 1;
	}
	if (defender[1] > 0) {//only carry on if defence throws two dice
		if (defender[1] >= attacker[1] ) {
			attackerUnitsLost += 1;
			if (attWinsRound1) {
				document.getElementById("attackerLost_1").style.display = "inline-block";
			} else {
				document.getElementById("attackerLost_2").style.display = "inline-block";
			}
		} else {
			defenderUnitsLost += 1;
			if (attWinsRound1) {
				document.getElementById("defenderLost_2").style.display = "inline-block";
			} else {
				document.getElementById("defenderLost_1").style.display = "inline-block";
			}
		}
	}
	attackerRolled = false;
}
// this part is for the logic of running Conquests
function engageConquest() {
	if (! runningConquest) {
		if (document.getElementById("attacker_input").value <= 1 ||
			document.getElementById("defender_input").value <= 0 ) {
			window.alert("Input valid army sizes")
		} else {
			setupConquest();
		}
	}
}

function setupConquest() { //setup the conquest
	resetAll();
	class Army {
		constructor(name, units) {
			this._name = name;
			this._path = document.getElementById(name);
			this._units = units;
		}
		get name() {
			return this._name;
		}
		get path() {
			return this._path;
		}
		get units() {
			return this._units;
		}
		set units(input) {
			this._units = input;
		}
	}

	const attacking_units = document.getElementById("attacker_input").value;
	const defending_units = document.getElementById("defender_input").value;
	attacker = new Army('attacker_units_left', attacking_units);//link the input field to the constructor
	defender = new Army('defender_units_left', defending_units);
	document.getElementById("attacker_input").value = ""; //reset input field
	document.getElementById("defender_input").value = "";
	turnCounter = 0;
	document.getElementById("reset_button").innerHTML = "Attack!" //get on with it already
	runningConquest = true;
	attacker.path.innerHTML = attacker.units + " units left"; //show the starting amount of units
	defender.path.innerHTML = defender.units + " units left";
	document.getElementById("reset_Conquest").style.display = "inline-block";
}

function nextRound() {
	turnCounter += 1;
	document.getElementById("reset_button").innerHTML = "Round " + turnCounter;
}
function calculateUnits() {
	attacker.units -= attackerUnitsLost;
	defender.units -= defenderUnitsLost;
	if (attacker.units <= 1 || defender.units <= 0) { //attacker with 1 unit is done attacking
		winnersAndLosers();
	} else {
		attacker.path.innerHTML = attacker.units + " units left";
		defender.path.innerHTML = defender.units + " units left";
	}
}

function resetConquest() {
	resetAll();
	document.getElementById("reset_button").innerHTML = "Start Conquest";
	runningConquest = false;
	attacker.path.innerHTML = "";
	defender.path.innerHTML = "";
	document.getElementById("reset_Conquest").style.display = "none";
}
function winnersAndLosers() {
	runningConquest = false;
	if (attacker.units <= 1) {
		defender.path.innerHTML = "Winner! (" + defender.units + " units)";
		if (attacker.units == 1) {
			attacker.path.innerHTML = "1 unit left, loser!";
		} else {
			attacker.path.innerHTML = "Loser!";
		}
	} else if (defender.units <= 0) {
		attacker.path.innerHTML = "Winner! (" + attacker.units + " units)";;
		defender.path.innerHTML = "Loser!";
	}
	document.getElementById("reset_button").innerHTML = "Start Conquest";
}