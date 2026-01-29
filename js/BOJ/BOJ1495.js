const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ1495.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 각 단계별로 현재 가능한 볼륨을 체크한다.
 * 
 * 체크하는 방법은 각 볼륨별로 현재 연주 가능한 볼륨인지 아닌지 true/false 값으로
 * 저장하는 길이 M + 1 의 배열(볼륨 0 ~ M)을 사용한다.
 * 
 * 첫번째 곡부터 i번째 곡까지 순서대로 아래의 과정을 반복한다.
 * 1. 현재 배열 내의 true 인 볼륨에 대해 V[i] 를 더하거나 뺀 위치의 값을 true 로 변경
 * 2. 1번에서 찾은 true 였던 볼륨의 값을 false 로 변경
 * 
 * 위의 1~2번 과정을 수행할 때 마다 배열 전체가 false 인 경우에는 -1 을 출력하고 종료
 */
const [N, S, M] = input[0].split(" ").map(value => parseInt(value));
let volumeBooleanArray = Array(M + 1).fill(false);
volumeBooleanArray[S] = true;

const V = input[1].split(" ").map(value => parseInt(value));
let answer;
for (let songIndex = 0; songIndex < N; songIndex++) {
    // 원본 배열은 순회에 사용되고 있는 도중이기 때문에 볼륨 조정을 적용할 새 배열 생성
    const nextVolumeBooleanArray = Array(M + 1).fill(false);
    for (let volume = 0; volume <= M; volume++) {
        if (volumeBooleanArray[volume]) {
            volumeBooleanArray[volume] = false;
            const nextVolumes = [volume - V[songIndex], volume + V[songIndex]];

            for (const nextVolume of nextVolumes) {
                if (nextVolume >= 0 && nextVolume <= M) nextVolumeBooleanArray[nextVolume] = true;
            }
        }
    }
    volumeBooleanArray = nextVolumeBooleanArray;
    
    if (!volumeBooleanArray.includes(true)) break;
}

answer = volumeBooleanArray.lastIndexOf(true);

console.log(answer);