import { resolve } from "styled-jsx/css"

/**
 * 
 * @param {any|null} result Cutstom value which returns after timeouot
 * @param {number|null} delay Delay amount in miliseconds, for example 1000ms (1s)
 * @returns 
 */
export const serverDelaySimulator = (result = null, delay = null) => {
    const randDelay = delay ?? (Math.floor(Math.random() * 5) + 1) * 1000

    console.log(`Random delay value is ${randDelay}`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            if(result)
                return resolve(result)

            return resolve()
        }, randDelay);
    })
}