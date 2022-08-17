function setup(){
canvas=createCanvas(300,300);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth=window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function clearcanvas(){
    background("white");
}
function draw(){
    strokeWeight(3);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
}
function classifyCanvas(){
classifier.classify(canvas,gotresult);
}
function gotresult(error,result){
    if (error){
        console.error(error);
    }
    console.log(result);
    document.getElementById("label").innerHTML="Label : "+result[0].label;
    document.getElementById("confidence").innerHTML="Confidence : "+Math.round(result[0].confidence*100)+"%";
    utterthis=new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterthis);
}