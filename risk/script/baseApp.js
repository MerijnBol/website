// declerations
var dice_a1, dice_a2, dice_a3, dice_d1, dice_d2, i;

// declare and initialize
var runningConquest = false;
var attackerRolled = false;
var attackerRolledOne = false; //defender can't throw 2 if attacker throws 1 dice.

window.onload = function () {
    //Setup the dice objectclasses:
    class baseDice {
        constructor(name) {
            this._name = name;
            this._svg_dom = document.getElementById(this._name);
            this._svg_drawing_dom = this._svg_dom.getElementsByClassName(
                ".dice-face-path"
            )[0];
            this.update_svg_drawing = function (value) {
                this._svg_drawing_dom.setAttribute("d", value);
            };
            this._set_;
            this._value = 0;
            this.rollDice = function () {
                //prototype method
                this.value = random6();
                this.update_svg_drawing(dice_content["face_" + this.value]);
            };
            this.resetDice = function () {
                this.value = 0;
                this.update_svg_drawing(dice_content["reset"]);
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

    class killedUnit {
        constructor(name) {
            this._name = name;
            this._svg_dom = document.getElementById(this._name);
            this._svg_drawing_dom = this._svg_dom.getElementsByClassName(
                ".dice-face-path"
            )[0];
            this.show_unit = function (boolean) {
                if (boolean) {
                    this._svg_drawing_dom.setAttribute(
                        "d",
                        dice_content["dead_unit"]
                    );
                } else {
                    this._svg_drawing_dom.setAttribute(
                        "d",
                        dice_content["reset"]
                    );
                }
            };
        }
    }

    attackerDeath1 = new killedUnit("attackerDeath1");
    attackerDeath2 = new killedUnit("attackerDeath2");
    defenderDeath1 = new killedUnit("defenderDeath1");
    defenderDeath2 = new killedUnit("defenderDeath2");

    dice_a1 = new baseDice("dice_a1");
    dice_a2 = new baseDice("dice_a2");
    dice_a3 = new baseDice("dice_a3");
    dice_d1 = new baseDice("dice_d1");
    dice_d2 = new baseDice("dice_d2");
    // initialization ends here
};

// document.addEventListener("DOMContentLoaded", function () {
// listen for attack and defend click events
// document.getElementById("attack-one").onclick = attack(1);
// document.getElementById("attack-one").addEventListener("click", attack(1));
// console.log(document.getElementById("attack-one"));
// console.log(document.getElementById("attack-two"));
// document.getElementById("attack-two").addEventListener("click", attack(2));
// document.getElementById("attack-two").onclick = attack(2);
// document.getElementById("attack-three").onclick = attack(3);
// });

// document.getElementById("attack-one").addEventListener("click", attack(1));

var dice_content = {
    reset: "",
    generic:
        "M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153zm-.824 53.11c9.013.097 17.117 2.162 24.31 6.192 4.92 2.758 8.143 5.903 9.666 9.438 1.473 3.507 1.56 8.13.26 13.865l-1.6 5.706c-1.06 4.083-1.28 7.02-.66 8.81.57 1.764 1.983 3.278 4.242 4.544l3.39 1.898-33.235 18.62-3.693-2.067c-4.118-2.306-6.744-4.912-7.883-7.82-1.188-2.935-.99-7.603.594-14.005l1.524-5.748c.887-3.423.973-6.23.26-8.418-.653-2.224-2.134-3.983-4.444-5.277-3.515-1.97-7.726-2.676-12.63-2.123-4.956.526-10.072 2.268-15.35 5.225-4.972 2.785-9.487 6.272-13.55 10.46-4.112 4.162-7.64 8.924-10.587 14.288L171.9 138.21c5.318-5.34 10.543-10.01 15.676-14.013 5.134-4 10.554-7.6 16.262-10.8 14.976-8.39 28.903-13.38 41.78-14.967 3.208-.404 6.315-.59 9.32-.557zm50.757 56.7l26.815 15.024-33.235 18.62-26.816-15.023 33.236-18.62zM75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zm-321.545 63.752c6.553 1.366 12.538 3.038 17.954 5.013 5.415 1.976 10.643 4.417 15.68 7.325 13.213 7.63 23.286 16.324 30.218 26.082 6.932 9.7 10.398 20.046 10.398 31.04 0 5.64-1.055 10.094-3.168 13.364-2.112 3.212-5.714 5.91-10.804 8.094l-5.2 1.92c-3.682 1.442-6.093 2.928-7.23 4.46-1.137 1.472-1.705 3.502-1.705 6.092v3.885l-29.325-16.933v-4.23c0-4.72.892-8.376 2.68-10.97 1.787-2.652 5.552-5.14 11.292-7.467l5.2-2.006c3.087-1.21 5.334-2.732 6.742-4.567 1.46-1.803 2.192-4.028 2.192-6.676 0-4.027-1.3-7.915-3.9-11.66-2.6-3.804-6.227-7.05-10.885-9.74-4.387-2.532-9.126-4.29-14.217-5.272-5.09-1.04-10.398-1.254-15.922-.645v-27.11zm269.54 8.607c1.522 0 2.932.165 4.232.493 6.932 1.696 10.398 8.04 10.398 19.034 0 5.64-1.056 11.314-3.168 17.023-2.112 5.65-5.714 12.507-10.804 20.568l-5.2 7.924c-3.682 5.695-6.093 9.963-7.23 12.807-1.137 2.785-1.705 5.473-1.705 8.063v3.885l-29.325 16.932v-4.23c0-4.72.894-9.41 2.68-14.067 1.79-4.715 5.552-11.55 11.292-20.504l5.2-8.01c3.087-4.776 5.334-8.894 6.742-12.354 1.46-3.492 2.192-6.562 2.192-9.21 0-4.028-1.3-6.414-3.898-7.158-2.6-.8-6.23.142-10.887 2.83-4.387 2.533-9.124 6.25-14.215 11.145-5.09 4.84-10.398 10.752-15.922 17.74v-27.11c6.553-6.2 12.536-11.44 17.95-15.718 5.417-4.278 10.645-7.87 15.68-10.777 10.738-6.2 19.4-9.302 25.99-9.307zm-252.723 94.515l29.326 16.93v30.736l-29.325-16.93v-30.735zm239.246 8.06v30.735l-29.325 16.93v-30.733l29.326-16.932z",
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
        "M175.91 128.5a47.37 47.37 0 1 1-47.41-47.32 47.37 47.37 0 0 1 47.41 47.32zM382.5 81.18a47.37 47.37 0 1 0 47.32 47.32 47.37 47.37 0 0 0-47.32-47.32zm-254 126.95a47.37 47.37 0 1 0 47.41 47.37 47.37 47.37 0 0 0-47.41-47.37zm253.91 0a47.37 47.37 0 1 0 47.41 47.37 47.37 47.37 0 0 0-47.32-47.37zM128.5 335.09a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.41-47.41zm253.91 0a47.37 47.37 0 1 0 47.41 47.41 47.37 47.37 0 0 0-47.32-47.41zm102 92.93a56.48 56.48 0 0 1-56.39 56.48h-344a56.48 56.48 0 0 1-56.52-56.48v-344A56.48 56.48 0 0 1 83.98 27.5h344a56.48 56.48 0 0 1 56.52 56.48zm-20-344a36.48 36.48 0 0 0-36.39-36.52h-344A36.48 36.48 0 0 0 47.5 83.98v344a36.48 36.48 0 0 0 36.48 36.52h344a36.48 36.48 0 0 0 36.52-36.48z",
    dead_unit:
        "M242.5 21.5c-25.192 3.245-47.28 32.016-47.28 68.78 0 20.28 7.038 38.25 17.5 50.75l10.25 12.25-15.69 2.94c-6.058 1.128-11.42 3.163-16.25 6.093l50.907 29.343.22.125c10.092 5.547 17.387 12.847 21.687 20.72 4.332 7.932 5.865 16.78 2.562 24.75-3.302 7.97-12.133 13.29-21.687 13.344-9.457.054-20.02-3.703-32.345-11.5-.13-.082-.245-.136-.375-.22l-52.313-30.06c-1.536 4.65-2.918 9.51-4.156 14.56-8.238 33.626-9.925 74.615-10.155 110.407H189.5l.625 8.626 11.28 149.78 96.69.002L308.03 342.5l.564-8.72h42c-.013-36.18-.378-77.737-7.844-111.624-4.05-18.384-10.197-34.295-18.813-45.75-8.615-11.454-19.257-18.706-34.593-21.062l-16-2.438L283.5 140.25c10.008-12.437 16.72-30.183 16.72-49.97-.002-39.2-24.78-68.718-52.5-68.718-2.913 0-4.762-.12-5.22-.062zM20.812 85.78v21.626l200.875 115.5.188.094.188.125c10.573 6.74 18.416 8.805 22.53 8.78 4.115-.022 4.113-.724 4.563-1.81.45-1.09.63-4.324-1.72-8.626-2.348-4.304-7.01-9.363-14.436-13.407l-.094-.032-.094-.06-212-122.19zm396.97 187.626l-15.626 28.22-33.656-19.063c.355 8.144.576 16.234.688 24.187l22.906 13.03-15.47 27.94 114.97 15.124-73.813-89.438z"
};

function random6() {
    return Math.floor(Math.random() * 6) + 1;
}

function attack(armies) {
    if (attackerRolled) {
        window.alert("Defending turn");
    } else {
        resetBoard();
        if (runningConquest) {
            //set next round number if active
            if (attacker.units <= 3) {
                window.alert("Not enough units");
                return;
            } else {
                nextRound();
            }
        }
        attackerRolled = true;
        attackerRolledOne = false;
        dice_a1.rollDice();
        if (armies === 1) {
            attackerRolledOne = true;
            showDefendTwo(false);
        }
        if (armies > 1) {
            dice_a2.rollDice();
        }
        if (armies === 3) {
            dice_a3.rollDice();
        }
    }
}

function defend(armies) {
    //check if attacked and if attacked with >2
    if (attackerRolled) {
        dice_d1.rollDice();
        if (armies === 2) {
            dice_d2.rollDice();
        }
        calculateResult();
        if (runningConquest) {
            //run Conquest logic if active
            calculateUnits();
        }
    } else {
        window.alert("Attack first");
    }
}

// allows for showing and hiding of button to defend with 2 armies
function showDefendTwo(boolean) {
    dom = document.getElementById("defend-two");
    if (boolean) {
        dom.style.display = "inline-block";
    } else {
        dom.style.display = "none";
    }
}

function resetBoard() {
    dice_d1.resetDice();
    dice_d2.resetDice();
    dice_a1.resetDice();
    dice_a2.resetDice();
    dice_a3.resetDice();
    defenderDeath1.show_unit(false);
    defenderDeath2.show_unit(false);
    attackerDeath1.show_unit(false);
    attackerDeath2.show_unit(false);
    attackerRolled = false;
    showDefendTwo(true);
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
        attackerDeath1.show_unit(true);
        attWinsRound1 = false;
        attackerUnitsLost += 1;
    } else {
        defenderDeath1.show_unit(true);
        attWinsRound1 = true;
        defenderUnitsLost += 1;
    }
    if (defender[1] > 0) {
        //only carry on if defence throws two dice
        if (defender[1] >= attacker[1]) {
            attackerUnitsLost += 1;
            if (attWinsRound1) {
                attackerDeath1.show_unit(true);
            } else {
                attackerDeath2.show_unit(true);
            }
        } else {
            defenderUnitsLost += 1;
            if (attWinsRound1) {
                defenderDeath2.show_unit(true);
            } else {
                defenderDeath1.show_unit(true);
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
    if (defend.units === 1) {
        showDefendTwo(false);
    }
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
        if (attacker.units === 1) {
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
