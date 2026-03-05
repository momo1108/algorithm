/**
 * [LeetCode 6] Zigzag Conversion
 * 
 * 문자열 s와 행의 개수 numRows가 주어진다.
 * 문자열을 지그재그 패턴으로 배치한 후, 각 행을 순서대로 읽어 반환하라.
 * 
 * 예시:
 * s = "PAYPALISHIRING", numRows = 3
 * 배치:
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 결과: "PAHNAPLSIIGYIR"
 * 
 * 제한사항:
 * 1 <= s.length <= 1000
 * s는 영문자(대소문자)와 ',' '.' 로만 구성
 * 1 <= numRows <= 1000
 * 
 * 풀이 1:
 * 시뮬레이션 방식
 * - 각 행에 해당하는 배열을 만들고, 방향(아래/위)을 바꿔가며 문자를 배치
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    let charIndex = 0, currentRow = 0, direction = "down";
    // 각 행별로 문자를 저장할 2차원 배열
    const rowArrays = Array.from({length: numRows}, () => new Array());
    
    // 모든 문자를 순회하며 해당 행에 배치
    while (charIndex < s.length) {
        // 첫 번째 행에서는 아래 방향으로
        if (currentRow === 0) direction = "down";
        // 마지막 행에서는 위 방향으로
        else if (currentRow === numRows - 1) direction = "up";

        // 현재 행에 문자 추가
        rowArrays[currentRow].push(s[charIndex++]);
        
        // numRows가 1보다 클 때만 행 이동
        if (numRows > 1) direction === "down" ? currentRow++ : currentRow--;
    }

    // 각 행의 문자들을 순서대로 연결
    return rowArrays.flat().join("");
};

/**
 * 풀이 2:
 * 수학적 패턴 접근
 * - 지그재그 패턴의 수학적 규칙을 찾아 직접 각 행의 문자를 추출
 * - 각 행마다 문자 간의 간격(gap)을 계산하여 인덱스 접근
 * - 첫 행과 마지막 행: 간격이 일정 (2 * (numRows - 1))
 * - 중간 행: 두 가지 간격이 교대로 나타남
 *   - 아래쪽 간격: 2 * (numRows - row - 1)
 *   - 위쪽 간격: 2 * row
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    // numRows가 1이면 지그재그 패턴이 없으므로 원본 반환
    if (numRows === 1) return s;

    let downGap, upGap;
    const result = [];
    
    // 각 행을 순회하며 해당 행의 문자들을 추출
    for (let row = 0; row < numRows; row++) {
        // 현재 행에서 아래쪽으로 이동하는 간격
        downGap = (numRows - row - 1) * 2;
        // 현재 행에서 위쪽으로 이동하는 간격
        upGap = row * 2;
        
        // 첫 행(downGap=0)이나 마지막 행(upGap=0)은 간격이 하나만 존재
        if (downGap === 0) downGap = upGap;
        if (upGap === 0) upGap = downGap;

        // 현재 행의 첫 문자부터 시작
        let charIndex = row;
        let useDownGap = true;
        
        // 문자열 끝까지 해당 행의 문자들을 추출
        while (charIndex < s.length) {
            result.push(s[charIndex]);
            // downGap과 upGap을 번갈아 사용하며 다음 문자 위치 계산
            useDownGap ? charIndex += downGap : charIndex += upGap;
            useDownGap = !useDownGap;
        }
    }

    return result.join("");
};

convert("PAYPALISHIRING", 4)