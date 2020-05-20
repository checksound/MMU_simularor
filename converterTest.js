'use strict'

const test = require('tape');

const Converter = require('./converter');
const CustomError = require('./Errors');
 
test('test initalization converter', function (t) {
    t.plan(2);
    
    var converter = new Converter([1, 7, 0]);

    try {
        converter.doConversion(77777);
        t.fail();
    } catch (e) {
        if (e instanceof CustomError){
            t.pass('OK CustomError');
        }
    }

    converter.doConversion(7777);
    t.pass('OK conversion');
});


test('test complete conversion', function(t) {
    t.plan(2);

    const converter = new Converter([10, 7, 9, 5]);

    var byteArrayPhisicalAddress = converter.doConversion(6248);

    const expectedA = [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0];

    t.deepEqual(byteArrayPhisicalAddress, expectedA);

    byteArrayPhisicalAddress = converter.doConversion(10344);

    const expectedB = [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0];

    t.deepEqual(byteArrayPhisicalAddress, expectedB);
});