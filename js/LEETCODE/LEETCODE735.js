/**
 * 정수 배열 asteroids 이 주어진다. 
 * 각 요소의 값은 상대적인 위치를 나타낸다.
 * 절대값은 크기를 나타내고, 부호가 방향을 나타낸다.
 * (양수 - 오른쪽, 음수 - 왼쪽)
 * 모든 요소는 같은 속도로 움직인다.
 * 모든 요소가 충돌되고 난 후의 상태를 찾아내야 한다.
 * 두 요소가 충돌하면 다음과 같은 결과가 나타낸다
 * 크기가 다르면 작은 요소가 사라진다.
 * 크기가 같으면 둘다 사라진다.
 * 
 * 같은 방향으로 이동하는 요소는 절대 서로 만날수없다.
 */

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision1 = function(asteroids) {
    const stack = []

    for (let current of asteroids) {
        // 스택이 비어있거나 양수(오른쪽)면 충돌 없음 → 바로 추가
        if (stack.length === 0 || current > 0) {
            stack.push(current);
            continue;
        } else {
            // 현재가 음수(왼쪽) → 충돌 가능성 있음
            let stackTop = stack[stack.length - 1];
            
            // 스택 최상단도 음수면 충돌 없음 (같은 방향)
            if (stackTop < 0) {
                stack.push(current);
            } else {
                // 스택 최상단이 양수 → 충돌 발생
                // 현재 음수가 스택의 양수들을 제거할 수 있는지 확인
                while (stack.length && stackTop > 0) {
                    if (stackTop + current < 0) {  // 현재가 더 큼 → 스택 top 제거
                        stack.pop();
                        stackTop = stack[stack.length - 1];
                    }
                    else break;  // 스택 top이 더 크거나 같음 → 반복 중단
                }
                // 스택이 비었거나 음수만 남음 → 현재 추가
                if (!stack.length || stackTop < 0) stack.push(current);
                // 크기가 같으면 둘 다 소멸
                else if (stackTop + current === 0) stack.pop();
            }
        }
    }

    return stack;
};


// 빠른 정답 코드
var asteroidCollision2 = function (asteroids) {
    const stack = []

    for (let asteroid of asteroids) {
        while (true) {
            if (!stack.length) {
                stack.push(asteroid)
                break
            }
            let top = stack[stack.length - 1]
            if ((top < 0 && asteroid > 0) || (top > 0 && asteroid > 0) || (top < 0 && asteroid < 0)) {
                stack.push(asteroid)
                break
            } else {
                top = stack.pop()
                if (Math.abs(asteroid) < Math.abs(top)) {
                    asteroid = top
                    stack.push(asteroid)
                }
                if (Math.abs(asteroid) == Math.abs(top)) {
                    break
                }
            }
        }
    };
    return stack
}

// 성능 테스트 - 다양한 시나리오
console.log('=== 시나리오 1: 매우 큰 랜덤 배열 (100,000개) ===');
const largeRandom = Array.from({ length: 100000 }, (_, i) => 
    i % 2 === 0 ? Math.floor(Math.random() * 1000) + 1 : -(Math.floor(Math.random() * 1000) + 1)
);
console.time('asteroidCollision1 - large random');
asteroidCollision1([...largeRandom]);
console.timeEnd('asteroidCollision1 - large random');

console.time('asteroidCollision2 - large random');
asteroidCollision2([...largeRandom]);
console.timeEnd('asteroidCollision2 - large random');

console.log('\n=== 시나리오 2: 최악의 경우 - 모든 양수 후 모든 음수 (50,000개) ===');
// 앞쪽에 모든 양수, 뒤쪽에 모든 음수 - 연쇄 충돌 발생
const worstCase = [
    ...Array.from({ length: 25000 }, (_, i) => i + 1),
    ...Array.from({ length: 25000 }, (_, i) => -(i + 1))
];
console.time('asteroidCollision1 - worst case');
asteroidCollision1([...worstCase]);
console.timeEnd('asteroidCollision1 - worst case');

console.time('asteroidCollision2 - worst case');
asteroidCollision2([...worstCase]);
console.timeEnd('asteroidCollision2 - worst case');

console.log('\n=== 시나리오 3: 모든 양수 (충돌 없음, 50,000개) ===');
const allPositive = Array.from({ length: 50000 }, (_, i) => i + 1);
console.time('asteroidCollision1 - all positive');
asteroidCollision1([...allPositive]);
console.timeEnd('asteroidCollision1 - all positive');

console.time('asteroidCollision2 - all positive');
asteroidCollision2([...allPositive]);
console.timeEnd('asteroidCollision2 - all positive');

console.log('\n=== 시나리오 4: 모든 음수 (충돌 없음, 50,000개) ===');
const allNegative = Array.from({ length: 50000 }, (_, i) => -(i + 1));
console.time('asteroidCollision1 - all negative');
asteroidCollision1([...allNegative]);
console.timeEnd('asteroidCollision1 - all negative');

console.time('asteroidCollision2 - all negative');
asteroidCollision2([...allNegative]);
console.timeEnd('asteroidCollision2 - all negative');

console.log('\n=== 시나리오 5: 반복 테스트 10회 평균 (10,000개) ===');
const testData = Array.from({ length: 10000 }, (_, i) => 
    i % 2 === 0 ? Math.floor(Math.random() * 100) + 1 : -(Math.floor(Math.random() * 100) + 1)
);
let sum1 = 0, sum2 = 0;
for (let i = 0; i < 10; i++) {
    const start1 = performance.now();
    asteroidCollision1([...testData]);
    sum1 += performance.now() - start1;
    
    const start2 = performance.now();
    asteroidCollision2([...testData]);
    sum2 += performance.now() - start2;
}
console.log(`asteroidCollision1 평균: ${(sum1 / 10).toFixed(3)}ms`);
console.log(`asteroidCollision2 평균: ${(sum2 / 10).toFixed(3)}ms`);