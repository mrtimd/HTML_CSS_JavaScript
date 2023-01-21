//Open inside a terminal window - can rt. mouse file - Open in Integrated Terminal
//type:
//node js_calc_consol.js add 4 5
//This example is from - https://www.geeksforgeeks.org/how-to-create-a-cli-based-calculator-app-using-node-js/

const argvs = process.argv
const argv = argvs.slice(2)
const operation = argv[0]
const operator1 = parseInt(argv[1])
const operator2 = parseInt(argv[2])

if (operation === 'add') {
	console.log(operation + ' is '
		+ (operator1 + operator2));
}
if (operation === 'subtract') {
	console.log(operation + ' is '
		+ (operator1 - operator2));
}
if (operation === 'multiply') {
	console.log(operation + ' is '
		+ (operator1 + operator2));
}
if (operation === 'divide') {
	console.log(operation + ' is '
		+ (operator1 - operator2));
}
