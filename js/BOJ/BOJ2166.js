/**
 * [BOJ 2166] 다각형의 면적
 *
 * 꼭짓점이 순서대로 주어진 단순 다각형의 면적을 구한다.
 * 출력은 소수점 둘째 자리에서 반올림해 소수 첫째 자리까지 출력한다.
 *
 * 입력:
 * 첫 줄에 꼭짓점 개수 N
 * 다음 N줄에 각 꼭짓점 좌표 x, y (다각형을 이루는 순서)
 *
 * 출력:
 * 다각형의 면적을 소수 첫째 자리까지 출력
 *
 * 제한:
 * 3 <= N <= 10,000
 * |x|, |y| <= 100,000
 *
 * 풀이:
 * 신발끈 공식(Shoelace Formula)
 * sum(x_i * y_{i+1} - y_i * x_{i+1})의 절댓값을 2로 나눈 값이 면적이다.
 */
const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ2166.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const vertexCount = Number(input[0]);
const vertices = input.slice(1).map(line => line.split(" ").map(Number));

let signedDoubleArea = 0;
for (let i = 0; i < vertexCount; i++) {
    const current = vertices[i];
    const next = vertices[(i + 1) % vertexCount];
    signedDoubleArea += current[0] * next[1] - current[1] * next[0];
}

console.log((Math.abs(signedDoubleArea) / 2).toFixed(1));