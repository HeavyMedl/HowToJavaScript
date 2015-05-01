#Table of Contents
#####[Getting Started](#getting-started)
#####[Module 0: JavaScript Functions](#module-0)
#####[Module 1: Get your ass-ets over here](#module-1)
#####[Module 2: Dependencies and Load Order](#module-2)
#####[Module 3: Synchronous vs. Asynchronous](#module-3)
#####[Module 4: The Art of Debugging](#module-4)
#####[Module 5: Asynchronous JavaScript and XML (AJAX)](#module-5)
#####[Module 6: Templating 101](#module-6)
#####[Module 7: Exposing JavaScript Object Notation (JSON)](#)
#####[Module 8: Design Patterns](#)
#####[Module 9: Memory Management](#)
#####[Module 10: Google Maps API](#)

<a name='getting-started'/>
#Getting Started

Hello! **How To JavaScript** is a free tutorial for aspiring web developers. This tutorial covers some fundamental techniques and best practices for modern web development. I've organized this tutorial into a series of modules that build on one another. Code that you write in earlier modules is utilized in later modules to simulate developing an evolving application.

 This tutorial assumes you have little to no experience writing JavaScript. I originally wrote this tutorial for Costco's incoming e-commerce interns but figured its usefulness could extend to anyone.

Before you start, you'll need some tools. Throughout this tutorial I use Google Chrome's Developer Tools. If you don't already use [Chrome](https://www.google.com/chrome/browser/desktop/), pick it up. You'll need a **text editor** for writing code. I recommend [Notepad++](http://notepad-plus-plus.org/download/v6.7.7.html), [Sublime Text](http://www.sublimetext.com/2), or the Chrome-extendable [Zed Editor](http://zedapp.org/download/). We'll be using a **web server** to generate a workspace in which you can write and test your code. Please download and install [Nodejs](https://nodejs.org/) for this.

Once you have all of these tools, follow these steps to setup your workspace and begin:

1. Download and unpack the [project's zip file](https://github.com/kurtlocker/HowToJavaScript/zipball/master) which contains the HTML, CSS, JavaScript, and web server you'll need to complete this tutorial.

2. Using the terminal (Mac, Linux) or command prompt (Window), navigate to the location of the unpacked directory. In my own workspace, this is located at `/Users/kurt/Desktop/HowToJavaScript`. Using a Windows machine, it might be `C:\Users\Kurt\Desktop\HowToJavaScript`. Use `cd` (change directory) to navigate directly to that absolute path.

3. Once inside the `HowToJavaScript` directory, use the `node` command to start the web server. Type: `node server.js` to start the server. You should see this text: 

	`HowToJavaScript server listening at http://127.0.0.1:3000`

	`http://127.0.0.1` represents your local computer. `3000` represents the port that our web server will listen to for requests. If you use Chrome to hit this URL, you'll request the HowToJavaScript home page, which is just this tutorial. Your workspace follows the route `/intern`.

4. Using your text editor, open the files `intern.html` and `intern.js`. This is where you'll do your work (`intern.js`) and see it reflected (`intern.html`).

Now that you have your web server running, your browser pointed at `http://127.0.0.1:3000/intern`, and your files `intern.js` and `intern.html` opened in your text editor, let's begin.  

<a name='module-0'/>
#Module 0: JavaScript Functions

 JavaScript has no relation to Java, it simply piggy backed off the popularity of Java during the 90's. One of great things about learning JavaScript (and similar object-oriented languages) is that the language skills you develop while writing code end up transcending language barriers. You can use the object-oriented abstraction and apply it to Java, C#, C++, Python, PHP, Ruby and Objective-C albeit a few language specific differences.
 
In JavaScript, functions are the primary work horses of the language. They are roughly equivalent to **methods** in Java. Functions in JavaScript are actually **Function Objects**. When you declare a function like this: 

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
You're actually creating an object of type Function. Your new function,  `sum`, is a Function Object. All Objects in JavaScript have what is called a **prototype** object as part of their makeup. Formally, JavaScript implements **prototypal inheritance**; meaning when you create a Object, you inherit all of the functions and properties defined on the **prototypal chain** of that Object's lineage. 

```js
// sum --> Function.prototype --> Object.prototype --> null
// null represents the end of the prototypal chain.
```

Because you've created `sum`, which has the type *Function*, you now inherit all of the methods and properties defined on Function's prototypal chain. This includes the Object.prototype object because Function inherits from Object.  For example:

```js
sum.length 
// outputs 2 - The length property specifies the 
// number of arguments expected by the function. 
// It's defined on Function.prototype
sum.hasOwnProperty()
// outputs false - hasOwnProperty is defined on 
// Object.prototype. You have access to it because 
// sum inherits from Object.prototype
```

###Task 1: Write some functions
---

1. Open a new tab in your browser and navigate to the URL `http://127.0.0.1:3000/intern`. You should land on the page that says, "Hello, Costco Intern!"

2. Go into the folder structure **HowToJavaScript** and find `intern.js` here: `~\Desktop\HowToJavaScript\js\intern.js`. Also, find  `intern.html` here: `~\Desktop\HowToJavaScript\views\intern.html`. Open these in your favorite text editor. I love *Sublime Text* and *Notepad++*. You can easily google and get one of these editors.

3.   Below the comments in `intern.js`, define a couple functions that
	
	**a.** Sum a series. Write a function that takes a single argument, an integer **n**, and successively sums the series of numbers (beginning with 0) up until **n**. 
	```js
	// example output: sum(5) = 0+1+2+3+4+5 = 15
	```
		
	**b.** Sum only odd numbers. Write a function that takes a single argument, an integer **n**, and successively sums the odd series of numbers (beginning with 0) up until **n**.
	```js
	// example output: sum(5) = 0+1+2+3+4+5 = 9
	```
	
4. Test your functions by refreshing the page in your browser (url is `http://127.0.0.1:3000/intern`). Hit `F12` in Google Chrome. This opens the Chrome Developer Tools. Now press `Ctrl+P` and type `intern.js`. Select this file and see your new functions defined in the interpreter. If the `console` (a place to type and call code) isn't opened, on the top right of the Dev Tools click `open drawer` and the `console` should appear. Type the name of your function and a give it a parameter:

	```js
	kurtsSum(5) // = 15
	```
	
###Task 2: Move your functions into their own namespace
---

A namespace collision happens when the script interpreter has duplicate variable assignments defined by one or more scripts contained within your application.

```js
// from script1.js
var work = function() { 
	// do some work
}

// from script2.js
var work = function() {
	// do some work
}

// namespace collision of the Function Object 
// work defined in scripts `script1.js` and `script2.js`. 
//The interpreter may pick the wrong function when you call work();
```
Namespace collisions are a real hazard in a modern web application. We can limit these potential hazards by giving a unique namespace to a cohesive body of work. This effectively becomes a **module**. Developers choose to use an assortment of different design patterns when writing JavaScript modules.  Any implementation of a modular pattern not only stops namespace collision but increases portability, readability, and gives a logical structure to a body of work.

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
This is a logical structure for a module that has the functionality of summing a series of numbers in different ways.  The `{}` defines an Object literal. You can define properties on this Object. You can access these properties by using the reference `SumModule` and period `.`, followed by the name of the property you'd like to access.

1. Move your functions into a object literal module with a unique namespace.

2. In the Chrome Dev Tools, call your functions using the module that you made.

<a name='module-1'/>
#Module 1: Get your ass-ets over here.

"A **content delivery network** (**CDN**) is a system of distributed servers (network) that deliver webpages and other Web content to a user based on the geographic locations of the user, the origin of the webpage and a content delivery server." -Google
 
Google is sweet. We all know this. Google provides their own CDN for delivering commonly used assets to web developers. The above quote explains what a CDN is in a nutshell. Typically a server that is part of a CDN is *specialized* in delivering static assets. 

Why would I want a file from somebody elses server? Simply put, requesting a resource from somebody else's web server means less work for your own web server. We're all about saving bandwidth in the web application business. It means less CPU usage, less third party's charge for fetching said assets, and ultimately, faster web applications. 

Lets look at some common assets (CSS and JavaScript files) provided by Google:

Everybody and their mother uses this CDN asset: jQuery.
https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js

If you click on the above link, you'll make a request to Google's ajax subdomain ajax.googleapis.com asking for the script `jquery.min.js`. Google will return the minified script as the response and you can then leverage a really nifty library known as jQuery. 

For good measure, here is a CSS file (Cascading Style Sheet) from a different CDN provider:
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css

Similarly, when you click on this link, maxcdn returns you the CSS file you requested as a minified CSS file.

What happens when you can't reach a remote file like the above two? Well, its good practice to keep a local copy that your own web server can serve to the user in case Google's URL breaks.  Typically a static file's relative path will look something like this: `HowToJavaScript/js/intern.js`. `/js/` designates the JavaScript directory that we keep all of our JavaScript organized in.

###Task 1: Dynamically retrieving CSS from a CDN using JavaScript.
---

So our `intern.html` page looks pretty ugly, right? We need to fetch the styles sheet (CSS) to support the front end framework we're leveraging named *Twitter Bootstrap*. Twitter Bootstrap was developed by.. Twitter Bootstrap offers a beautiful user interface (UI) for stylistically challenged developers like me. We have the proper Bootstrap specific class attributes in our HTML, we just need the CSS and JavaScript. First the CSS, though.

There are a couple of ways of doing this. Typically people like to include CSS directly in the `<head>` element of their HTML like this:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
```

This is totally fine to do. When the HTML gets rendered by the browser, the styles will be included and things will look pretty. One small problem. This is a sort of speed bump that the browser has to get over before getting to the point where it tells our scripts: "Hey, I'm ready for you to manipulate me." (That's not weird, right?). The faster we can produce the document object model (the interpreted tree generated by the browser reading the HTML) to our scripts, the faster the speed of our web application. On top of the speed, Google will score your page higher based on this concept alone.

Although we don't do this on Costco.com/.ca, we're going to do it for our project. I'll go through using native JavaScript to dynamically fetch a file that doesn't block the rendering process.

1. We need a function.
	```js
	// write this in intern.js
	// boilerplate empty function declaration with 
	// two parameters: source and type
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

4. Now we need to call our function using the CDN resource from step 2. Go to your workspace: `http://127.0.0.1:3000/intern` and refresh. Find our function by typing `F12`, `CTRL+P` and then `intern.js`. You should see it defined. Now call the function from the `console`:
	```js
	getFile('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css');
	```
Now that's a little better! The page doesn't look so ugly anymore but its not perfect. If you `Right Click` and `Inspect Element`, find the `<head>`. Look closely and you'll see that you've successfully allocated a style sheet. You should see this in the head:
	```html
	<link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
	```
This bootstrap template requires some more CSS not located in the CDN resource. The local file is located at: `HowToJavaScript/css/cover.css`. We need the file `cover.css` as well. Lets use our function
	```js
	getFile('/css/cover.css');
	```
Wow, that's pretty.

###Task 2: Dynamically retrieving JavaScript from a CDN using JavaScript.
---

Now that we have a pattern for retrieving CSS using our `getFile` function, lets reuse the same function to retrieve some JavaScript from a CDN.  Let's just go ahead and get jQuery. jQuery is a framework for *querying* the DOM using less characters in our code. For example:

```js
// Native JavaScript
var element = document.getElementById('someElementId');
```
Compare this to:

```js
// Using the jQuery framework
var element = $('#someElementId')[0];
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

So why would you ever want to write native JavaScript? Because it executes **MUCH** faster! Fan boys will always argue readability of code and the expressivity jQuery offers over writing native JavaScript. They're right and they're wrong. Readability and expressivity are important, but so is performance. The end user is not a developer.

I'm one of those elitists who likes performance. However, I'll admit that learning JavaScript can more easily be learned by learning jQuery. So lets get it.

1. Refactor your `getFile(source, type)` function from `intern.js` to accept a type of either `'css'` or `'script'`. You'll need to use a Boolean conditional operator to check the value of the parameter `type` and adjust your code accordingly.

2. Now that your function is ready to append a script to the `<head>`, include jQuery using this CDN endpoint https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js.

3. Write a function, `changeLead(text)` using the jQuery selector to change the lead text inside `intern.html` from `Will you please style me? I feel so naked without my styles.` to `I have my styles now, I'm so comfy and warm`.

4. Create a Object Literal Module to encapsulate your `getFile` and `changeLead` functions. Call the Object `DOMUtils`. Experiment calling your `changeLead` function from the `DOMUtils` module.

<a name='module-2'/>
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

Can you spot the dependency? Because the `changeLead` function leverages jQuery, it is *dependent* on jQuery being loaded to your page before it can be executed. So what do we do? The simple answer is to *not* use jQuery but maybe that isn't a suitable solution based on your developmental needs. Maybe you just joined a team that does leverage jQuery. Lets make a small loader function that can load all of our assets in the proper order.

###Task 1: Create a loader for loading our dependencies
---
An **Array** in JavaScript is a data structure that can hold a series of multi-valued elements. We can make arrays in a couple of different ways.
```js
// Using the Array constructor:
// looks similar to Java
var coolDudes = new Array("Chuck Norris", "Bruce Lee");

// Using Array literal notation:
// equivalent to the above; just short hand
var coolDudes = ["Chuck Norris", "Bruce Lee"];

// Implicitly creating an array:
// the function `split` returns an array.
var stringOfDudes = "Chuck Norris-Bruce Lee";
var coolDudes = stringOfDudes.split('-');
```

We need to define a new function that we can call when we arrive at our web application (`intern.html`). I'm sick of having to call our function `getFile` every time I want to look at our pretty version of `intern.html`. 

1. Define a function on `DOMUtils` called `loadAssets(assets)` that accepts an array of objects that will represent our list of assets that we need to load.

	```js
	loadAssets : function(assets) {
		// get our assets
	}
	```
		
We need to once again refactor our `getFile` function so that it accepts an **Event Listener**. *Events* are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events. We're going to leverage the native function, `document.addEventListener` to attach a "onload" event to the assets we dynamically fetch with our `getFile` function.

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
We can create a variable called `assets` like the above or we can just call our function with the above data structure straight in our function's parameter to save an unnecessary reference. Finally.. lets load our assets. As a rule of thumb, I like to load my CSS assets vendor first. Meaning I load the Twitter Bootstrap CSS and then followed by my own CSS. This ensures that any customization in the styles of my application get rendered correctly.

We wont apply a callback to any other resource aside from the jQuery one, which is the only one we really care about. Its the only dependency. Call this function on last line of `intern.js`. 

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

<a name='module-3'/>
#Module 3: Synchronous vs. Asynchronous

**Asynchronous**: not going at the same rate and exactly together with something else, in particular.

Well, that's ambiguous. Up until now, we've been loading our jQuery asset synchronously. The following example will demonstrate loading scripts synchronously. We need the Twitter Bootstrap JavaScript that comes with the framework to proceed further, so lets go ahead and pull that asset from a CDN. Our `DOMUtils` module is becoming more useful, right? I need to simply include it in my *array of objects* that is the parameter to our function `loadAssets`.

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
    },
    {
        source : "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
        type : "script",
        callback : undefined
    }
]);
```
Cool. So this successfully loads the Twitter Bootstrap script and we can now take advantage of the numerous features that it offers. Lets switch the positions of the objects that represent jQuery and Bootstrap.

```js
	{
        source : "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
        type : "script",
        callback : undefined
    },
	{
        source : "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
        type : "script",
        callback : DOMUtils.jQueryLoaded
    }
```
Open your Google Dev Tools using `F12`. Select `open drawer` at the top right of the tools. Now refresh a couple times. Eventually you'll notice a JavaScript error thrown by Bootstrap that says:

`Uncaught Error: Bootstrap's JavaScript requires jQuery`

We have a dependency issue. The easy solution is to keep your files in order starting vendor first. This isn't always preferable, however. 

What happens if we want to load *everything* asynchronously? Why would you want to load everything asynchronously? Well if a vendor's CDN (like Google) goes down or is slow, your page won't be held up trying to load that resource. Loading your scripts asynchronously increases the speed in which your application loads by preventing **resource blocking**. 

The solution is to attach a `async` attribute to the script element that you're dynamically allocating in `getFile`. The inherent problem with this method is that if we have two resources that are being fetched in parallel with no order associated, how do we guarantee that the dependency loads *before* the dependee? Here is one strategy:

###Task 1: Load your assets asynchronously
---
1. Revisit `DOMUtils.getFile(source, type, callback)` and for the condition where we're creating a `<script>` element, give the element an async attribute with value `true`.
	
	```js
	element.async = true;
	```
2. Run the same `DOMUtils.loadAssets(...)`function a couple times by refreshing the page. This time, the order of the script objects doesn't matter, as we're running everything in parallel. You should eventually get the same error thrown by Twitter Bootstrap:

	`Uncaught Error: Bootstrap's JavaScript requires jQuery`

	The solution to this problem is to create a pseudo-synchronous load order of your asynchronous script assets. We need to first load jQuery, test to see if jQuery has indeed loaded, and then load Twitter Bootstrap's JavaScript. This is a necessary strategy because the Bootstrap script is *self-executing* and assumes jQuery's presence within your application when it executes.

3. Remove the Twitter Bootstrap JavaScript object from your *array of objects* as part of the parameter to `loadAssets`. Modify the `jQueryLoaded` callback in the `DOMUtils` module so that we can test for jQuery's existence before we make a call to get the Twitter Bootstrap JavaScript.

	```js
	jQueryLoaded : function() {
		if (typeof jQuery !== 'undefined') {
			DOMUtils.changeLead("I have my styles now, I'm so comfy and warm");
			DOMUtils.loadAssets([{
		        source : "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
		        type : "script",
		        callback : undefined
			}]);
		}
	}
	```
	
	Notice here that we're marking jQuery's callback property with the above function:
	```js
	 {
        source : "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
        type : "script",
        callback : DOMUtils.jQueryLoaded
    }
	```
We append the script (which has the asynchronous attribute) and when it loads,  jQuery as a module *exports* a **global variable** called `jQuery` and the short hand version, `$`. The `<script>`'s *event listener* `onload` calls our function, `jQueryLoaded`. We've modified our callback function `jQueryLoaded` to test for the existence of the global variable `jQuery`. If the object `jQuery` exists, we're safe to load our dependent scripts! Thus we make another call to `loadAssets` to bring in our Twitter Bootstrap JavaScript. You should no longer get any dependency errors stemming from Bootstrap in the console. Our scripts are ready to rock.

A quick note about global variables from w3schools: A variable declared outside a function, becomes GLOBAL. A global variable has global scope: All scripts and functions on a web page can access it.

Be careful of what you define as *global*. Namespace collisions happen when you have too many definitions in the global space. The best practice is to leverage the module pattern we've discussed.

<a name='module-4'/>
#Module 4: The Art of Debugging

"Debugging is a methodical process of finding and reducing the number of bugs, or defects, in a computer program or a piece of electronic hardware, thus making it behave as expected. Debugging tends to be harder when various subsystems are tightly coupled, as changes in one may cause bugs to emerge in another." -Wikipedia

This module will focus on every developer's favorite thing to do: finding and correcting mistakes in their own code. When you have many moving parts in your application, you're bound to unwittingly create a few bugs. The best advice someone told me was to **unit test** frequently as a strategy to prevent creating bugs in your application. The importance of unit testing cannot be understated.

"**Unit testing** is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures, are tested to determine whether they are fit for use." -Google

We have a little bit of experience unit testing our own script `intern.js`. Remember when we switched the order of the static scripts we were feeding our function `DOMUtils.loadAssets` and determined that loading the Bootstrap script synchronously before the jQuery script caused Bootstrap to throw a dependency error? That was actually a form of *unit testing*. 

The unit of source code, `loadAssets` was tested to see what would happen if switched that order. We determined there was a dependency error. This would have been a bug had we not corrected it then and there. 

Say we didn't recognize the bug immediately and our script turned into 1000 lines of code. Sometimes the jQuery object did export to the global scope before the Bootstrap script and everything executed fine. Later down the line you notice that Bootstrap is sometimes throwing the dependency error. It may not be immediately apparent that the order in which you loaded those scripts using `loadAssets` was incorrect. This can become a headache to resolve.

Lets say you've written a function that inserts some pictures into the DOM. Its part of the `DOMUtils` module. It might look something like this:

```js
// We'll use jQuery to insert our HTML
insertPics : function(arrayOfNames) {
	var html = "";
	for (var i = 1; i < arrayOfNames.length; i++) {
		html += '<img height="140" width="140" src="/imgs/'+arrayOfNames[i]+'.jpg" class="img-thumbnail">'
	}
	$(html).insertAfter('.inner.cover');
}
``` 

Put this function in your `jQueryLoaded` callback function and refresh the page.

```js
jQueryLoaded : function() {
    if (typeof jQuery !== 'undefined') {
	    DOMUtils.changeLead("I have my styles now, I'm so comfy and warm");
        DOMUtils.loadAssets([{
            source : "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
            type : "script",
            callback : undefined
        }]);
        DOMUtils.insertPics(['chuck','arnold','steven','jean']);
    }
}
```
Um? Excuse me I don't see his holiness Chuck Norris even though we called for the local resource `chuck.jpg` in the function! We have ourselves a bug and we want to exterminate it. Lets open our Chrome Dev Tools (`F12`) and locate our script (`CTRL+P` -> type `intern.js`). Locate our function `insertPics` in the file. Insert a breakpoint *inside* the function beginning on the the line
```js
var html = "";
```
For me this line is line number 64. Simply click on the line number 64. You'll see the number gets highlighted with a blue arrow. You've just inserted a **breakpoint**. 

"A point in a program that, when reached, triggers some special behavior useful to the process of debugging; generally, breakpoints are used to either pause program execution, and/or dump the values of some or all of the program variables." -dictionary.com

![debug-0](http://i.imgur.com/fewHlCL.png)

That's exactly what we're about to do. We're going to pause program execution for the purpose of seeing whats going wrong with our function. Refresh the page and observe the program execution *breaking* on our breakpoint. 

![debug-1](http://i.imgur.com/HNV5uvG.png)

Now that the program execution has stopped, we can check out the variables that are in scope during the while the function is being called. In the above picture, I'm hovering over the parameter `arrayOfNames`. Clearly, we can see Chuck is in the array but his picture isn't being displayed.

Set another breakpoint inside the for loop. For me thats line 66. 

![debug-2](http://i.imgur.com/kAhG5FU.png)

In the top right of the debugger you'll see a green "play" button. Clicking it makes the script resume execution. We can assume line 64 is cool because its just a variable holding an empty string, `var html = "";`. No problem there. Click the "play" button. Now we're inside the for loop. Lets take a peak at what variables are in scope. 

- `i` is our index. We use it to fetch the a ith element of our `arrayOfNames`. We set it to 1 initially following `var i = 1;` Type `i` in our console to see the value of i at this point in the loop.

- `arrayOfNames[i]` represents the value of the element in `arrayOfNames` at position `i`. Type `arrayOfNames[i]` in the console to see the value of `arrayOfNames[i]` at this point in the loop.

We see that `i` returns 1. This is expected, we set it to 1 to start the loop. We also see that `arrayOfNames[i]` returns `"arnold"` in the console. However, if we type `arrayOfNames`, we see that `"chuck"` actually precedes `"arnold"` in the list. This is because `"chuck"` is at the 0th index of the array. We need to set our index (`i`) in the loop to 0, not 1. This is called a **off-by-one-error (OBOE)**.

Cool we found the bug. We need to first disable or remove our breakpoints before revising our function. Do this by right clicking and selecting "Remove All Breakpoints" from the breakpoints pane on the right side of the debugger.

![debug-3](http://i.imgur.com/aLwRHkX.png)

After this, hit the play button one more time to allow the script execution to finish. Man I need to see Chuck. Lets revise that function, NOW!

Change the index in the for loop from `1` to `0`.

```js
// We'll use jQuery to insert our HTML
insertPics : function(arrayOfNames) {
	var html = "";
	for (var i = 0; i < arrayOfNames.length; i++) {
		html += '<img height="140" width="140" src="/imgs/'+arrayOfNames[i]+'.jpg" class="img-thumbnail">'
	}
	$(html).insertAfter('.inner.cover');
}
``` 

Now that your function is revised with the correct index, refresh the page. Wow, that's an excellent line up.

<a name='module-5'/>
#Module 5: Asynchronous JavaScript and XML (AJAX)

This module will explain how to use a group of web development techniques called **AJAX**.

 "With AJAX, web applications can send data to and retrieve from a server asynchronously (in the background) without interfering with the display and behavior of the existing page. Data can be retrieved using the **XMLHttpRequest** object." -Wikipedia

"XMLHttpRequest is a JavaScript object that was designed by Microsoft and adopted by Mozilla, Apple, and Google.  XMLHttpRequest can be used to retrieve any type of data, not just XML, and it supports protocols other than HTTP (including file and ftp)." -Mozilla Developer Network

AJAX presents us with a convenient way to make seamless transitions between divisions of content on a web page or to display relevant data to our users without breaking the perceived continuity of our web application. When I say "perceived continuity" I mean the uninterrupted *flow* (or fluidity) of our web application. 

Some newer web applications are opting for the **single-page application** (SPA) approach, where all the necessary code (HTML, JavaScript, CSS) is retrieved on a single page load or all of the relevant resources are dynamically loaded when needed. AJAX helps accomplish this.

For example, when you navigate to `http://127.0.0.1:3000/intern`, your browser brings in the following assets: `intern.html` and `intern.js`. We end up including the additional assets with our `loadAssets` function defined in `intern.js` module `DOMUtils`. Those include our cascading style sheets (CSS): `bootstrap.min.css` and `cover.css`; JavaScript: `jquery.min.js` and `bootstrap.min.js`. We're dynamically including those files. Conceptually, this all happens in one load *cycle*.

Notice that `intern.html` has a *Features* tab. If we defined a page for Features, the URL might look like `http://127.0.0.1:3000/features`. You'd then want to define a `features.html` to correspond with that route, which would be the logical place to put your "features" section. You'd have a structure like this:

**features.html** (you don't have to make this)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>How To JavaScript</title>
  </head>
  <body>
    <div class="site-wrapper">
      <div class="site-wrapper-inner">
        <div class="cover-container">
          <div class="masthead clearfix">
            <div class="inner">
              <h3 class="masthead-brand">Features</h3>
              <nav>
                <ul class="nav masthead-nav">
                  <li><a href="#">Home</a></li>
                  <li class="active"><a href="#">Features</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="inner cover">
            <h1 class="cover-heading">Features</h1>
            <p id='lead-text' class="lead">
	            I am a unique snowflake. I have great features.
	        </p>
          </div>
          <div class="mastfoot">
            <div class="inner">
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src='/js/intern.js' async></script>
  </body>
</html>

```

This HTML would be served up to users by your web server when they navigated to `http://127.0.0.1:3000/features`. `features.html` is nearly identical to `intern.html`. Transitioning to `features.html` might imply the following:

- I need at least some of the same scripts I used in `/intern` to perform tasks for the `/features` section (`jquery.min.js`,`bootstrap.min.js` and `intern.js`).

- I need at least some of the same stylesheets I used in `/intern` to make the `/features` section look pretty (`bootstrap.min.css` and `cover.css`).

- I might need unique stylesheets and/or scripts for the `/features` section.

If you DO need any of the same stylesheets or scripts between sections and you naively serve the above HTML, you'll force your client (the end user) to make additional requests to resources they already requested and received before. You're also forcing your own server to serve more resources. Even if you have properly set up **client-side caching**, your client at least has to re-render and reinitialize those assets. 

If the majority of the `features.html` is exactly the same except the meat of the hamburger, we should serve what some call a *partial* view using AJAX.

Here the only things that *really* changed in `features.html` were

```html
<h1 class="cover-heading">Features</h1>
<p id='lead-text' class="lead">
	I am a unique snowflake. I have great features.
</p>
```
and the `active` class attached to the "features" list item.

First we need create the actual HTML (what we're calling a *partial*) that we'll serve the user when they perform some action. I've included this HTML in the project directory under `views/partials/home.html`, `views/partials/contact.html`, and `views/partials/features.html`.

Second let's look at the XMLHttpRequest JavaScript object and see what we'll need to use. At a minimum, we need to do four things.

We need to **create** a XMLHttpRequest object. We need to **open** (or initialize) the request. We need to define a **callback function** to tell the XMLHttpRequest object what to do with the retrieved resource. We need to **send** the request to our server to fetch the resource.

1. **Create**: 

	```js
	var request = new XMLHttpRequest();
	```
2. **Open**:

	```js
	request.open('GET', '/views/partials/features')
	```
3. **Callback**:
	
	```js
	request.onload(function() { /* do something with fetched resource */ });
	```

4. **Send**:
	
	```js
	request.send();
	```
	
Thats it! This will send a request to our server asking it to grab `/views/partials/features.html`. Now lets actually implement this:

###Task 1: Use AJAX to replace the HTML inside `intern.html` with the partial `features.html`.
---
We could simply create a function that encapsulated the entire process of making a AJAX request in addition to calling our unique callback function to replace the meat of the HTML with our partial like so:

```js
getPartial : function(partial) {
	// 1. Create
	var request = new XMLHttpRequest();
	
	// 2. Open
	request.open('GET', '/views/partials/'+partial);
	
	// 3. Callback
	request.onload = function() {
		// Test if our request was successful
		if (request.status >= 200 && request.status < 400) {
			var partialHtmlString = request.responseText;
			var meat = document.getElementsByClassName('inner cover')[0];
			meat.innerHTML = partialHtmlString;
		} else {
			// Server responded with an error status.
			console.log('Error retrieving partial');        
		}
	};
	// 4. Send
	request.send();
}
```
This would send a request to the `partial` route and our server is set up to respond with the corresponding HTML. The function looks good but its not reusable! We've **hard coded** a relative URL path in our `request.open` function. Take a look:

```js
request.open('GET', '/views/partials/'+partial)
```
`'/views/partials/'` is a relative path. We'll never be able to use the `XMLHttpRequest` object in a different way even if we wanted to. Its better to generalize this function a little so that we can reuse the `XMLHttpRequest` object without having to duplicate our code. Here we're defining these functions on the `DOMUtils` module.

```js
// Reusable AJAX request function
ajaxRequest : function(method, path, callback) {
	var request = new XMLHttpRequest();
	request.open(method, path);
	request.onload = callback;
	request.send();
}

// Specific getPartial function that utilizes ajaxRequest
getPartial : function(partial) {
	DOMUtils.ajaxRequest('GET', '/views/partials/'+partial, function(event) {
		if (this.status >= 200 && this.status < 400) {
			var partialHtmlString = this.responseText;
			var meat = document.getElementsByClassName('inner cover')[0];
			meat.innerHTML = partialHtmlString;
		} else {
			console.log('Error retrieving partial');        
		} 
	});
}
```
`ajaxRequest` is an example of a **higher-order function**. 

In mathematics and computer science, a higher-order function (also functional form, functional or functor) is a function that does at least one of the following:

-	takes one or more functions as an input
-	outputs a function

As you can see by its signature, `ajaxRequest(method, path, callback)` takes a function, `callback` as an input. This allows us to generalize functions that we create so we can get great reuse out of them.

If you call `DOMUtils.getPartial('features');` in the console, you'll see that the middle section (the meat) of our *layout* gets the partial `features.html` in place of the original HTML.

This is considerably more efficient than simply defining an almost duplicate HTML file called `features.html`, assigning it to the `/features` route and forcing the user to re-download and re-process those assets (CSS, JavaScript, HTML). Especially if our `features.html` only replaces the meat of the layout.

Whats left is to attach an event to our `Home`, `Features` and `Contact` tabs in `intern.html` to give the user a visual indicator as to what he/she is looking at.

###Task 2: Interactive Tabs
---
Lets define a function that leverages our `getPartial` function when the user clicks `Home`, `Features` or `Contact` on the `DOMUtils` module.

```js
bindNavigation : function() {
	var tabs = document.getElementsByClassName('masthead-nav')[0].children
	var getPartial = function() {
		DOMUtils.getPartial(this.id);
		DOMUtils.makeActive(this);
		// History is defined Globally. It'll replace 
		// the URL with the partial title.
		history.replaceState( {} , '', '/'+this.id );
	}
	for (var i = 0; i < tabs.length; i++){
		tabs[i].addEventListener('click', getPartial);
	}
},
makeActive : function(element) {
	// remove the active class (the underline thingy) from all tabs
	var tabs = element.parentElement.children;
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove('active');
	}
	element.classList.add('active');
}
```

Lastly, make a call to `DOMUtils.bindNavigation` in your `DOMUtils.jqueryLoaded` function so that it gets called when the page loads. Now refresh `http://127.0.0.1:3000/intern` and watch your navigation work.

<a name='module-6'/>
#Module 6: Templating 101

*Templating* is a useful technique for mitigating the amount of static HTML you may need for your web application. Instead of duplicating a bunch of HTML that has the same fundamental structure, you can create one HTML template and expose it using a templating framework that consumes the *dynamic* data.

For example, if you have a piece of HTML that needs to be repeatedly used:

```html
<div class='person-list-item col-md-12'>
	<div class='col-md-4'>
	  <h4>Kurt</h4>
	</div>
    <div class='col-md-4'>
        <label>Title</label>
        <p>Programmer</p>
    </div>
    <div class='col-md-4'>
        <label>Salary</label>
        <p>1000 gbh (gummy bears per hour)</p>
    </div>
</div>
``` 

This *widget* represents an employee. Maybe you've hard coded this piece of HTML several times to account for all of your employees. Your HTML can suddenly become large and unwieldy. This is a perfect opportunity to use the templating framework defined in **underscore.js**.  Directly from their site:

"Underscore is a JavaScript library that provides a whole mess of useful functional programming helpers without extending any built-in objects. It’s the answer to the question: “If I sit down in front of a blank HTML page, and want to start being productive immediately, what do I need?” … and the tie to go along with jQuery's tux".

Underscore provides some very nifty functionality. If you read through their library, you'll see some cross-paradigm functions that can help you be very expressive with the way you write code. In addition, their templating is very elementary to implement. 

First of all,  when we include underscore.js in our app `_`, or literally *underscore* is now a global variable that we can expose and use. Similary to `$` (`jQuery`), `_` has a bunch of functions defined as properties. In the below example we use `_.each`, which is essentially underscore's version of `Array.prototype.forEach`. It has an almost identical function definition. The `<%= %>` are tags used by underscore. It parses the content between these tags and allocates our dynamic object property value.

There are three things we need to define to make use of this

1. The **template**: This is the actual template (a text string that converts to HTML) that we'll tell underscore to utilize when it augments the document object model (DOM). It'll look something like this:

	```html
	<% _.each(employees, function(employee) { %>
	    <div class='person-list-item col-md-12'>
	        <div class='col-md-4'>
	          <h4><%= employee.name %></h4>
	        </div>
	        <div class='col-md-4'>
	            <label>Title</label>
	            <p><%= employee.title %></p>
	        </div>
	        <div class='col-md-4'>
	            <label>Salary</label>
	            <p><%= employee.salary %> gbh</p>
	        </div>
	    </div>
	<% }); %>
	```
	
	>	This template looks a little funky because we need to loop through the *array of objects*. So we use the `_.each` to accomplish this. 


2. The **data**: This will be an object containing a *property* with the name `employees` and the value of the property being an *array of objects*. The array of objects represents the employees that you want to embed into your templates:
	
	```js 
	{
		employees :
			[
				{ name: "Kurt", title: "Programmer", salary: 1000 },
				{ name: "Brian", title: "Programmer", salary: 1500 },
				{ name: "Robert", title: "Programmer", salary: 2000 }
			]
	}
	```
	
3. The **target**: The place where you want to insert the HTML generated by underscore.

###Task 1: Using `underscore.js`, build a template that can take an array of objects and insert them into the DOM.
---

We'll need to include underscore in our application. Find a CDN and add it to our `loadAssets` function. In `intern.js`, `loadAssets` should look like this:

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
    },
    {
        source : "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
        type : "script",
        callback : undefined
    }
]);
```
Notice we're creating yet *another* dependency on somebody's library. After this example using underscore, we'll ditch it and write our own very basic templating system.

1. Define a `buildTemplate` function in `DOMUtils` to initialize building our templates for when underscore loads:
		
	```js
	buildTemplate : function(dataObj, templateName, target) {
		// Get the template string.
		var template = document.getElementById(templateName).innerHTML;

		// Generate the HTML necessary by calling _.template with the
		// template and the data object. 
		var generatedHtmlString = _.template(template)(dataObj);

		// Insert the HTML into the DOM by using the target parameter.
		document.getElementById(target).innerHTML = generatedHtmlString;
	}
	```
	This generalized function allows you to define `dataObj` (object containing the array of objects), the `templateName` (where the template is defined) and the `target` (where you want the template in the DOM) with each call.

2. Create the template using an inline `<script>` tag within `intern.html`. Place this code just before the `</body>` tag:

	```html
	<script type='text/template' id='employee-template'>
        <% _.each(employees, function(employee) { %>
            <div class='person-list-item col-md-12'>
                <div class='col-md-4'>
                  <h4><%= employee.name %></h4>
                </div>
                <div class='col-md-4'>
                    <label>Title</label>
                    <p><%= employee.title %></p>
                </div>
                <div class='col-md-4'>
                    <label>Salary</label>
                    <p><%= employee.salary %> gbh</p>
                </div>
            </div>
        <% }); %>
    </script>
	```
	 Notice that we're placing the template contents inside of a `<script>` tag with `type='text/template'`. This type tells the browser not to process this block of text like JavaScript, thus we won't have any issues with those funky `<%= %>` tags.

3. Create the `underscoreLoaded` callback function and attach it to the `callback` property of the underscore asset when we call `loadAssets`.

	```js
	 {
        source : "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
        type : "script",
        callback : DOMUtils.underscoreLoaded
    }
    
    // and define the function on DOMUtils. Call our DOMUtils.buildTemplate when
    // we load.

	underscoreLoaded : function() {
		 DOMUtils.buildTemplate(
            { 
                employees : [
                    { name: "Kurt", title: "Programmer", salary: 1000 },
                    { name: "Brian", title: "Programmer", salary: 1500 },
                    { name: "Robert", title: "Programmer", salary: 2000 }
                ]
            },
            'employee-template',
            'employee-list'
        )
    }
	```
	Lets stop inserting those pictures of our demigods Chuck Norris, Arnold Schwarzenegger, Steven Seagal, and Jean-Claude Van Damme. *Comment* (or make the program skip) this function out of our `jqueryLoaded` function.

	```js
	// DOMUtils.insertPics(['chuck','arnold','steven','jean']);
	```  
Now refresh `http://127.0.0.1:3000/intern` to see your list represented in HTML

![template.png](http://i.imgur.com/c68olJZ.png)

Play around with inserting different data into your utility function by changing the data object to see different employees.

```js
DOMUtils.buildTemplate(
    { 
        employees : [
            { name: "Jean-Claude Van Damme", title: "Kickboxer", salary: 3500 },
            { name: "Arnold Schwarzenegger", title: "Commando", salary: 4000 },
            { name: "Bruce Lee", title: "The Dragon", salary: 5000 }
        ]
    },
    'employee-template',
    'employee-list'
)
```

###Task 2: Ditch `underscore.js`
---

While underscore is powerful tool set, we don't need it to accomplish what we want. Underscore includes a lot of other stuff we might not ever use, so naively including it is sort of a bad idea. By writing our own JavaScript templating function, we can eliminate the overhead (dependency and bandwidth) of including it.

First we need to do some code cleanup.

1. Remove the `underscore.js` dependencies. Remove the underscore asset object from the `loadAssets` function.

	```js
	// Remove this!
	{
        source : "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
        type : "script",
        callback : DOMUtils.underscoreLoaded
    }
	```
	`DOMUtils.underscoreLoaded` is now **dead code**, which means that it so no longer used by our application. You might want to remove or comment this code out.

	```js
	// underscoreLoaded : function() { 
    //     DOMUtils.buildTemplate(
    //         { 
    //             employees : [
    //                 { name: "Kurt", title: "Programmer", salary: 1000 },
    //                 { name: "Brian", title: "Programmer", salary: 1500 },
    //                 { name: "Robert", title: "Programmer", salary: 2000 }
    //             ]
    //         },
    //         'employee-template',
    //         'employee-list'
    //     )
    // }
	```
	We can refactor `DOMUTils.buildTemplate` to make it work with our custom templating system.

2. Remove the `<script type='text/template' id='employee-template'>` that you defined in `intern.html`. The `<%= =>` is no longer useful to us because it is unique syntax relevant only to underscore. 
	
	```html
	<!-- Remove this! -->
	<script type='text/template' id='employee-template'>
        <% _.each(employees, function(employee) { %>
            <div class='person-list-item col-md-12'>
                <div class='col-md-4'>
                  <h4><%= employee.name %></h4>
                </div>
                <div class='col-md-4'>
                    <label>Title</label>
                    <p><%= employee.title %></p>
                </div>
                <div class='col-md-4'>
                    <label>Salary</label>
                    <p><%= employee.salary %> gbh</p>
                </div>
            </div>
        <% }); %>
    </script>
	```
	
###Task 3: Build your own templating system
---

The same three things are needed in our own custom templating solution:

1. The **template**: 

	This time we'll define our template using just pure JavaScript. The structure of our template is basically the same, we just need a *string* representation of the HTML. We can do this using an array. 

	Lets use a new design pattern that we haven't used before. Lets create a *templates* object using the **prototype pattern**. Similar to our *object literal* `DOMUtils` module, The prototype pattern allows you to encapsulate some unit of work while gaining the benefit of leveraging JavaScript's native support of prototypal inheritance. The prototype object (for example `Function.prototype`) itself is used as a blueprint of each object that the **constructor** creates. Another benefit of this pattern is that defining a function on an object's prototype, all child instances of this object reference a single definition of the function. They don't make copies for each object instance.

	Lets create a constructor and a prototype for our new object.

	```js
	// Constructor
	var Template = function() {};
	
	// Defining a function on Template's prototype object
	Template.prototype = {
		template_0 : function(employee) {
			return ['<div class="person-list-item col-md-12">',
						'<div class="col-md-4">',
							'<h4>'+employee.name+'</h4>',
						'</div>',
						'<div class="col-md-4">',
							'<label>Title</label>',
							'<p>'+employee.title+'</p>',
				        '</div>',
				        '<div class="col-md-4">',
					        '<label>Salary</label>',
					        '<p>'+employee.salary+' gbh</p>',
					    '</div>',
					'</div>'].join('');
		}	
	}

	// Usage
	
	// Use `new` on our constructor function object.
	var template = new Template();
	
	// Call the `template_0` function (defined on the object's prototype)
	template.template_0({ name: 'kurt', title: 'programmer', salary: '1000'});
	```
	Define your Template object outside the scope of `DOMUtils`.

2. The **data**:

	The data has a slightly different (and more simplistic) structure. We can now represent our data as a simple array of objects.
	
	```js
	[
	    { name: "Kurt", title: "Programmer", salary: 1000 },
	    { name: "Brian", title: "Programmer", salary: 1500 },
	    { name: "Robert", title: "Programmer", salary: 2000 }
    ]
	```

3. The **target**:

	The target remains the same, we need to insert the HTML generated by our function into the DOM. 

---

`DOMUtils.buildTemplate` will be our workhorse again. First we need to strip it of its underscore dependency. Lets refactor `buildTemplate`:

```js
buildTemplate : function(dataArray, templateIndex, target) {
	// An empty variable to fill up with HTML.
	var generatedHTML = "";

	// Instantiate our template Object.
	var template = new Template();

	// Loop through each object in the dataArray
	dataArray.forEach(function(object) {
		// Generate HTML for each object in our dataArray

		// += means append and assign. Its the same thing as saying:
		// generatedHTML = generatedHTML + `new value`. Use the templateIndex
		// to dynamically fetch the function `template_0` from our template
		// object using the notation ['template_' + templateIndex]. This is
		// equivalent to calling template.template_0(object).
		
		generatedHTML += template['template_'+templateIndex](object);
	});
	document.getElementById(target).innerHTML = generatedHTML;
}
```

Place the call to `buildTemplate` in the `jQueryLoaded` callback function:

```js
 DOMUtils.buildTemplate(
    [
        { name: "Kurt", title: "Programmer", salary: 1000 },
        { name: "Brian", title: "Programmer", salary: 1500 },
        { name: "Robert", title: "Programmer", salary: 2000 }
    ],
    0, 'employee-list'
);
```
 Refresh your `http://127.0.0.1:3000/intern` and watch your templating system work. You've just saved yourself a dependency, sped up your application's execution time, and made your client's experience a little better.
