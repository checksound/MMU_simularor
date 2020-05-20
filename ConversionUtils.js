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

module.exports = {
    calculateBinary: calculateBinary,
    calculateDecimal: calculateDecimal
}