'''
1. 문자열
'''

a = 1
b = 2
c = str(a + b) # str 3

print("x" in "abc") # False
print("ab" in "abc") # True
print("ac" in "abc") # False

s = "Hello, world!"
# 소문자 l을 대문자 L로 바꾸기!
s_with_upper_l = s.replace('l', 'L')
print(s_with_upper_l) # 'HeLLo, worLd!"

s = "Hello, world!"
# 공백으로 구분하기
print(s.split()) # ['Hello,', 'world!']
# 지정한 구분자로 구분하기
print(s.split('l')) # ['He', '', 'o, wor', 'd!']


'''
2. 정수
'''
a = "3"
b = int(a) # int 3

a = 3
b = 2
print(a + b) # 5 (더하기)
print(a - b) # 1 (빼기)
print(a * b) # 6 (곱하기)
print(a // b) # 1 (나누기 몫)
print(a % b) # 1 (나누기 나머지)


'''
3. 리스트
'''
a = list() # 빈 리스트 생성
b = [] # 빈 리스트 생성
c = [1, 2, 3] # 1, 2, 3을 원소로 가지는 list 생성

# 선언한 리스트의 원소는 [] 안에 인덱스를 작성하여 접근할 수 있어요
print(c[1]) # c의 1번 인덱스, 즉 2가 출력됩니다.

a = [] # 빈 리스트 선언
a.append(3) # a에 3을 추가하자!
print(a) # [3]

# Python은 list 간의 덧셈이 지원됩니다 
b = [1, 2]
a += b # a의 뒤에 b를 붙이기
print(a) # [3, 1, 2]
c = b + a
print(c) # [1, 2, 3, 1, 2]

a = [1, 2]
b = a.pop() # 맨 뒤의 원소를 제거하자!
print(b)  # 2
print(a)  # [1] => 2가 제거된 걸 확인할 수 있습니다

a = [1, 2, 3]
b = a.pop(1) # 1번 인덱스의 원소를 제거하자!
print(b) # 2
print(a) # [1, 3]

arr = [1, 2, 3]
print(1 in arr) # True
print(5 in arr) # False
print("1" in arr) # False -> arr에 문자열 1은 없음!


'''
4. 셋
'''
# 빈 set 선언하기
a = set()

# 원소가 있는 set을 선언하기
b = {1, 2, 3}

# 주의: 빈 set를 괄호로 선언하면 딕셔너리가 생성됩니다.
c = {} # set이 아닌 dictionary!

a = set()
a.add(1)
print(a) # {1}

# 중복 원소를 추가해보면?
a.add(1)
print(a) # {1}

arr = {1, 2, 3}
print(1 in arr) # True
print(5 in arr) # False
print("1" in arr) # False -> arr에 문자열 1은 없음!

'''
5. 딕셔너리
'''
# 빈 딕셔너리 생성
my_dic = {}
# 신규 key - value 값 지정
my_dic["key"] = "value"
# 선언한 딕셔너리의 원소에 접근해 볼게요
print(my_dic["key"]) # value

# 같은 key에 다른 value를 지정하면 value가 덮어써집니다
my_dic["key"] = "value2"
print(my_dic["key"]) # value2

# 값이 채워진 딕셔너리로 선언하는 것도 가능해요.
mapper = {1: "one", 2: "two", 3: "three"}
print(mapper[2]) # two

mapper = {1: "one", 2: "two", 3: "three"}
for key in mapper.keys():
    print(key, mapper[key])

mapper = {1: "one", 2: "two", 3: "three"}
for value in mapper.values():
    print(value)

mapper = {1: "one", 2: "two", 3: "three"}
for key, value in mapper.items():
    print(key, value)

mapper = {1: "one", 2: "two", 3: "three"}
print(mapper[4]) # KeyError: 4

# default 값 설정 가능
mapper = {1: "one", 2: "two", 3: "three"}
print(mapper.get(4, "No Result!")) # No Result!