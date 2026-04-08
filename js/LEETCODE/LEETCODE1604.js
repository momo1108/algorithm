/**
 * [LeetCode 1604] Alert Using Same Key-Card Three or More Times in a One Hour Period
 *
 * 같은 날의 출입 기록이 keyName, keyTime으로 주어진다.
 * 어떤 직원이 1시간(포함 구간) 안에 3번 이상 출입하면 경보 대상이다.
 * 경보 대상 직원 이름을 사전순으로 반환한다.
 *
 * 핵심 포인트:
 * - "10:00" ~ "11:00"은 1시간 이내로 본다.
 * - 서로 다른 직원은 독립적으로 판단한다.
 *
 * 풀이:
 * 1) (이름, 시간)을 시간 오름차순으로 정렬
 * 2) 직원별로 "로그 배열 + 유효 시작 인덱스(head)"를 관리
 * 3) 현재 시각 t에서 t-60 미만 로그는 head를 옮겨 제외
 * 4) 남은 구간 길이가 3 이상이면 경보 대상에 추가
 *
 * 시간복잡도: O(N log N)
 * 공간복잡도: O(N)
 */
/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
var alertNames = function(keyName, keyTime) {
    const logCount = keyName.length;
    const records = Array.from({length: logCount}, (_, i) => ({
        name: keyName[i], 
        time: parseTimeString(keyTime[i])
    }));
    records.sort((r1, r2) => r1.time - r2.time);

    const alertedNames = new Set();
    // 직원별로 [해당 직원의 모든 로그, 현재 1시간 창의 시작 인덱스]를 관리한다.
    const nameToLogState = Object.fromEntries(
        keyName.map(name => [name, { logs: [], windowStart: 0 }])
    );
    
    let name, time;
    for (let i = 0; i < logCount; i++) {
        name = records[i].name;
        time = records[i].time;

        // 이미 경보 대상이 된 직원은 추가 확인할 필요가 없다.
        if (alertedNames.has(name)) continue;
        
        const logs = nameToLogState[name].logs;
        while (
            nameToLogState[name].windowStart < logs.length &&
            logs[nameToLogState[name].windowStart] < time - 60
        ) {
            nameToLogState[name].windowStart++;
        }

        logs.push(time);
        if (logs.length - nameToLogState[name].windowStart >= 3) {
            alertedNames.add(name);
        }
    }

    const sortedAlertedNames = new Array(...alertedNames);
    sortedAlertedNames.sort();

    return sortedAlertedNames;

    function parseTimeString(timeString) {
        const [hour, minute] = timeString.split(":").map(Number);
        return hour * 60 + minute;
    }
};

console.log(alertNames(["daniel","daniel","daniel","luis","luis","luis","luis"], ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]));