window.onload = function () {
    //Setup the dice objectclasses:
    class baseDice {
        constructor(name) {
            this._name = name;
            this._svg_dom = document.getElementById(this._name);
            this._svg_drawing_dom = this._svg_dom.getElementsByClassName(
                "dice-number-path"
            )[0];
            this.update_svg_drawing = function (value) {
                this._svg_drawing_dom.setAttribute("d", value);
            };
            this._set_;
            this._value = 0;
            this.rollDice = function () {
                //prototype method
                this.value = random6();
                console.log(this.name + " = " + this.value);
                this.update_svg_drawing(dice_content["face_" + this.value]);
            };
            this.resetDice = function () {
                this.value = 0;
                // this.svg_path.d = dice_content["reset"];
                // this.svg_path.attr("d", "test");
            };
        }
        get name() {
            return this._name;
        }
        get value() {
            return this._value;
        }
        set value(input) {
            this._value = input;
        }
    }

    dice_a1 = new baseDice("dice_a1");
    dice_a2 = new baseDice("dice_a2");
    dice_a3 = new baseDice("dice_a3");
    dice_d1 = new baseDice("dice_d1");
    dice_d2 = new baseDice("dice_d2");

    runningConquest = false;
}; // initialization ends here

var dice_content = {
    reset: "test",
    face_1:
        "M302.87 255.5a47.37 47.37 0 1 1-47.37-47.37 47.37 47.37 0 0 1 47.37 47.37zM484.5 428.02a56.48 56.48 0 0 1-56.48 56.48h-344a56.48 56.48 0 0 1-56.52-56.48v-344A56.48 56.48 0 0 1 83.98 27.5h344a56.48 56.48 0 0 1 56.52 56.48zm-20-344a36.48 36.48 0 0 0-36.48-36.52h-344A36.48 36.48 0 0 0 47.5 83.98v344a36.48 36.48 0 0 0 36.48 36.52h344a36.48 36.48 0 0 0 36.52-36.48z",
    face_2:
        "M383 81.68A47.37 47.37 0 1 1 335.58 129 47.37 47.37 0 0 1 383 81.68zM81.67 383A47.37 47.37 0 1 0 129 335.59 47.37 47.37 0 0 0 81.67 383zM428 47.57H84A36.48 36.48 0 0 0 47.57 84v344A36.48 36.48 0 0 0 84 464.43h344A36.48 36.48 0 0 0 464.43 428V84A36.48 36.48 0 0 0 428 47.57m0-20A56.54 56.54 0 0 1 484.43 84v344A56.54 56.54 0 0 1 428 484.43H84A56.54 56.54 0 0 1 27.57 428V84A56.54 56.54 0 0 1 84 27.57z",
    face_3:
        "M302.87 255.5a47.37 47.37 0 1 1-47.37-47.37 47.37 47.37 0 0 1 47.37 47.37zM382.5 81.18a47.37 47.37 0 1 0 47.32 47.32 47.37 47.37 0 0 0-47.32-47.32zm-254 253.91a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.41-47.41zm356 92.94a56.48 56.48 0 0 1-56.48 56.47h-344a56.48 56.48 0 0 1-56.52-56.48v-344A56.48 56.48 0 0 1 83.98 27.5h344a56.48 56.48 0 0 1 56.52 56.48zm-20-344a36.48 36.48 0 0 0-36.48-36.53h-344A36.48 36.48 0 0 0 47.5 83.98v344a36.48 36.48 0 0 0 36.48 36.52h344a36.48 36.48 0 0 0 36.52-36.48z",
    face_4:
        "M175.91 128.5a47.37 47.37 0 1 1-47.41-47.32 47.37 47.37 0 0 1 47.41 47.32zM382.5 81.18a47.37 47.37 0 1 0 47.32 47.32 47.37 47.37 0 0 0-47.32-47.32zm-254 253.91a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.41-47.41zm253.91 0a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.32-47.41zm102 92.93a56.48 56.48 0 0 1-56.39 56.48h-344a56.48 56.48 0 0 1-56.52-56.48v-344A56.48 56.48 0 0 1 83.98 27.5h344a56.48 56.48 0 0 1 56.52 56.48zm-20-344a36.48 36.48 0 0 0-36.39-36.52h-344A36.48 36.48 0 0 0 47.5 83.98v344a36.48 36.48 0 0 0 36.48 36.52h344a36.48 36.48 0 0 0 36.52-36.48z",
    face_5:
        "M302.87 255.5a47.37 47.37 0 1 1-47.37-47.37 47.37 47.37 0 0 1 47.37 47.37zM128.5 81.18a47.37 47.37 0 1 0 47.41 47.32 47.37 47.37 0 0 0-47.41-47.32zm253.91 0a47.37 47.37 0 1 0 47.41 47.32 47.37 47.37 0 0 0-47.32-47.32zM128.5 335.09a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.41-47.41zm253.91 0a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.32-47.41zm102 92.93a56.48 56.48 0 0 1-56.39 56.48h-344a56.48 56.48 0 0 1-56.52-56.48v-344A56.48 56.48 0 0 1 83.98 27.5h344a56.48 56.48 0 0 1 56.52 56.48zm-20-344a36.48 36.48 0 0 0-36.39-36.52h-344A36.48 36.48 0 0 0 47.5 83.98v344a36.48 36.48 0 0 0 36.48 36.52h344a36.48 36.48 0 0 0 36.52-36.48z",
    face_6:
        "M175.91 128.5a47.37 47.37 0 1 1-47.41-47.32 47.37 47.37 0 0 1 47.41 47.32zM382.5 81.18a47.37 47.37 0 1 0 47.32 47.32 47.37 47.37 0 0 0-47.32-47.32zm-254 126.95a47.37 47.37 0 1 0 47.41 47.37 47.37 47.37 0 0 0-47.41-47.37zm253.91 0a47.37 47.37 0 1 0 47.41 47.37 47.37 47.37 0 0 0-47.32-47.37zM128.5 335.09a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.41-47.41zm253.91 0a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.32-47.41zm102 92.93a56.48 56.48 0 0 1-56.39 56.48h-344a56.48 56.48 0 0 1-56.52-56.48v-344A56.48 56.48 0 0 1 83.98 27.5h344a56.48 56.48 0 0 1 56.52 56.48zm-20-344a36.48 36.48 0 0 0-36.39-36.52h-344A36.48 36.48 0 0 0 47.5 83.98v344a36.48 36.48 0 0 0 36.48 36.52h344a36.48 36.48 0 0 0 36.52-36.48z"
};

function random6() {
    return Math.floor(Math.random() * 6) + 1;
}

var attackerRolled = false;
var attackerRolledOne = false; //defender can't throw 2 if attacker throws 1 dice.

function attackOne() {
    //activate rolldice, reset unrolled dice, reset defence
    if (attackerRolled) {
        window.alert("Defending turn");
    } else {
        dice_a1.rollDice();
        dice_a2.resetDice();
        dice_a3.resetDice();
        resetBoard();
        if (runningConquest) {
            //set next round number if active
            nextRound();
        }
        attackerRolled = true;
        attackerRolledOne = true;
    }
}
function attackTwo() {
    if (attackerRolled) {
        window.alert("Defending turn");
    } else {
        if (runningConquest) {
            //set next round number if active
            if (attacker.units <= 2) {
                window.alert("Not enough units");
                return;
            } else {
                nextRound();
                attackerRolled = true;
                attackerRolledOne = false;
            }
        }
        dice_a1.rollDice();
        dice_a2.rollDice();
        dice_a3.resetDice();
        resetBoard();
        attackerRolled = true;
        attackerRolledOne = false;
    }
}
function attackThree() {
    if (attackerRolled) {
        window.alert("Defending turn");
    } else {
        if (runningConquest) {
            //set next round number if active
            if (attacker.units <= 3) {
                window.alert("Not enough units");
                return;
            } else {
                nextRound();
                attackerRolled = true;
                attackerRolledOne = false;
            }
        }
        dice_a1.rollDice();
        dice_a2.rollDice();
        dice_a3.rollDice();
        resetBoard();
        attackerRolled = true;
        attackerRolledOne = false;
    }
}

function defendOne() {
    //roll defence and initiate calc result
    if (attackerRolled) {
        dice_d1.rollDice();
        calculateResult();
        if (runningConquest) {
            //run Conquest logic if active
            calculateUnits();
        }
    } else {
        window.alert("Attack first");
    }
}
function defendTwo() {
    //check if attacked and if attacked with >2
    if (attackerRolled) {
        if (attackerRolledOne) {
            window.alert("You can't throw 2");
        } else {
            if (runningConquest && defender.units <= 1) {
                //must have 2 units to defend with 2 (duh)
                window.alert("Not enough units");
                return;
            }
            dice_d1.rollDice();
            dice_d2.rollDice();
            calculateResult();
            if (runningConquest) {
                //run Conquest logic if active
                calculateUnits();
            }
        }
    } else {
        window.alert("Attack first");
    }
}
function resetBoard() {
    dice_d1.resetDice();
    dice_d2.resetDice();
    document.getElementById("attackerLost_1").style.display = "none";
    document.getElementById("attackerLost_2").style.display = "none";
    document.getElementById("defenderLost_1").style.display = "none";
    document.getElementById("defenderLost_2").style.display = "none";
    attackerRolled = false;
}
function resetAll() {
    dice_a1.resetDice();
    dice_a2.resetDice();
    dice_a3.resetDice();
    resetBoard();
}
function highestFirst(a, b) {
    //sorting function
    return b - a;
}
function calculateResult() {
    //logic for deciding losses
    var attWinsRound1 = true;
    const attacker = new Array(dice_a1.value, dice_a2.value, dice_a3.value);
    const defender = new Array(dice_d1.value, dice_d2.value);
    attacker.sort(highestFirst);
    defender.sort(highestFirst);
    attackerUnitsLost = 0; //these are not needed here, they are for
    defenderUnitsLost = 0; //the logic of keeping track of conquests
    if (defender[0] >= attacker[0]) {
        // determine first round
        document.getElementById("attackerLost_1").style.display =
            "inline-block";
        attWinsRound1 = false;
        attackerUnitsLost += 1;
    } else {
        document.getElementById("defenderLost_1").style.display =
            "inline-block";
        attWinsRound1 = true;
        defenderUnitsLost += 1;
    }
    if (defender[1] > 0) {
        //only carry on if defence throws two dice
        if (defender[1] >= attacker[1]) {
            attackerUnitsLost += 1;
            if (attWinsRound1) {
                document.getElementById("attackerLost_1").style.display =
                    "inline-block";
            } else {
                document.getElementById("attackerLost_2").style.display =
                    "inline-block";
            }
        } else {
            defenderUnitsLost += 1;
            if (attWinsRound1) {
                document.getElementById("defenderLost_2").style.display =
                    "inline-block";
            } else {
                document.getElementById("defenderLost_1").style.display =
                    "inline-block";
            }
        }
    }
    attackerRolled = false;
}
// this part is for the logic of running Conquests
function engageConquest() {
    if (!runningConquest) {
        if (
            document.getElementById("attacker_input").value <= 1 ||
            document.getElementById("defender_input").value <= 0
        ) {
            window.alert("Input valid army sizes");
        } else {
            setupConquest();
        }
    }
}

function setupConquest() {
    //setup the conquest
    resetAll();
    class Army {
        constructor(name, units) {
            this._name = name;
            this._dom_path = document.getElementById(name);
            this._units = units;
        }
        get name() {
            return this._name;
        }
        get dom_path() {
            return this._dom_path;
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
    attacker = new Army("attacker_units_left", attacking_units); //link the input field to the constructor
    defender = new Army("defender_units_left", defending_units);
    document.getElementById("attacker_input").value = ""; //reset input field
    document.getElementById("defender_input").value = "";
    turnCounter = 0;
    document.getElementById("reset_button").innerHTML = "Attack!"; //get on with it already
    runningConquest = true;
    attacker.dom_path.innerHTML = attacker.units + " units left"; //show the starting amount of units
    defender.dom_path.innerHTML = defender.units + " units left";
    document.getElementById("reset_Conquest").style.display = "inline-block";
}

function nextRound() {
    turnCounter += 1;
    document.getElementById("reset_button").innerHTML = "Round " + turnCounter;
}
function calculateUnits() {
    attacker.units -= attackerUnitsLost;
    defender.units -= defenderUnitsLost;
    if (attacker.units <= 1 || defender.units <= 0) {
        //attacker with 1 unit is done attacking
        winnersAndLosers();
    } else {
        attacker.dom_path.innerHTML = attacker.units + " units left";
        defender.dom_path.innerHTML = defender.units + " units left";
    }
}

function resetConquest() {
    resetAll();
    document.getElementById("reset_button").innerHTML = "Start Conquest";
    runningConquest = false;
    attacker.dom_path.innerHTML = "";
    defender.dom_path.innerHTML = "";
    document.getElementById("reset_Conquest").style.display = "none";
}
function winnersAndLosers() {
    runningConquest = false;
    if (attacker.units <= 1) {
        defender.dom_path.innerHTML = "Winner! (" + defender.units + " units)";
        if (attacker.units == 1) {
            attacker.dom_path.innerHTML = "1 unit left, loser!";
        } else {
            attacker.dom_path.innerHTML = "Loser!";
        }
    } else if (defender.units <= 0) {
        attacker.dom_path.innerHTML = "Winner! (" + attacker.units + " units)";
        defender.dom_path.innerHTML = "Loser!";
    }
    document.getElementById("reset_button").innerHTML = "Start Conquest";
}
