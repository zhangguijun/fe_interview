JavaScript代码执行一段可执行代码（executable   code），会创建执行上下文， 这个执行上下文会包含三部分
1. 变量对象（variable object, vo）
2. 作用域链（scope chain）
3. this

函数的this在调用的时候绑定的， 完全取决于函数的调用位置（函数的调用方法）。 为了搞清楚this指向是什么， 必须知道函数是如何调用的


### 普通函数（独立函数）调用模式
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

```
    function foo() {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        foo: foo,
    }

    var bar = obj.foo ;//  函数别名

    var a = 'xxxx';

    bar() // xxxx
```
这里的bar 其实引用了 obj.foo 的地址，即 foo 函数体， 也就是说bar 函数调用符合独立函数调用规则，所以this 不是obj <br />
`回调函数其实就是隐式丢失` <br />

更改一下上面的代码：
```
    function foo() {
        console.log(this.a)
    }
    var obj = {
        a: 2,
        foo: foo,
    }

    var a = 'xxxx';

    setTimeout(obj.foo, 200) // xxxx
```
### 显式绑定
显式绑定的说法是和隐式绑定相对的， 指的是通过 call, apply, bind 显式的更改this 指向。 <br/>
这三个方法第一个参数是this 要指向的对象。
如果你给第一个参数传一个值（字符串，布尔，数字）这个值会被转换成对象形式（new String()）

模拟bind

```
    function foo(something) {
        console.log(this.a, something)
        return this.a + something
    }

    function bind(fn, obj) {
        return function() {
            return fn.apply(obj, arguments);
        }
    }
    var obj = {
        a: 2
    }

    var bar = bind(foo, obj);

```
### new绑定
js 中new与传统面向累的语言机制不同，， js中构造函数其实与普通函数没有任何区别。
其实当我们使用new 来调用函数的时候，发生了下面的事情
- 创建一个全新的对象
- 这个新对象会执行‘原型’链接
- 这个新对象会被绑定到调用的this
- 如果函数没有对象类型的返回值， 这个对象会被返回 <br/>
详细见new 的实现


上述我们了解了函数的调用方式，来判断优先级
1. 函数如果是new出来的，this 指向实例。
2. 函数通过call apply, bind ，this 指向绑定的第一个参数
3. 函数在某个上下文中调用（隐式绑定）, this 指向上下文对象
4. 以上都不是，this 指向全局对象

### 箭头函数中的this
箭头函数不是通过function关键字定义的， 也不使用上面的this 规则， 而是继承外层作用域中的this.
虽然没有箭头函数， 我们也经常做和箭头函数一样的效果。
```
    function foo() {
        var self = this;
        setTimeout(function() {
            console.log(self)
        },100)
    }
```
