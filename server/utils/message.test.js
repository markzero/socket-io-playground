var expect = require('expect'),
    {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('Should create valid message object', () => {
        const message = {
            from: 'Marko',
            text: 'Hellooo'
        };

        var generatedMessage = generateMessage(message);

        expect(generatedMessage.createdAt).toBeA('number');
        expect(generatedMessage).toInclude({from: 'Marko'});
    });
});
