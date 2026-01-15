import sys
import re
from collections import defaultdict

input = sys.stdin.readline
# 테케별 단어 개수 저장
wordChecker = defaultdict(int)
# 전체 정답 저장
answer = []


# 현재 테케의 정답들을 찾아서 추가.
def answerFinder(count):
    caseAnswer = []
    for key, value in wordChecker.items():
        if value == count:
            caseAnswer.append(key)

    if len(caseAnswer):
        caseAnswer.sort()
        answer.append("\n".join(caseAnswer))
    else:
        answer.append("There is no such word.")
    answer.append("")


# 테케 판별 변수
needCount = True
# 입력된 단어 중복 횟수
count = 0
while True:
    # 무한입력 멈추기 위해 try except 사용
    try:
        line = input().rstrip()
        if needCount:
            needCount = False
            count = int(line)
        if line == "EndOfText":
            answerFinder(count)
            needCount = True
            count = 0
            wordChecker.clear()
        else:
            words = re.split(r"[^a-zA-Z]", line)
            for w in filter(lambda s: s, words):
                wordChecker[w.lower()] += 1
    except:
        print("\n".join(answer))
        break
