/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} disappear
 * @return {number[]}
 */
var minimumTime = function(n, edges, disappear) {
    //adj list
    const graph = Array.from({length: n}, ()=>[])
    for (let [u,v,w] of edges) {
        graph[u].push([v,w]) //node, time or cost
        graph[v].push([u,w])
    }

    //code logic
    //min heap
    const heap = new MinPriorityQueue(x => x[0])
    heap.enqueue([0,0])
    //distance array
    const seconds = Array(n).fill(Infinity)
    seconds[0] = 0 // dist from 0 to itself is 0 // dist in terms of seconds.

    while (!heap.isEmpty()) {
        const [time,node] = heap.dequeue()
        
        //skip elements that's not optimal or in other words cleaning up the heap.
        if (time > seconds[node]) continue; // if current time is > than the time we already took to reach this nextNode, skip the current node.
        for (let [nextNode, weight] of graph[node]) {
            const newTime = time + weight

            if (newTime < seconds[nextNode] && newTime < disappear[nextNode]) {
                seconds[nextNode] = newTime
                heap.enqueue([newTime, nextNode])
            }
        }
    }

    for (let i = 0; i < seconds.length; i++) {
        if (seconds[i] === Infinity) seconds[i] = -1
    }

    return seconds
    
};