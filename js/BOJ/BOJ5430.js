/**
 * [BOJ 5430] AC
 * 
 * 정수 배열에 대해 R(반전), D(첫 원소 제거) 명령을 수행하는 프로그램을 작성하라.
 * R은 배열을 반전시키고, D는 첫 원소를 제거한다.
 * 명령 수행이 불가능하면 "error"를 출력하라.
 * 
 * 제한사항:
 * 1 <= T <= 100 (테스트 케이스 수)
 * 0 <= n <= 100000 (배열의 크기)
 * D 명령이 배열의 크기를 초과하면 에러
 * 
 * 풀이:
 * 투 포인터 (Two Pointer) + 방향 플래그
 * - 실제로 배열을 반복적으로 역순 정렬하지 않음
 * - head와 tail 포인터로 배열의 시작과 끝을 추적
 * - isHead 플래그로 현재 "바라보는 방향"을 관리
 * - R 명령: isHead 플래그만 토글 (O(1))
 * - D 명령: 바라보는 방향에 따라 head 또는 tail 이동 (O(1))
 * - 최종 결과를 한 번에 생성
 * - 시간복잡도: O(n + m) (n: 배열 크기, m: 명령 수)
 * - 공간복잡도: O(n)
 */

const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ5430.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

const answer = [];

// 각 테스트 케이스 처리
// 입력 형식: T (테스트 케이스 수) -> [명령어, 배열크기, 배열] 반복
for (let i = 1; i < input.length; i += 3) {
    const command = input[i];
    const arrLength = parseInt(input[i + 1]);
    
    // 빈 배열 처리
    if (arrLength === 0) {
        // D 명령이 있으면 빈 배열에서 제거 불가 -> error
        if (command.includes("D")) {
            answer.push("error");
        } else {
            // R 명령만 있으면 빈 배열 유지
            answer.push("[]");
        }
        continue;
    }
    
    // 배열 파싱: "[1,2,3,4]" -> [1,2,3,4]
    const arr = input[i + 2].slice(1, input[i + 2].length - 1).split(",").map(Number);
    
    // 투 포인터와 방향 플래그 초기화
    let isHeadDirection = true;  // true: 앞에서 시작, false: 뒤에서 시작
    let head = 0;                // 앞쪽 포인터
    let tail = arrLength - 1;    // 뒤쪽 포인터
    let isError = false;         // 에러 발생 여부
    
    // 각 명령어 실행
    for (const c of command) {
        if (c === "R") {
            // 방향만 토글 (실제 배열 역순 없이)
            isHeadDirection = !isHeadDirection;
            continue;
        }
        
        // D 명령: 현재 방향의 첫 원소 제거
        if (c === "D") {
            // head > tail: 배열이 비어있음 -> 제거 불가능
            if (head > tail) {
                answer.push("error");
                isError = true;
                break;
            }
            
            // 바라보는 방향에 따라 포인터 이동
            if (isHeadDirection) {
                head++;  // 앞에서 제거
            } else {
                tail--;  // 뒤에서 제거
            }
        }
    }
    
    if (isError) continue;
    
    // 최종 결과 배열 추출
    const result = arr.slice(head, tail + 1);
    
    // 뒤에서 바라본 경우 반전
    if (!isHeadDirection) {
        result.reverse();
    }
    
    answer.push(`[${result.join(",")}]`);
}

console.log(answer.join("\n"));