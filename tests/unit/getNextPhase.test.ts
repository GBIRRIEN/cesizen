import { getNextPhase } from '@/app/activites/respiration/[id]/controller';
import { ExerciceRespiration } from '@/types';
import { expect } from '@jest/globals';

describe('Test de la fonction getNextPhase()', () => {
    let exercice: ExerciceRespiration;

    beforeEach(() => {
        exercice = {
            id: 1,
            inspiration: 5,
            apnee: 3,
            expiration: 4
        };
    });

    it('doit retourner la phase "apnée" après la phase "inspiration" si l\'apnée est > 0', () => {
        const result = getNextPhase('inspiration', exercice);
        expect(result.next).toBe('apnee');
        expect(result.duration).toBe(3);
    });

    it('doit retourner la phase "expiration" après la phase "inspiration" si l\'apnée est 0', () => {
        exercice.apnee = 0;
        const result = getNextPhase('inspiration', exercice);
        expect(result.next).toBe('expiration');
        expect(result.duration).toBe(4); 
    });

    it('doit retourner la phase "expiration" après la phase "apnee"', () => {
        const result = getNextPhase('apnee', exercice);
        expect(result.next).toBe('expiration');
        expect(result.duration).toBe(4); 
    });

    it('doit retourner la phase "inspiration" après la phase "expiration"', () => {
        const result = getNextPhase('expiration', exercice);
        expect(result.next).toBe('inspiration');
        expect(result.duration).toBe(5);
    });
})