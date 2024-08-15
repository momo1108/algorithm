import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/17413

# 1. 알파벳 소문자('a'-'z'), 숫자('0'-'9'), 공백(' '), 특수 문자('<', '>')로만 이루어져 있다.
# 2. 문자열의 시작과 끝은 공백이 아니다.
# 3. '<'와 '>'가 문자열에 있는 경우 번갈아가면서 등장하며, '<'이 먼저 등장한다. 또, 두 문자의 개수는 같다.
# 태그는 '<'로 시작해서 '>'로 끝나는 길이가 3 이상인 부분 문자열
#  '<'와 '>' 사이에는 알파벳 소문자와 공백만
# 태그는 단어가 아니며, 태그와 단어 사이에는 공백이 없다
# 단어는 알파벳 소문자와 숫자로 이루어진 부분 문자열
# 두 단어는 공백 하나로 구분

S = input().rstrip()

isTag = False
wordStart = 0
words = []

for i, c in enumerate(S):
    if isTag and c != ">":
        continue

    if c == "<":
        words.append(S[wordStart:i])
        wordStart = i
        isTag = True
    elif c == ">":
        words.append(S[wordStart : i + 1])
        wordStart = i + 1
        isTag = False
    elif c == " ":
        words.append(S[wordStart:i])
        words.append(" ")
        wordStart = i + 1

words.append(S[wordStart:])
words = list(filter(lambda x: len(x) > 0, words))

answer = []
for word in words:
    if word[0] == "<":
        answer.append(word)
    else:
        answer.append(word[::-1])

print("".join(answer))
