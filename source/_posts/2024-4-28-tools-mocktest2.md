---
title: 【Software tools】Mock Test 2 整理
date: 2024-04-28 23:30:34
categories: 
     - Learn
     - linux
tags: 
     - linux
---
&emsp;&emsp; Software tools的Mock Test的第二次练习
<!-- more -->

# Tools MockTest Part2 #

## Q1.Type the name of the HTML tag used to create a line break without ending the paragraph. (Type no spaces, nor angled brackets.) ##
line break - 换行符 

Answer: `br`
## Q2.Complete the following HTML tag with one word (no spaces or other punctuation) ##
```html
[a]
<ul>
    <li>Piano</li>
    <li>Guitar</li>
    <li>Trumpet</li>
</ul>
[b]
<ul>
    <td>Piano</td>
    <td>Guitar</td>
    <td>Trumpet</td>
</ul>
[c]
<ol type = "A">
    <li>Piano</li>
    <li>Guitar</li>
    <li>Trumpet</li>
</ol>
[d]
<table>
    <li>Piano</li>
    <li>Guitar</li>
    <li>Trumpet</li>
</table>
```
Answer: [a]
## Q3.Complete the following HTML tag with one word (no spaces or other punctuation) ##
`<a href = "/dogs">dogs</a>`

so that it creates a link that, when clicked, loads the pages `/dogs`.
## Q4.Consider the following sentence: "Click here for more information." Which of the following HTML snippets would make the word 'here' link to the page 'www.example.com'? ##
```html
[a]
    <p>
    Click
    <href="www.example.com">here</ href>
    for more information
    </p>
[b]
<p>
    Click
    <href="www.example.com">here<a />
    for more information
</p>
[c]
<p>
    Click
    <href="www.example.com">here</a>
    for more information
</p>
[d]
<p>
    Click
    <a url ="www.example.com">here</ a>
    for more information
</p>
```
Answer: [c]
## Q5.Which of the following is not a property of the CSS Box Model? ##
`column` is not a property of the CSS Box Model.
**margin, border, padding** are all the property.
## Q6.Which of the following CSS rules is not correct? ##
Answer: $div{property: value}

其他正确的：
- #id{property: value}
- .class{property: value}
- tag{property: value}
## Q7.Are the following statements about JavaScript variables true or false? ##
### true - [a] Variables with block scope are declared using the let keyword. ### 
### true - [b] The keyword const is used to to declare variables that you should not change after they are assigned. ###
### false - [c] A variable declared outside a function definition using the let keyword is a global variable. ###
### true - [d] A variable declared outside a function definition using the var keyword is a global variable. ###
## Q8.Type the output logged to the console when the following code is run. (Do not type any spaces.) var x; console.log(typeof(x)); ##
Undefined
## Q9.Given the following JavaScript object, which of the following expressions cannot be used to determine whether the object has the property description? ##
```JavaScript
let flowers = { 
type: "Spring flowers", 
region: "Europe", 
examples: [
{
    name: "Monkey Orchid", 
    appears: "April", 
    colour: "lilac", 
    habitat: "Dry, sunny grasslands on hills" 
}, 
{ 
    name: "Common Rock-Rose", 
    appears: "April", 
    colour: "Yellow", 
    habitat: "Forests, dry grasslands, waysides" }, 
{ 
    name: "Star of Bethlehem", 
    appears: "May", 
    colour: "White", 
    habitat: "Cultivated land, vines, grass lands" }, 
{ 
    name: "Field Poppy", 
    appears: "May", colour: "Red", 
    habitat: "Along walls, hedges, paths" 
    } 
  ] 
}
``` 
Answer: flowers.contains(description); -- This one can not(这个不行)

其他可以用来determine whether the object的:
- flowers.hasOwnProperty("description");
- if(flowers.description != undefined);
- if('description' in flowers){ return true;}
## Q10. The following is not a valid JSON object. { name = David, prizes_won = 3 } What needs to change to make it valid? Mark the following as true or false. ## 
### true - [a] The keys (name, prizes_won) need to be double-quoted. ###
### true - [b] The string value David needs to be double-quoted. ###
### false - [c] The numeric value 3 needs to be double-quoted. ###
### true - [d] The equals sign needs to be replaced by a different character. ###

