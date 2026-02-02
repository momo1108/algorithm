/**
 * 한 문자로 이루어진 배열 chars 가 주어진다.
 * 아래의 알고리즘으로 압축해야 한다.
 * 
 * 빈 문자열 s 로 시작한다. 연속적으로 반복되는 문자 그룹들은 각각
 * - 그룹의 길이가 1이면 s 에 붙인다.
 * - 더 길다면 문자를 붙이고 그 뒤에 카운트 숫자를 붙인다
 *   개수가 10개 이상이면 숫자를 한자리씩 잘라서 붙인다.(10 -> [1, 0])
 * 
 * 압축된 결과 s 는 무조건 입력으로 주어진 배열 chars 에 다시 저장해야한다.
 * 다른 배열은 사용해서는 안된다.
 * 즉 알고리즘은 constant extra space 를 사용해서 구현되어야 한다.
 * (기존의 메모리 크기를 초과해선 안됨.)
 * 
 * 최종 리턴값은 완성된 chars 의 길이이다.
 */

/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    // count: 현재 연속 그룹의 길이
    // sIndex: 압축 결과를 덮어쓸 위치(쓰기 포인터)
    let count = 1, sIndex = 0;

    // i를 0부터 순회하며 이전 문자와 비교해 연속 그룹을 센다
    for (let i = 0; i < chars.length; i++) {
        // 첫 원소는 비교 대상이 없으므로 건너뛴다
        if (i === 0) continue;

        // 이전 문자와 같으면 현재 그룹 길이를 증가
        if (chars[i] === chars[i - 1]) count++;
        else {
            // 그룹이 끝났으므로 이전 문자를 결과에 기록
            chars[sIndex++] = chars[i - 1];

            // 그룹 길이가 1보다 크면 숫자를 한 자리씩 기록
            if (count > 1) {
                for (let c of count.toString()) chars[sIndex++] = c;
            }

            // 다음 그룹을 위해 카운트 초기화
            count = 1;
        }
    }

    // 반복이 끝난 뒤, 마지막 그룹은 아직 기록되지 않았으므로 처리
    chars[sIndex++] = chars[chars.length - 1];

    // 마지막 그룹도 길이가 1보다 크면 숫자를 기록
    if (count > 1) {
        for (let c of count.toString()) chars[sIndex++] = c;
    }

    // sIndex는 압축된 배열의 길이(쓰기 포인터의 최종 위치)
    return sIndex;
};