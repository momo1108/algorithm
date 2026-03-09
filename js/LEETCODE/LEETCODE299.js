/**
 * [LeetCode 299] Bulls and Cows
 *
 * 숫자 야구 게임에서 secret과 guess가 주어질 때 힌트를 반환하라.
 * - Bulls(A): 같은 위치에 같은 숫자
 * - Cows(B): 다른 위치에 있지만 secret에 존재하는 숫자 (bulls로 처리된 숫자 제외)
 * 결과는 "xAyB" 형식으로 반환한다.
 *
 * 제한사항:
 * 1 <= secret.length == guess.length <= 1000
 * secret과 guess는 숫자(digit) 문자로만 구성됨
 *
 * 풀이:
 * 2-pass 카운팅 방식
 * 1. secret의 각 숫자 빈도를 count 맵에 저장
 * 2. 1차 순회: bulls 처리 - 위치와 값이 모두 같으면 bulls 증가, count에서 차감
 *    bulls가 아닌 guess의 숫자는 cowsCandidate 배열에 저장
 * 3. 2차 순회: cows 처리 - cowsCandidate 중 count에 남아있는 숫자가 있으면 cows 증가
 * - bulls를 먼저 count에서 차감해야 cows를 올바르게 계산할 수 있음
 *
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)
 */

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    // secret 각 숫자의 빈도수 저장 (cows 계산 시 중복 방지용)
    const count = {};
    for (const ch of secret) count[ch] = (count[ch] || 0) + 1;

    // bulls가 아닌 guess의 숫자들 - 이후 cows 후보로 검사
    const cowsCandidate = [];
    let bulls = 0, cows = 0;

    // 1차 순회: bulls 처리
    for (let i = 0; i < guess.length; i++) {
        const ch = guess[i];
        if (guess[i] === secret[i]) {
            // 위치와 값이 모두 일치 -> bulls
            bulls++;
            // bulls로 처리된 숫자는 count에서 차감 (cows 중복 계산 방지)
            count[ch]--;
            if (count[ch] === 0) delete count[ch];
        } else {
            // 위치 불일치 -> cows 후보로 저장
            cowsCandidate.push(ch);
        }
    }

    // 2차 순회: cows 처리
    for (const ch of cowsCandidate) {
        if (count[ch]) {
            // secret에 해당 숫자가 남아있으면 cows
            cows++;
            count[ch]--;
            if (count[ch] === 0) delete count[ch];
        }
    }

    return `${bulls}A${cows}B`;
};

console.log(getHint("1123", "0111"));