/**
 * Utility function: Use a `setTimeout` Promise in order to wait before continuing on to next function.
 * @param ms Number of milliseconds to wait.
 * @returns Promise<void>
 * @example `await waitFor(1000);`
 */
export function waitFor(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}