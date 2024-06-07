import sys

input = sys.stdin.readline
# https://www.acmicpc.net/problem/3107

ipString = input().rstrip()
splittedIp = ipString.split(":")

skippedLength = 8 - len(splittedIp)
skippedString = ""
if skippedLength < 0:
    skippedString = ":"
else:
    skippedString = ":0000:" + "0000:" * skippedLength

ipString = ipString.replace("::", skippedString)

splittedIp = ["0" * (4 - len(ip)) + ip for ip in ipString.split(":")]
print(":".join(splittedIp))
