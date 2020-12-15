//Create variables here
var dog, happyDog, dogImg, happyImg;
var foodS, foodStock;
var database;
var feed, addFood;
var feedTime, lastFed;
var foodObj;

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
  dog.scale=0.3;

  foodObj=new Food();
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(4,139,87);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+"PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed+"AM",350,30);
  }

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  })

  
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
  foodObj.updateFoodStock(foodS);
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

function feedDog(){
  dog.addImage(happyImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}