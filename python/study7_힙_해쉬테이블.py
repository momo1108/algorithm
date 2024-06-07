"""
1. 힙(Heap)
힙은 정해진 우선 순위에 따라 원소를 
O(logN) 에 추가 / 삭제가 가능한 자료구조이다.

기본 연산은 다음과 같다.
push: 힙에 새로운 원소 추가
pop: 힙에서 가장 우선순위(사전 설정)가 높은 원소를 추출하고 반환한다.

파이썬에서는 heapq 라이브러리를 제공하는데, 기본적으로 최솟값을
우선 순위로 하는 mean heap 을 제공한다.

heapify: 리스트를 최소 힙으로 변환
0번 인덱싱: 최소값 조회(0 외에는 큰 의미 없다. 순서가 다 우선순위가 아님)
heappush: 힙에 원소 추가
heappop: 힙에서 가장 작은 원소 제거 후 반환
"""

from heapq import *

a = [5, 3, 4, 1, 2]
# a 를 최소 힙으로 변환. 대입할 필요 없으니 주의
heapify(a)

print(a[0])  # 최소값 조회
print(heappop(a))  # 최소값 추출
print(a[0])  # 최소값 조회

heappush(a, 7)  # a 힙에 7 을 추가.
print(a[0])  # 최소값 조회

heappush(a, 0)  # a 힙에 7 을 추가.
print(a[0])  # 최소값 조회

# 힙 연습문제
# https://www.acmicpc.net/problem/1927
# https://www.acmicpc.net/problem/11279


"""
2. 해쉬 테이블(Hash Table)
Key 와 Value 를 매핑한 자료구조이다.
파이썬에서는 dictionary, collections.defaultdict 를 사용하면 된다.
"""

ageMapper = {}
ageMapper["철수"] = 20  # 추가
ageMapper["철수"] += 1  # 수정
print(ageMapper["철수"])  # 조회

del ageMapper["철수"]
print(ageMapper)

# 해쉬 테이블 연습문제
# https://www.acmicpc.net/problem/1920
