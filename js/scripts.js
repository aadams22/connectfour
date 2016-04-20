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
var arrayX = [0, 1, 2, 3, 4, 5, 6];
var arrayY = [0, 1, 2, 3, 4, 5];
var counter = 0;

//creates grandMatrixArray by combining array1 and array2
for (var i = 0; i < arrayX.length; i++) {
	for (var j = 0; j < arrayY.length; j++) {
		var coordinates = { y: arrayY[i] , x : arrayX[j] };
		grandMatrixArray.push(coordinates);
		//assigns x,y coordinates to each li element
		$(liArray[counter]).data('y', arrayY[i]);
		$(liArray[counter]).data('x', arrayX[j]);
		counter += 1;
	};
};


//======END SETUP=============================
	//adding class a in order to iterate through the UL.
	var $liAll = $('li');
	var $data = $liAll.addClass('a');


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
		// console.log('this was clicked element', element);
		if($clickValue == true) {
			setTimeout(function(){
				element.addClass('p1');
				$('.p1').removeClass('a');
				//returns the click value to that of the other player
				$clickValue = false;
				theSearch('p1', element);
			}, 1510);

		}else if ($clickValue == false) {
			setTimeout(function(){
				element.addClass('p2');
				$('.p2').removeClass('a');
				//returns the click value to that of the other player
				$clickValue = true;
				theSearch('p2', element);
			}, 1510);

		}

 	}; //<--playerTurn

//filters elements by data value
$.fn.filterByData = function(x, val1, y, val2) {
    return this.filter(
        function() { 
        	return $(this).data(x)==val1 && $(this).data(y)==val2; 
        }
    );
}


function theSearch(player, element) {
	// console.log(player);
	// console.log(element);

	var valX = $(element).data().x;
	var valY = $(element).data().y;

	var foundSibling = $('li').filterByData('x', valX, 'y', valY);
	console.log('found element: ', foundSibling);

	counter = 0;
	for (var i = 0; i < 4; i++) {

		$('li').filterByData('x', valX, 'y', valY);
		counter +=1;
	};


};






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
