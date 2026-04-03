/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    if (s.length === 0 || s[0] === '0') return 0;

    let prev2 = 1;
    let prev1 = 1;

    for (let i = 2; i <= s.length; i++) {
        let curr = 0;

        let oneDigit = parseInt(s.substring(i - 1, i));
        if (oneDigit >= 1) {
            curr += prev1;
        }

        let twoDigits = parseInt(s.substring(i - 2, i));
        if (twoDigits >= 10 && twoDigits <= 26) {
            curr += prev2;
        }

        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
};