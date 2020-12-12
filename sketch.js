//Create variables here
var dog, happyDog, dogImg, happyImg;
var foodS, foodStock;
var database;

function preload() {
  //load images here
  dogImg=loadImage("dogImg.png");
  happyImg=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  dog=createSprite(200,200,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3
}


function draw() {  
  background(4,139,87);
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyImg);
  }

  
  drawSprites();
  fill("white");
  textSize(20);
  stroke("black");
  text("Note: Press UP_ARROW Key To Feed Doge Milk!",100,50);
  text("Food Remaining:"+foodS,300,200)
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}