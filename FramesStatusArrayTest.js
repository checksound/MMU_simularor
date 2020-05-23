'use strict'

const test = require('tape');

const framesStatusArray = require('./FramesStatusArray');

test('test complete conversion', function(t) {
    t.plan(6);

    var isUsed = framesStatusArray.isFrameUsed(1);

    t.isEqual(isUsed, false);
    
    framesStatusArray.setFrameUse(1)
    
    isUsed = framesStatusArray.isFrameUsed(1);
    t.isEqual(isUsed, true);

    isUsed = framesStatusArray.isFrameUsed(4);

    t.isEqual(isUsed, false);

    framesStatusArray.setFrameUse(4)
    
    isUsed = framesStatusArray.isFrameUsed(4);
    t.isEqual(isUsed, true);

    isUsed = framesStatusArray.isFrameUsed(1);

    t.isEqual(isUsed, true);
    
    framesStatusArray.unsetFrameUse(1)
    
    isUsed = framesStatusArray.isFrameUsed(1);
    t.isEqual(isUsed, false);
});