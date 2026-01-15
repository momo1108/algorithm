import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/1863

n = int(input())

"""
스카이라인의 높이 y 만 고려해보자.
좌측부터 고도가 바뀔 때 마다 가장 높은 위치는 무조건 하나의 빌딩이 된다.
그러므로 가장 높은 위치를 빼고 빌딩 수를 1 누적한다.
그 후에는 남은 높이들 중 가장 높은게 하나의 빌딩이 된다.
이를 위해서 무조건 빌딩의 높이가 오름차순으로 저장되어있어야한다.
혹시라도 더 낮은 높이가 등장해 오름차순을 해칠 것 같으면,
기존의 저장 정보에서 가장 마지막의 높은 높이를 뺀다.
그 이후에도 마지막이 더 높으면 또 뺀다.
또 그러면 또 뺀다...
...
계속 반복해서 같은 높이가 나오면 같은 빌딩으로 가정할 수 있으니 pass
더 낮은 높이가 나오면 마지막에 현재 높이를 삽입한다.

"이렇게 마지막 위치를 기반한 작업에는 stack 이 가장 적절하다"

- 높이가 0이면 더 낮은 경우가 있을 수 없다. 
- 맨 처음에 0을 넣어놓으면 마지막에는 0, y1, y2, ..., yn 형태가 된다.
- 0 뒤에 yi 가 존재하면 그냥 순서대로 빼주면 된다. 어짜피 오름차순!
- 뺄때마다 빌딩 개수를 1씩 누적하되, 0 이 빠졌을 땐 누적에서 제외한다.

직전보다 높으면? stack 에 추가한다.
직전보다 낮으면? stack 의 마지막을 pop하고 count + 1
pop이 된 경우, 다시 위의 체크를 반복한다.
"""

heightStack = [0]
answer = 0
for _ in range(n):
    x, y = [int(s) for s in input().split()]

    while True:
        if y > heightStack[-1]:
            heightStack.append(y)
            break
        elif y == heightStack[-1]:
            break
        else:
            heightStack.pop()
            answer += 1

while heightStack:
    if heightStack.pop():
        answer += 1

print(answer)
