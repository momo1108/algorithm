/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function (arr, target) {
    const MOD = Math.pow(10, 9) + 7;
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    for (let num of arr) {
        count[num]++;
    }
    let output = 0;
    for (let a = 0; a < max + 1; a++) {
        if (count[a] === 0) continue;
        for (let b = a; b < max + 1; b++) {
            if (count[b] === 0) continue;
            const c = target - a - b;
            if (c < b || c > max || count[c] === 0) continue;
            if (a === b) {
                if (b === c) {
                    output += count[a] * (count[a] - 1) * (count[a] - 2) / 3 / 2;
                } else {
                    output += count[c] * count[b] * (count[b] - 1) / 2
                }
            } else if (b === c) {
                output += count[a] * count[b] * (count[b] - 1) / 2
            } else {
                output += count[a] * count[b] * count[c];
            }
            output %= MOD;
        }
    }
    return output;
};