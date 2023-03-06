// https://leetcode.cn/problems/climbing-stairs/
/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 */

/**
 * 递归解法
 *
 */
let map = new Map(); // 
function climbStairs(n) {
    if(n == 1) return 1;
    if(n == 2) return 2;

    
    if(map.get(n)) {
        return map.get(n)
    } else {
        let res = climbStairs(n - 1) + climbStairs(n - 2);

        map.set(n, res);
        return res;
    }
}

/**
 * 非递归
 */

function climbStairs2(n) {
    if(n <=2){
        return n
    } else {
        for(let i = 3; i<= n; i++) {
            res = n1+ n2;

            n1 = n2;

            n2 = res;
        }

        return res;
        

    }


}