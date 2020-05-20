var test = require('tape');
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

test('test binary conversion', function(t) {
    t.plan(1);
    
    var converter = new Converter([]);

    var arrBinary = converter.calculateBinary(6248);

    var expected = [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0];
    t.deepEqual(arrBinary, expected);


});
