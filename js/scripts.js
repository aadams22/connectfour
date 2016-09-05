// console.log('guten tag');
var $clickValue = true;
var $winner     = null;
var $player1    = null;
var $player2    = null;
var liArray     = [];
var responses   = [];
var audio       = new Audio('./audio/piece_drop.wav');

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
      setTimeout(function(){
      $('<h2>' + $player1 + ' will make the first move.</h2>').appendTo('#overlay');
      }, 1000);
      setTimeout(function(){
        $('h2').fadeOut('slow');      
        $('#overlay').slideUp('slow');
      }, 3500);
    })
  })

  //two player game click scenario: removes h2, buttons, and appends h2, appends input, collects input value,
  $('#px2').click(function(){

    $('h2').remove();
    $('button').remove();
    $('<h2>' + differentResponses() + '</h2>').appendTo('#overlay');
    setTimeout(function(){
      location.reload();
    }, 4000);

    //!!Use when AI is functioning!!
    // $('<h2>What is your name?</h2>').appendTo('#overlay');
    // $('<input placeholder="What is your name?"></input>').appendTo('#overlay');
    // $player0 = $('#player0').val();

    // $('<button id="submit">enter</button>').appendTo('#overlay');

    // //enter button click scenario: removes button and overplay.
    // $('button').click(function(){
    //  $('button').fadeOut('slow');
    //  $('input').fadeOut('slow');
    //  $('h2').fadeOut('slow');
    //  $('#overlay').slideUp('slow');
    // })


  })


function differentResponses() {
  var res1 = "Sorry, Al is currently at the spa. Check back later to see if Al is finished relaxing."; 
  var res2 = "Al is a bit grumpy today. Al says to stop poking him.";
  var res3 = "Sorry, Al is laying by the beach drinking a margarita. We're not sure where. Check back later to see if we've located him.";
  var res4 = "Al is currently snuggling a kitty. He'll be ready to play as soon as he's finished.";
  var res5 = "Al is learning how to become an exterminator so that he can help us hunt bugs or star in a 1980s film.";
  var res6 = "Al has gone on a quest to be like AlphaGo. Check back later to see if he's succeeded.";
  var res7 = "Al has been traveling to different tech conferences to find love. All will be back once love has been found.";
  responses.push(res1, res2, res3, res4, res5, res6, res7);
  var res = responses[Math.floor(Math.random() * responses.length)];
  return res;
  console.log(res);
}; 

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
    //assigns x,y coordinates to each li element
    $(liArray[counter]).data('y', arrayY[i]);
    $(liArray[counter]).data('x', arrayX[j]);
    counter += 1;
  };
};

// //used to check if data is mapped correctly to ul
// for (var i = 0; i < liArray.length; i++) {
//  console.log(liArray[i], $(liArray[i]).data());
// };
// console.log(liArray.length)


//======END SETUP=============================
  //adding class a in order to iterate through the UL.
  var $liAll = $('li');
  var $data = $liAll.addClass('a');


  $('.theClick').click(function(e){
    // e.preventDefault();
    audio.play();
    var $children = $(this).parent().children();

    setTimeout(function(){
      $children.addClass('active');
    }, 150);
    setTimeout(function(){
      $children.removeClass('active');
    }, 1100);

    //iterates through clicked UL beginning at the last child
    for (var i = -1; i >= -6; i += -1) {
      var $findChildren = $children.eq([i]);
      if($findChildren.hasClass('a')) {
        return playerTurn($findChildren);
      }
    };

  }); //<--.click function


  //a boolean player switch. game begins with true in global scope
  function playerTurn(playedPiece) {
    // console.log('first player this was clicked playedPiece', playedPiece);
    if($clickValue == true) {
      setTimeout(function(){
        playedPiece.addClass('p1');
        $('.p1').removeClass('a');
        //returns the click value to that of the other player
        $clickValue = false;
        theSearch('p1', playedPiece);
      }, 1110);

    }else if ($clickValue == false) {
      setTimeout(function(){
        playedPiece.addClass('p2');
        $('.p2').removeClass('a');
        //returns the click value to that of the other player
        $clickValue = true;
        theSearch('p2', playedPiece);
      }, 1110);

    }

  }; //<--playerTurn

//filters elements by data value
$.fn.filterByData = function(y, valY, x, valX) {
    return this.filter(
        function() { 
          return $(this).data(y)==valY && $(this).data(x)==valX; 
        }
    );
};

//discovers winner through a series of searches
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
    };


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





function theAiChoice() {
  console.log('I do a thing. I make a choice. I Am AlIve. I Am an AI.');
};





//winning end game screen
function endGameWindow(color) {
  color == 'p1' ? $winner = $player1 : $winner = $player2;

  $("#overlay").slideDown();

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
