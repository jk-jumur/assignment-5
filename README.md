1. Difference Between var, let, and const
var


var is the old way to declare variables in JavaScript.


It can be declared again with the same name.


Its value can be changed.


var name = "Rahim";var name = "Karim";name = "Sakib";

let


let is used in modern JavaScript.


It cannot be declared again with the same name.


Its value can be updated.


let age = 20;age = 25;

const


const is used when the value should not change.


After declaring, the value cannot be updated.


const country = "Bangladesh";
This will show an error:
country = "Japan";

2. What is the Spread Operator (...)?
The spread operator is used to copy or combine arrays and objects.
Example with Array
const numbers = [1, 2, 3];const newNumbers = [...numbers, 4, 5];console.log(newNumbers);
Output
[1, 2, 3, 4, 5]

Example with Object
const user = {  name: "JK",  age: 22};const newUser = {  ...user,  country: "Bangladesh"};

3. Difference Between map(), filter(), and forEach()
map()


map() runs a function on every element of an array.


It returns a new array.


const numbers = [1, 2, 3];const result = numbers.map(num => num * 2);console.log(result);
Output
[2, 4, 6]

filter()


filter() selects elements based on a condition.


It returns a new array.


const numbers = [1, 2, 3, 4];const result = numbers.filter(num => num > 2);console.log(result);
Output
[3, 4]

forEach()


forEach() is mainly used for looping through an array.


It does not return a new array.


const numbers = [1, 2, 3];numbers.forEach(num => {  console.log(num);});

4. What is an Arrow Function?
An arrow function is a shorter way to write functions in JavaScript.
Normal Function
function add(a, b) {  return a + b;}
Arrow Function
const add = (a, b) => {  return a + b;};
Short Version
const add = (a, b) => a + b;

5. What are Template Literals?
Template literals are used to write strings more easily and include variables inside strings.
Backticks ( `` ) are used instead of quotes.
const name = "JK";const text = `My name is ${name}`;console.log(text);
Output
My name is JK
Template literals also support multi-line strings.
const message = `Hello
How are you?`;