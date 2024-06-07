import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/2607

N = int(input())
alphabetDict = {
    alpha: index for index, alpha in enumerate("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
}

firstWord = ""
firstWordMap = [0] * 26


def isSimilar(word):
    # 단어 길이가 같으면 다른 단어가 2개 이하여야 함
    if len(word) == len(firstWord):
        firstWordMapCopy = firstWordMap.copy()
        for char in word:
            firstWordMapCopy[alphabetDict[char]] -= 1

        count = 0
        for diff in firstWordMapCopy:
            count += abs(diff)

        if count > 2:
            return False
        else:
            return True
    # 단어 길이 1 차이면 다른 단어가 2개 미만이어야 함
    elif abs(len(word) - len(firstWord)) == 1:
        firstWordMapCopy = firstWordMap.copy()
        for char in word:
            firstWordMapCopy[alphabetDict[char]] -= 1

        count = 0
        for diff in firstWordMapCopy:
            count += abs(diff)

        if count > 1:
            return False
        else:
            return True
    # 2글자 이상 차이면 안됨
    else:
        return False


answer = 0
for i in range(N):
    word = input().rstrip()
    if i == 0:
        firstWord = word
        for char in word:
            firstWordMap[alphabetDict[char]] += 1
    else:
        if isSimilar(word):
            answer += 1
print(answer)
