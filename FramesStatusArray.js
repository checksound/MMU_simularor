'use strict'

const framesStatus = new Uint16Array([0xFFFF]);

const bitMask = new Uint16Array([0x8000]);

function isFrameUsed(position) {
    var u16Bits = framesStatus[0];
    u16Bits = u16Bits & (bitMask[0] >> position);
    return (u16Bits == 0);
}

function setFrameUse(position) {
    // set 0 il bit
    var u16Bits = framesStatus[0];
    u16Bits = u16Bits ^ (bitMask[0] >> position);
    framesStatus[0] = u16Bits;
}

function unsetFrameUse(position) {
    // set 1 il bit
    var u16Bits = framesStatus[0];
    u16Bits = u16Bits | (bitMask[0] >> position);
    framesStatus[0] = u16Bits;
}

/*
  Solo per visualizzare
*/
function toString() {
    var outputArray = [];

    for(var index = 0; index < 16; index++) {
        if(isFrameUsed(index)){
            outputArray.push(0);
        } else {
            outputArray.push(1);
        }
    }

    return "[" + outputArray.toString() + "]";
}


module.exports = {
    isFrameUsed: isFrameUsed,
    setFrameUse: setFrameUse,
    unsetFrameUse: unsetFrameUse,
    toString: toString
}



