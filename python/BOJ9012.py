import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/9012

T = int(input())


# VPS 여부를 체크해주는 함수
def psCheck(ps):
    stack = []

    for c in ps:
        # 괄호가 열리면 stack 에 추가
        if c == "(":
            stack.append(1)
        # 닫히는 경우 열려있는 괄호가 없으면 VPS 가 아니다.
        else:
            if not stack:
                return False
            stack.pop()

    # 모든 작업 후에 stack 에 남은게 있으면 VPS 가 아니다.
    return not stack


answer = []
for _ in range(T):
    ps = input().rstrip()

    if psCheck(ps):
        answer.append("YES")
    else:
        answer.append("NO")

print("\n".join(answer))
