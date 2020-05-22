'use strict'

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

    var binaryCompactArray = new Uint16Array(1);
    var binaryMaskOne = new Uint16Array([0x8000]);
    
    var shift = 0;
    while(valueDecimal != 0) {
        var div = Math.trunc(valueDecimal/2);
        var rem = valueDecimal % 2;
        valueDecimal = div;
        shift ++;
        binaryCompactArray[0] = binaryCompactArray[0] >> 1;
        if(rem == 1){
            binaryCompactArray[0] = binaryMaskOne[0] | binaryCompactArray[0];
        } 
        
    }

    binaryCompactArray[0] = binaryCompactArray[0] >> (16-shift);

    return binaryCompactArray[0];
}

function calculateDecimalCompact(registerValue) {

    // scorri 0 --> 15 

}

module.exports = {
    calculateBinary: calculateBinary,
    calculateDecimal: calculateDecimal,
    calculateBinaryCompact: calculateBinaryCompact,
    calculateDecimalCompact: calculateDecimalCompact
}