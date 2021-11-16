const Logger = require('../../../config/logger')
const CONSTANTS = require('../../Helpers/constant');
const DiagnosticModel = require('../../Models/diagnostics');
module.exports = class MutantBusiness {

    constructor(dna) {
        this.nitrogenBase = ['A', 'T', 'C', 'G'];
        this.dna = dna
        this.output = {
            vertical: {
                numeroSecuencia: 0,
            },
            horizontal: {
                numeroSecuencia: 0
            },
            oblicua: {
                numeroSecuencia: 0
            }
        }
    }

    async isValidDna() {

        const errors = {
        }

        // Validar si el adn contiene solo bases nitrogenadas.
        const errordna = this.dna.filter(dna => dna.split('').filter(base => !this.nitrogenBase.includes(base)).length > 0)
        if (errordna.length > 0) {
            errors.dna = {
                message: 'ADN contiene elementos que no son parte de las bases nitrogenadas.',
                code: CONSTANTS.ERROR_CODES.MUTANT.DNA
            }
        }

        const dnaRowsLength = this.dna.length;
        const dnaColumnLength = this.dna.map(dna => dna.split('').length).reduce((previous, current) => current += previous) / dnaRowsLength

        // Validar que el adn ingresado es de NxN
        if (dnaRowsLength !== dnaColumnLength) {
            errors.dna = {
                message: 'ADN no tiene un formato válido.',
                code: CONSTANTS.ERROR_CODES.MUTANT.DNA
            }
        }

        // Validar que el adn ingresado es al menos de 4x4
        if (dnaRowsLength < 4 || dnaColumnLength < 4) {
            errors.dna = {
                message: 'ADN no tiene un formato válido.',
                code: CONSTANTS.ERROR_CODES.MUTANT.DNA
            }
        }

        return errors
    }

    async _checkSequence(sequence) {
        let same = 1;
        const number = sequence.reduce((previous, current) => {
            if (previous === current)
                same++
            else if (same < CONSTANTS.DNA_SAME_GEN)
                same = 1;
            return current
        })

        if (same >= CONSTANTS.DNA_SAME_GEN) {
            Logger.info(`Mutante detectado con la secuencia [${sequence.join(' ')}]`);
            return true;
        } else {
            return false;
        }
    }

    async isMutant() {
        const dnaMatrix = this.dna.map(dna => dna.split(''))

        let mutantSequencesCount = 0;
        let row = 0;

        while (row < dnaMatrix.length && mutantSequencesCount < CONSTANTS.SEQUENCE_MUTANT_MIN) {
            const dnaRow = dnaMatrix[row];

            // Chequeo Horizontal
            if (await this._checkSequence(dnaMatrix[row]))
                mutantSequencesCount++

            // Chequeo Vertical
            const vertical = [];
            for (let col = 0; col < dnaRow.length; col++) {
                vertical.push(dnaMatrix[col][row])
            }

            if (await this._checkSequence(vertical))
                mutantSequencesCount++

            // Chequeo Diagonal
            const diagonal = [];
            const diagonalUp = [];
            const diagonalInvert = [];
            let diagonalRow = row;
            let diagonalCol = 0;
            let diagonalColInvert = dnaMatrix.length - 1;
            while (diagonalRow < dnaMatrix.length) {
                diagonal.push(dnaMatrix[diagonalRow][diagonalCol]);
                diagonalInvert.push(dnaMatrix[diagonalRow][diagonalColInvert]);
                if (row !== 0) {
                    diagonalUp.push(dnaMatrix[diagonalCol][diagonalRow]);
                }
                diagonalRow++;
                diagonalCol++;
                diagonalColInvert--
            }

            const diagonalUpInvert = [];
            let secondRow = row;
            let secondCol = 0;

            while (secondRow >= 0) {
                diagonalUpInvert.push(dnaMatrix[secondRow][secondCol]);
                secondCol++
                secondRow--
            }

            // Chequeo Diagonal principal e inferior
            if (diagonal.length >= 4)
                if (await this._checkSequence(diagonal))
                    mutantSequencesCount++

            // Chequeo Diagonal Superior
            if (diagonalUp.length >= 4)
                if (await this._checkSequence(diagonalUp))
                    mutantSequencesCount++

            // Chequeo Diagonal secundaria e inferior
            if (diagonalInvert.length >= 4)
                if (await this._checkSequence(diagonalInvert))
                    mutantSequencesCount++

            // Chequeo Diagonal secundaria Superior
            if (diagonalUpInvert.length >= 4)
                if (await this._checkSequence(diagonalUpInvert))
                    mutantSequencesCount++

            row++
        }

        const mutant = (mutantSequencesCount >= CONSTANTS.SEQUENCE_MUTANT_MIN)
        await new DiagnosticModel().create({
            input: this.dna,
            mutant
        })

        return mutant;
    }

    static async getStats(){
        return await DiagnosticModel.stats();
    }

}