### call 
call() 方法在在使用一个指定的this值和若干个指定参数值的前提下调用某个函数或者方法

```
var foo = {
    value: 1
};
function bar() {
    console.log(this.value)
}

bar.call(foo) // 1
```
注意两点：
1. call 改变了this 的指向， 指向foo
2. bar函数执行了

### 第一
我们在调用call 方法的时候，把foo 对象改造成一下：
```
var foo = {
    value: 1,
    bar : function() {
        console.log(this.value)
    }
}

foo.bar();
```

这时候this 不就指向foo, 
d但是这样我们会给this添加一个属性，这可不行
我们需要使用delete 删除
1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

```
Function.prototype.call2 = function(context) {
    // bar.call(foo)  
    // 获取调用call的函数， 使用this获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

var  foo = {
    value: 1
}

function bar() {
    console.log(this.value)
}

bar.call2(foo) // 1

```