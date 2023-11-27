/*
All code and audio created by Lucas J. Capp
Most images created by Kade M. Verewolf

*Uncomplete project
*to see a project that I did back in 7th grade just to get something on the web, go here
*/

//---------------------------------------------------------------------------------------------------

/*
------ To D0 --------
* fix hitBoxCheck function.  only detects one problem at a time
* make hit
* fix pointmove class function
* make player movement with keys
* make a checker to see if gaurds are touching the player
* make a you died screen
*
*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let d = {
    left:false,
    right:false,
    up:false,
    down:false,
    leftTime:0,
    rightTime:0,
    upTime:0,
    downTime:0,
    arrowDown:false
}
//eventListeners
document.addEventListener("keydown",function(event){
    if(event.key=="Enter"){
        if(veiw == "start"){
            veiw = "newspaper";
        }
    }
    
    if(veiw == "gameStart"){
        if(event.key=="ArrowLeft"){
            d.left = true;
            d.leftTime = gameTimer;
            
        }
        if(event.key=="ArrowRight"){
            d.right = true;
            d.rightTime = gameTimer;
        }
        if(event.key=="ArrowUp"){
            d.up = true;
            d.upTime = gameTimer;
        }
        if(event.key=="ArrowDown"){
            d.down = true;
            d.downTime = gameTimer
        }
    }
})

document.addEventListener("keyup",function(event){
    if(event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "ArrowDown" || event.key == "ArrowUp"){
        d.arrowDown = true;
        
    }
    else{
        d.arrowDown = false;
    }

    if(event.key=="ArrowLeft"){
        d.left = false;      
        d.leftTime = 0;
    }
    if(event.key=="ArrowRight"){
        d.right = false;    
        d.rightTime = 0;

    }

    if(event.key=="ArrowUp"){
        d.up = false;
        d.upTime = 0;

    }
    if(event.key=="ArrowDown"){
        d.down = false;
        d.downTime = 0;

    }
    
})

canvas.onclick = function(){
    if(veiw == "start"){
        veiw = 'newspaper';
    }
}
//objects and constructors---------------------------------------------------------------------------------------------------------------------------

class RoyalGaurd{
    constructor(x,y,point,time){
        this.x = x;
        this.y = y;
        this.point = point;
        this.time = time;     
    }
    timer = 0;
    status = "start"
    pointMove(){
        this.timer += timepassed
        if(this.time>this.timer){  
            
            this.x += ((this.point[0]-this.x)/this.time)*timepassed;
            this.y += ((this.point[1]-this.y)/this.time)*timepassed;
            this.timer+=timepassed;
            
        }
        
    }
}
//patrol gaurd constructor
class PatrolGaurd{
    constructor(x,y,width,height,patrolArr,sequence,point){
        this.width = width;
        this.height = height;
        this.patrolArr = patrolArr
        this.sequence = sequence
        this.point = point
        this.x = x;
        this.y = y;
    }
    //makes points to keep track of last point and current poin (starts with both the same because there isnt a last point yet)
    lastPoint = 0;
    moveOn = false;
    movedFirst = false;
    firstTime = true;
    moveStatus = "uncomplete";

    //does most of the repetive checking for the nextpoint getter function
    nextPointHelp(chance,sequenceREF,pointREF){
        //less than chance or equel to chance
        if(Math.random()<=chance){
            //returns point -1 if point doesn't = 0, otherwise it returns max index of sequence
            if(sequenceREF[sequenceREF.indexOf(this.point)] == 0){
                return [sequenceREF[sequenceREF.length - 1], this.point];
            }
            else{               
                return [sequenceREF[sequenceREF.indexOf(this.point)-1], this.point];
            }
        }
        //greater than chance
        else{
            //return point +1 if the point isnt at the end, other wise it returns 0
            if(sequenceREF[sequenceREF.indexOf(this.point)] == sequenceREF.length-1){
                return [sequenceREF[0], this.point];
            }
            else{
                return [sequenceREF[sequenceREF.indexOf(this.point)+1], this.point];
            }
        }
    }
    //finds the next point for the gaurd to go to based on a sequence and chance
    nextPoint(){
        //if the x and y is equal to where it should be and it is ready to move it makes a new point     
            if(this.lastPoint == this.point-1){
                [this.point, this.lastPoint] = this.nextPointHelp(.3,this.sequence,this.point)
            }
            else if(this.lastPoint == this.point+1){
                [this.point, this.lastPoint] = this.nextPointHelp(.7,this.sequence,this.point)
            }
            else if(this.point == this.lastPoint+this.sequence.length-1){
                [this.point, this.lastPoint] = this.nextPointHelp(.7,this.sequence,this.point)
            }   
            else if(this.lastPoint == this.point+this.sequence.length-1){
                [this.point, this.lastPoint] = this.nextPointHelp(.3,this.sequence,this.point)
            }
            //returns an index of equal chance
            else{
                [this.point, this.lastPoint] = this.nextPointHelp(.5,this.sequence,this.point)
            }
            this.moveStatus = "uncomplete"       
    }
    //like nextPointHelp, it helps take out some of the repetitiveness of the main function it is helping
    pointMoveHelp(axisCoord1,axisCoord2,index1,index2,dpfREF){
        if(axisCoord1<this.patrolArr[this.sequence[this.point]][index1]-1 || axisCoord1>this.patrolArr[this.sequence[this.point]][index1]+1){
            //adds the dpf * the direction to x
            axisCoord1 += dpfREF* (this.patrolArr[this.sequence[this.point]][index1]-axisCoord1)/(Math.abs((this.patrolArr[this.sequence[this.point]][index1]-axisCoord1)));
        }
        else{
            axisCoord1 = this.patrolArr[this.sequence[this.point]][index1]
            if(axisCoord2<this.patrolArr[this.sequence[this.point]][index2]-1 || axisCoord2>this.patrolArr[this.sequence[this.point]][index2]+1){
                axisCoord2 += dpfREF* (this.patrolArr[this.sequence[this.point]][index2]-axisCoord2)/(Math.abs((this.patrolArr[this.sequence[this.point]][index2]-axisCoord2)));
            }
            else{
                //resets the moved first variable so that the next iteration will work
                this.movedFirst = false;
                axisCoord2 = this.patrolArr[this.sequence[this.point]][index2]
                this.moveStatus = "complete";
            }
        }
        
        return [axisCoord1,axisCoord2]
    }
    pointMove(dpf){
        //dpf = distance per frame
        //checks if the x and y values equal the point or not and then moves to the point if not
        //checks which value is farther away and then moves player to that point and then the next part
        if(this.firstTime == true){
            this.movedFirst = true;
        }
        if(Math.abs(this.patrolArr[this.sequence[this.point]][0])-this.x>Math.abs(this.patrolArr[this.sequence[this.point]][1])-this.y && this.movedFirst){
            this.movedFirst = true;
            [this.x,this.y] = this.pointMoveHelp(this.x,this.y,0,1,dpf)
            this.firstTime = false;
        }
        else{
            this.movedFirst = false;
            [this.y,this.x] = this.pointMoveHelp(this.y,this.x,1,0,dpf)
        }
        //* (this.patrolArr[this.sequence[this.point]][0]-this.x)/(Math.abs((this.patrolArr[this.sequence[this.point]][0]-this.x)));
    }
}


//image info class constructor
class ImageInfo{
    constructor(x,y,width,height){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }  

    zoomX(value,time,offset){
        this.x -= (((value/time)+offset)*timepassed)/2;

        this.width += ((value/time)*timepassed)*2;
    }
    
    zoomY(value,time,offset){
        this.y -= (((value/time)+offset)*timepassed)/2;
        this.height += ((value/time)*timepassed)*2;
        
    }
    moveX(distance,time){
        this.x+=(distance/time)*timepassed;
    }
    moveY(distance,time){
        this.y+=(distance/time)*timepassed;
    }
    get ratio(){
        return this.height/this.width;
    }
    widthChange(width){
        this.height = width*this.ratio;
        this.width = width;
    }
}

//player object---------------------------------------////////////-------------------------------------------------------------------------------
let player = {
    coins:0,
    growCoin(x){
        this.coins += x;
    },
    x:0,
    y:0,
    width:50,
    height:100,
    drawWidth:1596,
    drawHeight:980,
    drawX:this.x-(this.drawWidth/3),
    drawY:0,
    get right(){return this.x+this.width},
    get bottom(){return this.y+this.height},
    dpf:150,
    avatar: new Image(),
    img: new ImageInfo(0,0,100,100),
    get ratio(){
        return this.height/this.width;
    },
    get ratioD(){
        return this.drawHeight/this.drawWidth;
    },
    widthChangeD(width){
        this.drawHeight = width*this.ratioD;
        this.drawWidth = width;
    },
    widthChange(width1){
        this.height = width1*this.ratio;
        this.width = width1;
    }
}
console.log(player.right,player.bottom)
let avatar = new Image()
avatar.src = "main character.png";

player.avatar.src="main character.png"

//images---------------------------------------------------------------------------------------------------------------------------
const newspaper1 = new Image()
newspaper1.src = "Newpaper 2.png";
let newspaper1att = new ImageInfo(0,0,600,400);


const newspaper2 = new Image();
newspaper2.src = "newspaper3.png";
let newspaper2att = new ImageInfo(0,0,500,400);

const newspaper3 = new Image();
newspaper3.src = "NewspaperHand.png"
let newspaper3att = new ImageInfo(0,0,500,400);

const gameTown = new Image();
gameTown.src = "gameTown.png";
let gameTownAtt = new ImageInfo(0,0,6250,7202);

let ratio = gameTownAtt.ratio;
gameTownAtt.width = 500;
gameTownAtt.height = 500*ratio;

const weaponShop = new Image();
weaponShop.src = "weaponShop.png"
let weaponShopAtt = new ImageInfo(0,0,478,1000);

const castle = new Image();
castle.src = "castle.png";
let castleAtt = new ImageInfo(0,0,1080,1080);

const king = new Image();
king.src = "king character.png"
let kingAtt = new ImageInfo(0,0,1000,800)

const knight = new Image()
knight.src = "knight2.png"
let knightAtt = new ImageInfo(0,0,313,519)

//functions-------------------------------------------------------------------------------------------------
let townHitBoxes = [[100,100,100,100],[250,0,100,50]]

let xSide = "idkYet"
let ySide = "idkYet"
let hitIf = [false,0]
let causeSide = "IdkYet"

//camera functions----------------------------------------------------
let globalX = 1;
let globalY = 1;

function drX(x1){
    return x1 - globalX;
}
function drY(y1){
    return y1 - globalY;
}


//checks the hitboxes and if player is inside and array it breaks array and sets hitIf to true and gives index of the array or -1 if player is outside the boxes 
function hitBoxCheck(hitArray,left,up,right,down,drawHitBoxes){
    //makes hitif
    let indexHit = [];
    hitIf = [hitIf[0]];
    for (x in hitArray){
        indexHit = [];
        if(rightSideTrue(hitArray,false) && leftSideTrue(hitArray,false) && downSideTrue(hitArray,false) && upSideTrue(hitArray,false)){  
            indexHit.push(x)
        }
        else{
            hitIf[0] = false
        }
    } 

    hitIf[0] = indexHit == [];
    console.log(hitIf)
    if(hitIf[0]){
        hitIf.push(1)
    }
    else{
        hitIf.push(...indexHit)
    }
    console.log(hitIf)

    

    
    //console.log(player.y<hitArray[hitIf[1]][3]+hitArray[hitIf[1]][1],player.bottom>hitArray[hitIf[1]][1])
    
    function leftSideTrue(array,inv){
        if(inv){
            return player.x>array[hitIf[1]][2]+array[hitIf[1]][0] 
        }
        else{
            return player.x<array[hitIf[1]][2]+array[hitIf[1]][0]
        } 
    }
    function upSideTrue(array,inv){ 
        if(inv){
            return player.y>array[hitIf[1]][3]+array[hitIf[1]][1]
        }else{
            return player.y<array[hitIf[1]][3]+array[hitIf[1]][1]
        }
    }
    function rightSideTrue(array,inv){ 
        if(inv){
            return player.right<array[hitIf[1]][0]
        }else{
            return player.right>array[hitIf[1]][0]
        } 
    }
    function downSideTrue(array,inv){
        if(inv){
            return player.bottom<array[hitIf[1]][1]
        }else{
            return player.bottom>array[hitIf[1]][1]
        }
    }
    //console.log(leftSideTrue(hitArray),rightSideTrue(hitArray),upSideTrue(hitArray),downSideTrue(hitArray))

    //takes player input and then exucutes if it is outside the boxes
        //uses centers to determine the quadrant of the box the player is on
        //X axis
        
        if(hitIf[0]){
            if(player.x+(player.width/2)<=hitArray[hitIf[1]][0]+(hitArray[hitIf[1]][2])/2){
                xSide = "left"
            }
            else{
                xSide = "right"
            }
            //Y axis
            if(player.y+player.height/2<=hitArray[hitIf[1]][1]+(hitArray[hitIf[1]][3])/2){
                ySide = "top"
            }
            else{
                ySide = "bottom"
            }
        }
        // not usefull but not discarded code----------------------------------
        //determines what side actually caused it using closest distance
        //top left bottom right
        /*
        let distance = [0,0,0,0]
        let closestDistance = 0;
        distance[0] = player.bottom - hitArray[hitIf[1]][1]
        distance[1] = player.right - hitArray[hitIf[1]][0]
        distance[2] = player.y - hitArray[hitIf[1]][3]+hitArray[hitIf[1]][1]
        distance[3] = player.x - hitArray[hitIf[1]][2]+hitArray[hitIf[1]][0]
        
        closestDistance = Math.min(distance[0],distance[1],distance[2],distance[3])
        if(distance[0] == closestDistance){
            causeSide = "top"
        }
        else if(distance[1] == closestDistance){
            causeSide = "left"
        }
        else if(distance[2] == closestDistance){
            causeSide = "bottom";
        }
        else if(distance[3]== closestDistance){
            causeSide = "right"
        }
        */
        //end of not usefull but not discarded code-----------------------------

    //second stage where it moves player based on speed, direction, and if it is inside hitboxes
    //regular left and checking for diagnal movement
    if(left == true){
        if(down == true){
            if(hitIf[0]==false){
                //execute something to move player
                player.x -= player.dpf * timepassed;
                player.y += player.dpf * timepassed;
            }
            else if(xSide == "left" && rightSideTrue(hitArray,false) && ySide == "bottom" && upSideTrue(hitArray,false)){
                //execute something to move player
                player.x -= player.dpf * timepassed;
                player.y += player.dpf * timepassed;

            }
        }

        else if(up == true){
            if(hitIf[0]==false){
                //executes something to move player
                player.x -= player.dpf * timepassed;
                player.y -= player.dpf * timepassed;

            }
            else if(xSide == "left" && rightSideTrue(hitArray,false) && ySide == "up" && downSideTrue(hitArray,false)){
                //exexutes something to move player
                player.x -= player.dpf * timepassed;
                player.y -= player.dpf * timepassed;

            }
        }
        else{
            
            if(hitIf[0] == false){
                //executes something to move player
                player.x -= player.dpf * timepassed;

            }
            else{
                console.log(hitIf)
                if(player.x < hitArray[hitIf[1]][2]+hitArray[hitIf[1]][0]-(player.dpf*timepassed * 3)){
                    //executes something
                    player.x -= player.dpf * timepassed;
                }
            }
        } 
    }
    //regular right and checking for diagnal movement------------------------
    else if(right == true){
        //right down movement

        if(down == true){
            if(hitIf[0]==false){
                //execute something to move player
                player.x += player.dpf * timepassed;
                player.y += player.dpf * timepassed;
            }
            
            else if(xSide == "right" && leftSideTrue(hitArray,false) && ySide == "bottom" && upSideTrue(hitArray,false)){
                //execute something to move player
                player.x += player.dpf * timepassed;
                player.y += player.dpf * timepassed;
            }
        }
        // up right movement
        else if(up == true){
            if(hitIf[0] == false){
                //executes something to move player
                player.x += player.dpf * timepassed;
                player.y -= player.dpf * timepassed;
            }
            // make this condition more specific ---------------------------
            else if(xSide == "right" && leftSideTrue(hitArray,false) && ySide == "up" && downSideTrue(hitArray,false)){
                //exexutes something to move player
                player.x += player.dpf * timepassed;
                player.y -= player.dpf * timepassed;
            }
            
        }
        //right movement
        else{
            if(hitIf[0] == false){
                //executes something to move player
                player.x += player.dpf * timepassed;
            }
            else if(player.right>hitArray[hitIf[1]][0]+(player.dpf*timepassed*3)){
                //executes somehting
                player.x += player.dpf * timepassed;
            }
        }
                    
    }
    else if(down == true && left == false && right == false && up == false){
        if(hitIf[0] == false){
            //executes something to make the player move
            player.y += player.dpf * timepassed;
        }//hitArray[hitIf[1]][1]
        else if(player.bottom>hitArray[hitIf[1]][1]+(player.dpf*timepassed*3)){
            //executes something to make the player move
            player.y += player.dpf * timepassed;
        }
    }

    else if(up == true && left == false && right == false && down == false){
        if(hitIf[0] == false){
            //executes something to make the player move
            player.y -= player.dpf * timepassed;
        }
        else if(player.y < hitArray[hitIf[1]][3]+hitArray[hitIf[1]][1]-(player.dpf*timepassed * 3)){
            //executes something to make the player move
            player.y -= player.dpf * timepassed;
        }
    }
    console.log()
   
    if(drawHitBoxes){
        for (i of hitArray){
            ctx.beginPath()
            ctx.moveTo(i[0],i[1])
            ctx.lineTo(i[2],i[1])
            ctx.lineTo(i[2],i[3])
            ctx.lineTo(i[0],i[3])
        }
    }
}

//draws a text bubble based on certain widths and heights
function textBubble(x,y,width,height,backgroundIf,tLength,fontSize,text){
    let textlength = text.length*fontSize;
    let timesthrough = Math.ceil(textlength/width);
    let replaced = '';
    let replaceLength = 0;
    //draws the background rectangles
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "#ccd9ff";
        //draws background if background = true
        if(backgroundIf){
            ctx.beginPath();
            ctx.rect(x,y,width,height);
            ctx.rect(x,y+height,15,10);
            ctx.fill();
            ctx.stroke();
        }

    for(let a = 0; a < timesthrough;a++){
        
            //adds any text within a certain width to a variable before printing that variable to screen
            replaced = '';
            replaceLength = 0;
            for(let z of text){
                
                if(replaceLength*tLength<width-10){
                    replaced += z;
                }
                replaceLength += 1;
            }
            ctx.fillStyle = "black"
            ctx.fillText(`${replaced}`,x+5,y+20+(a*fontSize),width-8);
            //deletes text that was already printed to screen
            text = text.replace(`${replaced}`,'');
    }
}
// a function that draws the background for the text
function textBackground(x,y,width,height){
    ctx.beginPath()
    ctx.fillStyle = "#ccd9ff";
    ctx.rect(x,y,width,height);
    ctx.rect(x,y+height,15,10);
    ctx.fill();
    ctx.stroke();
}

//draws objective at top left corner
function objective(width,height,completion,text){
    ctx.fillStyle = "#808B96"
    ctx.fillRect(10,10,width,height)
    ctx.rect(20,50,width-20,40)

    ctx.fillStyle = "#3498DB"
    ctx.strokeStyle = "#3498DB"
    ctx.lineWidth=3;

    ctx.beginPath()
    ctx.rect(20,40,width-25,10)
    ctx.stroke()
    
    ctx.fillRect(20,40,(width-25)*completion,10);
    ctx.fillStyle="rgb(00,00,00)"
    ctx.font = "bold 15px Arial"
    ctx.fillText("Objective:",20,30);
    ctx.font="15px Arial";
    ctx.fillText(text,100,30)
}


function playerDir(){
    let firstX = Math.max(d.leftTime,d.rightTime)
    let firstY = Math.max(d.downTime,d.upTime)
    if(d.arrowDown){
        if(firstX == d.leftTime && d.left){
            //d.right = false;
            d.left = true;
        }
        else if(firstX == d.rightTime && d.right){
            d.right = true;
            //d.left = false;
        }

        if(firstY == d.downTime && d.down){
            d.down = true;
            //d.up = false;
        }
        else if(firstY == d.upTime && d.up){
            //d.down = false;
            d.up = true;
        }
    }
}
//camera functions


//audio--------------------------------------------------------------------------------------------------
const newspaperAudio = new Audio('Menacing song.m4a');

//variables-----------------------------------------------------------------------------------------------------------------
let veiw = 'start';
let t = Date.now()
let timepassed = 0;
let newsTimer = 0;

//main function------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
function main(){
    ctx.clearRect(0,0,500,400);
    timepassed = Date.now() - t;
    timepassed = timepassed/1000;
    t = Date.now();

    //veiw check to see what stage they are at
    if(veiw == "newspaper"){
        newspaper();
    }
    else if(veiw == "gameStart"){
        gameStart();
    }
    else{
        ctx.font = "40px Arial"
        ctx.fillText("Click to start",130,100)
    }
    requestAnimationFrame(main);
}
main()

//newsPaper function --------------------------------------------------------------------------------------
let newsAudioPlay = true;

function newspaper(){
    //makes the timer to control when things happen
    newsTimer += timepassed;

    //-------------------------
    if(newsTimer <= 13.5){
        //zooms in after 3.5 seconds on news paper
        if(newsTimer >= 3.5){
            newspaper1att.zoomX(500,10,-25);
            newspaper1att.zoomY(400,10,120);
        }
        //fades a black recangle in
        if(newsTimer >= 11){
            ctx.globalAlpha = `${1-(newsTimer-11)/2.5}`
        }
        else{
            ctx.globalAlpha = `1`;
        }
        ctx.color = "#880000"
        ctx.fillRect(0,0,500,400);

        //draws the newspaper
        ctx.drawImage(newspaper1,newspaper1att.x,newspaper1att.y,newspaper1att.width,newspaper1att.height);
        
        if(newsTimer<2.5){
            ctx.globalAlpha = `${1-newsTimer/2.5}`;
            ctx.fillRect(0,0,500,400);          
        }
        if(newsTimer >= 11){
            ctx.globalAlpha = `${((newsTimer-11)/2.5)}`
            ctx.fillStyle = "#651300"
            ctx.fillRect(0,0,500,400);
            ctx.drawImage(newspaper2,0,0,500,400)
        }
    }
    //end of first cycle
    //start of next cycle---------------------------------
    else if(newsTimer > 13.5 && newsTimer <= 22.5){
        if(newsTimer > 16){
            newspaper2att.zoomX(700,6.5,75);
            newspaper2att.zoomY(700*.8,6.5,0);
        }    
        ctx.drawImage(newspaper2,newspaper2att.x,newspaper2att.y,newspaper2att.width,newspaper2att.height);
        if(newsTimer >= 20){
            ctx.globalAlpha = `${((newsTimer - 20)/2.5)}`
            ctx.fillStyle = "black";
        ctx.fillRect(0,0,500,400);
        }
        ctx.globalAlpha = '1';
    } 
    //end of second cycle start of third---------------
    else if(newsTimer > 22.5 && newsTimer < 32.5){
        //draws background
        ctx.fillSyle = "#143C00"
        ctx.fillRect(0,0,500,400);
        ctx.globalAlpha = "1";
        //draws castle
        ctx.drawImage(gameTown,gameTownAtt.x,gameTownAtt.y,gameTownAtt.width,gameTownAtt.height);
        //fades the town into veiw
        if(newsTimer<25){
            ctx.globalAlpha = `${1-(newsTimer-22.5)/2.5}`
            ctx.fillRect(0,0,500,400)
            ctx.globalAlpha = "1";
        }
        //zooms in on the castle
        else if(newsTimer<27.5){
            gameTownAtt.zoomX(200,5,-100);
            gameTownAtt.zoomY(200*ratio,5,-50);
        }
        //fades the town to black
        else if(newsTimer>=27.5){
            ctx.globalAlpha = `${((newsTimer-27.5)/5)}`;
            ctx.fillStyle = "black"
            ctx.fillRect(0,0,500,400);
            ctx.globalAlpha = "0";
        }
    }
    //ends third cycle starts fourth---------------------------
    else if(newsTimer >=32.5 && newsTimer < 42.5){
        ctx.clearRect(0,0,500,400)
        ctx.globalAlpha = "1"
        ctx.drawImage(castle,-100,0,700,700)
        
        kingAtt.x = 175;
        kingAtt.y = 30;
        kingAtt.widthChange(150);     
        knightAtt.widthChange(75);
        ctx.drawImage(king,kingAtt.x,kingAtt.y,kingAtt.width,kingAtt.height)
        ctx.drawImage(knight,75,100,knightAtt.width,knightAtt.height);
        ctx.drawImage(knight,350,100,knightAtt.width,knightAtt.height);
            //textBubble(250,10,100,50,function(){return newsTimer<40},4,10,"I the King rule the Broker family guilty of treason and murder")  
        
        if(newsTimer<40){
            textBubble(250,10,100,50,true,4,10,"I the King rule the Broker family guilty of treason and murder")
        }
        else{
            textBubble(250,10,100,25,true,4,20,"SEIZE THEM!");
        }
    }

    else{
        veiw = "gameStart"
        ctx.clearRect(0,0,500,400)
        ctx.globalAlpha = "1"
        ctx.drawImage(castle,-100,0,700,700)      
        kingAtt.x = 175;
        kingAtt.y = 30;
        kingAtt.widthChange(150);      
        knightAtt.widthChange(75);
        
        ctx.drawImage(king,kingAtt.x,kingAtt.y,kingAtt.width,kingAtt.height)
        ctx.drawImage(knight,75,100,knightAtt.width,knightAtt.height);
        ctx.drawImage(knight,350,100,knightAtt.width,knightAtt.height);
    }
    if(newsAudioPlay){
        newspaperAudio.currentTime = 3;
        newspaperAudio.play();
        newsAudioPlay = false;
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//gameStart function and variables

let place = "castle"
let gameTimer = 0;
player.x = 330
player.y = 200
function gameStart(){

    gameTimer += timepassed

    let escapeCompletion = (Math.abs(450-player.x)+(700-player.y))/1150;
    let royalGaurd1 = new RoyalGaurd(175,100,[player.x,player.y],3);
    let royalGaurd2 = new RoyalGaurd(450,100,[player.x,player.y],3);
    
    globalX = 0;
    
    ctx.clearRect(0,0,500,400)
    if(place == "castle"){
        playerDir();
        hitBoxCheck([[0,-100,800,100],[-100,0,100,800]],d.left,d.up,d.right,d.down,true)
        
        //drawing everything-------------------
        ctx.globalAlpha = "1"
        
        ctx.drawImage(castle,drX(0),drY(0),700,700)
        //width, height, x, and y changes
        kingAtt.x = 275;
        kingAtt.y = 30;
        kingAtt.widthChange(150);
        knightAtt.widthChange(75);

        player.widthChangeD(200);
        player.drawX = player.x-(player.drawWidth/3)

        royalGaurd1.status="start";
        royalGaurd1.pointMove();

        ctx.drawImage(king,drX(kingAtt.x),drY(kingAtt.y),kingAtt.width,kingAtt.height)
        ctx.drawImage(knight,drX(royalGaurd1.x),drY(royalGaurd1.y),knightAtt.width,knightAtt.height);
        ctx.drawImage(knight,drX(royalGaurd2.x),drY(royalGaurd2.y),knightAtt.width,knightAtt.height);
        ctx.drawImage(avatar,drX(player.drawX),drY(player.y),player.drawWidth,player.drawHeight)
        
        objective(200,50,escapeCompletion,"Escape Castle")
        
        ctx.fillRect(player.x,player.bottom,10,10)
    }

}

//----------------------------------------------------------
