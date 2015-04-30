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
// outputs 2 - The length property specifies the 
// number of arguments expected by the function. 
// Its defined on Function.prototype
sum.hasOwnProperty()
// outputs false - hasOwnProperty is defined in 
// Object.prototype. You have access to it because 
// sum inherits from Object.prototype
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

#Module 1: Get your ass-ets over here.

"A **content delivery network** (**CDN**) is a system of distributed servers (network) that deliver webpages and other Web content to a user based on the geographic locations of the user, the origin of the webpage and a content delivery server." -Google
 
Google is sweet. We all know this. Google provides their own CDN for delivering commonly used assets to web developers. The above quote explains what a CDN is in a nutshell. Typically a server that is part of a CDN is *specialized* in delivering static assets. 

Why would I want a file from somebody elses server? Simply put, requesting a resource from somebody else's web server means less work for your own web server. We're all about saving bandwidth in the web application business. It means less CPU usage, less third party's charge for caching, and ultimately, faster web applications. 

Lets look at some common assets (CSS and JavaScript files) provided by Google:

Everybody and their mother uses this CDN asset: jQuery.
https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js

If you click on the above link, you'll make a request to Google's ajax subdomain ajax.googleapis.com asking for the script `jquery.min.js`. Google will return the minified script as the response and you can then leverage a really nifty library known as jQuery. 

For good measure, here is a CSS file (Cascading Style Sheet) from a different CDN provider:
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css

Similarly, when you click on this link, maxcdn returns you the CSS file you requested as a minified CSS file.

What happens when you can't reach a remote file like the above two? Well, its good practice to keep a local copy that your own web server can serve to the user in case Google's URL breaks.  Typically a static file's relative path look something like this: `HowToJavaScript/js/intern.js`. `/js/` designates the JavaScript directory that we keep all of our JavaScript organized in.

###Task 1: dynamically retrieving CSS from a CDN using JavaScript.
---

So our `intern.html` page looks pretty ugly, right? We need to fetch the styles sheet (CSS) to support the front end framework we're leveraging named *Twitter Bootstrap*. Twitter Bootstrap was developed by.. Twitter developers and it offers a beautiful user interface (UI) for stylistically challenged developers like me. We have the proper HTML attributes in place, we just need the CSS and JavaScript. First the CSS, though.

There are a couple of ways of doing this. Typically people like to include CSS directly in the `<head>` element of their HTML like this:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
```

This is totally fine to do. When the HTML gets rendered by the browser, the styles will be included and things will look pretty. One small problem. This is a sort of speed bump that the browser has to get over before getting to the point where it tells our scripts: "Hey, I'm ready for you to manipulate me." (That's not weird, right?). The faster we can produce the document object model (the interpreted tree generated by the browser reading the HTML) to our scripts, the faster the speed of our web application. On top of the speed, Google will score your page higher based on this concept alone.

Although we don't do this on Costco.com/.ca, we're going to do it for our project. I'll go through using native JavaScript to dynamically fetch a file that doesn't block the rendering process.

1. We need a function.
	```js
	// write this intern.js
	// boilerplate empty function declaration with two parameters: source and type
	function getFile(source, type) {
	
	}
	```	

2. We need the endpoint URL to the CDN asset that we want. In this case, its the bootstrap CSS file. The endpoint is `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css`.

3.  Define the body of the function.
	```js
	function getFile(source, type) {
		// document.createElement creates a element of a specific tag
		// In this case, we need a `link`.
		var element = document.createElement('link');
		
		// Head is a reference to the <head> tag in the DOM.
        var head = document.getElementsByTagName('head')[0];

		// Set the link element's type attribute to 'text/css' 
        element.type = 'text/css';

		// Set the link element's rel attribute to 'stylesheet'
        element.rel = 'stylesheet';

		// Set the link element's href attribute to `source` argument
		// which is a dynamic parameter set when calling our function.
        element.href = source;

		// Append (or insert) this element into the <head>
        head.appendChild(element);	
	}
	```
	Sweet. You've essentially created a dynamic way of retrieving a CSS file from a `source` without blocking the rendering of the page

4. Now we need to call our function using the CDN resource from step 2. Go to your workspace: `http://127.0.0.1:3000/intern` and refresh. Find our function by typing `CTRL+P` and then `intern.js`. You should see it defined. Now call the function from the `console`:
	```js
	getFile('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css');
	```
Now that's a little better! The page doesn't look so newb anymore but its not perfect. If you `Right Click` and `Inspect Element`, find the `<head>` element and look closely you'll see that you've successfully allocated a style sheet. You should see this in the head:
	```html
	<link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	```
This bootstrap template requires some more CSS not located in the CDN resource. The local file is located at: `HowToJavaScript/css/cover.css`. We need the file `cover.css` as well. Lets use our function
	```js
	getFile('/css/cover.css');
	```
Damn, that's pretty.

###Task 2: dynamically retrieving JavaScript from a CDN using JavaScript.
---

Now that we have a pattern for retrieving CSS using our `getFile` function, lets reuse the same function to retrieve some JavaScript from a CDN.  Let's just go ahead and get jQuery. jQuery is a framework for *querying* the DOM using less characters in our code. For example:

```js
// Native JavaScript
var element = document.getElementById('someElementId');
```
Compare this to:

```js
// Using the jQuery framework
var element = $('#someElementId');
```

The jQuery **selector** `$('')` is a powerful abstraction that can significantly reduce the amount of code a developer has to write to achieve something. The above example is trivial, however, because it doesn't really demonstrate the power of jQuery. Here's some HTML:

```html
<div>
	<ul class='list'>
		<li>Chuck Norris</li>
		<li>Bruce Lee</li>
	</ul>
</div>
```
The above data structure represents an unordered list of the names "Chuck Norris" and "Bruce Lee". Say I want to do something dumb like create a function that retrieves the names. I'll demonstrate this using native JavaScript and jQuery.

```js
// Native JavaScript function to return the names as an array that can be used later
function getNames(className) {
    var classList = document.getElementsByClassName(className);
    var names = [];
    for (var i = 0; i < classList.length; i++) {
        var listItems = classList[i].children;
        for (var j = 0; j < listItems.length; j++) {
            names.push(listItems[j].innerHTML);
        }
    }
    return names;
}
getNames('list'); // returns an array of strings ["Chuck Norris", "Bruce Lee"]
```

Here you have a loop and a nested loop to do the simple task of retrieving those values. Compare that with the jQuery equivalent:

```js
// jQuery implementation of the same function
function getNames(className) {
	var names = [];
	$('.'+className+' li').each(function(i, elem) {
		names.push(elem.innerHTML);
	});
	return names;
}

```

The jQuery selector allows you to select put the `li` element (the descendent of `<ul class='list'>`) directly in the selector aka `$('.list li')`. So you immediately have access to the list items. There is no need for the nested loop to retrieve the `li` elements.

So why would you ever want to write native JavaScript? Because it executes **MUCH** faster! Fan boys will always argue readability of code and the expressivity jQuery offers over writing native JavaScript. They're right and wrong. Readability and expressivity are important, but so is performance. The end user is not a developer.

I'm one of those weird elitists who likes performance, however, I'll admit that learning JavaScript can more easily be learned by learning jQuery. So lets get it.

1. Refactor your `getFile(source, type)` function from the previous file to accept a type of either `'css'` or `'script'`. You'll need to use a Boolean conditional operator to check the value of the parameter `type` and adjust your code accordingly.

2. Now that your function is ready to append a script to the `<head>`, include jQuery using this CDN endpoint https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js.

3. Write a function, `changeLead(text)` using the jQuery selector to change the lead text inside `intern.html` from `Will you please style me? I feel so naked without my styles.` to `I have my styles now, I'm so comfy and warm`.

4. Create a Object Literal Module to encapsulate your `getFile` and `changeLead` functions. Call the Object `DOMUtils`. Experiment calling your `changeLead` function from the `DOMUtils` module.

#Module 2: Dependencies and Load Order

This module will discuss the importance of loading JavaScript assets in the right order based on their dependencies. A JavaScript dependency means that your script is *dependent* on a particular JavaScript asset to be loaded before running correctly. This is an important thought to keep in your mind while you develop your application as having access to your dependencies is essential.

So far our `intern.js` file should look something like this:

```js
var SumModule = {
	sumSeries : function(n) {
		var total = 0;
		for (var i = 0; i <= n; i++) {
			total += i;
		}
		return total;
	},
	sumOddSeries : function(n) {
		var total = 0;
		for (var i = 0; i <= n; i++) {
			if (i % 2 == 1) {
				total += i;
			}
		}
		return total;
	}
}
var DOMUtils = {
	getFile : function(source, type) {
	    var head = document.getElementsByTagName('head')[0],
		    element = null;
		if (type == 'css') {
		    element = document.createElement('link'); 
		    element.type = 'text/css';
		    element.rel = 'stylesheet';
		    element.href = source;
		} else {
			element = document.createElement('script');
			element.src = source; 
		}
		head.appendChild(element);  
	},
	changeLead : function(text) {
		$('#lead-text').html(text);
	}
}
```

Can you spot the dependency? Because the `changeLead` function leverages jQuery, it is *dependent* on jQuery being loaded to your page before it can be executed. So what do we do? The simple answer is to *not* use jQuery but that's slightly naive to assume you'll not need to use it. Especially if you're coming onto Costco (or some other company) that does leverage jQuery. Lets make a small loader function that can load all of our assets in the proper order.

###Task 1: Create a loader for loading our dependencies
---
An **Array** in JavaScript is a data structure that can hold a series of multi-value elements. We make arrays in a couple of different ways.
```js
// Using the Array constructor - looks similar to Java
var coolDudes = new Array("Chuck Norris", "Bruce Lee");

// Using Array literal notation - equivalent to the above; just short hand
var coolDudes = ["Chuck Norris", "Bruce Lee"];

// Implicitly creating an array - the function `split` returns an array.
var stringOfDudes = "Chuck Norris-Bruce Lee";
var coolDudes = stringOfDudes.split('-');
```

We need to define a new function that we can call when we arrive at our web application (`intern.html`). I'm sick of having to call our function `getFile` every time I want to look at our pretty version of `intern.html`. 

1. Define a function on `DOMUtils` called `loadAssets(assets)` that accepts an array of objects that will represent our list of  assets that we need to load.

	```js
	loadAssets : function(assets) {
		// get our assets
	}
	```
		
We need to once again refactor our `getFile` function so that it accepts an **Event Listener**. *Events* are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events. We're going to leveraging the native function, `document.addEventListener` to attach a "onload" event to the assets we dynamically fetch with our `getFile` function.

In this context, we need to make sure that jQuery is loaded before we do anything that involves calling the `changeLead` function as part of our script.  Refactor your `getFile` function to accept a **callback** function and to use `document.addEventListener`.

```js
// Delta (change) to parameters list
getFile : function(source, type, callback) { 
    var head = document.getElementsByTagName('head')[0],
	    element = null;
	if (type == 'css') {
	    element = document.createElement('link'); 
	    element.type = 'text/css';
	    element.rel = 'stylesheet';
	    element.href = source;
	} else {
		element = document.createElement('script');
		// Delta - adding load event if the callback gets passed.
		if (typeof callback !== 'undefined') {
			element.addEventListener('load', callback); 
		}
		element.src = source; 
	}
	head.appendChild(element);  
}
```

"A callback function, also known as a higher-order function, is a function that is passed to another function (let’s call this other function “otherFunction”) as a parameter, and the callback function is called (or executed) inside the otherFunction. A callback function is essentially a pattern (an established solution to a common problem), and therefore, the use of a callback function is also known as a callback pattern." -javascriptissexy.com

So this essentially sums up what we're doing with the *callback function*. We're literally calling our function `getFile` with three parameters: `source`, a string, `type`, a string, and `callback`, which is a function. The callback function will get executed when the asset we've allocated into the `<head>` tells us, "Hey I'm done loading".

Naturally we'll have to define the callback. Define it on the `DOMUtils` module.

```js
// We execute this function on the load event of an asset
// We it fires, we're safe to execute our jQuery dependent function.
jQueryLoaded : function() {
	DOMUtils.changeLead("I have my styles now, I'm so comfy and warm");
}
```

Now lets go back to our `loadAssets` function. We're going to pass an array of objects representing our assets to this guy. We know the parameter `assets` is an Array because we're defining it that way. We can then use functions on the `Array.prototype` Object to help us. In this instance, we'll use a **`forEach`** function on the `asset` array. Its really just shorthand for using a **for loop**.

```js
loadAssets : function(assets) {
	assets.forEach(function(assetObj) { 
		DOMUtils.getFile(assetObj.source, assetObj.type, assetObj.callback);
	});
}
```
So how do we use this function? Well, remember `loadAssets` is going to take an *Array of Objects* which means it'll have a structure like this:

```js
var assets = 
	[
		{source: 'cdn endpoint', type: 'script or css', callback: DOMUtils.jQueryLoaded},
		{source: 'cdn endpoint', type: 'script or css', callback: undefined},
		... // more objects if we need them
	]
```
We can create a variable called `assets` like the above or we can just call our function with the above data structure straight in our function's parameter. Finally.. lets load our assets. As a rule of thumb, I like to load my CSS assets vendor first. Meaning I load the Twitter Bootstrap CSS and then followed by my own CSS. This ensures that any customization in the styles of my application get rendered correctly.

We wont apply a callback to any other resource aside from the jQuery one, which is the only one we really care about. Its the only dependency. Call this function at the bottom of your last line in `intern.js`. 

```js
DOMUtils.loadAssets([
	{ 
		source : "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
		type : "css",
		callback: undefined
	},
	{
		source : "/css/cover.css",
		type : "css",
		callback: undefined
	},
	{
		source : "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
		type : "script",
		callback : DOMUtils.jQueryLoaded
	}
]);
``` 
Now every time you refresh, you should see your pretty `intern.html` page without having to call `getFile` manually for each asset.
