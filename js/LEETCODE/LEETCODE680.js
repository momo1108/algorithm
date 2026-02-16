/**
 * [LeetCode 680] Valid Palindrome II
 * 
 * 문자열 s가 주어진다.
 * 최대 하나의 문자를 삭제하여 팰린드롬(회문)을 만들 수 있는지 확인하라.
 * 가능하면 true, 불가능하면 false를 반환하라.
 * 
 * 제한사항:
 * 1 <= s.length <= 10^5
 * s는 소문자 영어 알파벳으로 구성됨
 * 
 * 풀이:
 * Two Pointer (투 포인터) + 재귀
 * - 양 끝에서 시작하여 안쪽으로 이동하며 문자 비교
 * - 불일치 발견 시: 왼쪽 또는 오른쪽 문자 중 하나를 건너뛰고 나머지가 팰린드롬인지 확인
 * - 이미 한 번 건너뛴 경우 더 이상 건너뛸 수 없음
 * - 시간복잡도: O(n), 공간복잡도: O(n) (재귀 스택)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    let left = 0, right = s.length - 1;

    return checkPalindrome(left, right, false);

    /**
     * 주어진 범위가 팰린드롬인지 확인
     * @param {number} left - 왼쪽 포인터
     * @param {number} right - 오른쪽 포인터
     * @param {boolean} hasSkipped - 이미 문자를 건너뛴 적이 있는지 여부
     * @return {boolean}
     */
    function checkPalindrome(left, right, hasSkipped) {
        while(left < right) {
            if (s[left] === s[right]) {
                // 일치하면 양쪽 포인터를 안쪽으로 이동
                left++;
                right--;
            } else {
                // 불일치 발견
                if (hasSkipped) return false; // 이미 한 번 건너뛴 경우 팰린드롬 불가능

                // 왼쪽 문자를 건너뛰거나 오른쪽 문자를 건너뛰는 두 가지 경우 시도
                // 둘 중 하나라도 팰린드롬이면 true
                if (s[left + 1] === s[right] &&
                    checkPalindrome(left + 1, right, true)) return true;
                if (s[left] === s[right - 1] &&
                    checkPalindrome(left, right - 1, true)) return true;
                
                return false;
            }
        }
        return true; // 모든 문자가 일치하면 팰린드롬
    }
};