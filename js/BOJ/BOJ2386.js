const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ2386.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 알파벳과 문장을 입력받아 문장 안에 대소문자 상관없이 특정 알파벳이 몇개가 있는지 확인합니다.
 * @param {*} targetAlphabet 개수를 카운팅할 알파벳
 * @param {*} sentence 알파벳 개수를 셀 문장
 * @returns 문장 안의 알파벳 개수
 */
const countAlphabetInSentence = (targetAlphabet, sentence) => {
    let count = 0;
    sentence = sentence.toLowerCase();
    
    for(let alphabetIndex = 0; alphabetIndex < sentence.length; alphabetIndex++) {
        if (targetAlphabet === sentence[alphabetIndex]) count++;
    }

    return count;
}

for (const line of input){
    if (line === "#") break;

    const [alphabet, sentence] = [line[0], line.slice(2)];

    console.log(alphabet, countAlphabetInSentence(alphabet, sentence));
}