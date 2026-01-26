const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ19725.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const n = parseInt(input[0]);

const correctAnswer = input[1];
const studentCount = parseInt(input[2]);
const studnetAnswers = input.slice(3);

/**
 * 전체 학생 중 2명의 학생을 짝으로 뽑을 수 있다. 가능한 전체 짝에 대해 아래의 로직을 수행한다.
 * 
 * 1. 1번문제부터 n번문제까지 순서대로 아래의 내용을 체크한다.
 *   1-1. 첫번째 학생의 전체 정답 여부를 체크하고 정답 여부에 따라 정답/오답 개수를 누적한다.
 *   1-2. 두번째 학생의 전체 정답 여부를 체크하고 정답 여부에 따라 정답/오답 개수를 누적한다.
 *   1-3. 두 학생이 제출한 답이 같은 경우, 동일 정답 개수 혹은 동일 오답 개수에 누적한다.
 * 
 * 2. 아래의 조건을 모두 만족하면 Similar 한 학생들이고, 하나라도 만족하지 못하면 Similar 하지 않은 학생들이다.
 *   2-1. 두 학생의 동일 정답 개수가 두 학생의 정답 개수의 절반 이상인지 체크한다.
 *   2-2. 두 학생의 동일 오답 개수가 두 학생의 오답 개수의 절반 이상인지 체크한다.
 */

/**
 * 두 학생의 Similar 여부를 체크해서 return 해주는 함수
 * @param {*} stu1Answer 첫번째 학생의 정답문자열
 * @param {*} stu2Answer 두번째 학생의 정답문자열
 * @returns 두 학생이 Similar 한가?(boolean)
 */
const checkIsSimilar = (stu1Answer, stu2Answer) => {
    let studentInfoMap = {
        stu1CorrectCount: 0,
        stu1IncorrectCount: 0,
        stu2CorrectCount: 0,
        stu2IncorrectCount: 0,
        sameCorrectAnswerCount: 0,
        sameIncorrectAnswerCount: 0
    };

    for (let question = 0; question < n; question++) {
        const isStu1Correct = correctAnswer[question] === stu1Answer[question];
        const isStu2Correct = correctAnswer[question] === stu2Answer[question];
        const isSameAnswer = stu1Answer[question] === stu2Answer[question];

        if (isStu1Correct) studentInfoMap.stu1CorrectCount++;
        else studentInfoMap.stu1IncorrectCount++;
        
        if (isStu2Correct) studentInfoMap.stu2CorrectCount++;
        else studentInfoMap.stu2IncorrectCount++;

        if (isSameAnswer && isStu1Correct) studentInfoMap.sameCorrectAnswerCount++;
        if (isSameAnswer && !isStu1Correct) studentInfoMap.sameIncorrectAnswerCount++;
    }
    
    const isSimilar = studentInfoMap.sameCorrectAnswerCount > Math.floor(studentInfoMap.stu1CorrectCount / 2)
                    && studentInfoMap.sameCorrectAnswerCount > Math.floor(studentInfoMap.stu2CorrectCount / 2)
                    && studentInfoMap.sameIncorrectAnswerCount > Math.floor(studentInfoMap.stu1IncorrectCount / 2)
                    && studentInfoMap.sameIncorrectAnswerCount > Math.floor(studentInfoMap.stu2IncorrectCount / 2);

    return isSimilar;
}

let answerCount = 0;
let answerPair = [];
for(let stu1 = 0; stu1 < studentCount; stu1++) {
    for (let stu2 = stu1 + 1; stu2 < studentCount; stu2++) {
        const stu1Answer = studnetAnswers[stu1];
        const stu2Answer = studnetAnswers[stu2];

        const isSimilar = checkIsSimilar(stu1Answer, stu2Answer);
        if (isSimilar) {
            answerCount++;
            answerPair.push([stu1 + 1, stu2 + 1]);
        }
    }
}

console.log(answerCount);
for (const [stu1, stu2] of answerPair) {
    console.log(stu1, stu2);
}