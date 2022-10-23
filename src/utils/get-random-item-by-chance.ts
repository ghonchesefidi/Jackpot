// percentage chance function by creating a pool and using the fisher yates shuffle algorithm for a completely random chance
let arrayShuffle = function(array: any) {
    for ( let i = 0, length = array.length, swap = 0, temp = ''; i < length; i++ ) {
        swap        = Math.floor(Math.random() * (i + 1));
        temp        = array[swap];
        array[swap] = array[i];
        array[i]    = temp;
    }
    return array;
};

export function percentageChance(values: number[] | string[], chances: number[]) {
    let pool =[]
    for ( let i = 0; i < chances.length; i++ ) {
        for ( let i2 = 0; i2 < chances[i]; i2++ ) {
            pool.push(i);
        }
    }
    return values[arrayShuffle(pool)['0']];
};