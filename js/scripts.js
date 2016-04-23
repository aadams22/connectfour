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
  // var docHeight = $(document).height();
  $("body").append("<div id='overlay'></div>");
  // $("#overlay").height(docHeight);
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
var arrayY = [0, 1, 2, 3, 4, 5, 6];
var arrayX = [0, 1, 2, 3, 4, 5];
var counter = 0;

//creates grandMatrixArray by combining array1 and array2
for (var i = 0; i < arrayY.length; i++) {
	for (var j = 0; j < arrayX.length; j++) {
		var coordinates = { y: arrayY[i] , x : arrayX[j] };
		grandMatrixArray.push(coordinates);
		//assigns x,y coordinates to each li element
		$(liArray[counter]).data('y', arrayY[i]);
		$(liArray[counter]).data('x', arrayX[j]);
		counter += 1;
	};
};

// //used to check if data is mapped correctly to ul
// for (var i = 0; i < liArray.length; i++) {
// 	console.log(liArray[i], $(liArray[i]).data());
// };
// console.log(liArray.length)


//======END SETUP=============================
	//adding class a in order to iterate through the UL.
	var $liAll = $('li');
	var $data = $liAll.addClass('a');


	$('.theClick').click(function(e){
		// e.preventDefault();
					// endGameWindow();
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
	function playerTurn(playedPiece) {
		// console.log('this was clicked playedPiece', playedPiece);
		if($clickValue == true) {
			setTimeout(function(){
				playedPiece.addClass('p1');
				$('.p1').removeClass('a');
				//returns the click value to that of the other player
				$clickValue = false;
				theSearch('p1', playedPiece);
			}, 1510);

		}else if ($clickValue == false) {
			setTimeout(function(){
				playedPiece.addClass('p2');
				$('.p2').removeClass('a');
				//returns the click value to that of the other player
				$clickValue = true;
				theSearch('p2', playedPiece);
			}, 1510);

		}

 	}; //<--playerTurn

//filters elements by data value
$.fn.filterByData = function(y, valY, x, valX) {
    return this.filter(
        function() { 
        	return $(this).data(y)==valY && $(this).data(x)==valX; 
        }
    );
}


//this is being used for testing purposes only
// function youWon(color) {
// 	alert('you won: ', color);
// };



function theSearch(color, playedPiece) {
	var count = 0;
	var valX = $(playedPiece).data().x;
	var valY = $(playedPiece).data().y;



		function columnSearch() {
				for (var i = 0; i < 4; i++) {
				var columnPiece= $('li').filterByData('y', valY, 'x', valX++);
				if (!columnPiece.hasClass(color)) return searchRight();			
				count += 1;
				if (count == 4) return endGameWindow(color);
			};
		};
		columnSearch();

		function leftUpHorizontalSearch(leftDownCount) {
			console.log('right up horizontal search');
			count = 0;
			valY = $(playedPiece).data().y;
			valX = $(playedPiece).data().x;


			for (var i = 0; i < 4; i++) {
				var leftUpHorizontalPiece = $('li').filterByData('y', valY++, 'x', valX--);
				
				leftUpHorizontalPiece.hasClass(color) ? count+=1 : count+=0;
				
				if (count == 4) return endGameWindow(color);
			};

			if (count + leftDownCount - 1 == 4) { endGameWindow(color) }
			//!!!THE WIN SEARCH ENDS HERE!!!//
		}	


		function leftHorizontalSearch() {
			console.log('left horizontal search');
			count = 0;
			valY = $(playedPiece).data().y;
			valX = $(playedPiece).data().x;

			for (var i = 0; i < 4; i++) {
				var leftHorizontalPiece = $('li').filterByData('y', valY--, 'x', valX++);

				if (!leftHorizontalPiece.hasClass(color)) return leftUpHorizontalSearch(count);

				count += 1;
				if (count == 4) return endGameWindow(color);

			};
		};

		function rightUpHorizontalSearch(rightDownCount) {
			console.log('right up horizontal search');
			count = 0;
			valY = $(playedPiece).data().y;
			valX = $(playedPiece).data().x;


			for (var i = 0; i < 4; i++) {
				var rightUpHorizontalPiece = $('li').filterByData('y', valY--, 'x', valX--);
				
				rightUpHorizontalPiece.hasClass(color) ? count+=1 : count+=0;
				
				if (count == 4) return endGameWindow(color);
			};

			if (count + rightDownCount - 1 == 4) { endGameWindow(color) }
			else leftHorizontalSearch();
		}


		function rightHorizontalSearch() {
			console.log('right horizontal search');
			count = 0;
			valY = $(playedPiece).data().y;

			for (var i = 0; i < 4; i++) {
				var rightHorizontalPiece = $('li').filterByData('y', valY++, 'x', valX++);

				if (!rightHorizontalPiece.hasClass(color)) return rightUpHorizontalSearch(count);

				count += 1;
				if (count == 4) return endGameWindow(color);

			};
		};

		function searchLeft(rightCount) {
			console.log('search left');
			count = 0;
			valY = $(playedPiece).data().y;

			for (var i = 0; i < 4; i++) {
				var rowPiece = $('li').filterByData('y', valY--, 'x', valX);

				rowPiece.hasClass(color) ? count+=1 : count+=0;

				if (count == 4) return endGameWindow(color);

			};

			if (count + rightCount - 1 == 4) { endGameWindow(color) }
			else rightHorizontalSearch();
		}

		function searchRight() {
			count = 0;
			valX = $(playedPiece).data().x;

			for (var i = 0; i < 4; i++) {
				var rowPiece = $('li').filterByData('y', valY++, 'x', valX);

				if (!rowPiece.hasClass(color)) { return searchLeft(count); } 

				count += 1;
				if (count == 4) return endGameWindow(color);

			};

		};






}; //theSearch











//winning end game screen
function endGameWindow() {

	// var docHeight = $(document).height();
	console.log($(document).height());
  $("body").slideDown("#overlay");
  // $("#overlay").height($(document).height());
  $('<h2 id="win">' + $winner + ' has won.</h2>').appendTo('#overlay');
	// setTimeout(function(){
	// 	$('h2').remove("#win");
	// }, 3500);
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
