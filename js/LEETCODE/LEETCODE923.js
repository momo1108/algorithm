/**
 * [LeetCode 923] 3Sum With Multiplicity
 *
 * 배열 arr와 target이 주어질 때,
 * i < j < k 이고 arr[i] + arr[j] + arr[k] == target 을 만족하는
 * 인덱스 삼중쌍의 개수를 구한다.
 * 결과가 클 수 있으므로 10^9 + 7로 나눈 값을 반환한다.
 *
 * 제한사항:
 * 3 <= arr.length <= 3000
 * 0 <= arr[i] <= 100
 * 0 <= target <= 300
 *
 * 풀이(현재 코드 기준):
 * 1) 값별 빈도를 Map으로 만든다.
 * 2) target을 만들 수 있는 "값 조합(정렬된 3개 값)"만 Set으로 중복 없이 수집한다.
 * 3) 각 값 조합에 대해, 빈도 기반 조합 수 nCr를 곱해 경우의 수를 더한다.
 */

/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function(arr, target) {
    arr.sort((a, b) => a - b);
    const valueCountMap = new Map();

    for (let i = 0; i < arr.length; i++) {
        valueCountMap.set(arr[i], (valueCountMap.get(arr[i]) || 0) + 1);
    }

    // 먼저 target을 만들 수 있는 값 조합(중복 제거)을 수집한다.
    const validTupleSet = new Set();
    collectTuples([], 0);
    
    let answer = 0;
    validTupleSet.forEach((tupleStr) => {
        // 예: "2/2/4" -> {2:2, 4:1} 로 바꿔 각 값의 선택 횟수를 계산
        const tupleFrequencyMap = new Map();
        const nums = tupleStr.split("/").map(Number);
        let count = 1;

        for (let i = 0; i < 3; i++) {
            const num = nums[i];
            tupleFrequencyMap.set(num, (tupleFrequencyMap.get(num) || 0) + 1);
        }
        
        for (const entry of tupleFrequencyMap.entries()) {
            const n = valueCountMap.get(entry[0]);
            const r = entry[1];
            count *= countCombination(n, r);
        }

        answer += count;
        answer %= 10 ** 9 + 7;
    })

    return answer;

    // DFS로 길이 3의 값 조합을 만들고, target 만족 시 Set에 저장
    function collectTuples(tuple, sum){
        for (const key of valueCountMap.keys()) {
            if (tuple.length === 2) {
                if (sum + key === target) {
                    const completeTuple = [...tuple, key];
                    completeTuple.sort();
                    validTupleSet.add(completeTuple.join("/"));
                    return;
                }
            } else {
                const value = valueCountMap.get(key);
                if (value === 0) continue;
                valueCountMap.set(key, value - 1);
                tuple.push(key);
                collectTuples(tuple, sum + key);
                valueCountMap.set(key, value);
                tuple.pop();
            }
        }
    }

    // nCr 계산: n개 중 r개 선택
    function countCombination(n, r) {
        let count = 1;
        for (let num = n; num > n - r; num--) count *= num;
        for (let num = r; num > 1; num--) count /= num;
        return count;
    }
};

threeSumMulti([1,1,2,2,3,3,4,4,5,5], 8)