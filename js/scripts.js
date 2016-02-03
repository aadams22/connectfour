// console.log('guten tag');
var $clickValue = true;
var $winner = "";
var $player1 = "";
var $player2 = "";
var liArray = [];
var grandMatrixArray = [];
var holderP1 = [];
var holderP2 = [];

$(function(){

	//creating overlay
  var docHeight = $(document).height();
  $("body").append("<div id='overlay'></div>");
  $("#overlay").height(docHeight);
  //creating user choice question and button
  $('<h2>Who would you like to play against?</h2>').appendTo('#overlay');
	$('<button id="px2">computer</button>').appendTo('#overlay');
	$('<button id="computer">another player</button>').appendTo('#overlay');

	//computer click scenario: removes previous h2 and buttons.
	$('#computer').click(function(){
		$('h2').remove();
		$('button').remove();
		
		$('<h2>What are your names?</h2>').appendTo('#overlay');
		$('<input id="player1" placeholder="Player One"></input>').appendTo('#overlay');
		$('<input id="player2" placeholder="Player Two"></input>').appendTo('#overlay');
		
		$('<button id="enter">enter</button>').appendTo('#overlay');

		//enter button click scenario: removes button and overplay.
		$('#enter').click(function(){
			$player1 = $('#player1').val();
			$player2 = $('#player2').val();
			$('button').fadeOut('slow');
			$('input').fadeOut('slow');
			$('h2').fadeOut('slow');
			$('#overlay').slideUp('slow');
		})
	})

	//two player game click scenario: removes h2, buttons, and appends h2, appends input, collects input value, 
	$('#px2').click(function(){
		
		$('h2').remove();
		$('button').remove();
		
		$('<h2>What is your name?</h2>').appendTo('#overlay');
		$('<input placeholder="What is your name?"></input>').appendTo('#overlay');
		$player0 = $('#player0').val();
		
		$('<button id="submit">enter</button>').appendTo('#overlay');

		//enter button click scenario: removes button and overplay.
		$('button').click(function(){
			$('button').fadeOut('slow');
			$('input').fadeOut('slow');
			$('h2').fadeOut('slow');
			$('#overlay').slideUp('slow');

		})
	})	


//========Game Board Setup================

//callback to create liArray
function liAssignment(li) {
	for (var i = 0; i < li.length; i++) {
		liArray.push(li[i]);
	};
}
liAssignment($('li').not(document.getElementsByClassName('theClick')));

//this creates and adds the matrix dynamically to each <li>. 
//It is currently hardcoded into the html. I will probably modify this in the future.
// var arrayY = [1, 2, 3, 4, 5, 6, 7];
// var arrayX = [1, 2, 3, 4, 5, 6];

// //creates grandMatrixArray by combining array1 and array2
// for (var i = 0; i < arrayY.length; i++) {
// 	for (var j = 0; j < arrayX.length; j++) {
// 		var $theAddition = arrayY[i] + arrayX[j];
// 		grandMatrixArray.push($theAddition);
// 	};
// };

// //assigns grandMatrixArray integers to the <li> elements from liArray with the same index number
// for (var i = 0; i < liArray.length; i++) {
// 	liArray[i].className = grandMatrixArray[i];
// };
// console.log(liArray);

//======END SETUP=============================
	//adding class a in order to iterate through the UL.
	var $liAll = $('li');
	var $data = $liAll.addClass('a');

	//
	$('.theClick').click(function(e){
		// e.preventDefault();
		var $children = $(this).parent().children();

		setTimeout(function(){
			$children.addClass('active');
		}, 450);
		setTimeout(function(){
			$children.removeClass('active');
		}, 1500);

		//iterates through clicked UL beginning at the last child
		for (var i = -1; i >= -6; i += -1) {
			var $findChildren = $children.eq([i]);
			if($findChildren.hasClass('a')) {
				return playerTurn($findChildren);
			}
		};
		
	}) //<--.click function

	//a boolean player switch. game begins with true in global scope
	function playerTurn(element) {

		if($clickValue == true) {
			setTimeout(function(){
				element.addClass('p1');
				$('.p1').removeClass('a');
				//returns the click value to that of the other player
				$clickValue = false;
				theSearch();
			}, 1510);
			 	
		}else if ($clickValue == false) {
			setTimeout(function(){
				element.addClass('p2');
				$('.p2').removeClass('a');
				//returns the click value to that of the other player
				$clickValue = true;
				theSearch();
			}, 1510);
			
		}

 	}; //<--playerTurn


function theSearch(e) {
	
	for (var i = 0; i < liArray.length; i++) {
		var $currentLI = $(liArray[i]);
		if($currentLI.hasClass('p1')) {
			holderP1.push($currentLI);
			//we need to sort for winConditions based on the data value ints.
			holderP1.sort();
			//removing element from array so that we don't get duplicates.
			liArray.splice(i, 1);
			//calls the win conditions according to the player.
			dataConditionsP1();
			
		}else if($currentLI.hasClass('p2')) {
			holderP2.push($currentLI);
			//we need to sort for winConditions based on the data value ints.
			holderP2.sort();
			//removing element from array so that we don't get duplicates.
			liArray.splice(i, 1);
			//calls the win conditions according to the player.
			dataConditionsP2();
		}		
	}
} //<--theSearch

function dataConditionsP1() {
winArrayVert = [];
winArrayHorz = [];
winArrayDiag = [];
winArrayDiagSame = [];
array5 = [];
array10 = [];
array6 = [];
array7 = [];
array8 = [];
array9 = [];

//calculates for Vertical
	for(var i=0;i<holderP1.length;i++) {
    // get the data attribute as a string
    numData = holderP1[i].data().attribute;
    // console.log(numData);
    //this searches for horizontal
    for (var j = 1; j < holderP1.length; j++) {
    	if ((numData - 1) == holderP1[j].data().attribute) {
    		winArrayVert.push(numData);
    		console.log(winArrayVert);
    		//calculates vertical win by length of holder array.
    		if (winArrayVert.length == 3) {
    			console.log("it's a vertical win");
    			$winner = $player1;
    			endGameWindow();
    		};
    	}
    };
	}
	// //calculates for Horizontal
	for(var i=0;i<holderP1.length;i++) {
    // get the data attribute as a string
    numData = holderP1[i].data().attribute;
    console.log(numData);
    holderP1.reverse();
    //this searches for horizontal
    for (var j = 1; j < holderP1.length; j++) {
    	if ((numData + 1) == holderP1[j].data().attribute) {
    		winArrayHorz.push(numData);
    		console.log(winArrayHorz);
    		//calculates horizontal win by length of holder array.
    		if (winArrayHorz.length == 3) {
    			console.log("P1: it's a horizontal win");
    			$winner = $player1;
    			endGameWindow();
    		};
    	}
    };
	}

	// calculates for Diagonal descending
	for(var i=0;i<holderP1.length;i++) {
    // get the data attribute as a string
    numData = holderP1[i].data().attribute;
    holderP1.reverse();
    //this searches for horizontal
    for (var j = 1; j < holderP1.length; j++) {
    	if ((numData + 2) == holderP1[j].data().attribute) {
    		winArrayDiag.push(numData);
    		console.log(winArrayDiag);
    		//calculates diagonally win by length of holder array.
    		if (winArrayDiag.length == 3) {
    			console.log("P1: it's a diagonal descending win");
    			endGameWindow();
    			$winner = $player1;
    		};
    	}
    };
	} //<--diagonal descending

	// calculates for diagonally ascending
	for(var i=0;i<holderP1.length;i++) {
    // get the data attribute as a string
    numData = holderP1[i].data().attribute;
    console.log(numData);
    //pushes numbers to holding arrays if they are found
    if(numData == 5) {
    	array5.push(numData);
    }else if(numData == 10) {
    	array10.push(numData);
    }else if(numData == 6) {
    	array6.push(numData);
    }else if(numData == 7) {
    	array7.push(numData);
    	// console.log(array7);
    }else if(numData == 8) {
    	array8.push(numData);
    }else if(numData == 9) {
    	array9.push(numData);
    }
    //calculates length of arrays to see if they could equal a win
    if(array5.length == 4) {
    	endGameWindow();
    	$winner = $player1;
    };
 		if(array10.length == 4) {
    	endGameWindow();
    	$winner = $player1;
    };
    if(array6.length == 4) {
    	endGameWindow();
    	$winner = $player1;
    };
 		if(array7.length == 4) {
    	endGameWindow();
    	$winner = $player1;
    };
    if(array8.length == 4) {
    	endGameWindow();
    	$winner = $player1;
    };
 		if(array9.length == 4) {
    	endGameWindow();
    	$winner = $player1;
    };
	} //<--diagonally ascending
	

} //<--dataConditionP1 function


function dataConditionsP2() {
	winArrayVert2 = [];
	winArrayHorz2 = [];
	winArrayDiag2 = [];
	array5p2 = [];
	array10p2 = [];
	array6p2 = [];
	array7p2 = [];
	array8p2 = [];
	array9p2 = [];

	//calculates for Vertical
	for(var i=0;i<holderP2.length;i++) {
    // get the data attribute as a string
    numData2 = holderP2[i].data().attribute;
    // console.log(numData2);
    //this searches for vertical
    for (var j = 1; j < holderP2.length; j++) {
    	if (numData2 - 1 == holderP2[j].data().attribute) {
    		winArrayVert2.push(holderP2[i]);
    		//calculates virtical win by length of holder array.
    		if (winArrayVert.length == 3) {
    			console.log("P2: it's a vertical win");
    			$winner = $player2;
    			endGameWindow();
    		};
    	}
    };
	}
	//calculates for Horizontal
	for(var i=0;i<holderP2.length;i++) {
    // get the data attribute as a string
    numData2 = holderP2[i].data().attribute;
    // console.log(numData2);
    holderP2.reverse();
    //this searches for horizontal
    for (var j = 1; j < holderP2.length; j++) {
    	if (numData2 + 1 == holderP2[j].data().attribute) {
    		winArrayHorz2.push(holderP2[i]);
    		//calculates horizontal win by length of holder array.
    		if (winArrayHorz2.length == 3) {
    			console.log("P2: it's a horizontal win");
    			endGameWindow();
    			$winner = $player2;
    		};
    	}
    };
	}

	// calculates for Diagonal descending
	for(var i=0;i<holderP2.length;i++) {
    // get the data attribute as a string
    numData = holderP2[i].data().attribute;
    holderP2.reverse();
    //this searches for horizontal
    for (var j = 1; j < holderP2.length; j++) {
    	if ((numData + 2) == holderP2[j].data().attribute) {
    		winArrayDiag2.push(numData);
    		console.log(winArrayDiag2);
    		//calculates diagonally win by length of holder array.
    		if (winArrayDiag2.length == 3) {
    			console.log("P1: it's a diagonal descending win");
    			endGameWindow();
    			$winner = $player2;
    		};
    	}
    };
	} //<--diagonal descending

	// calculates for diagonally ascending
	for(var i=0;i<holderP2.length;i++) {
    // get the data attribute as a string
    numData = holderP2[i].data().attribute;
    // console.log(numData);
    if(numData == 5) {
    	array5p2.push(numData);
    }else if(numData == 10) {
    	array10p2.push(numData);
    }else if(numData == 6) {
    	array6p2.push(numData);
    }else if(numData == 7) {
    	array7p2.push(numData);
    	// console.log(array7);
    }else if(numData == 8) {
    	array8p2.push(numData);
    }else if(numData == 9) {
    	array9p2.push(numData);
    }
    //checks to see if the length of the array is equivelant to 4 for a match
    if(array5p2.length == 4) {
    	endGameWindow();
    	$winner = $player2;
    };
 		if(array10p2.length == 4) {
    	endGameWindow();
    	$winner = $player2;
    };
    if(array6p2.length == 4) {
    	endGameWindow();
    	$winner = $player2;
    };
 		if(array7p2.length == 4) {
    	endGameWindow();
    	$winner = $player2;
    };
    if(array8p2.length == 4) {
    	endGameWindow();
    	$winner = $player2;
    };
 		if(array9p2.length == 4) {
    	endGameWindow();
    	$winner = $player2;
    };
	} //<--diagonally ascending

} //<--dataConditionsP2


//winning end game screen

function endGameWindow() {

	var docHeight = $(document).height();
  $("body").append("<div id='overlay'></div>");
  $("#overlay").height(docHeight);
  $('<h2 id="win">' + $winner + ' has won.</h2>').appendTo('#overlay');
	setTimeout(function(){
		$('h2').remove("#win");
	}, 3500);
	setTimeout(function(){
		$('<h2 id="again">would you like to play again?</h2>').appendTo('#overlay');
		$('<button id="yes">yes</button>').appendTo('#overlay');
		$('<button id="no">no</button>').appendTo('#overlay');
		//yes click fades buttons and h2 out, refreshes the page, and removes the overlay
		$('#yes').click(function(){
			$('button').fadeOut('slow');
			$('#again').fadeOut('slow');
			setTimeout(function(){
				location.reload();
				$('#overlay').remove();
				}, 1500);
			})

		//no button leave page as is and says, thank you for playing.
		$('#no').click(function(){
			$('button').fadeOut('slow');
			$('#again').fadeOut('slow');
			setTimeout(function(){
			 $('<h2 id="thanks">Thanks for playing!</h2>').appendTo('#overlay');
			}, 1500);
			
		})
	}, 4000);


} //<--endGameWindow



}) //<---on ready function





