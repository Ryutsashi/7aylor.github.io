function ImageClass(path, name){
    this.image = new Image();
    this.isLoaded = false;
    this.image.name = name;
    this.image.onload = function () {
        checkImagesLoaded(this.image);
    }.bind(this);
    this.image.src = path;
}

function PlayerClass(x, y, sprite_sheet, animation_speed){
    AnimatedObjectClass.call(this, x, y, sprite_sheet, animation_speed);

    this.hasFire = false;

    this.move = function(newTileX, newTileY, dir){
        if(newTileX < 0 || newTileX >= NUM_COLSROWS || newTileY < 0 || newTileY >= NUM_COLSROWS){
            return;
        }
        if(map[newTileX][newTileY] == "rock"){
            moveRock(newTileX, newTileY, dir);
            return;
        }
        if(checkValidMapPos(newTileX, newTileY)){
            
            if(map[newTileX][newTileY] == "fire_idle"){
                this.img = getImageByName("caveman_torch");
                this.hasFire = true;
                fire = null;
                map[newTileX][newTileY] = "grass";
            }
            ctx.drawImage(getImageByName("grass"), this.tileX * TILE_HW, this.tileY * TILE_HW);
            this.tileX = newTileX;
            this.tileY = newTileY;
            this.draw();
        }
    }

    this.setPlayerMapPos = function(){
        map[this.tileX][this.tileY] = "caveman";
    }
    //this.setPlayerMapPos();
}

function AnimatedObjectClass(x, y, sprite_sheet, animation_speed){
    this.tileX = x;
    this.tileY = y;
    this.img = sprite_sheet;
    this.numSprites = sprite_sheet.width / TILE_HW;
    this.animSpeed = animation_speed;
    this.spriteIndex = 0;
    map[this.tileX][this.tileY] = sprite_sheet.name;

    this.updateSprite = function(){
        if(tick % this.animSpeed == 0){
            if(this.spriteIndex == this.numSprites - 1){
                this.spriteIndex = 0;
            }
            else{
                this.spriteIndex++;
            }
            this.draw();
        }
    }

    this.draw = function(){
        ctx.drawImage(getImageByName("grass"), this.tileX * TILE_HW, this.tileY * TILE_HW);
        ctx.drawImage(this.img, this.spriteIndex * TILE_HW, 0, TILE_HW, TILE_HW, this.tileX * TILE_HW, this.tileY * TILE_HW, TILE_HW, TILE_HW);
    }
}

function Vector2(x, y){
    this.x = x;
    this.y = y;
}

function Rock(x, y){
    this.tileX = x;
    this.tileY = y;
    this.x = this.tileX * TILE_HW;
    this.y = this.tileY * TILE_HW;

    this.getRockByCoord = function(x, y){
        if(x == this.tileX && y == this.tileY){
            return 1;
        }
        else{
            return -1;
        }
    }

    map[x][y] = "rock";
}