const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ2816.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * 문제에서 요구되는 프로그램은 최고의 효율이 아닌 500회 이내 이기때문에,
 * 최대 채널 100개 중에서 채널 2개를 최상단 2개로 끌고오는 것 정도는 
 * 직접 채널로 포인터를 가져가서 위쪽으로 위쪽으로 옮겨주기만 하면된다.
 * 다시말해서 1번, 4번 명령만 있으면 된다.
 */

const N = parseInt(input[0]);
const channels = input.slice(1);

// KBS1 먼저 최상단으로
const kbs1Index = channels.indexOf("KBS1");
const command1 = [...Array(kbs1Index).fill("1"), ...Array(kbs1Index).fill("4")];

// KBS2 상단에서 2번째로
const originalKbs2Index = channels.indexOf("KBS2");
// 처음 채널 목록에 kbs1 이 kbs2 보다 아래에 있었을 경우 예외처리들
// 예외처리1) kbs1 을 올리는 과정에서 kbs2가 한칸 내려간다.
const kbs2Index = originalKbs2Index > kbs1Index ? originalKbs2Index : originalKbs2Index + 1;
// 예외처리2) kbs2 위치가 두번째인 경우 명령할 필요 없다.
const command2 = kbs2Index === 1 ? [] : [...Array(kbs2Index).fill("1"), ...Array(kbs2Index - 1).fill("4")];

console.log([...command1, ...command2].join(""));