// 定义promise 类

class MyPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(exec) {
        this.promiseState = MyPromise.PENDING;
        this.promiseResult = null;
        this.onFulfilledCallback = []; // 成功的回调
        this.onRejectedCallback = []; // 失败的回调
        // 处理异常
        try {
            exec(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result) {
        if (this.promiseState == MyPromise.PENDING) {
            this.promiseState = MyPromise.FULFILLED;
            this.promiseResult = result;
            this.onFulfilledCallback.forEach(callback => {
                callback(result);
            })
        }
    }
    reject(reason) {
        if (this.promiseState == MyPromise.PENDING) {
            this.promiseState = MyPromise.REJECTED;
            this.promiseResult = reason;
            this.onRejectedCallback.forEach(callback => {
                callback(reason);
            })
        }
    }
    then(onFulfilled, onRejected) {
        // 处理参数情况
        // typeof onFulfilled === 'function' ? onFulfilled : value => value;
        // typeof onRejected === 'function' ? onRejected : reason => {
        //     throw reason;
        // };
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.promiseState == MyPromise.PENDING) {
                this.onFulfilledCallback.push(
                    setTimeout(() => {
                        try {
                            if(typeof onFulfilled !== 'function') {
                                resolve(this.promiseResult)
                            } else {
                                let x = onFulfilled(this.promiseResult);
                                resolvePromise(promise2, x, resolve, reject)
                            }
                           
                        } catch (error) {
                            reject(error)
                        }
                    })
                );
                this.onRejectedCallback.push(
                    setTimeout(() => {
                        try {
                            if(typeof onRejected !== 'function') {
                                reject(this.promiseResult)
                            } else {
                                let x = onRejected(this.promiseResult);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
                );
            }
            else if (this.promiseState == MyPromise.FULFILLED) {
                // 处理异步
                setTimeout(() => {
                    try {
                        if(typeof onFulfilled !== 'function') {
                            resolve(this.promiseResult)
                        } else {
                            let x = onFulfilled(this.promiseResult);
                            resolvePromise(promise2, x, resolve, reject)
                        }
                       
                    } catch (error) {
                        reject(error)
                    }
                })

            }
            else if (this.promiseState == MyPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        if(typeof onRejected !== 'function') {
                            reject(this.promiseResult)
                        } else {
                            let x = onRejected(this.promiseResult);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })
    }

}
function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        throw new TypeError('循环引用')
    }

    if(x instanceof MyPromise) {
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject)
        }, reject)
    }
}

module.exports = MyPromise