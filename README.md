#Weekend Challenge 3: Your Own Calculator

Welcome to your third weekend challenge!

We are going to be building a calculator application using jQuery, Node, and Express, all hosted on Heroku!

The logic for the calculator needs to be housed on the Server, where the client side will take in the values (in 2 input text fields) and the type of mathematical operation (selected using a button on the DOM). Each of the numerical values and type of mathematical operation will be bundled up in an object and then sent to the server via a POST. So when the object is sent, it should look something like this:
{
   x: 3,
   y: 4,
   type: "Add"
}

Once the server receives it, build out logic to compute the numbers in 1 of 4 different ways. The server should be able to handle Addition, Subtraction, Multiplication, and Division. Once the calculation is complete, it should be sent back down to the client side app where it should be displayed on the DOM.

Finally, build a 'clear' button that resets the whole experience.

##HARD MODE:
Convert the input fields for the two values to Buttons. So the experience would allow the user to click on a numerical button, then a mathematical operation, then a numerical button again. Then have an equal button that sends all of the information to the server.

##PRO MODE:
Style the whole experience using Bootstrap to resemble the design of a physical calculator. Then, include decimal points in your number logic. Finally, convert your logic to have the client side handle which mathematical operation is run. Once it determines this, it will use that to change the url or the post request to pair with a server side route that handles that type of mathematical operation. For example:

```
$.ajax({

    type: "POST",

    url: "/division",

    success: function(data){

       //something here

    }

});
```

Would be on the Client side and the Server side would have something like:

router.post('/division', function(req, res){

//some code here

});


#Challenge Grading Guidelines
##Reinforcement Needed
1 - Individual was missing many logic components to show that the group was on the path to completion. Code is generally unorganized and difficult to follow.

##Meets Expectations
2 - Individual was able to successfully complete the challenge based on the requirements of the project. Code is generally well organized. Variable and Function names are descriptive of what their purpose is.

##Above Expectations
3 - Same as 2, but also includes: Abstraction is used in such a way that the application is modular where appropriate. Styling is used to complete the user experience in such a way that is visually appealing. Hard and Pro mode complete.

#Stretch Goals
[ ] Change results longer than 8 characters to return exponentials or a rounded result for decimals

[x] Style app to be responsive

[x] Add demo image to README

[ ] Have 'clear' button toggle between displaying 'AC' and 'C' when appropriate

Further validate user input to:
   [ ] handle cases where user inputs an operator before a number
   [ ] handle cases where user clicks on the decimal button first (as the first input number)
   [ ] If left uncleared, allow remaining number after operation to count towards next operation if user continues
   [ ] Prevent display change or submit on click if all property's aren't filled: aka '3 =, submit'

#Stretch Goals
![Demo](public/images/demo.png?raw=true "Demo")
