import sys

Q = int(sys.stdin.readline())
A = []
total = 0
output = []  # 잘린 배열의 합을 저장해놓는다.

for _ in range(Q):
    q = sys.stdin.readline().split()
    if q[0] == "1":
        # 배열에 요소를 추가하고 총합 누적
        newNumber = int(q[1])
        A.append(newNumber)
        total += newNumber
    else:
        length = len(A)

        # 중앙을 기준으로 양분
        left = A[: length // 2]
        leftSum = sum(left)
        rightSum = total - leftSum

        # 잘린 부분 빼고 원본에 덮어쓴다.
        if leftSum > rightSum:
            A = left
            output.append(str(rightSum))
            total = leftSum
        elif leftSum <= rightSum:
            A = A[length // 2 :]
            output.append(str(leftSum))
            total = rightSum

print("\n".join(output))
print(" ".join(map(str, A)))
