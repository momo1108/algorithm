import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/9935


S = input().rstrip()
BOMB = input().rstrip()

charStack = []

"""
맨 뒤 문자들을 체크하고 삭제하기 위해 스택을 사용한다.

문자를 하나씩 추가하며 맨 뒤의 문자열이 BOMB(폭탄 문자열)이 되는지만 체크

추가하자마자 체크하는 경우, BOMB 을 제거하고 문자를 새로 추가하기 전에
뒤쪽에 새로운 BOMB 이 있을수가 없다.
문제에서 BOMB 에는 중복 문자가 없다고 했기 때문이다.
"""
for c in S:
    charStack.append(c)

    # 맨 뒤에 BOMB 이 있는지 체크한다.
    lastString = "".join(charStack[-len(BOMB) :])

    # BOMB 인 경우, 해당 글자 수 만큼 pop!
    if lastString == BOMB:
        for _ in BOMB:
            charStack.pop()

result = "".join(charStack)
print(result if result else "FRULA")
