#Module 0: Javascript Functions

 JavaScript has no relation to Java, it simply piggy backed off the popularity of Java during the 90's. The great thing about JavaScript (and most object oriented languages) is that the language skills you develop while writing code end up transcending language barriers. You can use the object-oriented abstraction and apply it to other languages such as Java, JavaScript, C#, C++, Python, PHP, Ruby and Objective-C for example.
 
In JavaScript, functions are the primary work horses of the language. They are roughly equivalent to **methods** in Java. Functions in JS are actually **Function Objects**. When you declare a function like this: 

```js
// a. function declaration
var sum = function(a,b) {
	return a+b;
};
// b. function expression (equivalent to a.)
function sum(a,b) {
	return a+b;
}
```
You're actually creating an object of type Function. Your new function,  `sum`, is a Function Object. All Objects in JS have what is called a **prototype** object. Formally, JS implements **prototypal inheritance**; meaning when you create a Object, you inherit all of the functions and properties defined in the **prototypal chain** describing that Object. 

```js
// sum --> Function.prototype --> Object.prototype --> null
// null represents the end of the prototypal chain.
```

Because you've created `sum`, which has the type *Function*, you now inherit all of the methods and properties defined on Function's prototypal chain. This includes Object.prototype because Function inherits from Object.  For example:

```js
sum.length 
// outputs 2 - The length property specifies the number of arguments expected by the function. Its defined on Function.prototype
sum.hasOwnProperty()
// outputs false - hasOwnProperty is defined in Object.prototype. You have access to it because sum inherits from Object.prototype
```

###Task 1: write a couple functions
---

1. Open a new tab in your browser and navigate to the URL `http://127.0.0.1:3000/intern`. You should land on the page that says, "Hello, Costco Intern!"

2. Go into the folder structure **HowToJavaScript** and find `intern.js` here: `~\Desktop\HowToJavaScript\js\intern.js`. Also, find  `intern.html` here: `~\Desktop\HowToJavaScript\views\intern.html`. Open these in your favorite text editor. I love *Sublime Text* and *Notepad++*. You can easily google and get one of these editors.

3.   Below the comments in `intern.js`, define a couple functions that
	
	**a.** Sum a series. Write a function that takes a single argument, an integer **n**, and successively sums the series of numbers (beginning with 0) up until **n**. 
	```js
	// example output: sum(5) = 0+1+2+3+4+5 = 15
	```
		
	**b.** Sum only odd numbers. Write a function that takes a single argument, an integer **n**, and successively sums the odd series of numbers (beginnign with 0) up until **n**.
	```js
	// example output: sum(5) = 0+1+2+3+4+5 = 9
	```
	
4. Test your functions by refreshing the page in your browser (url is `http://127.0.0.1:3000/intern`). Hit F12 in Google Chrome. This opens the Chrome Developer Tools. Now press `Ctrl+P` and type `intern.js`. Select this file and see your new functions defined in the interpreter. If the `console` (a place to type and call code) isn't open, in the top right, click `open drawer` and the `console` should appear. Type the name of your function and a give it a parameter:

	```js
	kurtsSum(5) // = 15
	```
	
###Task 2: move your functions into their own namespace
---

A namespace collision happens when a script happens to have the same name for an Object that a different script that you've loaded has.

```js
// from script1.js
var work = function() { 
	// do some work
}

// from script2.js
var work = function() {
	// do some work
}

// namespace collision of the Function Object work between script1.js and script2.js. The interpreter may pick the wrong function when you call work();
```
Namespace collisions are a real hazard in a modern web application. We can limit these potential hazards by giving a unique namespace to a cohesive body of work. This effectively becomes a **module**. Costco's implementation of a modular pattern in its mobile project not only stops namespace collision but increases portability, readability, and gives a logical structure to a body of work.

```js
var SumModule = {
	sumOfSeries : function(n) {
		// sum the series 0..n
	},
	sumOddNumbers : function(n) {
		// sum the odd series 0..n
	}
}
```
This represents a **object literal** module pattern. We can now call our functions like this:

```js
SumModule.sumOfSeries(5) // outputs 15
```
This is a logical structure for a module that has the functionality of summing a series of numbers in different ways.  The `{}` defines an Object. You can define properties on this Object. You can access these properties by using the reference `SumModule` and period `.`, followed by the name of the property you'd like to access.

1. Move your functions into a object literal module with a unique namespace.

2. In the Chrome Dev Tools, call your functions using the module that you made.
