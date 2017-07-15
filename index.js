const Rover = require('./rover.js');
const stdin = process.openStdin();
console.log("To terminate this program, please press q\n");
console.log("Please input the upper-right coordinates of the plateau: ");

var stageType = {
    waitingForBound : 0,
    waitingForCoordinate: 1,
    waitingForCommand: 2
}

var stage  = stageType.waitingForBound;
var rover;

var bound = {};
let inputArray;

stdin.addListener("data", function(d) {
    if (d.toString().trim() == "q"){
        process.exit();
    }else {
        switch (stage){
            case stageType.waitingForBound:
                inputArray = d.toString().trim().split(" ");
                let validateBoundValue = validateBound(inputArray);
                if(!validateBoundValue){
                    console.log("Invalidate bound, please enter again:");
                }else {
                    bound.xBound = parseInt(inputArray[0]);
                    bound.yBound = parseInt(inputArray[1]);
                    startNewRover();
                    stage = stageType.waitingForCoordinate;
                }
                break;
            case stageType.waitingForCoordinate:
                inputArray = d.toString().trim().split(" ");
                let validateCoordinateValue = validateCoordinate(inputArray);
                if(!validateCoordinateValue){
                    console.log("Invalid coordinate, please enter again:");
                }else {
                    let result = rover.setPosition(inputArray);
                    if(!result){
                        console.log('rover position is out of bound, please enter again:');
                    }else{
                        stage = stageType.waitingForCommand;
                        console.log("Please input rover explore instruction:");
                    }
                }
                break;
            case stageType.waitingForCommand:
                let instructionStr = d.toString().trim();
                let moveResult = rover.explore(instructionStr);
                if(moveResult == Rover.movementResult.invalidInstruction){
                    console.log("Invalid instruction, please enter again:");
                }
                else if(moveResult == Rover.movementResult.outOfBound){
                    console.log("Rover is out of bound, please reset position again:");
                }else{
                    console.log("Current rover position: " + rover.position.x + " " + rover.position.y + " " + rover.position.direction);
                }
                startNewRover();
                stage = stageType.waitingForCoordinate;
                break;
            default:
                console.log("Unexpected Error!!!")
        }
    }
});

function startNewRover() {
    console.log("Please input rover new position: ");
    rover = new Rover(bound);
}

function validateBound(boundArray) {
    if(boundArray.length != 2){
        return false;
    }else {
        for(let key in boundArray){
            let boundInt = parseInt(boundArray[key]);
            if(isNaN(boundInt)){
                return false;
            }
        }
        return true;
    }
}

function validateCoordinate(coordinateArray) {
    if(coordinateArray.length != 3){
        return false;
    }else {
        let coordinateX = parseInt(coordinateArray[0]);
        let coordinateY = parseInt(coordinateArray[1]);
        let direction = coordinateArray[2];
        if(isNaN(coordinateX) || isNaN(coordinateY)){
            return false;
        }
        let directionCollection = ['E', 'S', 'W', 'N'];
        return directionCollection.indexOf(direction) > -1;
    }
}