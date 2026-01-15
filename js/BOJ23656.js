const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 1 ~ 1000,000,000 사이의 숫자를 맞추는 게임이다.
 * 한쪽이 숫자를 추측하면, 다른 한 쪽은 숫자가 맞는지, 더 작은지 큰지 말해야 한다.
 * 
 * 이제 우린 출제자가 돼서 최대한 답을 맞추지 못하도록 속여야한다.
 * 단, 이 과정에서 이전의 답변에 논리적으로 위배되면 안된다.
 * 
 * 대답의 종류는 3가지이다.
 * 정답: "=", 더 큰 수: ">", 더 작은 수: "<"
 * 
 * 해결 방법)
 * 내가 매번 답변을 할 때 마다, 추측이 가능한 숫자의 범위는 줄어든다.
 * 따라서 오답을 최대한 유도하려면, 숫자의 범위가 높은 쪽으로 가도록 대답해야 한다.
 * 이후에도 답변을 할 때 마다 사용 가능한 숫자의 범위를 다시 정의하고, 그 안에서 넓은 쪽으로 답변한다.
 * 만약 현재 범위보다 작은 수를 물어보면 ">", 큰 수를 물어보면 "<" 로 대답을 고정한다.
 */
let [min, max] = [1, 1000000000];

rl.on('line', (line) => {
    const Q = parseInt(line);
    if (min === max && max === Q) {
        console.log("=");
        rl.close();
    }

    if (Q < min) console.log(">") // 예외 1. 현재 범위보다 작은값을 물어본 경우
    else if(Q > max) console.log("<"); // 예외 2. 현재 범위보다 큰값을 물어본 경우
    else {
        const [lower, upper] = [Q - min, max - Q];
        if (lower <= upper) {
            console.log(">");
            min = Q + 1;
        } else {
            console.log("<");
            max = Q - 1;
        }
    }
}).on('close', function(){
    process.exit();
});