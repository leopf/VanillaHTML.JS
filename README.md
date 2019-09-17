# VanillaHTML.JS
HTML becomes much simpler with VanillaHTML.JS. 

VanillaHTML.JS only has a couple lines of code and all it does is execute a function for each selected element.
There is only one step:
 - register a callback function with a selector

the callback function will be calln having the element assigned under "this".

```js
html("span", function() {  
    this.innerHTML = "hello world!";
});

//add an additional element after 1 second
setTimeout(function() {
    document.body.appendChild(document.createElement("span"));
}, 1000);
```

## HTML stages for this example
### Stage 1 - the raw HTML code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="vanillahtml.js"></script>
    <script>
        html("span", function() {  
            this.innerHTML = "hello world!";
        });
        setTimeout(function() {
            document.body.appendChild(document.createElement("span"));
        }, 1000);
    </script>
    <title>Document</title>
</head>
<body>
    <span></span>
</body>
</html>
```
### Stage 2 - after initially loading
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="vanillahtml.js"></script>
    <script>
        html("span", function() {  
            this.innerHTML = "hallo";
        });
        setTimeout(function() {
            document.body.appendChild(document.createElement("span"));
        }, 1000);
    </script>
    <title>Document</title>
</head>
<body>
    <span>hello world!</span>
</body>
</html>
```
### Stage 3 - after 1 second
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="vanillahtml.js"></script>
    <script>
        html("span", function() {  
            this.innerHTML = "hallo";
        });
        setTimeout(function() {
            document.body.appendChild(document.createElement("span"));
        }, 1000);
    </script>
    <title>Document</title>
</head>
<body>
    <span>hello world!</span>
    <span>hello world!</span>
</body>
</html>
```