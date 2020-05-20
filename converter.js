
'use strict'

const CustomError = require('./Errors');
const ConversionUtils = require('./ConversionUtils');

class Converter {

    constructor(pageTable) {
        this.pageTable = pageTable;
    }

    doConversion(value) {

        var numPages = this.pageTable.length;
        var maxAddress = numPages * 4 * 1024 -1;

        if (value >= maxAddress)
            throw new CustomError(`Address ${value} eccede indirizzo limite ${maxAddress}`);

        var logicalAddressByteArray = ConversionUtils.calculateBinary(value, 16);

        var numPagePart = logicalAddressByteArray.slice(0, 4);

        var offsetPart = logicalAddressByteArray.slice(4, 16);

        var decNumPage = ConversionUtils.calculateDecimal(numPagePart);

        var decNumFrame = this.pageTable[decNumPage];

        var arrayFramePart = ConversionUtils.calculateBinary(decNumFrame, 4);

        const physicalAddress = arrayFramePart.concat(offsetPart);

        return physicalAddress;

    }

}



module.exports = Converter