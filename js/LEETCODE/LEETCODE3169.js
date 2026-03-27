/**
 * [LeetCode 3169] Count Days Without Meetings
 *
 * 직원이 근무 가능한 총 일수 days(1일부터 시작)와 회의 일정 배열 meetings가 주어진다.
 * meetings[i] = [start_i, end_i]는 i번째 회의의 시작일과 종료일(포함)을 의미한다.
 * 직원이 근무 가능하지만 회의가 없는 날의 수를 반환하라.
 * 단, 회의는 서로 겹칠 수 있다.
 *
 * 제한사항:
 * 1 <= days <= 10^9
 * 1 <= meetings.length <= 10^5
 * meetings[i].length == 2
 * 1 <= meetings[i][0] <= meetings[i][1] <= days
 *
 * 풀이: 구간 병합 (Interval Merging)
 * - meetings를 시작일 기준 오름차순 정렬 후, 겹치는 회의 구간을 합쳐 mergedMeetings를 구성한다.
 *   1. 현재 회의의 시작일이 마지막 병합 구간의 종료일 이하이면 종료일을 갱신(병합)하고,
 *   2. 그렇지 않으면 새로운 구간으로 추가한다.
 * - 병합된 구간들의 총 회의 일수를 days에서 차감하여 반환한다.
 * - 시간복잡도: O(n log n) — 정렬 비용
 * - 공간복잡도: O(n)
 */

/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function(days, meetings) {
    // 시작일 기준 오름차순 정렬
    meetings.sort((a, b) => a[0] - b[0]);

    // 겹치는 회의 구간을 병합하여 mergedMeetings 구성
    const mergedMeetings = [meetings[0]];
    for (const meeting of meetings.slice(1)) {
        const lastMeeting = mergedMeetings[mergedMeetings.length - 1];
        if (meeting[0] <= lastMeeting[1]) lastMeeting[1] = Math.max(lastMeeting[1], meeting[1]); // 겹치면 종료일 갱신
        else mergedMeetings.push(meeting); // 겹치지 않으면 새 구간 추가
    }

    // 병합된 구간들의 총 회의 일수 합산
    let meetingDays = 0;
    for (const meeting of mergedMeetings) meetingDays += (meeting[1] - meeting[0] + 1);

    // 전체 근무일에서 회의 일수를 차감하여 반환
    return days - meetingDays;
};

console.log(countDays(10, [[5,7],[1,3],[9,10]]));