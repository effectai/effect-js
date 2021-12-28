/**
 * End to End (E2E) tests for web3.js
 */

const sum = (a: number, b: number) => a + b

describe('Test that this folder does not activate when running npm run test', () => {
    it('should be true', () => {
        expect(true).toBe(true)
        expect(sum(1, 2)).toBe(3)
    })

    it('should be false', () => {
        expect(false).toBe(false)
        expect(sum(1, 2)).toBe(4)
        expect(true).toBe(false)
    })

})