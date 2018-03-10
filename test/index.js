const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const deepUnfreeze = require('../src/index');

describe('deepUnfreeze()', () => {
    context('deep frozen object', () => {
        let sample;

        beforeEach(() => {
            sample = {
                lorem: 'IPSUM',
                dolor: {
                    amet: 'AMET'
                }
            };

            deepFreeze(sample);
        });

        it('should unfreeze top-level properties', () => {
            // sealed (frozen) sample.
            expect(sample).to.be.frozen;

            sample.sit = 'SIT';

            expect(sample.sit).to.be.undefined;

            expect(sample.sit).not.to.exist;

            // unsealed (unfrozen) sample.
            const unsealedSample = deepUnfreeze(sample);

            expect(unsealedSample).to.not.be.frozen;

            unsealedSample.sit = 'SIT';

            expect(unsealedSample.sit).to.be.equal('SIT');
        });

        it('should unfreeze deeply nested properties', () => {
            // sealed (frozen) sample.
            expect(sample.dolor).to.be.frozen;

            sample.dolor.sit = 'SIT';

            expect(sample.dolor.sit).to.be.undefined;

            expect(sample.dolor.sit).not.to.exist;

            // unsealed (unfrozen) sample.
            const unsealedSample = deepUnfreeze(sample);

            expect(unsealedSample.dolor).to.not.be.frozen;

            unsealedSample.dolor.sit = 'SIT';

            expect(unsealedSample.dolor.sit).to.exist.and.to.be.equal('SIT');
        })
    });

    context('deep frozen array', () => {
        let sample;

        beforeEach(() => {
            sample = [
                [1, 2, 3],
                { lorem: 'IPSUM' },
                {
                    dolor: {
                        amet: 'AMET'
                    }
                }
            ];

            deepFreeze(sample);
        });

        it('should unfreeze a simple one-dimensional array', () => {
            // sealed (frozen) sample.
            expect(sample).to.be.frozen;

            expect(() => {
                sample.push('SIT');
            }).to.throw(TypeError);

            expect(sample[0]).to.have.lengthOf(3);

            // unsealed (unfrozen) sample.
            const unsealedSample = deepUnfreeze(sample);

            expect(unsealedSample).to.not.be.frozen;

            expect(() => {
                unsealedSample.push('SIT');
            }).to.not.throw(TypeError);

            expect(unsealedSample).to.have.lengthOf(4);
        });

        it('should unfreeze an array in an array', () => {
            // sealed (frozen) sample.
            expect(sample[0]).to.be.frozen;

            expect(() => {
                sample[0].push(4);
            }).to.throw(TypeError);

            expect(sample[0]).to.have.lengthOf(3);

            // unsealed (unfrozen) sample.
            const unsealedSample = deepUnfreeze(sample);

            expect(unsealedSample).to.not.be.frozen;

            expect(() => {
                unsealedSample[0].push(4);
            }).to.not.throw(TypeError);

            expect(unsealedSample[0]).to.have.lengthOf(4);
        });

        it('should unfreeze an object in an array', () => {
            // sealed (frozen) sample.
            expect(sample[2]).to.be.frozen;

            sample[2].sit = 'SIT';

            expect(sample[2].sit).to.be.undefined;

            expect(sample[2].sit).to.not.exist;

            // unsealed (unfrozen) sample.
            const unsealedSample = deepUnfreeze(sample);

            expect(unsealedSample).to.not.be.frozen;

            unsealedSample[2].sit = 'SIT';

            expect(unsealedSample[2]).to.have.haveOwnProperty('sit').and.to.be.equal('SIT');
        });
    });

    context('deep frozen function', () => {
        let sample;

        beforeEach(() => {
            sample = function() {};

            deepFreeze(sample);
        });

        it('should unfreeze a frozen function', () => {
            // sealed (frozen) sample.
            expect(sample).to.be.frozen;

            sample.prototype.z = 0.01314;

            expect(sample.prototype).to.not.haveOwnProperty('z');

            // unsealed (unfrozen) sample.
            const unsealedSample = deepUnfreeze(sample);

            expect(unsealedSample).to.not.be.frozen;

            unsealedSample.prototype.z = 0.01314;

            expect(unsealedSample.prototype).to.haveOwnProperty('z').and.be.equal(0.01314);
        });
    });
});
