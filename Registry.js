'use strict'

const bitMask = new Uint16Array([0x8000]);

class Registry {

    constructor() {
        this.registry = new Uint16Array(1);
    }

    getValue() {
        return this.registry[0]
    }

    setValue(value) {
        this.registry[0] = value;
    }

    getValueOfBit(position) {
        if(position < 0 || position > 16) throw new Error('Out of range position');

        var val = this.registry[0];

        if((val & (bitMask >> position)) != 0)
            return 1;

        return 0;
    }

    getNumPagePart() {
        const bitMaskPagePart = new Uint16Array([0xF000]); 
        var val = this.registry[0];

        val = (val & bitMaskPagePart[0]) >> 12;

        return val;

    }

    setNumPagePart(value) {

        if(value < 0 || value > 16) throw new Error('Out of range num page');

        this.registry[0] = this.registry[0] & new Uint16Array([0x0FFF]);

        const valueBitMaskNumPagePart = (new Uint16Array([value]))[0] << 12;

        this.registry[0] = this.registry[0] | valueBitMaskNumPagePart;

    }

    getOffesetPart() {

    }
}

module.exports = Registry
