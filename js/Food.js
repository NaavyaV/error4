class Food {
    constructor(foodStock, lastFed){
        foodStock = this.foodStock
        lastFed = this.lastFed
    }

    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(milk, 720, 220, 70, 70);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 === 0){
                    x = 80;
                    y += 50;
                }
                image(milk, x, y, 50, 50)
                x += 30;
            }
        }
    }

    getFoodStock(){
        return this.foodStock
    }

    updateFoodStock(x){

        this.foodStock = x;
    }

    deductFood(y){

        this.foodStock = this.foodStock - y;
    }
}