
const CustomError = require('./Errors');

class Stack {

    constructor(){
        this.data = [];
        this.top = 0;
    }

    push(value) {
        this.data[this.top] = element;
        this.top = this.top + 1;
    }

    pop() {
        
    }

    size() {
        return this.top;
    }
}



class Converter {

    constructor(pageTable) {
        this.pageTable = pageTable;
    }

    doConversion(value) {
        console.log(value);

        var numPages = this.pageTable.length;
        var maxAddress = numPages * 4 * 1024 -1;
        if (value >= maxAddress)
            throw new CustomError(`Address ${value} eccede indirizzo limite ${maxAddress}`);

        

    }

    calculateBinary(valueDecimal) {
        var byteArray = [];
    
        while(valueDecimal != 0) {
            var div = Math.trunc(valueDecimal/2);
            var rem = valueDecimal % 2;
            valueDecimal = div;
            byteArray.splice(0, 0, rem);
        }
        
        // fill with zero
        while(byteArray.length < 16){
            byteArray.splice(0, 0, 0);;
        }

        return byteArray;
    }

    
}



module.exports = Converter