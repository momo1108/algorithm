from im import input

'''
자음의 연속의 규칙 정의가 필요
조건 1. 특수문자는 자음인가?
조건 2. 공백은 자음인가?

1 & 2 - 오답
yes 1 not 2 - 오답
not 1 yes 2 - 오답
not 1 not 2 - 
'''

VOWELS = "aeiouyAEIOUY"
CONSONANTS = "bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ"

N = int(input())
sentenceArray = [""] * N
rule2Array = ["y"] * N

# 유저가 현재 입력한 줄에 자음이 연속으로 6개 이상 오는 단어가 포함된 경우
def rule1(sentence):
    # 연속된 자음 개수
    consoCount = 0
    for char in sentence:
        if(char in CONSONANTS):
            consoCount+=1
            if(consoCount > 5): return True
        else: consoCount = 0
    return False

'''
유저가 현재 입력한 줄에 자음이 연속으로 5 개 이상 오는 단어가 포함되면서,
최근 10 줄의 채팅(현재 입력한 줄을 제외하고 10 줄) 중 
이러한 조건을 만족하는 줄이 3 줄 이상 존재할 경우
'''    
def rule2(sentence, index):
    words = sentence.split()
    consoCount = 0

    for w in words:
        for char in w:
            if(char in CONSONANTS):
                consoCount+=1
                if(consoCount > 4): 
                    rule2Array[index] = "n"
                    break
            else: consoCount = 0
        consoCount = 0
    
    if (rule2Array[index] == "n") & (rule2Array[max(0, index - 10) : index].count("n") > 2):
        return True
    else: return False

'''
유저가 현재 입력한 줄의 내용이 최근 
10 줄의 채팅(현재 입력한 줄을 제외하고 10 줄) 과 
2 줄 이상 완전히 중복되는 내용인 경우
'''
def rule3(sentence, index):
    if sentenceArray[max(0, index - 10):index].count(sentence) > 1: return True
    else: return False


for i in range(N):
    sentenceArray[i] = input()

answer = ""

for i, line in enumerate(sentenceArray):
    # 룰 하나라도 위반하면 n
    if rule1(line) | rule2(line, i) | rule3(line, i): answer += "n\n"
    else: answer += "y\n"

print(answer)