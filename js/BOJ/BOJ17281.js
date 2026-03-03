/**
 * [BOJ 17281] ⚾
 * 
 * 9명의 선수로 이루어진 야구팀이 N 이닝 동안 경기를 한다.
 * 각 이닝마다 각 선수의 타격 결과(아웃, 1루타, 2루타, 3루타, 홈런)가 주어진다.
 * 1번 선수는 반드시 4번 타자여야 하고, 나머지 선수들의 타순을 정해서
 * 최대 득점을 구하라.
 * 
 * 제한사항:
 * 2 ≤ N ≤ 50
 * 각 이닝마다 9명의 선수에 대한 타격 결과가 주어짐
 * 0: 아웃, 1: 1루타, 2: 2루타, 3: 3루타, 4: 홈런
 * 1번 선수는 4번 타자로 고정
 * 
 * 풀이:
 * 백트래킹으로 타순의 모든 순열을 생성하고, 각 타순에 대해 시뮬레이션 수행
 * - 1번 선수를 4번 타자로 고정하고 나머지 8명의 순열 생성 (8! = 40,320가지)
 * - 각 타순에 대해 야구 시뮬레이션을 실행하여 득점 계산
 * - 베이스 상태를 비트마스크로 관리 (bit0=1루, bit1=2루, bit2=3루)
 * - 시간복잡도: O(8! × N × 평균타석수) ≈ O(40,320 × 50 × 27) ≈ 54,000,000
 * - 공간복잡도: O(N)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ17281.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const N = Number(input[0]);
const innings = input.slice(1).map(line => line.split(" ").map(Number));

let maxScore = 0;

/**
 * 주어진 타순으로 N 이닝 동안 경기를 시뮬레이션하여 총 득점 반환
 * @param {number[]} battingOrder - 타순 배열 (선수 인덱스 0~8)
 * @return {number} 총 득점
 */
function simulateGame(battingOrder) {
    let totalScore = 0;
    let currentBatterIndex = 0;
    
    // 각 이닝 진행
    for (let inning = 0; inning < N; inning++) {
        let outCount = 0;
        let bases = 0; // 비트마스크: bit0=1루, bit1=2루, bit2=3루
        const hitResults = innings[inning];
        
        // 3 아웃이 될 때까지 타석 진행
        while (outCount < 3) {
            const currentPlayer = battingOrder[currentBatterIndex];
            const hitType = hitResults[currentPlayer];
            
            if (hitType === 0) {
                // 아웃
                outCount++;
            } else if (hitType === 1) {
                // 1루타: 3루 주자 득점, 모든 주자 한 베이스 진루
                totalScore += (bases >> 2) & 1; // 3루 주자 득점
                bases = ((bases << 1) | 1) & 7; // 모든 주자 한 칸 이동, 타자 1루
            } else if (hitType === 2) {
                // 2루타: 2루, 3루 주자 득점
                totalScore += (bases >> 2) & 1; // 3루 주자 득점
                totalScore += (bases >> 1) & 1; // 2루 주자 득점
                bases = ((bases << 2) | 2) & 7; // 1루→3루, 타자→2루
            } else if (hitType === 3) {
                // 3루타: 모든 주자 득점
                totalScore += bases & 1;        // 1루 주자 득점
                totalScore += (bases >> 1) & 1; // 2루 주자 득점
                totalScore += (bases >> 2) & 1; // 3루 주자 득점
                bases = 4; // 타자 3루 (100b)
            } else {
                // 홈런: 모든 주자와 타자 득점
                totalScore += bases & 1;        // 1루 주자 득점
                totalScore += (bases >> 1) & 1; // 2루 주자 득점
                totalScore += (bases >> 2) & 1; // 3루 주자 득점
                totalScore++; // 타자 득점
                bases = 0; // 베이스 초기화
            }
            
            // 다음 타자로 이동 (순환)
            currentBatterIndex = currentBatterIndex === 8 ? 0 : currentBatterIndex + 1;
        }
        // 이닝 종료 시 베이스는 자동으로 다음 이닝에서 초기화됨
    }
    
    return totalScore;
}

/**
 * 백트래킹으로 타순의 모든 순열을 생성하고 각각에 대해 시뮬레이션 수행
 * @param {number[]} currentOrder - 현재까지 구성된 타순
 * @param {boolean[]} isUsed - 각 선수의 사용 여부 (인덱스 0~8)
 */
function generateBattingOrders(currentOrder, isUsed) {
    // 타순 완성: 9명 모두 배치됨
    if (currentOrder.length === 9) {
        const score = simulateGame(currentOrder);
        maxScore = Math.max(maxScore, score);
        return;
    }
    
    // 4번 타자(인덱스 3)는 1번 선수(인덱스 0)로 고정
    if (currentOrder.length === 3) {
        currentOrder.push(0);
        generateBattingOrders(currentOrder, isUsed);
        currentOrder.pop();
        return;
    }
    
    // 나머지 선수들(2~9번 선수, 인덱스 1~8)을 배치
    for (let player = 1; player <= 8; player++) {
        if (!isUsed[player]) {
            // 현재 선수를 타순에 추가
            isUsed[player] = true;
            currentOrder.push(player);
            
            // 다음 타순 위치로 재귀 호출
            generateBattingOrders(currentOrder, isUsed);
            
            // 백트래킹: 현재 선수를 타순에서 제거
            currentOrder.pop();
            isUsed[player] = false;
        }
    }
}

// 모든 가능한 타순에 대해 시뮬레이션 수행
generateBattingOrders([], Array(9).fill(false));

// 최대 득점 출력
console.log(maxScore);