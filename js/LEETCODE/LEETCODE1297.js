/**
 * [LeetCode 1297] Maximum Occurrences of Substring
 * 
 * 문자열 s, 최대 고유 문자 수 maxLetters, 부분문자열의 최소/최대 길이 minSize/maxSize가 주어진다.
 * 고유 문자가 maxLetters 이하이고, 길이가 minSize 이상 maxSize 이하인 부분문자열 중
 * 가장 많이 나타나는 부분문자열의 출현 횟수를 구하라.
 * 
 * 제한사항:
 * 1 <= s.length <= 10^5
 * 1 <= maxLetters <= 26
 * 1 <= minSize <= maxSize <= Math.min(26, s.length)
 * s는 영문 소문자로만 이루어짐
 * 
 * 풀이 1: 브루트포스
 * - 모든 시작 위치에서 minSize ~ maxSize 길이의 부분문자열 생성
 * - 조건을 만족하는 부분문자열의 출현 횟수를 해시테이블에 저장
 * - 최대 출현 횟수 반환
 * - 시간복잡도: O(n^2 * maxSize)
 * - 공간복잡도: O(n)
 * 
 * 풀이 2: 슬라이딩 윈도우
 * - minSize 크기의 고정 윈도우로 슬라이딩하며 부분문자열 탐색
 * - 핵심 통찰: 최대 길이 부분문자열이 k번 나타나면, 
 *              그것의 모든 minSize 길이 부분문자열도 최소 k번 나타남
 * - 따라서 minSize 길이만 확인하면 최대값을 구할 수 있음
 * - 시간복잡도: O(n)
 * - 공간복잡도: O(n)
 */

/**
 * 풀이 1: 브루트포스 접근
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 */
var maxFreq = function(s, maxLetters, minSize, maxSize) {
    // 부분문자열의 출현 횟수를 저장하는 해시테이블
    const substringCountMap = {};

    let substring;
    // 모든 시작 위치에서 탐색
    for (let startIndex = 0; startIndex < s.length - (minSize - 1); startIndex++) {
        const uniqueChars = new Set();
        let hasValidSize = true;
        substring = "";

        // 먼저 minSize 길이까지 확인
        for (let charIndex = startIndex; charIndex < Math.min(s.length, startIndex + minSize); charIndex++) {
            if (!uniqueChars.has(s[charIndex]) && uniqueChars.size >= maxLetters) {
                hasValidSize = false;
                break;
            }
            substring += s[charIndex];
            uniqueChars.add(s[charIndex]);
        }

        if (!hasValidSize) continue;

        // minSize 부분문자열 카운팅
        if (substringCountMap[substring]) substringCountMap[substring]++;
        else substringCountMap[substring] = 1;

        // minSize보다 큰 부분문자열들 탐색
        for (let charIndex = startIndex + minSize; charIndex < Math.min(s.length, startIndex + maxSize); charIndex++) {
            if (!uniqueChars.has(s[charIndex]) && uniqueChars.size >= maxLetters) break;
            substring += s[charIndex];
            uniqueChars.add(s[charIndex]);
            if (substringCountMap[substring]) substringCountMap[substring]++;
            else substringCountMap[substring] = 1;
        }
    }

    return Math.max(...Object.values(substringCountMap), 0);
};


console.log(maxFreq("ffhrimojtdwnwrwsmwxxprahdofmwzzcziskfyxvlteunhyjvmexcbxlrxtcsozrxyaxppdztpzqfcnpiwzhcvyyvpnlwwkhjlctlsbboosvyabdglhzvwdtazcyrumynkhqywrmyljhkxbpnwmfkxnqpchyjckwwpiqjljynsidcccffguyqmvnubgznsjzgkublxwvdjequsguchpzcfncervajafyhyjvoqetaxkybvqgbglmcoxxapmymxmmsqpddpctymxkkztnpiqcgrsybfrqzepnteiuzkvfnnfwsjwrshjclvkvjiwfqbvprbknvxotekxskjofozxiisnomismymubikpagnvgrchynsyjmwadhqzbfssktjmdkbztodwidpwbihfguxzgrjsuksfjuxfqvmqqojoyjznvoktfbwykwhaxorlduchkefnbpgknyoodaizarigbozvsikhxhokfpedydzxlcbasrxnenxrqxgkyfncgnhmbtxnigznqaawmslxehbshmelgfxaayttbsbhvrpsehituihvleityqckpfpmcjffhhgxdprsylnjvrezjdwjrzgqbdwdctfnvibhgcpmudxnoedfgejnbctrcxcvresawrgpvmgptwnwudqfdpqiokqbujzkalfwddfpeptqhewwrlrwdabafodecuxtoxgcsbezhkoceyydjkniryftqdoveipatvfrfkhdztibywbajknxvkrcvfhgbnjxnoefgdwbekrvaalzuwypkhwhmxtnmoggsogczhemzysagznnmjiiwwyekibytqhgwfzmsqlntvakyhaaxiqvlxbhgknvdxjwecccsquqqqmrxsysfyidsbtqytgonmzyjcydyqqqmixrbrllbcbbnwvriqcrznobzippyssjypvjemvadgdcriydntlpyrmxejtdyzhzdljhbyifxewdyokbhcgkhpdjoeqexfxqwvxys", 18, 2, 22));


/**
 * 풀이 2: 슬라이딩 윈도우 접근 (최적화)
 * 최대 길이 부분문자열의 최대 출현 횟수 = minSize 길이 부분문자열의 최대 출현 횟수
 * 따라서 minSize 크기만 유지하면서 슬라이딩하여 효율성을 높임
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 */
var maxFreq = function(s, maxLetters, minSize, maxSize) {
  // minSize 길이 부분문자열의 출현 횟수를 저장
  const substringFreqMap = new Map();
  // 현재 윈도우에서 각 문자의 출현 횟수
  const charCounts = new Array(26).fill(0);

  // 현재 윈도우의 고유 문자 개수
  let uniqueCharCount = 0;
  // 윈도우의 왼쪽 끝 포인터
  let windowLeft = 0;
  // 최대 출현 횟수
  let maxFrequency = 0;

  // 윈도우의 오른쪽 끝 포인터를 문자열 끝까지 이동
  for (let windowRight = 0; windowRight < s.length; windowRight++) {
    // 오른쪽 문자를 윈도우에 추가
    const rightCharIndex = s.charCodeAt(windowRight) - 97;
    if (charCounts[rightCharIndex] === 0) uniqueCharCount++;
    charCounts[rightCharIndex]++;

    // 윈도우 크기를 minSize로 유지
    if (windowRight - windowLeft + 1 > minSize) {
      const leftCharIndex = s.charCodeAt(windowLeft) - 97;
      charCounts[leftCharIndex]--;
      if (charCounts[leftCharIndex] === 0) uniqueCharCount--;
      windowLeft++;
    }

    // 윈도우 크기가 정확히 minSize이고 고유 문자가 maxLetters 이하일 때
    if (windowRight - windowLeft + 1 === minSize && uniqueCharCount <= maxLetters) {
      const substring = s.substring(windowLeft, windowRight + 1);
      const count = (substringFreqMap.get(substring) || 0) + 1;
      substringFreqMap.set(substring, count);
      maxFrequency = Math.max(maxFrequency, count);
    }
  }

  return maxFrequency;
};