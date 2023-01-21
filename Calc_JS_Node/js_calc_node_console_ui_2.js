//This example is from - https://gist.github.com/benderham/51931fe1a918bdb66875
//Node console calc with UI choices

var readline = require('readline-sync');

var Calculation = function(num1, num2, op) {
  this.x = parseInt(num1);
  this.y = parseInt(num2);
  this.op = op;

  this.result = function() {
    var x = this.x;
    var y = this.y;
    var op = this.op;

    if (op === "+") {
      var result = x + y;
    } else if (op === "-") {
      var result = x - y;
    } else if (op === "/") {
      var result = x / y;
    } else if (op === "*") {
      var result = x * y;
    } else if (op === "%") {
      var result = x % y;
    } else {
      var result = "Error!"
    }

    console.log("Result: " + result);
  };
}

var num1 = readline.question("Please enter a number: ");
var num2 = readline.question("Please enter another number: ");
var op = readline.question("Please enter an operator: ");

var calc = new Calculation(num1, num2, op);

calc.result();