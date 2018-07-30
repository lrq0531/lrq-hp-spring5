var lineElements=5;
var lineCount=0;
var bstartNumber=0;
var bcountIn=1;
var bendAt=0;
var wrongOnes = 0;
var wrongCount = null;

function generateCounting(startNumber, countIn, endAt) {
	var htmlString = "<p><h4>" + startNumber+ " => " + "</h4>";
	
	// Go through the numbers queue with the given function
	var inputBoxes = goThroughNumbersQueue(startNumber, countIn, endAt, function(mover) {
		var inputBoxString = "";
		inputBoxString += numberBlank(null, inputBoxId(mover));
		inputBoxString += changeLine();
		wrongOnes += 1;
		return inputBoxString;
	});

	htmlString += inputBoxes + "<h4>"+" => " + endAt + "</h4></p>";

	document.getElementById("question").innerHTML = htmlString;
}


function tabToNextFocusable(current) {
	var focusables = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]');
	focusables = Array.prototype.slice.call(focusables);
        var index = focusables.indexOf(current);
	if (!isUndefinedOrNull(index)) {
		var nextIndex = index+1;
		nextIndex = nextIndex % focusables.length;

		for(; nextIndex<focusables.length; nextIndex ++) {
			if(focusables[nextIndex].disabled === false) {
				focusables[nextIndex].focus();
				break;
			}
		}
	}
}


var configurationInputListener = function(event) {
	event.preventDefault();

	if (event.keyCode === 13) {
		if(this.id === "start" || this.id == "countIn") {
			tabToNextFocusable(this);
		}
		else {
			startACount();
			addListenersToCountInputs();
			tabToNextFocusable(this);
		}
	}
};


function addListenersToConfigureInputs() {
	var startInput = document.getElementById("start");
        var countInInput = document.getElementById("countIn");
	var endInput = document.getElementById("end");

	startInput.addEventListener("keyup", configurationInputListener);
	countInInput.addEventListener("keyup", configurationInputListener);
	endInput.addEventListener("keyup", configurationInputListener);
}

var countListener = function(event) {
	event.preventDefault();
        if (wrongCount === null) {
		wrongCount = this;
	}

//	if (event.keyCode === 13) {
		var valueOfThis = this.valueAsNumber;
		var id = inputBoxId(valueOfThis);
		var tips = document.getElementById("tips");
		if (id === this.id) {
			this.disabled = true;
			wrongOnes -= 1;
			if (wrongOnes > 0) {
				if (wrongCount !== null && wrongCount !== this) {
					wrongCount.focus();
				}
				else {
					wrongCount = null;
					tabToNextFocusable(this);
				}
				tips.innerHTML = "";
			}
			else {
				tips.innerHTML = "<font size=10 color=\"green\"> Yeah, You did it!</font>";
				document.getElementById("start").focus();
			}

		}
		else if(event.keyCode === 13) {
			tips.innerHTML = "<font color=\"red\">Hi dear, " + valueOfThis + " is not the correct answer!</font>";
		}
//	}
	
};

function addCountListener(mover) {
	var id = inputBoxId(mover);
	var inputElement = document.getElementById(id);
	inputElement.addEventListener("keyup", countListener);
}


function addListenersToCountInputs() {
	goThroughNumbersQueue(bstartNumber, bcountIn, bendAt, addCountListener);
}


function whatDirection(startNumber, endAt) {
	if (endAt <= startNumber) {
                return true;
	}
	else {
		return false;
	}
}

function goThroughNumbersQueue(startNumber, countIn, endAt, toDo) {
	var mover = startNumber;
	var direction = whatDirection(startNumber, endAt); // false= forwards
        var result="";

        mover = move(mover, countIn, direction);
        for (; keepMoving(mover, endAt, direction); mover = move(mover, countIn, direction)){
		result += toDo(mover);
        }
	return result;
}



function inputBoxId(mover) {
	if (mover && mover !== null) {
		return "inputBoxIdOf"+mover;
	}
	else {
		var d = new Date();
		var n = d.getTime();
		return "inputBoxIdOf"+n;
	}
}

function keepMoving(mover, endAt, direction) {
	if (direction && mover > endAt) {
		return true;
	}
	else if (!direction && mover < endAt) {
		return true;
	}
	else {
		return false;
	}
}

function move(mover, countIn, direction) {
	if (direction) {
		mover -= countIn;		
	}
	else {
		mover += countIn;
	}

	return mover;
}


function numberBlank(number=null, id=null) {
	if (number && number !== null) {
		return "<h5>"+" - " + number+ "</h5>";
	}
	else {
		var inputString = "<input type=\"number\"";
                if (id && id != null) {
			inputString += "id=\"" + id + "\" required/>";
		}
		else {
			inputString += " required/>";
		}
		inputString += "<span> - </span>";

		return inputString;
	}
}

function startACount() {
  	var startNumber = document.getElementById("start").valueAsNumber;
	var countIn = document.getElementById("countIn").valueAsNumber;
	var endAt = document.getElementById("end").valueAsNumber;
        
	lineCount = 0;
	wrongOnes = 0;
	wrongCount = null;
// record the conditions for answer checking.
        bstartNumber=startNumber;
	bcountIn=countIn;
	bendAt=endAt;

	generateCounting(startNumber, countIn, endAt);

	document.getElementById("tips").innerHTML = "";
//	document.getElementById("checkCount").disabled=false;
}


function changeLine() {
	lineCount += 1;
	if (lineCount >= lineElements) {
		lineCount = 0;
		return "<p>  </p>";
	}
	else {
		return "";
	}
}

function checkCount() {
	goThroughNumbersQueue(bstartNumber, bcountIn, bendAt, function(mover) {
		var id = inputBoxId(mover);
		var inputBox = document.getElementById(id);
		if(inputBox && inputBox != null) {
			var carolInput = inputBox.valueAsNumber;
			if (carolInput && mover === carolInput) {
				inputBox.disabled=true;
			}
			else {
				inputBox.title=mover;
			}
		}
	});
}

addListenersToConfigureInputs();
