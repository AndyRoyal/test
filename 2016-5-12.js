函数式记
1》首先，我认为有必要去学会功能 分解 拆分，从而帮助我们快速的入门函数式编程风格与思想，
2》不限定参数个数，真正执行时，是所有的参数都传完的时候，
没传完时，返回的是一个函数（等待参数的函数）[待运行函数]
3》pipe是从前往后依次执行
var f = R.pipe(Math.pow,R.negate,R.inc);
f(3,4);//-80
将这个pipe存入一个变量，是方便调用时传参数
等同于
 R.pipe(Math.pow,R.negate,R.inc)(3,4);//-80

传几个参数取决于pipe中或其他函数中，第一个参数函数支持只个参数，比如，上面的例子，Math.pow只支持两个参数，无论你传入多少个参数，结果都是会调前两个参数，而其他的多传的参数会被无视，
-->另外是否报错，取决于第一个参数函数的实现
4》功能的分解 与 函数的组合
 0到100之间的偶数相加，用Pipe实现{pipe是必须传三个参数吗？}，拆分：
R.filter(过滤函数，被过滤的数组或对象)
R.filter(isEven,R.range(0,100));

第一步：R.filter(function isEven(n){return n%2===0},R.range(0,100));//得到数组
第二步：
var fn=R.pipe(R.range,R.filter(function(a){return a%2==0}),R.reduce(R.add,0));
fn(1,100)//2450
或者
var fn=R.pipe(R.range(R.__),R.filter(function(a){return a%2==0}),R.reduce(R.add,0,R.__));
fn(1,100)//2450
——————
var fn=R.pipe(R.range(0,100),R.filter(function(a){return a%2==0}),R.reduce(R.add,0));
fn(1,100)  //这样写会报错，pipe必须在最后传入参数函数的参数，如果在第一个参数函数就传入参数，第一个参数函数，将不在是函数，便会报错，
pipe要求三个参数必须都为函数
——————

5》function isOdd(n){ return n%2 ===1};//取奇数
function isEven(n){ return n%2 ===0};//取偶数

6》R.reject(过滤函数，被过滤的数组或对象);
//过滤后剩余的值

7》R.replace(替换为此str或正则，被替换的str, 被操作的str);
原生JS的str.replace("被替换的str","替换为此str")//后者替换前者
8》为方便组合参数，提供了R.__占位符，只能占 一个参数位，等待参数传完
If g is a curried ternary function and _ is R.__, the following are equivalent:

g(1, 2, 3)
g(_, 2, 3)(1)
g(_, _, 3)(1)(2)
g(_, _, 3)(1, 2)
g(_, 2, _)(1, 3)
g(_, 2)(1)(3)
g(_, 2)(1, 3)
g(_, 2)(_, 3)(1)

9》R.add(a,b)只支持传入两个参数，多传直接忽视

10》R.map(重复调用函数，被操作的数组或对象),
//对于数组/对象中的每个值进行，同样的处理

11》关于是否写R.__
var fn=R.pipe(R.range(R.__,R.__),R.filter(function(a){return a%2==0}),R.reduce(R.add,0,R.__));
这个为何加不加都 可
R.range 和 R.range(R.__,R.__) 是一样的
R.reduce(R.add,0) 和R.reduce(R.add,0,R.__) 是一样的
说这个R.__其实用不到了
除非是在g(_, 2, _)(1, 3)的情况

12》编程就像做数学题，通过已知的数据，通过运算处理，得到你想要的数据

13》lodash函数式库，它以链式、惰性求值著称，形成了一套自有的DSL风格

14》函数式思想展现的是一种纯粹的数学思维。函数并不代表任何物质（对象，相对于面向对象思想而言），而它仅仅代表一种针对数据的转换行为。一个函数可以是原子的算法子（函数），也可以是多个原子算法子组成的组合算法子。它们是对行为的最高抽象，具有非凡的抽象能力和表现力。




