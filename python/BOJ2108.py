from collections import defaultdict
import sys
input = sys.stdin.readline
# https://www.acmicpc.net/problem/2108

N = int(input().strip())
nums = []
numsCountArray = [0] * 8001

for _ in range(N):
    num = int(input().strip())
    nums.append(num)
    numsCountArray[num + 4000] += 1

nums.sort()

print(round(sum(nums) / N))
print(nums[N // 2])

maxCount, answerArray = 0, []
for num, count in enumerate(numsCountArray):
    if count > maxCount:
        answerArray = []
        answerArray.append(num - 4000)
        maxCount = count
    elif count == maxCount:
        answerArray.append(num - 4000)

print(answerArray[1] if len(answerArray) > 1 else answerArray[0])
print(nums[N - 1] - nums[0])