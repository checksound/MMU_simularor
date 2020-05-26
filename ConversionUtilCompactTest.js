'use strict'

const test = require('tape');
const _ = require('underscore');

const Registry = require('./Registry');

const ConversionUtils = require('./ConversionUtils');

test('test binary conversion', function(t) {
    t.plan(2);
    var logicalAddressDecimal = 7635;
    var registryValue = new Registry(logicalAddressDecimal);
    
    // ConversionUtils.calculateBinaryCompact(logicalAddressDecimal);
    
    var conversionExpected = new Registry(0x1DD3);
    
    t.isEqual(registryValue.getValue(), conversionExpected.getValue());
    t.deepEqual(registryValue, conversionExpected);
    
    /*
    logicalAddressDecimal = 65530;
   //  registryValue = ConversionUtils.calculateBinaryCompact(logicalAddressDecimal);
    registryValue = new Registry(logicalAddressDecimal);

    conversionExpected = new Registry(0xFFFA);
    t.isEqual(registryValue.getValue(), conversionExpected.getValue());

    */
    
});