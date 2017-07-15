class Rover{
	constructor(bound){
	    this.position = {};
	    this.bound = bound;
	}


	explore(instructionStr){
	    let instructionArray = instructionStr.split("");
	    let validateInstructionResult = this.validateInstruction(instructionArray);
	    if(!validateInstructionResult){
	        return 'invalid instruction';
        }else {
	        let directionOrder = ['S', 'W', 'N', 'E'];
            let directionIndex;
            let newDirectionIndex;
	        for(let key in instructionArray){
	            let instruction = instructionArray[key];
	            switch (instruction){
                    case 'L':
                        directionIndex = directionOrder.indexOf(this.position.direction);
                        newDirectionIndex = directionIndex - 1;
                        if(newDirectionIndex === -1){
                            newDirectionIndex = directionOrder.length - 1;
                        }
                        this.position.direction = directionOrder[newDirectionIndex];
                        break;
                    case 'R':
                        directionIndex = directionOrder.indexOf(this.position.direction);
                        newDirectionIndex = directionIndex + 1;
                        if(newDirectionIndex === directionOrder.length){
                            newDirectionIndex = 0;
                        }
                        this.position.direction = directionOrder[newDirectionIndex];
                        break;
                    case 'M':
                        this.move(this.position.direction);
                        let isCoordinateWithinBound = this.coordinateWithinBound(this.position);
                        if(!isCoordinateWithinBound){
                            return 'out of bound';
                        }else {
                            break;
                        }
                }
            }
            return this.position;
        }

    }

    move(direction){
	    switch (direction){
            case 'S':
                this.position.y -= 1;
                break;
            case 'W':
                this.position.x -= 1;
                break;
            case 'N':
                this.position.y += 1;
                break;
            case 'E':
                this.position.x += 1;
                break;
        }
	}




    setPosition(coordinateArray){
        let coordinateX = parseInt(coordinateArray[0]);
        let coordinateY = parseInt(coordinateArray[1]);
        let direction = coordinateArray[2];
        this.position = {
            x: coordinateX,
            y: coordinateY,
            direction: direction
        };
    }

    coordinateWithinBound(position) {
        let boundX = this.bound.xBound;
        let boundY = this.bound.yBound;
        return (position.x < boundX) && (position.y < boundY);
    }

    validateInstruction(instructionArray){
        let instructionCollection = ['L', 'R', 'M'];
        for(let key in instructionArray){
            if(instructionCollection.indexOf(instructionArray[key]) === -1){
                return false;
            }
        }
        return true;
    }

}

module.exports = Rover;