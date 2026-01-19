const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ1002.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const T = parseInt(input[0]);

for (let testCase = 0; testCase < T; testCase++) {
  let [x1, y1, r1, x2, y2, r2] = input[testCase + 1].split(" ").map(value => parseInt(value));

  /**
   * 2개의 터렛 위치와 각 터렛으로부터 목표까지의 거리가 주어진다.
   * 터렛 사이의 거리와 목표까지의 거리 두가지를 활용해서 가능한 경우를 정의해보자.
   * 
   * 1. 터렛 사이 거리 < max(r1, r2)
   *    터렛 사이 거리 + min(r1, r2) 를 D라 가정
   *    D < max(r1, r2)    가능한 경우 0개
   *    D = max(r1, r2)    가능한 경우 1개
   *    D > max(r1, r2)    가능한 경우 2개
   * 2. 터렛 사이 거리 = max(r1, r2)
   *    작은 정찰범위의 터렛이 다른 터렛의 정찰범위 끝에 붙어있기 때문에 무조건 두 점에서 교차된다.
   * 3. 터렛 사이 거리 > max(r1, r2)
   *    터렛 사이 거리 - min(r1, r2) 를 D라 가정
   *    D > max(r1, r2)    가능한 경우 0개
   *    D = max(r1, r2)    가능한 경우 1개
   *    D < max(r1, r2)    가능한 경우 2개
   */
  
  // 예외처리. 두 터렛의 위치와 목표까지의 거리가 완전 똑같을 때
  if (x1 === x2 && y1 === y2 && r1 === r2) {
    console.log(-1);
    continue;
  }

  const distanceBetweenTurrets = Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);
  const maxDistanceToTarget = Math.max(r1, r2);
  const minDistanceToTarget = Math.min(r1, r2);

  if (distanceBetweenTurrets < maxDistanceToTarget) {
    const D = distanceBetweenTurrets + minDistanceToTarget;
    if (D < maxDistanceToTarget) console.log(0);
    else if (D === maxDistanceToTarget) console.log(1);
    else console.log(2);
  }
  else if (distanceBetweenTurrets === maxDistanceToTarget) console.log(2);
  else {
    const D = distanceBetweenTurrets - minDistanceToTarget;
    if (D > maxDistanceToTarget) console.log(0);
    else if (D === maxDistanceToTarget) console.log(1);
    else console.log(2);
  }
}