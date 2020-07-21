
var dogImg, happyDog, database, foodS, foodStock, lastFed;

function preload()
{
  dogImg = loadImage('images/dogImg.png')
  dogHappy = loadImage('images/dogImg1.png')
  milk = loadImage('images/Milk.png')
}

function setup() {
  createCanvas(1000, 1000);


  database = firebase.database();

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  
  var feed = createButton('Feed the dog')
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  var addFood = createButton('Add Food')
  addFood.position(800, 95)
  addFood.mousePressed(addFoods);

}

function draw() {  
  background(46, 139, 87);

  //console.log("foodstock = " + foodS + " Lastfed " + lastFed)


  console.log("foodObj before = " + foodObj)

  var foodObj = new Food(foodS, lastFed);

  foodObj.display();

  console.log("foodObj after = " + foodObj)

  drawSprites();

  stroke(20)
  textSize(50)
  fill('black');
  text('food: ' + foodS, 700, 200)

  fedTime = database.ref('FeedTime');
  fedTime.on('value', function(data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);

  if(lastFed >= 12){
    text('Last Fed: ' + lastFed % 12 + ' PM', 350, 30)
  } else if(lastFed === 0){
    text('Last Fed: 12 AM', 350, 30)
  } else {
    text('Last Fed: ' + lastFed + ' AM', 350, 30)
  }

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

  if (x <= 0){
    x = 0;
    dog.addImage(dogImg)
  } else {
    x -= 1;
  }
  
  database.ref('/').update({
    Food:x
  })

}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}