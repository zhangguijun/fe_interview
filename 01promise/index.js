const MyPromise = require('./promise');


// let promise1 = new MyPromise((resolve, reject) => {
//     resolve('z这次一定')
//     reject('下次一定')
// })
// console.log(promise1)


// promise1.then(res => {
//     console.log('res',res)
// }, err => {
//     console.log('err', err)
// })
// 测试代码
// console.log(1);
// let promise1 = new MyPromise((resolve, reject) => {
//     console.log(2);
//     setTimeout(() => {
//         resolve('这次一定');
//     })
// })
// promise1.then(
//     result => {
//         console.log('fulfilled:', result);
//     },
//     reason => {
//         console.log('rejected:', reason)
//     }
// )
// console.log(3);

// 测试代码
console.log(1);
let promise1 = new MyPromise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        console.log('A', promise1.promiseState);
        resolve('这次一定');
        console.log('B', promise1.promiseState);
        console.log(4);
    });
})
promise1.then(
    result => {
        console.log('C', promise1.promiseState);
        console.log('fulfilled:', result);
    },
    reason => {
        console.log('rejected:', reason)
    }
)
console.log(3);
