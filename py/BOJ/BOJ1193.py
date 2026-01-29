X = int(input())

# 대각선별 원소의 개수를 layer 로 표현
layer = 1

# X번째가 해당하는 layer 까지 접근
while(layer < X):
    X -= layer
    layer += 1

# layer + 1 은 목표 레이어 분자, 분모 합
# X 는 목표 레이어에서의 순서번호가 된다.
# layer 가 홀수일 땐 분자가 X부터 감소
# 짝수일 땐 분자가 1부터 증가한다.
print(f"{layer + 1 - X}/{X}" if layer % 2 else f"{X}/{layer + 1 - X}")