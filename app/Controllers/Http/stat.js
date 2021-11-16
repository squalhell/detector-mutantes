

const MutantBusiness = require('../Business/mutant');
module.exports = class StatHttp {
    constructor() { }

    static async getStats() {
        const stats = await MutantBusiness.getStats();

        return {
            count_mutant_dna: stats.mutant,
            count_human_dna: stats.human,
            ratio: stats.ratio
        }
    }
}