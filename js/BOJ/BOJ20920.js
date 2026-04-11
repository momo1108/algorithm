const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ20920.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const [N, M] = input[0].split(" ").map(Number);

const words = input.slice(1).filter(line => line.length >= M);
const wordsMap = {};

for (const word of words) {
    wordsMap[word] = (wordsMap[word] || 0) + 1;
}

const sortMap = {};

for (const entry of Object.entries(wordsMap)) {
    if (sortMap[entry[1]]) sortMap[entry[1]].push(entry[0]);
    else sortMap[entry[1]] = [entry[0]];

}

for (const count in sortMap) {
    if (sortMap[count].length > 1) {
        sortMap[count].sort((w1, w2) => {
            if (w1.length !== w2.length) return w2.length - w1.length;
            else return w1 < w2 ? -1 : 1
        })
    }
}

const finalSortedArray = Object.entries(sortMap).sort((e1, e2) => parseInt(e2[0]) - parseInt(e1[0]));
const answer = [];
for (const sortedArray of finalSortedArray) {
    answer.push(...sortedArray[1]);
}

console.log(answer.join("\n"));