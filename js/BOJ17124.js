const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ17124.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

let T = parseInt(input[0]);

/**
 * 각 테스트 케이스에 대해 다음의 과정을 반복합니다.
 * 
 * A 배열에서 파생된 C 배열을 만듭니다.
 * C[i] 요소는 B 배열에 있는 요소들 중 A[i] 요소에 가장 가까운 값으로 지정합니다.
 * 단, A 배열, B 배열의 최대 길이는 10^6 이므로 브루트포스로 모두 찾는것은
 * 시간이 너무 오래걸립니다.(10^6 * 10^6 = 10^12)
 * 
 * 따라서, B 배열에서 이분탐색을 통해 A[i] 와 가장 가까운 값을 찾아냅니다.
 */
const binarySearch = (num, arr) => {
    let left = 0, right = arr.length - 1;
    let middle;

    while (left < right) {
        middle = Math.floor((right + left) / 2);
        if (num > arr[middle]) left = middle + 1;
        else if(num === arr[middle]) break;
        else right = middle - 1;
    }

    return middle;
}

for (let testCase = 0; testCase < T; testCase++) {
    // const [n, m] = input[testCase * 3 + 1];
    const A = input[testCase * 3 + 2].split(" ").map(value => parseInt(value));
    const B = input[testCase * 3 + 3].split(" ").map(value => parseInt(value));
    const C = new Array(A.length).fill(null);

    // 오름차순 정렬
    B.sort((a, b) => a - b);

    for(let i = 0; i < A.length; i++) {
        const middle = binarySearch(A[i], B);
        
        let minGap = 10000000000;
        for (let j = middle + 2; j >= middle - 2; j--) {
            if (j < 0 || !B[j]) continue;

            const gap = Math.abs(A[i] - B[j]);
            if (gap <= minGap) {
                minGap = gap;
                C[i] = B[j];
            }
        }
    }

    console.log(C.reduce((prev, cur) => prev + cur, 0));
}