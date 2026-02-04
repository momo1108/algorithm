const filePath = process.platform === "linux" ? "/dev/stdin" : "C:/Users/momo1/Desktop/algorithm/data/BOJ19942.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(line => line.trim());

/**
 * BOJ 19942 - 다이어트
 * 
 * 문제 분석:
 * - 식재료 개수의 최대는 15개
 * - 15개의 식재료에서 가능한 모든 조합의 수: 2^15 - 1 = 32,767가지
 * - 따라서 브루트포스로 모든 조합 탐색 가능
 */

// 상수 정의
const NUTRITION_COUNT = 4; // 단백질, 지방, 탄수화물, 비타민
const COST_INDEX = 4;
const IMPOSSIBLE_COST = 10000;

// 입력 파싱
const ingredientCount = parseInt(input[0]);
const requiredNutrition = input[1].split(" ").map(Number);
const ingredients = [[0, 0, 0, 0, 0]].concat(
    input.slice(2).map(line => line.split(" ").map(Number))
);

// 상태 관리 객체
const state = {
    selectedIngredients: new Set(),
    currentNutrition: [0, 0, 0, 0],
    currentCost: 0,
    minCost: IMPOSSIBLE_COST,
    bestCombination: null
};

/**
 * 현재 영양 상태가 목표치를 만족하는지 확인
 */
function isNutritionGoalMet() {
    return state.currentNutrition.every((nutrition, index) => 
        nutrition >= requiredNutrition[index]
    );
}

/**
 * 식재료를 추가하고 상태 업데이트
 */
function addIngredient(index) {
    state.selectedIngredients.add(index);
    
    for (let i = 0; i < NUTRITION_COUNT; i++) {
        state.currentNutrition[i] += ingredients[index][i];
    }
    state.currentCost += ingredients[index][COST_INDEX];
}

/**
 * 식재료를 제거하고 상태 복원 (백트래킹)
 */
function removeIngredient(index) {
    state.selectedIngredients.delete(index);
    
    for (let i = 0; i < NUTRITION_COUNT; i++) {
        state.currentNutrition[i] -= ingredients[index][i];
    }
    state.currentCost -= ingredients[index][COST_INDEX];
}

/**
 * 최적 해 업데이트
 */
function updateBestSolution() {
    state.minCost = state.currentCost;
    state.selectedIngredients.delete(0); // 더미 인덱스 제거
    state.bestCombination = Array.from(state.selectedIngredients).sort((a, b) => a - b);
}

/**
 * 백트래킹으로 최소 비용 조합 탐색
 * @param {number} startIndex - 탐색을 시작할 식재료 인덱스
 */
function findMinimumCost(startIndex) {
    // 현재 식재료 추가
    addIngredient(startIndex);
    
    // 가지치기: 현재 비용이 이미 최소 비용을 초과하면 탐색 중단
    if (state.currentCost >= state.minCost) {
        removeIngredient(startIndex);
        return;
    }
    
    // 목표 영양 달성 여부 확인
    const goalMet = isNutritionGoalMet();
    
    if (goalMet) {
        // 목표를 달성했고 비용이 더 적으면 최적해 갱신
        updateBestSolution();
    } else {
        // 목표 미달성 시 다음 식재료들을 추가로 탐색
        for (let nextIndex = startIndex + 1; nextIndex <= ingredientCount; nextIndex++) {
            findMinimumCost(nextIndex);
        }
    }
    
    // 백트래킹: 현재 식재료 제거
    removeIngredient(startIndex);
}

// 탐색 시작 (인덱스 0은 더미)
findMinimumCost(0);

// 결과 출력
if (state.minCost < IMPOSSIBLE_COST) {
    console.log(state.minCost);
    console.log(state.bestCombination.join(" "));
} else {
    console.log(-1);
}