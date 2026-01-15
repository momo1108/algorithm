# 강의자료 노션 링크
내 노션 개인 페이지에 복제해놓음.

## 포맷터
- black
- pep8

## input 설정
```python
sys.stdin = open("name.txt", "r")
input = sys.stdin.readline
```

## 피드백
변수명으로 무엇인지를 설명하고
주석은 Why 를 위주로 설명

## 구현문제 추천
https://www.acmicpc.net/problem/3190

https://www.acmicpc.net/problem/17144

https://www.acmicpc.net/problem/16236

## git bash alias 설정
'''bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${>[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

alias lostark="ssh ubuntu@3.39.10.23 -i /c/Users/mom/Desktop/LostarkProject/key/momo1108.pe>alias blog="bundle exec jekyll s"

post() {
        bundle exec jekyll post "$1" --timestamp-format "%Y-%m-%d %H:%M:%S %z"
}

alias eb="nano ~/.bash_profile"
alias sb="source ~/.bash_profile"

pyb() {
        cd /c/Users/mom/Desktop/algorithm/python
        touch BOJ"$1".py
        echo "import sys" >> BOJ"$1".py
        echo "input = sys.stdin.readline" >> BOJ"$1".py
        echo "# https://www.acmicpc.net/problem/$1" >> BOJ"$1".py
}

bj() {
        cd /c/Users/mom/Desktop/algorithm/python
        py BOJ"$1".py
}
'''