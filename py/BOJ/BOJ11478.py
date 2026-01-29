import sys

S = sys.stdin.readline().rstrip()
subStrings = set()

# 부분 문자열의 길이별로 코드 실행
for length in range(1, len(S) + 1):

    # 시작점을 1씩 늘려가며 부분 문자열 체크
    start = 0
    while start + length <= len(S):
        subStrings.add(S[start : start + length])
        start += 1

print(len(subStrings))
