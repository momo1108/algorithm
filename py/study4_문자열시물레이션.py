"""
1. 문자열 연산, 메서드
"""
a = "Hello"
b = "world!"
c = a + b
print(c) # Helloworld!

# 같은 문자열을 여러 번 더하는 경우, 곱하기 기호를 이용해 표현할 수 있어요.
d = a + a + a
e = a * 3
print(d) # HelloHelloHello
print(e) # HelloHelloHello

# 슬라이싱
a = "abcdef"
print(a[::-1]) # fedcba
print(a[::2]) # ace

# f-string 사용
name = "철수"
age = 20

message = f"{name}는 {age}살입니다."
print(message)

# built-in 함수들
# upper, lower
# 문자열을 대문자 혹은 소문자로 변환
a = "Hello World"
print(a.upper()) # HELLO WORLD
print(a.lower()) # hello world

# split
# 문자열 나누기
b = "Hello World"
print(b.split()) # ['Hello', 'World']

# replace
# 문자열 바꾸기
c = "Hello World"
print(c.replace("Hello", "Bye")) # Bye World

# strip, lstrip, rstrip
# 앞뒤 공백(space, tab, enter) 제거
e = " Hello World "
print(e.strip())  # Hello World
print(e.lstrip()) # Hello World
print(e.rstrip()) #  Hello World


'''
2. 문자열 반복
“abc”를 3번 반복하면 “aaabbbccc” 로 해보자
'''
# 이중 for 문으로 직접 구현
result = ""
for c in "abc":           # 앞에서부터 한 글자 씩
    for _ in range(3):    # repeat_time 횟수 만큼
        result += c                 # result 뒤에 붙이자!
print(result)

# 문자열 곱하기
result = ""
for c in "abc":       # 앞에서부터 한 글자 씩
    result += c * 3   # result 뒤에 repeat_time 개 만큼 붙이자!
print(result)


'''
3. 회문(Palindrome) 판별
뒤집어도 같은 문자열. “abcba”, “기러기” 등
어떤 문자열이 회문인지 아닌지 판별하는 함수를 작성해보자
'''
def isPalindrome(s):
    l = len(s)
    for i in range(l):
        if s[i] != s[l - i - 1]:
            return False
    return True

def isPalindrome2(s):
    return s == s[::-1] # 대박;


'''
4. 줄임말 만들기
Republic of Korea > ROK
이건 굳이?
'''
def shorten_word(s):
    result = ""
    for word in s.split():  # 공백 split 을 하고
        result += word[0]   # 각 단어의 첫 번째 글자를 가져온 뒤
    return result.upper()   # 대문자로 바꾸자!


'''
5. 문자열 압축
문자열에서 반복되는 문자를 숫자로 표현
"aaabbcccc"는 "a3b2c4"
'''
def zip_word(s):
    result = ""
    cnt = 1
    l = len(s)
    for i in range(1, l):
        if s[i - 1] == s[i]:
            cnt += 1
        else:
            result += f"{s[i - 1]}{cnt}"
            cnt = 1
    return result + f"{s[-1]}{cnt}"


'''
문자열 문제 
BOJ 1120 - https://www.acmicpc.net/problem/1120
'''
A, B = input().split()
al, bl = len(A), len(B)
answer = 99

for offset in range(bl - al + 1):
    diff = 0
    for i in range(al):
        if A[i] != B[offset + i]: diff += 1
    answer = diff if diff < answer else answer

print(answer)