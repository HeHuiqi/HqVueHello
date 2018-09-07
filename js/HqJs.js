


/*
    要在函数体后面加括号就能立即调用，则这个函数必须是函数表达式，不能是函数声明。
   （）、！、+、-、=等运算符，都将函数声明转换成函数表达式,
    加括号是最安全的做法，因为！、+、-等运算符还会和函数的返回值进行运算，有时造成不必要的麻烦
    只有函数表达式才能调用()立即执行,
*/

//立即执行函数1,使用 () 运算符,可以将匿名函数转为函数表达式
(function () {
    var str = "立即执行函数1";
    // alert(str);
    console.log(str);
})();


//立即执行函数2,使用 () 运算符
(function () {
    var str = "立即执行函数2";
    // alert(str);
    console.log(str);
}());

//立即执行函数3,使用 ! 运算符
!function () {
    var str = "立即执行函数3";
    // alert(str);
    console.log(str);
}();


//立即执行函数4,使用 + 运算符
+function () {
    var str = "立即执行函数4";
    // alert(str);
    console.log(str);
}();

//立即执行函数5,使用 - 运算符
-function (str) {
    // alert(str);
    console.log(str);
}("立即执行函数5");

//立即执行函数6,使用 = 运算符
var fn =function (str) {
    // alert(str);
    console.log(str);
}("立即执行函数6");


// 计算模块
(function (calculator) {
    function convert(input) {
        return parseInt(input);
    }
    calculator.add = function(a, b) {
        return convert(a) + convert(b);
    }
    window.calculator = calculator;
})(window.calculator || {});


// 新增需求
(function (calculator) {
    calculator.remain = function (a , b) {
        return a % b;
    }
    window.calculator = calculator;
})(window.calculator || {});

// alert("4+3="+calculator.add(4,3));