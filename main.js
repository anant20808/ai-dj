function preload(){
song=loadSound("music.mp3")
}
song="";
function setup(){
    canvas=createCanvas(550,550);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,model_loaded)
    posenet.on("pose",gotresult)
}
function draw(){
  image(video,0,0,550,650);
  

  if(scoreofleftwrist>0.2){
 circle(leftwristx,leftwristy,10);
    stroke("#FF0000");
    numberscoreleft= Number(leftwristy);
    floornumber=floor(numberscoreleft)
    volume=floornumber/500;
    document.getElementById("volume_display").innerHTML=volume;
    song.setVolume(volume);
}
if(scoreofrightwrist>0.2){
    circle(rightwristx,rightwristy,10);
    stroke("#FF0000");

    if(rightwristy>0 && rightwristy<=100){
        document.getElementById("speed_display").innerHTML="song speed is 0.5x"
        song.rate(0.5); 
    }
    else if(rightwristy>100 && rightwristx<=200){
        document.getElementById("speed_display").innerHTML="song speed is 1x"
        song.rate(1); 
    } else if(rightwristy>200 && rightwristx<=300){
        document.getElementById("speed_display").innerHTML="song speed is 1.5x"
        song.rate(1.5); 
    }
    else if(rightwristy>300 && rightwristx<=400){
        document.getElementById("speed_display").innerHTML="song speed is 2x"
        song.rate(2); 
    } 
    else if(rightwristy>400 && rightwristx<=500){
        document.getElementById("speed_display").innerHTML="song speed is 2.5x"
        song.rate(2.5); 
    }

}
}
function play(){
    song.play();
    song.setvolume(0.1);
    song.rate(2.5);
}
function pause(){
    song.pause();
}
function model_loaded(){
    console.log("model is loaded");
}
rightwristx="";
rightwristy="";
leftwristx="";
leftwristy="";
scoreofleftwrist=0;
scoreofrightwrist=0;
function gotresult(result){
    if(result.length>0){
        console.log(result);
        rightwristx=result[0].pose.rightWrist.x;
        rightwristy=result[0].pose.rightWrist.y;
        console.log("rightwristx = "+rightwristx+" rigthwristy = "+rightwristy);
        leftwristx=result[0].pose.leftWrist.x;
        leftwristy=result[0].pose.leftWrist.y;
        console.log("leftwristx = "+leftwristx+" leftwristy = "+leftwristy);
        scoreofrightwrist=result[0].pose.keypoints[9].score;
        scoreofleftwrist=result[0].pose.keypoints[10].score;
    }
}