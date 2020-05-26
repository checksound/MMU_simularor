'use strict'

const bitMask = new Uint16Array([0x8000]);

class Registry {

    constructor(value) {
        this.registry = new Uint16Array([value]);
    }

    static getRegistry(numPage, offset) {
        var numPagePart = numPage << 12;
        var newRegistryValue = numPagePart | offset;
        return new Registry(newRegistryValue);
    }

    getValue() {
        return this.registry[0]
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

    getOffesetPart() {

        const bitMaskOffsetPart = new Uint16Array([0x0FFFF]); 
        var val = this.registry[0];

        val = (val & bitMaskOffsetPart[0]);

        return val;
    }

    setFrame(frameNum) {
        
        var offsetPart = this.getOffesetPart();

        var frameNum = frameNum << 12;

        var newRegistryValue = frameNum | offsetPart;

        return new Registry(newRegistryValue);
    }

}

module.exports = Registry
