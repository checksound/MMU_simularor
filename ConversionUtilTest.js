'use strict'

const test = require('tape');

const ConversionUtils = require('./ConversionUtils');

test('test binary conversion', function(t) {
    t.plan(1);
    
    var arrBinary = ConversionUtils.calculateBinary(6248, 16);

    var expected = [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0];
    t.deepEqual(arrBinary, expected);

 });

test('test decimal conversion', function(t) {
    t.plan(3);

    var value = ConversionUtils.calculateDecimal([1, 1, 1]);

    t.isEqual(value, 7);

    value = ConversionUtils.calculateDecimal([]);

    t.isEqual(value, 0);

    value = ConversionUtils.calculateDecimal([0, 1, 1, 1]);

    t.isEqual(value, 7);

});

