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
			// $('#overlay').toggleClass('.active', false);
			$('input').fadeOut('slow');
			$('h2').fadeOut('slow');
			setTimeout(function(){
				$('#overlay').remove();
			}, 1150);
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
			setTimeout(function(){
				$('#overlay').remove();
			}, 1000);
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

	var $liAll = $('li');
	var $data = $liAll.addClass('a');

	$('.theClick').click(function(e){
		// e.preventDefault();
		var $children = $(this).parent().children();

		// setTimeout(function(){
			$children.addClass('active');
		// }, 550);
		// setTimeout(function(){
			$children.removeClass('active');
		// }, 1750);

		for (var i = -1; i >= -6; i += -1) {
			var $findChildren = $children.eq([i]);
			if($findChildren.hasClass('a')) {
				return playerTurn($findChildren);
			}
		};
		
	}) //<--.click function


	function playerTurn(element) {

		if($clickValue == true) {
			// setTimeout(function(){
				element.addClass('p1');
				$('.p1').removeClass('a');
				$clickValue = false;
				theSearch();
			// }, 1710);
			 	
		}else if ($clickValue == false) {
			// setTimeout(function(){
				element.addClass('p2');
				$('.p2').removeClass('a');
				$clickValue = true;
				theSearch();
			// }, 1710);
			
		}

 	}; //<--playerTurn


function theSearch(e) {
	
	for (var i = 0; i < liArray.length; i++) {
		var $currentLI = $(liArray[i]);
		if($currentLI.hasClass('p1')) {
			holderP1.push($currentLI);
			holderP1.sort();
			console.log(holderP1);
			liArray.splice(i, 1);
			dataConditionsP1();
			
		}else if($currentLI.hasClass('p2')) {
			holderP2.push($currentLI);
			holderP2.sort();
			console.log(holderP2);
			liArray.splice(i, 1);
				// dataConditionsP2();
		}		
	}
} //<--theSearch

function dataConditionsP1() {
winArrayVirt = [];
winArrayHorz = [];
winArrayDiag = [];
winArrayDiagSame = [];
//calculates for Virtical
	for(var i=0;i<holderP1.length;i++) {
    // get the data attribute as a string
    numData = holderP1[i].data().attribute;
    // console.log(numData);
    //this searches for horizontal
    for (var j = 1; j < holderP1.length; j++) {
    	if ((numData - 1) == holderP1[j].data().attribute) {
    		winArrayVirt.push(numData);
    		console.log(winArrayVirt);
    		//calculates virtical win by length of holder array.
    		if (winArrayVirt.length == 3) {
    			console.log("it's a virtical win");
    			$winner = $player1;
    			endGameWindow();
    		};
    	}
    };
	}
	//calculates for Horizontal
	for(var i=0;i<holderP1.length;i++) {
    // get the data attribute as a string
    numData = holderP1[i].data().attribute;
    console.log(numData);
    //this searches for horizontal
    for (var j = 1; j < holderP1.length; j++) {
    	if ((numData + 1) == holderP1[j].data().attribute) {
    		winArrayHorz.push(numData);
    		console.log(winArrayHorz);
    		//calculates horizontal win by length of holder array.
    		if (winArrayHorz.length == 4) {
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
    //this searches for horizontal
    for (var j = 1; j < holderP1.length; j++) {
    	if ((numData + 2) == holderP1[j].data().attribute) {
    		winArrayDiag.push(numData);
    		console.log(winArrayDiag);
    		//calculates diagonally win by length of holder array.
    		if (winArrayDiag.length == 3) {
    			console.log("P1: it's a diagonal descending win");
    		};
    	}
    };
	}

	// // calculates for diagonally ascending
	// for(var i=0;i<holderP1.length;i++) {
 //    // get the data attribute as a string
 //    numData = holderP1[i].data().attribute;
 //    console.log(numData);
 //    if(numData == 5) {
 //    	var array5 = [];
 //    	array5.push()
 //    };

 //    //this searches for horizontal
 //    for (var j = 1; j < holderP1.length; j++) {
 //    	if (numData == holderP1[j].data().attribute) {
 //    		winArrayDiagSame.push(holderP1[i]);
 //    		console.log(winArrayDiagSame);
 //    		//calculates horizontal win by length of holder array.
 //    		if (winArrayDiagSame.length == 4) {
 //    			console.log("P1: it's a diagonally ascending win");
 //    		};
 //    	}
 //    };
	// }	

} //<--dataConditionP1 function

function dataConditionsP2() {
	winArrayVirt2 = [];
	winArrayHorz2 = [];
	winArrayDiag2 = [];
	for(var i=0;i<holderP2.length;i++) {
    // get the data attribute as a string
    numData2 = holderP2[i].data().attribute;
    // console.log(numData2);
    //this searches for horizontal
    for (var j = 1; j < holderP2.length; j++) {
    	if (numData2 - 1 == holderP2[j].data().attribute) {
    		winArrayVirt2.push(holderP2[i]);
    		// console.log(winArrayVirt2);
    		//calculates virtical win by length of holder array.
    		if (winArrayVirt.length == 3) {
    			console.log("P2: it's a virtical win");
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
    //this searches for horizontal
    for (var j = 1; j < holderP2.length; j++) {
    	if (numData2 + 1 == holderP2[j].data().attribute) {
    		winArrayHorz2.push(holderP2[i]);
    		// console.log(winArrayHorz2);
    		//calculates horizontal win by length of holder array.
    		if (winArrayHorz2.length == 3) {
    			console.log("P2: it's a horizontal win");
    			$winner = $player2;
    		};
    	}
    };
	}
} //<--dataConditionsP2



//-create a theSearch that runs each time a play is made.
//perhpas pass the click value.
//2 for loops to compare the elements to themselves.
//find class integer
//run through match functions
//== +1 ascending with same parent
//== +1 ascending with different parent
//== +2 ascending with different parent
//== for of same number: 6,7,8,9 with different parents
//clear holding array


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
	//yes button reloads page.


}



}) //<---on ready function












//====================OLD CODE===========================

	// // calculates for diagonally descending
	// for(var i=0;i<holderP1.length;i++) {
 //    // get the data attribute as a string
 //    numData = holderP1[i].data().attribute;
 //    console.log(numData);
 //    //this searches for horizontal
 //    for (var j = 1; j < holderP1.length; j++) {
 //    	if (numData == holderP1[j].data().attribute) {
 //    		winArrayDiagSame.push(holderP1[i]);
 //    		console.log(winArrayDiagSame);
 //    		//calculates horizontal win by length of holder array.
 //    		if (winArrayDiagSame.length == 4) {
 //    			console.log("P1: it's a diagonally descending win");
 //    		};
 //    	}
 //    };
	// }


//===========Somewhat functioning conditions for win=======d===

// //judging from actual grid, not from holderP1 or holder P2
// function theConditionsP2() {
// 	console.log('theConditions have been accessed P2');
	
// console.log(liArray);

// 	// for (var i = 0; i < holderP2.length; i++) {
// 	// 	holderP2.parseInt();
// 	// 	console.log(holderP2);
// 	// };

// //the rising horizontal has a bug. the bug is that it allows for skips
// //----CALCULATES P2 WIN-----

// //horizontal
// 	if($('li.6.p2').length == 4) {
// 		$winner = $player2
// 		endGameWindow();
// 	}else if($('li.7.p2').length == 4) {
// 		$winner = $player2
// 		endGameWindow();
// 	}else if($('li.8.p2').length == 4) {
// 		$winner = $player2
// 		endGameWindow();
// 	}else if($('li.9.p2').length == 4) {
// 		$winner = $player2
// 		endGameWindow();
// 	}

// 	if($('li.5.p2').length == 4) {
// 		$winner = $player2
// 		endGameWindow();
// 	}else if($('li.10.p2').length == 4) {
// 		$winner = $player2
// 		endGameWindow();
// 	}
// 	//for virtical
// 	$('ul').each(function(){
// 		var $theFirstChildren  = $('first').children();
// 		console.log('yo');
// 		console.log($theFirstChildren);
// 		$theFirstChildren.find('p2');
// 	})


// } //<--theConditionsP2

// function theConditionsP1() {
// console.log('theConditions have been accessed P1');

// 	//----CALCULATES P1 WIN-----

// //horizontal
// 	if($('li.6.p1').length == 4) {
// 		$winner = $player1
// 		endGameWindow();
// 	}else if($('li.7.p1').length == 4) {
// 		$winner = $player1
// 		endGameWindow();
// 	}else if($('li.8.p1').length == 4) {
// 		$winner = $player1
// 		endGameWindow();
// 	}else if($('li.9.p1').length == 4) {
// 		$winner = $player1
// 		endGameWindow();
// 	}

// 	if($('li.5.p1').length == 4) {
// 		$winner = $player1
// 		endGameWindow();
// 	}else if($('li.10.p1').length == 4) {
// 		$winner = $player1
// 		endGameWindow();
// 	}

// } //<--theConditionsP1
	

//-------------------------------------------------------
	//diagonally descending
	// //descending evens
	// if($('li.2, li.4, li.6, li.8').hasClass('p1')) {
	// 	console.log("P1 wins diagonally descending");
	// }else if($('li.4, li.6, li.8, li.10').hasClass('p1')) {
	// 	console.log("P1 wins diagonally descending");
	// }else if($('li.6, li.8, li.10, li.12').hasClass('p1')) {
	// 	console.log("P1 wins diagonally descending");
	// }

	// //descending odds
	// if($('.3, .5, .7, .9').hasClass('p1')) {
	// 	console.log("P1 wins diagonally descending");
	// }else if($('.5, .7, .9, .11').hasClass('p1')) {
	// 	console.log("P1 wins diagonally descending");
	// }else if($('.7, .9, .11, .13').hasClass('p1')) {
	// 	console.log("P1 wins diagonally descending");
	// }
	// //X & Y
	// if($('.2, .3, .4, .5').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.3, .4, .5, .6').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.4, .5, .6, .7').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.5, .6, .7, .8').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.5, .6, .7, .8').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.6, .7, .8, .9').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.7, .8, .9, .10').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.8, .9, .10, .11').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.9, .10, .11, .12').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }else if($('.10, .11, .12, .13').hasClass('p1')) {
	// 	console.log("P1 wins X or Y");
	// }

//-------------------------------------------------------
	// var $theFirstIndexes = $([1, 2, 3, 4]);
	// // var $theSecondIndexes = $([2, 3, 4, 5]);
	// // var $theThirdIndexes = $([3, 4, 5, 6]);
	// // console.log($theFirstIndexes);
	// //  || $theSecondIndexes || $theThirdIndexes

	// $('ul').each(function(){
	// 	if($theFirstIndexes.hasClass('p1')) {
	// 		console.log("P1 wins virtically");
	// 	}else if([1, 2, 3, 4] || [2, 3, 4, 5] || [3, 4, 5, 6].hasClass('p2')) {
	// 		console.log("P2 wins virtically");
	// 	}	
	// })

//-------------------------------------------------------
	// //this works, however it contains a bug. 
	// //The bug allows for matches with a break in between the four divs.
	// //it's also incredibly redundant.
	// $('ul').each(function(){
	// 	if($('li.6.p2').length == 4) {
	// 		console.log('P2 wins by 6');
	// 	}

	// })



	// console.log(holderP1);
	// for (var i = 0; i < holderP1.length; i++) {
	// 	var parentI = holderP1[i].parent();
	// 	console.log(parentI);
	// 	for (var j = 0; j < holderP1.length; j++) {
	// 		var sameParentHolder = [];
	// 		var parentJ = holderP1[j].parent();
	// 		console.log(parentJ);
	// 		if(parentI == parentJ) {
	// 			console.log('the parents are the same');
	// 			sameParentHolder.push(holderP1[i]);
	// 			console.log(sameParentHolder);
	// 		}
	// 		if(sameParentHolder.length == 4) {
	// 			sameParentHolder.sort();
	// 			console.log(sameParentHolder);
	// 			//need to access class name before parseInt because paraseInt runs on class name
	// 			$sameParentHolder.each(function(){
	// 				(this).parseInt();
	// 			})
	// 			console.log(sameParentHolder);
	// 		}
	// 	};
	// };




//-------------------------------------------------------
	

//----theConditions--------------------------------------
	// if($('li.9.p2').length == 4) {
	// 	console.log("P2 wins with 9s");
	// 	var $theParent = $(this).parent();
	// 	console.log($theParent);
	// 	$theParent.next();
	// }
//----theConditions--------------------------------------
	// var $theP2 = $('p2');
	// console.log($theP2);
	// // console.log(typeof $theP2); //<--object
	// var $theParents = $theP2.parent();
	// var $theChildren = $theParents.children();
	// console.log($theParents);
	// console.log($theChildren);

	// var $theP1 = $('p1');
	// console.log($theP1);
	// console.log(typeof $theP1); //<--object
	
	// var $li = $('li');
	// if($li.hasClass('p2') && $li.hasClass('5') {
	// 	console.log('player 2 wins with class 5');
	// }
	// if($li.hasClass('p2') && $li.hasClass('10') {
	// 	console.log('player 2 wins with class 10');
	// }


//---I hate this code, but it could work with a bit of tweeking----
		// var $li = $('li');
		// //check for class: 5;
		// $('.5').each(function(){
		// 	if($(this).hasClass('p2')) {
		// 		console.log("one of them has p2");
		// 	}		
		// })
		// //check for class: 10
		// 	$('.10').each(function(){
		// 	if($(this).hasClass('p2')) {
		// 		console.log("one of them has p2");
		// 	}		
		// })

//---------
	// if($('li.6') == $('li.p1')) {
	// 	console.log("they're equivelant")
	// }
//----------
// $.inArray('li.6', holderP2) !== -1
//----------
	// var $findClass = $(holderP2).filter('.6').attr('class');
	// console.log(holderP2);
//----------
	// $(holderP2).each(function(){ 
		// if ($('li.6').length == 4) {
		// 	console.log('this frickin works');
		// }
	// })

//======COMPUTER GAME=======
// var $computerGame = function() {

// 	$playerScore = 0;
// 	$computerScore = 0;

// 	$('ul > li').click(function(e){
// 		e.preventDefault();
// 	})


// 	if ($playerScore > $computerScore) {
// 		//players turn 

// 		$computersScore += 2;
// 	}else {
// 		//computers turn
// 		$playerScore +=2
// 	}




// } //<---computerGame function


//----------------------------------------------------
// for (var i = 0; i < holderP1.length; i++) {
	// 	for (var j = 1; j < holderP1.length; j++) {
	// 		var $parenti = $(holderP1[i].parent())
	// 		var $parentj = $(holderP2[j].parent())
			

	// 	};

	// };


//----- .grep to rid the liArray------------------------ 

		// liArray = jQuery.grep(liArray, function(value){
		// 		return value != $currentIndex;
		// 	})
//of the current [i] so that I don't get duplicates added to the holder arrays with every click.
//it wasn't working. The element still existed within the liArray.
//-----ulArray callback---------------------------------

// function ulAssignment(ul) {
// 	for (var i = 0; i <= ul.length; i++) {
// 		ulArray.push(ul[i]);
// 	};
// }
// ulAssignment($('ul'));
// console.log(ulArray);


//=======================================================
	//-each time :first-child of a <ul> is clicked I set a variable to the clicked child's parent.
	//After finding the parent I iterate through the children of that parent <ul> using a .each()
	//function. If the value of the specific <li> is 0 then I will call a specific function to give
	//it a class according to the player who clicked it in order to change it to the associated color.
	//I'm not sure if I need to change the class in another function or if I can do it within the player
	//switch function. I will put this in the playerTurn function. Changing class in their own function
	//not only adds redundency, but creates more issues than solutions.
	//I've run into the problem that the click is triggering a loop that iterates through the entire column
	//toggling the boolean value of the playerTurn so that I'm getting the outcome of every other div in the 
	//column recieving the associated class. I could possibly give the column data values assending, i.e. 1-5.
	//and then find a way to go tot he click value with the greatest number. But I think that wouldn't actually
	//solve the problem because it would continue to toggle so long as the values meet the if statement criteria.
	//so what needs to happen to stop the criteria loop I created is to create some sort of stopper in the
	//playerTurn function. I could take it out of the iteration give the the <li> data values 1-5 in assending order.
	//and then give the if statment saying if...nope. When running console.log($children.eq(-1).val()) in the if statement
	//I get the return of 0. When running console.log($children.eq(-1)); I get the last of the array, which is correct. So then,
	//why won't it run the playerTurn function? Passing the playerTurn($children.eq(-1)); calls the appropriate player and fixes
	//the bug, but will only work with the first if statement. else if isn't registering on the rows, it simply adds the new class
	//as a second class to the $children.eq(-1); so that I can't layer. The problem is the lack of data-value changing on the turn.
	//I obviously don't understand data values so I used classes instead and it works well.


//---------------------------------------------------------
 //I'm creating a matrix blueprint for the board by adding the numerical values of two arrays to themselves.
//(see photo). The addArray function consists of one for loop to run through array1's values and also a nested
//for loop to run through the values of array2. The nested for loop adds the values of i and j and assigns them
//to a variable. Now I am creating a second function that consists of a for loop that loops through my <ul>
//and then a nested for loop that runs through the associated <ul>'s <li>s and adds the value found in 
//addArray to the current <li>. Right now I am stuck with passing the value from one for loop to the other.
//this makes me think it is a scope issue. So I am inserting the ulAssignment function within the addArray function,
//but after the original for loops. The ulAssignment is now reading $theAddition, but I don't think it's working the
//way I need it to, as the classes are not being added to the li or ul. perhaps tho I should be using index numbers.
//the possible problem I see with this is that adding another class that's a number will interfere with my playerTurn
//function and theDrop if else statement. The current problem with two separate functions looping through their multiple
//elements is that the ulAssignment is taking the passed information and adding it to every <li> on the board. 
//the ulAssignment function is running until it's complete before going back to the addArray function to get another element.
//var $childrenUL = $('ul').children(); console.log($childrenUL); this gave me every single <li> on the board.
//I made a significant jump in progress without documenting it. I am using a callback to set all of the <li> into an array.
//the array is in global scope. the argument I am pushing into the callback does not allow for any <li> with the class ('theClick')
//to be added. Since the array consists of <li> from top to bottom of their ul without being constrained by an ul parent, I can 
//now simply iterate through 1 array and give $theAddition to the appropriate <li>. I now have a setup of two arrays, liArray and
//grandMatrixArray the contents of which need to be added to the elements of the other. I will iterate through the liArray with 
//a for loop and add the contents of grandMatrixArray to the liArray. I'm not sure how to go about it tho.
//---------------------------------------------------------

//======.each to loop thru <li> to give them data-value O
	//using on the .click function this should be passed thru the .each function
	//in order to iterate thru the ul list items of the array just clicked
	//Each has li has been given a data value of 0. 
	// $('li').each(function(){
		
		// console.log($(this));
	// });


	//=======Old hard code for .click iteration through <li>======
			// if($children.eq(-1).hasClass('a')) {
			// 		playerTurn($children.eq(-1));
			// 	} else if($children.eq(-2).hasClass('a')) {
			// 		playerTurn($children.eq(-2));
			// 	}	else if($children.eq(-3).hasClass('a')) {
			// 		playerTurn($children.eq(-3));
			// 	}	else if($children.eq(-4).hasClass('a')) {
			// 		playerTurn($children.eq(-4));
			// 	} else if($children.eq(-5).hasClass('a')) {
			// 		playerTurn($children.eq(-5));
			// 	}	else if($children.eq(-6).hasClass('a')) {
			// 		playerTurn($children.eq(-6));
			// 	}else {console.log('there is no more');
			// }
			
//--------------------------------------------------------	


		//code to possibly submit input with the press of the enter button.
		// $('input').on('keyup keypress', function(e) {
  // 	var code = e.keyCode || e.which;
  // 	if (code == enter) { 
  //   e.preventDefault();
  //   	return false;
  // 	}
		// });


//=========================================================




// 1. In index.html you need to manually add in data-attribute
// 2. access each element on click, grab the data-attribute via...
// 	string versiom
// 	i.data().attribute
// 	parse to int 
// 	throw those into an array
// 3. Left with array of all matrix values for that player
// X. Sort array after each turn

// array = [1,5,6,6,6,6]























