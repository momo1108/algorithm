import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/5397

"""
stack 을 사용하는게 좋을 듯?

입력된 문자는 순서대로 stack 에 하나씩 쌓는다.

추가적인 작업은 다음과 같다.

1. 좌로 이동
현재까지 입력된 내용의 가장 끝 위치에서 좌로 이동을 한다
다시말하면 맨 끝의 요소와 이전 요소 사이에 입력을 해야한다는 뜻
그렇다면 맨끝에 저장된 요소를 빼서 따로 저장해놓고 stack 뒤에 붙이면
자연스럽게 사이에 입력이 되는 꼴이 된다.
입력 후에 따로 빼놓은 요소를 다시 넣어준다.
이러한 작업때문에 stack 이 좋을듯
빼놓은 요소를 저장하는 구조도 stack 을 쓰는게 좋을 것 같다.
마지막에 뺀 요소를 먼저 붙여줘야 순서가 맞기 때문이니까
예시)
좌측 stack     우측 stack    커서
[A, B, C |]
[A, B |]       [C]          좌로 이동
[A |]          [C, B]       좌로 이동


2. 우로 이동
우로 이동은 빼놓은 요소가 있을때만 의미를 가진다. 
뒤에 아무것도 없는 경우는 우로 이동해도 똑같기 때문이다.
이런 관점에서 뒤에 빼놓은 요소가 있다면 우로 이동했을 때
기존의 문자열에 가장 마지막에 뺀 요소를 붙여주는게 맞다.
좌측 stack     우측 stack    커서
[A |]          [C, B]       우로 이동
[A, B |]       [C]
[A, B, C |]

3. 제거
제거의 경우 커서를 기준으로 좌측의 stack 에서 마지막 요소를
pop 을 통해 삭제를 하면 된다. 말그대로 제거기 때문에 따로 저장 안함

4. 글자 입력
커서 기준 좌측 stack 에 push 로 문자를 삽입한다.

시간복잡도
입력의 길이가 최대 1000000이다.
글자 입력
1, 2번 작업은 pop 과 push 를 같이 사용하기 때문에 O(2N)
3, 4번 작업은 pop 혹은 push 만 사용사기 때문에 O(N)
여기에 마지막 stack 요소들을 하나의 문자로 합치기 위한 join 이 최대 O(N)
각각의 작업을 모두 1000000번 수행한다 가정해도
O(2N + 2N + N + N + N) = 7000000
너무 넉넉하고~
"""

T = int(input())

answer = []
for _ in range(T):
    lStack = []
    rStack = []
    command = input().rstrip()
    for c in command:
        if c == "<":
            if lStack:
                rStack.append(lStack.pop())
        elif c == ">":
            if rStack:
                lStack.append(rStack.pop())
        elif c == "-":
            if lStack:
                lStack.pop()
        else:
            lStack.append(c)
    rStack.reverse()
    answer.append("".join(["".join(lStack), "".join(rStack)]))

print("\n".join(answer))
