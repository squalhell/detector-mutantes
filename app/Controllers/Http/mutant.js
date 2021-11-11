
const MutantBusiness = require('../Business/mutant');

module.exports = class MutantHttp {
    constructor() { }

    static async detect(body) {
        return await new MutantBusiness(body.dna).isMutant();
    }
}