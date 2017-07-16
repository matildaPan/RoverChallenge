var assert = require('assert');
var Rover = require('../rover.js');
const chai = require('chai');
var expect = chai.expect;


describe('Rover', function() {
    describe('Explore test', function() {
        let bound = {xBound: 5, yBound: 5};
        let rover = new Rover(bound);
        it('rover move from (1, 2) facing north to (1, 3) facing north with "LMLMLMLMM" command', function() {
            let expectedPosition = {x: 1, y: 3, direction: 'N'};
            let expectedResult = Rover.movementResult.success;
            rover.setPosition(['1', '2', 'N']);
            let exploredResult = rover.explore('LMLMLMLMM');
            let exploredPosition = rover.position;
            expect(exploredResult).to.equal(expectedResult);
            expect(expectedPosition).to.deep.equal(exploredPosition);
        });
        it('should move from (3, 3) facing east to (5, 1) facing east with "MMRMMRMRRM" command', function () {
            let expectedPosition = {x: 5, y: 1, direction: 'E'};
            let expectedResult = Rover.movementResult.success;
            rover.setPosition(['3', '3', 'E']);
            let exploredResult = rover.explore('MMRMMRMRRM');
            let exploredPosition = rover.position;
            expect(exploredResult).to.equal(expectedResult);
            expect(exploredPosition).to.deep.equal(expectedPosition);
        });
        it('should move out of bound', function () {
           let expectedResult = Rover.movementResult.outOfBound;
           rover.setPosition([0, 0, 'W']);
           let exploredResult = rover.explore('MMM');
           expect(exploredResult).to.equal(expectedResult);
        });
        it('should be invalid command', function () {
            let expectedResult = Rover.movementResult.invalidInstruction;
            rover.setPosition([4, 4, 'N']);
            let exploreResult = rover.explore('HHKKKLLL');
            expect(exploreResult).to.equal(expectedResult);
        })
    });

    describe("getNewDirection test", function () {
        let bound = {xBound: 5, yBound: 5};
        let rover = new Rover(bound);
        it("turn clockwise from south by 90 degree", function () {
            let expetctedDirection = 'W';
            rover.setPosition(['1', '1', 'S']);
            let roverDirection  = rover.getNewDirection(true);
            expect(roverDirection).to.equal(expetctedDirection);
        });
        it("turn anti-clockwise from south by 90 degree", function () {
            let expetctedDirection = 'E';
            rover.setPosition(['1', '1', 'S']);
            let roverDirection  = rover.getNewDirection(false);
            expect(roverDirection).to.equal(expetctedDirection);
        });
        it("turn clockwise from east by 90 degree", function () {
            let expetctedDirection = 'S';
            rover.setPosition(['1', '1', 'E']);
            let roverDirection  = rover.getNewDirection(true);
            expect(roverDirection).to.equal(expetctedDirection);
        });
        it("turn anti-clockwise from east by 90 degree", function () {
            let expetctedDirection = 'N';
            rover.setPosition(['1', '1', 'E']);
            let roverDirection  = rover.getNewDirection(false);
            expect(roverDirection).to.equal(expetctedDirection);
        });
    });

    describe("move test", function () {
        let bound = {xBound: 5, yBound: 5};
        let rover = new Rover(bound);
        it("move from south", function () {
            let expectedPosition = {x: 1, y: 0, direction: 'S'};
            rover.setPosition(['1', '1', 'S']);
            rover.move('S');
            let movedPosition = rover.position;
            expect(movedPosition).to.deep.equal(expectedPosition);
        });
        it("move from west", function () {
            let expectedPosition = {x: 0, y: 1, direction: 'W'};
            rover.setPosition(['1', '1', 'W']);
            rover.move('W');
            let movedPosition = rover.position;
            expect(movedPosition).to.deep.equal(expectedPosition);
        });

        it("move from north", function () {
            let expectedPosition = {x: 1, y: 2, direction: 'N'};
            rover.setPosition(['1', '1', 'N']);
            rover.move('N');
            let movedPosition = rover.position;
            expect(movedPosition).to.deep.equal(expectedPosition);
        });

        it("move from east", function () {
            let expectedPosition = {x: 2, y: 1, direction: 'E'};
            rover.setPosition(['1', '1', 'E']);
            rover.move('E');
            let movedPosition = rover.position;
            expect(movedPosition).to.deep.equal(expectedPosition);
        });

        it("move out of bound", function () {
            let expectedPosition = {x: 0, y: 0, direction: 'S'};
            let expectedResult = false;
            rover.setPosition(['0', '0', 'S']);
            let movedResult = rover.move('S');
            let movedPosition = rover.position;
            expect(movedPosition).to.deep.equal(expectedPosition);
            expect(movedResult).to.equal(expectedResult);
        });
    });

    describe("setPosition test", function () {
        it("set rover position to (1,1) facing north", function () {
            let bound = {xBound: 2, yBound: 2};
            let rover = new Rover(bound);
            let expectedResult = true;
            let expectedPosition = {x: 1, y: 1, direction: 'N'};
            let result = rover.setPosition([1, 1, 'N']);
            let roverPosition = rover.position;
            expect(result).to.equal(expectedResult);
            expect(roverPosition).to.deep.equal(expectedPosition);
        });
        it("set rover position out of bound", function () {
            let bound = {xBound: 2, yBound: 2};
            let rover = new Rover(bound);
            let expectedResult = false;
            let expectedPosition = {};
            let result = rover.setPosition([5, 5, 'N']);
            let roverPosition = rover.position;
            expect(result).to.equal(expectedResult);
            expect(roverPosition).to.deep.equal(expectedPosition);
        });
    });

    describe("coordinateWithinBound test", function () {
        let bound = {xBound: 2, yBound: 2};
        let rover = new Rover(bound);
        it('rover position is within bound', function () {
            let expectedResult = true;
            let result = rover.coordinateWithinBound({x: 1, y: 1, direction: 'S'});
            expect(result).to.equal(expectedResult);
        });

        it('rover position is out of bound', function () {
            let expectedResult = false;
            let result = rover.coordinateWithinBound({x: 5, y: 5, direction: 'S'});
            expect(result).to.equal(expectedResult);
        });
    })

    describe("validateInstruction test", function () {
        let bound = {xBound: 2, yBound: 2};
        let rover = new Rover(bound);
        it("valid intruction", function () {
            let expectedResult = true;
            let result = rover.validateInstruction("LRMMRRLL");
            expect(result).to.equal(expectedResult);
        });
        it("invalid intruction", function () {
            let expectedResult = false;
            let result = rover.validateInstruction("KKKLLLNNN");
            expect(result).to.equal(expectedResult);
        });
    })
});