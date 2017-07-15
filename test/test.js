var assert = require('assert');
var Rover = require('../rover.js');
const chai = require('chai');
var expect = chai.expect;


describe('Rover', function() {
    describe('Move test', function() {
        it('should return 1', function() {
            let rover = new Rover();
            let result = rover.move();
            expect(result).to.equal(1);
        });
    });
});