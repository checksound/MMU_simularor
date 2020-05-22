'use strict'

const test = require('tape');

const compact = require('./compact');

test('test complete conversion', function(t) {
    t.plan(6);

    var isUsed = compact.isFrameUsed(1);

    t.isEqual(isUsed, false);
    
    compact.setFrameUse(1)
    
    isUsed = compact.isFrameUsed(1);
    t.isEqual(isUsed, true);

    isUsed = compact.isFrameUsed(4);

    t.isEqual(isUsed, false);

    compact.setFrameUse(4)
    
    isUsed = compact.isFrameUsed(4);
    t.isEqual(isUsed, true);

    isUsed = compact.isFrameUsed(1);

    t.isEqual(isUsed, true);
    
    compact.unsetFrameUse(1)
    
    isUsed = compact.isFrameUsed(1);
    t.isEqual(isUsed, false);
});