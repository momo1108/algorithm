'''
1. 라이브러리
'''
# 1번 예시 - 라이브러리 전체 다 가져오기
import collections
my_dic = collections.defaultdict()

# 2번 예시 - 라이브러리의 특정 패키지/모듈을 가져오기
# 메모리 사용을 제일 적게 하므로, 1~3번 예시 중 2번 예시와 같이 사용하시는 걸 추천드려요.
from collections import defaultdict
my_dic = defaultdict()

# 3번 예시 - 라이브러리의 모든 패키지/모듈을 가져오기
from collections import *
my_dic = defaultdict()

# 심화) import 하면서, 이름을 지정할 수 있습니다.
import sys as s
# a = s.stdin.readline()

'''
1-1. collections 라이브러리
=====================================
- collections.defaultdict
딕셔너리와 같은 형태로 동작하지만, key 값을 사전에 지정하지 않아도
에러가 발생하지 않고, 디폴트 value 를 반환한다.
사용할 자료구조를 생성함수의 파라미터로 넣어 생성해야 합니다.
int, str, list 등
사용 예시)
변수명 = defaultdict(int)
'''
from collections import defaultdict
myDictInt = defaultdict(int)
myDictStr = defaultdict(str)
myDictList = defaultdict(list)

print(myDictInt["key1"]) # 0
print(myDictStr["key1"]) # ""
print(myDictList["key1"]) # []

'''
- collections.deque
덱 자료구조는 어떤 배열의 맨 앞과 뒤에 조작을 자주 해야하는 경우 사용
'''
from collections import deque
d = deque()

'''
1-2. itertools 라이브러리
itertools 는 가능한 모든 순열 / 조합을 반환해주는 함수를 포함한 라이브러리
사용을 금지한 코딩 테스트가 간혹 있으므로 확인이 필요
=====================================
- itertools.permutations
순열
- itertools.combination
조합
'''
from itertools import permutations as p, combinations as c;
a = [1, 2, 3]
print("Permutations example")
orders = p(a) # [1, 2, 3] 으로 가능한 모든 순열 반환
for order in orders:
    print(order)
    
orders = p(a, 2) # 순열의 원소 개수 설정도 가능
for order in orders:
    print(order)

print("=========")

print("Combinations example")
orders = c(a, 2) # 조합은 무조건 개수 설정하도록 되어있음
for order in orders:
    print(order)

'''
2. 시간 복잡도
Python 은 1초에 대략 10^8 만큼 연산이 가능
이를 이용해서, 시간복잡도를 바탕으로 풀이 예측이 가능
→ 시간복잡도 계산 시, 10^8 정도의 scale이라면 높은 확률로 시간 초과
'''
# 예시 : BOJ 1927
# https://www.acmicpc.net/problem/1927

# 일반 배열을 사용한 경우 : Time Limit Exceeded
# O(N^2) => 최대 10^10
from sys import stdin

input = stdin.readline

N = int(input())
heap = []
ans = ""

for i in range(N):
    x = int(input())
    if x:
        heap.append(x)
    else:
        if heap:
            m = min(heap)
            ans += f"{m}\n"
            heap.remove(m)
        else:
            ans += "0\n"

print(ans)

# Min Heap 을 사용한 경우
# Accepted
# O(N log N) => 약 10^6
import heapq
from sys import stdin

input = stdin.readline

N = int(input())
heap = []
for _ in range(N):
    a = int(input())
    if a:
        heapq.heappush(heap, a)
    else:
        if heap:
            m = heapq.heappop(heap)
            print(m)
        else:
            print(0)