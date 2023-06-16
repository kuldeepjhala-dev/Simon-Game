var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = true;
var level = 0;

$(document).keypress(function() {
  if(started) {
    $("level-title").text("Level " + level );
    nextSequence();
    //console.log("key pressed");
    started = false;
  }
});

$('.btn').click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  //console.log(userChosenColour);
})

function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random() * 3) + 1); //random number will be generated
  var randomChosenColour = buttonColours[randomNumber]; //form buttonColours function oen button is selected
  gamePattern.push(randomChosenColour); //selected button value is inserted into the gamePatter[]
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animination
  playSound(randomChosenColour); //sound play
  animatePress(randomChosenColour); //animation

  $("h1").text("Level " + level);
  level++;
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
      startOver();
      console.log("Wrong");
  }
  }

  function startOver(){
    gamePattern = [];
    level = 0;
    started = true;
  }
