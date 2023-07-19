var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
$(".btn").on("click",function(){
   let userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
});
var started = false;

$(".btn_s").on("click",function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
       started = true;
       $(".btn_s").hide();
      
    }
})
function nextSequence(){
    userClickedPattern = []
    level ++;

    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4) ;
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel] ){
        if(userClickedPattern.length === gamePattern.length){
            console.log("win");
            
            setTimeout(function(){
                nextSequence()
            },900)
        }
        
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("! Game Over, Click button to Restart");
        $(".btn_s").text("Restart");
        $(".btn_s").show();
        
        startOver();
        console.log("fail!")
    }
}
// restart game function
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    
}


// playing Sound function
 function playSound(name){
    var audio = new Audio("./sounds/" + name +".mp3");
    audio.play();
    
 }

 // animation function
 function animatePress(currentColor){
    let currentButton = "#" + currentColor;
    $(currentButton).addClass("pressed ");
    setTimeout(() => {
        $(currentButton).removeClass("pressed");
    }, 200);
 }
