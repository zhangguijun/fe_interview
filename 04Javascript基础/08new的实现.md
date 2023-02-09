上一篇文章我们在讲this指向说到new绑定。

一句话介绍new：

```
    new运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一。
```
举个例子：

```
    function Person(name, age) {
        this.name = name;
        this.age = age;

        this.habit = 'games';
    }

    Person.prototype.strength = 60;

    Person.prototype.sayYourName = function () {
        console.log('I am' + this.name);
    }

    var person = new Person('gege', 28);

    console.log(person.name) // gege
    console.log(person.habit) // games
    console.log(person.strength) // 60

    person.sayYourName();// I am gege
```
从这个例子中， 我们可以看到，实例person可以：
1. 访问Person构造函数的属性
2. 访问到Person.prototype的属性

### 初步实现
因为new的结果是一个新对象， 所以在模拟实现的时候， 我们也要建立一个新对象， 假设这个对象叫obj,
因为obj 会具有Person构造函数里的属性， 想想经典继承的例子，我们可以使用Person.apply(obj, arguments)来给obj 添加新属性。
// 第一版代码
```
    function objectFactory() {
        var obj = new Object();
        
    }
```