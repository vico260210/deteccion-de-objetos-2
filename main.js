img="";
objects=[];
status="";

function preload(){
    img=loadImage('dog_cat.jpg');
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video.createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="estado: detectando objetos";
}

function modelLoaded(){
    console.log("modelo cargado");
    status=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,380,380);
    if(status !=""){
        r=random(250);
        g=random(250);
        b=random(250);
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="estado: objeto detectado";
            document.getElementById("number_of_objects").innerHTML="numero de objetos detectados:"+objects.length;

            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            nofill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}