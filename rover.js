class Rover{
	constructor(bound){
	    this.position = {};
	    this.bound = bound;
	}

    static get movementResult() {
	    return {
            outOfBound: 0,
            invalidInstruction: 1,
            success: 2
        };
	}

	explore(instructionStr){
	    let instructionArray = instructionStr.split("");
	    let validateInstructionResult = this.validateInstruction(instructionArray);
	    if(!validateInstructionResult){
	        return Rover.movementResult.invalidInstruction;
        }else {
	        for(let instruction of instructionArray){
	            switch (instruction){
                    case 'L':
                        this.position.direction = this.getNewDirection(false);
                        break;
                    case 'R':
                        this.position.direction = this.getNewDirection(true);
                        break;
                    case 'M':
                        let result = this.move(this.position.direction);
                        if(!result){
                            return Rover.movementResult.outOfBound;
                        }
                        break;
                }
            }
            return Rover.movementResult.success;
        }
    }

    getNewDirection(isClockwise){
        let directionOrder = ['S', 'W', 'N', 'E'];
        let directionIndex = directionOrder.indexOf(this.position.direction);
        if (isClockwise) {
            directionIndex += 1;
        }else{
            directionIndex -=  1;
        }

        if(directionIndex === -1){
            directionIndex = directionOrder.length - 1;
        }else if(directionIndex === directionOrder.length){
            directionIndex = 0;
        }

        return directionOrder[directionIndex];
    }

    move(direction){
        let newPosition = Object.assign({}, this.position);
        switch (direction){
            case 'S':
                newPosition.y -= 1;
                break;
            case 'W':
                newPosition.x -= 1;
                break;
            case 'N':
                newPosition.y += 1;
                break;
            case 'E':
                newPosition.x += 1;
                break;
        }

        if (this.coordinateWithinBound(newPosition)){
            this.position = newPosition;
            return true;
        }else{
            return false;
        }
    }

    setPosition(coordinateArray){
        let coordinateX = parseInt(coordinateArray[0]);
        let coordinateY = parseInt(coordinateArray[1]);
        let direction = coordinateArray[2];
        let newPosition = {
            x: coordinateX,
            y: coordinateY,
            direction: direction
        };

        if (this.coordinateWithinBound(newPosition)){
            this.position = newPosition;
            return true;
        }else{
            return false;
        }

    }

    coordinateWithinBound(position) {
        let boundX = this.bound.xBound;
        let boundY = this.bound.yBound;
        return (position.x <= boundX) && (position.y <= boundY);
    }

    validateInstruction(instructionArray){
        let instructionCollection = ['L', 'R', 'M'];
        for(let instruction of instructionArray){
            if(instructionCollection.indexOf(instruction) === -1){
                return false;
            }
        }
        return true;
    }

}

module.exports = Rover;