from heapq import *
import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/21939


"""
최소힙, 최대힙을 병용하여 추천 명령어를 수행하자.
add, solved

solved 로 인한 삭제 처리는 어떻게 해야할까?
solved 명령어가 중간의 요소를 삭제하는 방법도 필요하다

인터넷으로 heap 의 요소 삭제 방식인 lazy removal 을 찾아냈다.
게으른 삭제? 이게 무슨뜻인가 하니
삭제 행위를 원하는 시점에 당장 찾아내서 하는게 아니라,
최상위 요소를 보고 "이 요소는 이전에 삭제된 요소다" 라고 체크하고, 
나중에 pop 을 쓸 때 삭제 체크된 데이터면 무효로 판단,
다시한번 pop을 하는 방식이다.

이 방식을 사용하기 위해, 삭제체크를 위한 배열 C 를 만들어두자.
이왕이면 배열형태로 문제 번호별 난이도를 기록해두는 방식을 사용하자
삭제된 경우 난이도를 0 으로 설정하면 될듯?

메모리는 파이썬 정수 28byte * 100000 = 2.8MB 정도

heap 에 저장하는 형태는 난이도와 문제 번호를 같이 나타내기 위해
난이도 * 1000000 + 문제번호 로 저장하자.
이렇게 저장하면 알아서 같은 난이도인 경우, 문제번호도 최소/최대힙에
기준으로 같이 사용된다.
pop 된 데이터를 x 라고 하면
난이도 = x // 1000000
문제번호 = x % 1000000
이 된다.

명령어가 10000개 이하이기 때문에, lazy removal 에 따른 추가 작업을
오버로 잡아서 push 10000 번, 존재하는 문제 삭제 10000번, 추천 10000번
이렇게 잡아도 push 20000log(100000) = 340000
문제 삭제는 난이도 배열 변경이므로 10000
추천에서 양쪽 힙에서 lazy removal 최대 20000번씩 일어난다 해도
(20000+10000)*2log(100000) = 1000000 정도
아무리 크게 잡아도 합이 1000만 언저리이다.

맞게 계산했는지는 모르겠지만 시간은 충분할 것 같다.
"""

N = int(input())
maxH, minH, C = [], [], [0] * 100001
heapify(maxH)
heapify(minH)

for _ in range(N):
    P, L = [int(a) for a in input().split()]
    C[P] = L  # 문제 번호 별 난이도 저장
    heappush(maxH, -(P + L * 1000000))
    heappush(minH, P + L * 1000000)

M = int(input())

answer = []
for _ in range(M):
    command = [a for a in input().rstrip().split()]

    # 1. 추천
    if command[0] == "recommend":
        # 1-1. 가장 어려운 문제 추천
        if command[1] == "1":
            # 뽑을 문제가 삭제 혹은 삭제 후 다시 들어온 문제인 경우 pass
            while (-maxH[0] // 1000000) != C[-maxH[0] % 1000000]:
                heappop(maxH)
            recommendP = -maxH[0] % 1000000
            answer.append(str(recommendP))
        # 1-2. 가장 쉬운 문제 추천
        else:
            # 위와 마찬가지
            while (minH[0] // 1000000) != C[minH[0] % 1000000]:
                heappop(minH)
            recommendP = minH[0] % 1000000
            answer.append(str(recommendP))
    # 2. 문제 추가
    elif command[0] == "add":
        P, L = [int(a) for a in command[1:]]
        C[P] = L
        heappush(maxH, -(P + L * 1000000))
        heappush(minH, P + L * 1000000)
    # 3. 문제 제거
    else:
        C[int(command[1])] = 0

print("\n".join(answer))
