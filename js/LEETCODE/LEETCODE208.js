/**
 * trie (prefix tree) 는 key 의 효율적인 저장과 조회를 위한 자료구조이다.
 * 이를 이용한 단어 자동 완성, 스펠체크 등의 어플리케이션이 있다.
 * 
 * 아래의 요청에 맞게 Trie 클래스를 구현하라.
 * - Trie() 를 통해 trie 객체를 초기화한다.
 * - void insert(String word) : trie 에 문자열 word 를 삽입한다.
 * - boolean search(String word) :
 *   문자열 word 가 trie 안에 존재하는 경우(삽입되었던 경우) true, 아니면 false
 * - boolean startsWith(String prefix) : 
 *   삽입된 문자열 중 문자열 prefix 로 시작하는 문자열이 있는 경우 true, 아니면 false
 * 
 * trie 에 저장된 문자열 word 의 길이, prefix 문자열의 길이 : [1, 2000]
 * word 와 prefix 는 모두 소문자
 * insert, search, startsWith 요청 횟수의 최대는 총합 30000 회
 */
var Trie = function() {
    // <String, Boolean> - prefix, isWord
    this.prefixMap = new Map();
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let prefix = "";
    for (const ch of word) {
        prefix += ch;
        if (prefix !== word) {
            if (!this.prefixMap.has(prefix)) this.prefixMap.set(prefix, false);
        } else {
            this.prefixMap.set(prefix, true);
        }
    }
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    return !!this.prefixMap.get(word);
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return this.prefixMap.has(prefix);
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
 var obj = new Trie()
 obj.insert(word)
 var param_2 = obj.search(word)
 var param_3 = obj.startsWith(prefix)