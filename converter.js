
const CustomError = require('./Errors');

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

class Converter {

    constructor(pageTable) {
        this.pageTable = pageTable;
    }

    doConversion(value) {

        var numPages = this.pageTable.length;
        var maxAddress = numPages * 4 * 1024 -1;

        if (value >= maxAddress)
            throw new CustomError(`Address ${value} eccede indirizzo limite ${maxAddress}`);

        var logicalAddressByteArray = this.calculateBinary(value);

        var numPagePart = logicalAddressByteArray.slice(0, 4);

        var offsetPart = logicalAddressByteArray.slice(4, 16);

        var decNumPage = this.calculateDecimal(numPagePart);

        var decNumFrame = this.pageTable[decNumPage];

        var arrayFramePart = calculateBinary(decNumFrame, 4);

        const physicalAddress = arrayFramePart.concat(offsetPart);

        return physicalAddress;

    }

    calculateBinary(valueDecimal) {
        
        return calculateBinary(valueDecimal, 16);
    }

    

    calculateDecimal(byteArray) {

        if(!byteArray || byteArray.length == 0)
            return 0;

        var accumulator = 0;

        byteArray.forEach(value => accumulator = accumulator * 2 + value);

        return accumulator;

    }

}



module.exports = Converter