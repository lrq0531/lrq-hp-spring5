//hard coding range as 20
var range=20
var puzzleCount = 0;
var totalPuzzles = 20;
var testLap = 1;
var allGood = true;
var onlyAdd = false;

function startPuzzle() {
	onlyAdd = false;
	var willDoAddition = whatToDo();
	generatePuzzles(willDoAddition);
}

function generatePuzzles(willDoAddition) {
	var left1 = generateARandom(range);
	var left2 = generateARandom(range);
	var puzzleString = "";
	if (willDoAddition) {
		puzzleString = generateAddition(left1, left2, range);
	}
	else {
		puzzleString = generateSubtraction(left1, left2);
	}

	document.getElementById("puzzles").innerHTML = puzzleString;

	document.getElementById("startPuzzle").disabled = true;
	document.getElementById("additionOnly").disabled = true;

	setFocusOnInput();
	addEnterListener(willDoAddition);
}

function additionOnly() {
	onlyAdd = true;
	generatePuzzles(true);
}


function setFocusOnInput() {
	document.getElementsByClassName("box")[0].focus();
}

function addEnterListener(addition) {
	var inputElement = document.getElementsByClassName("box")[0];

	inputElement.addEventListener("keyup", function(event) {
	// Cancel the default action, if needed
	        event.preventDefault();
	// Number 13 is the "Enter" key on the keyboard
                if (event.keyCode === 13) {
	// Trigger the button element with a click
	               // document.getElementById("checkAnswer").click()
		       checkResult(addition);
		}
	});
}

function whatToDo() {
	var seed = Math.round(10*Math.random());
	var pick = seed % 2;
	if (pick === 1) {
		return true;
	}
	else {
		return false;
	}
}

function generateARandom(range) {
	var seed = Math.floor( Math.random() * range );
	return seed;
}

function generateAddition(left1, left2, range) {
	if(!range || (left1+left2) <= range) {
		return puzzleElementString(left1, "+", left2, null);
	}
	else if (left1 < left2) {
		return puzzleElementString(left1, "+", null, left2);
	}
	else {
		return puzzleElementString(left2, "+", null, left1);
	}
}

function generateSubtraction(left1, left2) {
	if (left1 < left2) {
		return puzzleElementString(left2, "-", left1, null);
	}
	else {
		return puzzleElementString(left1, "-", left2, null);
	}
}

function puzzleElementString(left1, operator, left2, right) {
	var puzzleString = "<p>";
	puzzleString += partString(left1, "left1");
	puzzleString += "<big><font color=\"purple\" size=8 >  "+operator+" </font> </big>";
	puzzleString += partString(left2, "left2");
	puzzleString += "<big><font color=\"purple\" size=8 > = </font></big>";
	puzzleString += partString(right, "right");

//	puzzleString += submitButton(operator);
	puzzleString += "</p>";
	return puzzleString;
}

function partString(value, id) {
	var pString = "";
	if (value !== null) {
		pString += "<big><font size=8 color=\"purple\" id=\"" + id + "\" class=\"text\" >";
		pString += value + "</font></big>";
	}
	else {
		pString += "<input type=\"number\" id=\"" + id+ "\" class=\"box\" autofocus></input>";
	}
	return pString;
}

function submitButton(operator) {
	var buttonString = "<span>  >>>  </span><button id=\"checkAnswer\" onclick=\"";
	if (operator === "-") {
		buttonString += "subtractionCheck()\">";
	}
	else {
		buttonString += "additionCheck()\">";
	}

	buttonString += "<big><font color=\"green\">Check Answer</font></big></button";

	return buttonString;
}

function subtractionCheck() {
	checkResult(false);
}

function additionCheck() {
	checkResult(true);
}

function checkResult(addition) {
	var leftE = document.getElementById("left1");
	var leftE2 = document.getElementById("left2");
	var rightE = document.getElementById("right");

	var left1, left2, right;
        if (leftE.className === "text") {
                left1 = Number(leftE.innerText);
	}
	else {
		left1 = leftE.valueAsNumber;
	}

	if (leftE2.className === "text") {
		left2 = Number(leftE2.innerText);
	}
	else {
		left2 = leftE2.valueAsNumber;
	}

	if (rightE.className === "box") {
		right = rightE.valueAsNumber;
	}
	else {
		right = Number(rightE.innerText);
	}

        var correct = false;
        if (addition && (left1+left2) === right) {
                correct =true;
        }
	else if (!addition && (left1-left2) === right) {
		correct = true;
	}

        showResult(left1, (addition ? "+" : "-"), left2, right, correct);

        if (!completeAllPuzzles()) {
		if (onlyAdd) {
			additionOnly();
		}
		else {
			startPuzzle();
		}
	}
}

function completeAllPuzzles() {
	if (puzzleCount >= totalPuzzles) {
		puzzleCount = 0;
		var words = "";
		var tipColor = "green";
		if (allGood) {
			words = "GREAT JOB Carol, you finished all the tests correctly!!!";
		}
		else {
			tipColor = "red";
			words = "Oops! Carol, you can do this better!";
		}

		document.getElementById("puzzles").innerHTML = "<b><font size=16 color=\"" + tipColor+ "\">" + words + "</font></b>";
		document.getElementById("startPuzzle").disabled = false;
		document.getElementById("additionOnly").disabled = false;
		// Record the result into 'history' 
		var historyElement = document.getElementById("history");
		var resultElement = document.getElementById("result");
		historyElement.innerHTML += resultElement.innerHTML;
		resultElement.innerHTML = "";
		allGood = true;
		return true;
	}
	else {
		puzzleCount += 1;
		return false;
	}
}


function showResult(left1, operator, left2, right, correct) {
	var resultColor = "green";
	if (!correct) {
		resultColor = "red";
	}

	var resultString = "";
	if(puzzleCount === 0) {
		resultString += "<h4>=========================Lap "+testLap+"=========================</h4><p></p>";
		testLap += 1;
	}
	resultString += "<b><font color=\""+resultColor+"\">"+left1+operator+left2+"="+right+"</font></b>";
	if(!correct) {
		allGood = false;
        	var correctAnswer = 0;
	        if (operator === "+") {
	                correctAnswer = left1+left2;
	        }
                else {
 	                correctAnswer = left1-left2;
	        }
		resultString += "<font color=\"red\">" + " should be "+ correctAnswer+"</font>";
	}
	resultString += "<span>, </span>"

	resultString += changeLine();

	var resultDiv = document.getElementById("result");
	resultDiv.innerHTML += resultString;
}


function isUndefinedOrNull(variable) {
	if (typeof variable === "undefined" || variable === null) {
		return true;
	}
	else {
		return false;
	}
}
