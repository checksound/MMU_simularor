'use strict'

const test = require('tape');

const ConversionUtils = require('./ConversionUtils');

test('test decimal conversion', function(t) {
    t.plan(1);
    var registrerValue; // TO FILL 
    ConversionUtils.calculateDecimalCompact(registrerValue);

    t.pass("OK");
});


test('test binary conversion', function(t) {
    t.plan(2);
    var logicalAddressDecimal = 7635;
    var registryValue = ConversionUtils.calculateBinaryCompact(logicalAddressDecimal);
    
    var conversionExpected = (new Uint16Array([0x1DD3]))[0];
    t.isEqual(registryValue, conversionExpected);


    logicalAddressDecimal = 65530;
    registryValue = ConversionUtils.calculateBinaryCompact(logicalAddressDecimal);
    
    conversionExpected = (new Uint16Array([0xFFFA]))[0];
    t.isEqual(registryValue, conversionExpected);


    
});