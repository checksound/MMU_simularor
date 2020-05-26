'use strict'

const Registry = require('./registry');

function calculateBinary(valueDecimal, numBytes) {
    var byteArray = [];

    while(valueDecimal != 0) {
        var div = Math.trunc(valueDecimal/2);
        var rem = valueDecimal % 2;
        valueDecimal = div;
        byteArray.splice(0, 0, rem);
    }
    
    // fill with zero
    while(byteArray.length < numBytes){
        byteArray.splice(0, 0, 0);;
    }

    return byteArray;
}

function calculateDecimal(byteArray) {

    if(!byteArray || byteArray.length == 0)
        return 0;

    var accumulator = 0;

    byteArray.forEach(value => accumulator = accumulator * 2 + value);

    return accumulator;

}

function calculateBinaryCompact(valueDecimal) {

    var binaryCompactValue = new Registry(0x0000).getValue();
    var binaryMaskOne = new Uint16Array([0x8000]);

    var shift = 0;
    while(valueDecimal != 0) {
        var div = Math.trunc(valueDecimal/2);
        var rem = valueDecimal % 2;
        valueDecimal = div;
        shift ++;
        binaryCompactValue = binaryCompactValue >> 1;
        if(rem == 1){
            binaryCompactValue = binaryMaskOne[0] | binaryCompactValue;
        } 
        
    }

    binaryCompactValue = binaryCompactValue >> (16-shift);

    return new Registry(binaryCompactValue);
}

module.exports = {
    calculateBinary: calculateBinary,
    calculateDecimal: calculateDecimal,
    calculateBinaryCompact: calculateBinaryCompact
}