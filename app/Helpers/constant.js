const ERROR_CODES = {
    MUTANT: {
        DEAFULT: 'E_MUTANT',
        DNA: 'E_MUTANT_DNA',
        NOT_MUTANT: 'E_NO_MUTANT'
    },
    DIAGNOSTIC: {
        DEAFULT: 'E_DIAGNOSTIC',
        DATA_CREATE: 'E_DIAGNOSTIC_CREATE',
        STATS: 'E_DIAGNOSTIC_STAT'
    }
}

const SEQUENCE_MUTANT_MIN = 2
const DNA_SAME_GEN = 4

module.exports = {
    ERROR_CODES,
    SEQUENCE_MUTANT_MIN,
    DNA_SAME_GEN
}