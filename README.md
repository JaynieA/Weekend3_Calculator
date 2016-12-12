#Weekend Challenge 3: Your Own Calculator

Welcome to your third weekend challenge!

We are going to be building a calculator application using jQuery, Node, and Express.

The logic for the calculator needs to be housed on the Server, where the client side will take in the values (in 2 input text fields) and the type of mathematical operation (selected using a button on the DOM). Each of the numerical values and type of mathematical operation will be bundled up in an object and then sent to the server via a POST. So when the object is sent, it should look something like this:
```
{
   x: 3,
   y: 4,
   type: "Add"
}
```
Once the server receives it, build out logic to compute the numbers in 1 of 4 different ways. The server should be able to handle Addition, Subtraction, Multiplication, and Division. Once the calculation is complete, it should be sent back down to the client side app where it should be displayed on the DOM.

Finally, build a 'clear' button that resets the whole experience.

##HARD MODE:
Convert the input fields for the two values to Buttons. So the experience would allow the user to click on a numerical button, then a mathematical operation, then a numerical button again. Then have an equal button that sends all of the information to the server.

##PRO MODE:
Style the whole experience using Bootstrap to resemble the design of a physical calculator. Then, include decimal points in your number logic. Finally, convert your logic to have the client side handle which mathematical operation is run. Once it determines this, it will use that to change the url or the post request to pair with a server side route that handles that type of mathematical operation.

##TECHNOLOGIES:
* JavaScript
* jQuery
* Node.js
* Express.js
* AJAX
* SASS
* Bootstrap
* HTML5

#Stretch Goals
* [x] Round results to have a max of 7 decimal places

* [x] Style app to be responsive

* [x] Add demo image to README

* [x] Add gif to README

* [x] Have 'clear' button toggle between displaying 'AC' and 'C' when appropriate

Further validate user input to:

   * [x] handle cases where user inputs an operator before a number

   * [x] handle cases where user clicks on the decimal button first (as the first input number)

   * [x] If left uncleared, allow remaining number after operation to count towards next operation if user continues

   * [x] Prevent submit and customize display changes until all properties needed are defined

* [ ] Move input validation to happen on the server side


#Demo
![Demo](public/images/demo.png?raw=true "Demo")

![Demo](public/images/demo.gif?raw=true "DemoGif")
