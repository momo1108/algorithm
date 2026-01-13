const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ8933.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = parseInt(input[0]);

for(let testCase = 1; testCase <= T; testCase ++){
    const line = input[testCase].trim();

    // k => 부분 문자열의 길이, W => 전체 문자열
    const [k, W] = line.split(" ").map(value => {
        const parsedValue = parseInt(value)
        return isNaN(parsedValue) ? value : parsedValue;
    })

    /**
     * 앞에서 k글자를 먼저 카운트해서 맵에 저장해놓는다.
     * 이후 한글자씩 슬라이딩하며 countMap 이 변하고, 변할때마다 mcs 카운트에 누적한다.
     */
    const countMap = {'A':0, 'C':0, 'G':0, 'T':0};
    for(let wIndex = 0; wIndex < k; wIndex++){
        countMap[W[wIndex]]++;
    }

    /**
     * countMap 에 저장된 엔트리( {문자: 개수} )들의 정보를 문자열로 변형하여 
     * mcsMap 의 키값으로 사용하고 카운팅한다.
     * ex)  countMap     { "A":2, "B":1 } => "A2B1"
     *      mcsMap       { "A2B1":1 }
     */
    const mcsMap = {};
    const mcsCounter = (map) => {
        const mcs = Object.entries(map).reduce((prev, cur) => `${prev}${cur[0]}${cur[1]}`, '');
        if (mcsMap[mcs]) mcsMap[mcs] += 1;
        else mcsMap[mcs] = 1;
    }
    
    mcsCounter(countMap);
    for(let lastCharIndex = k; lastCharIndex < W.length; lastCharIndex++){
        countMap[W[lastCharIndex]]++;
        countMap[W[lastCharIndex - k]]--;
        mcsCounter(countMap);
    }

    console.log(Math.max(...Object.values(mcsMap)));
}