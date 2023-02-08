JavaScript代码执行一段可执行代码（executable   code），会创建执行上下文， 这个执行上下文会包含三部分
1. 变量对象（variable object, vo）
2. 作用域链（scope chain）
3. this

函数的this在调用的时候绑定的， 完全取决于函数的调用位置（函数的调用方法）。 为了搞清楚this指向是什么， 必须知道函数是如何调用的


### 普通函数调用模式
```
   function foo () {
     console.log(this)
   }
   foo();// window
```
这种直接调用方式this指向全局对象，如果是在浏览器里就是指向window

### 对象上下文
```
function foo() {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo: foo
}
obj.foo(); // 2
```
foo 虽然定义在全局作用域， 但是调用的时候obj上下文引用，可以理解在foo调用的那一刻他被obj对象拥有，所以this指向obj <br/>
这里有两个问题
- 链式调用
链式调用的情况只有最后一层才会影响调用位置
```
    obj1.obj2.obj3.fn() // 这里的this指向obj3
```
- 引用丢失