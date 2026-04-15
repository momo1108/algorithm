/**
 * [BOJ 1043] 거짓말
 *
 * 사람 N명과 파티 M개가 주어지고, 처음부터 진실을 아는 사람들의 번호가 주어진다.
 * 어떤 파티에서 진실을 아는 사람이 한 명이라도 있으면 그 파티에서는 거짓말을 할 수 없고,
 * 그 파티에 참석한 사람들도 이후에는 진실을 아는 사람처럼 취급된다.
 * 모든 파티에 참석해야 할 때, 거짓말을 해도 들키지 않는 파티의 최댓값을 구하는 문제다.
 *
 * 풀이:
 * 진실을 아는 사람 집합을 유지하면서 각 파티를 순서대로 확인한다.
 * - 파티 참석자 중 진실을 아는 사람이 있으면 그 파티의 모든 참석자를 집합에 추가한다.
 * - 다시 모든 파티를 확인하며 진실을 아는 사람이 없는 파티만 정답으로 센다.
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/mom/Desktop/algorithm/data/BOJ1043.txt";
const inputLines = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

// 처음부터 진실을 알고 있는 사람들의 번호 집합
const truthKnowingPeople = new Set(inputLines[1].split(" ").map(Number).slice(1));

// 각 파티를 한 번 훑으면서 진실을 공유받는 사람들을 집합에 반영
if (truthKnowingPeople.size > 0) {
    for (const partyLine of inputLines.slice(2)) {
        const partyMembers = partyLine.split(" ").map(Number).slice(1);

        let hasTruthKnower = false;
        for (const member of partyMembers) {
            if (truthKnowingPeople.has(member)) {
                hasTruthKnower = true;
                break;
            }
        }

        if (hasTruthKnower) {
            for (const member of partyMembers) {
                truthKnowingPeople.add(member);
            }
        }
    }
}

let liePossiblePartyCount = 0;

// 진실을 아는 사람이 없는 파티만 거짓말이 가능한 파티로 센다.
for (const partyLine of inputLines.slice(2)) {
    const partyMembers = partyLine.split(" ").map(Number).slice(1);

    let hasTruthKnower = false;
    for (const member of partyMembers) {
        if (truthKnowingPeople.has(member)) {
            hasTruthKnower = true;
            break;
        }
    }

    if (!hasTruthKnower) liePossiblePartyCount++;
}

console.log(liePossiblePartyCount);