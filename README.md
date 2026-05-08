# CS 110: Lab 4 - New York Times API & React Intro
## Part 1 - New York Times API
Important note before you get started. Please implement all your HTML in index.html, CSS in style.css and JavaScript in main.js to make it easy to lookup relevant portions of the codebase. You should also create a readme to describe any implementation details or list external libraries utilized.

You are allowed to use external libraries such as Bootstrap and others as long as they don’t trivialize the assignment, and you should provide a brief description in your README of how you used them. 

<u>**Introduction**</u><br>
You will be accessing the most trending articles from the New York Times. However, what's trending this month might be different from what's trending today, so your application will show the top 5 most popular articles based on time period (day, week, month) and popularity criteria (most viewed, shared, emailed).

Your application will look something like this:<br>
![Part 1 - Image 1](instructions/part1_image1.png)

<u>**The New York Times API**</u><br>
You will be using the NYT Popular Article API to access popular articles. You'll be making a GET request using the fetch() function in your JavaScript code. In order to fetch articles, one person in your team will need to create a free account through the NYT dev portal: https://developer.nytimes.com/. Please look at the Getting Started tab of this page to learn how to make an account and get an API Key (You will need this to make GET requests).

Here's the documentation for the NYT APIs (you'll only be working with the Popular Articles API): https://developer.nytimes.com/apis.

<u>**Guide**</u><br>
For our application, we need to obtain the data in the background and update the page without refreshing it through JavaScript. There are multiple ways to do this, but we recommend using [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

The standard template for a fetch request looks something like this:<br>
```
// specify a url, in this case our web server

const url = 

fetch(url)
   .then(res => res.json()) .then(data => {  
   // do something with data

})
.catch(err => {
    // error catching
console.log(err) })
```

However, instead of using .then(), you can use await/async as well.

<u>**Response**</u><br>
Each request you'll make is followed by a json response (specifically, an array of the 20 most popular articles). If you output a single article using console.log, you'll see a response in this format:
![Part 1 - Image 2](instructions/part1_image2.png)

These are all the properties of an object (article) that the API will respond with. You're able to access all of these fields and use them in your web page. The documentation for these fields can be found in the *components* section of the Popular Articles API page from the link above. Keep in mind that emailedArticles, sharedArticles, and viewedArticles have slightly different properties, but for our case, they should work the same.

Most responses will have image media that you can display. Some will have video, and that can't easily be accessed at the moment. Because of this, an error might occur. To avoid this, please use a try/catch block when you're accessing an article. If there is an error loading any part of an article, please skip the article, and load the next popular one. For example, if the third most article is giving an error, please load the 4th most popular in the third spot, the 5th most popular in the 4th spot, and the 6th most popular in the 5th spot. Don't worry, this won't go on forever since the response gives you an array of the 20 most popular articles.

<u>**Other notes**</u><br>
Your page should be responsive to the screen width. If the screen width is less than 900px, your page should look similar to this:
![Part 1 - Image 3](instructions/part1_image3.png)

<u>**Requirements**</u><br>
In summary, your page needs to meet the following criteria:
- Uses Fetch API / AJAX / other equivalents to poll the provided server to receive articles.
- Articles
    - Article items must be clearly separated.
    - Article items must contain an image, title, abstract (description), and published date as shown in the example above.
    - Use Try/Catch for error handling as specified above.
- A user must be able to select the popularity criteria and time frame.
- Must follow a similar page layout to the image above (we will be lenient on some styling/sizing differences, but the layout should be very similar).
- Must be responsive to screen size as shown above.

We also highly encourage you document your code with the use of JSDoc (simple [JSDoc function header annotations](https://jsdoc.app/tags-returns.html) [would suffice](https://jsdoc.app/tags-returns.htmlhttps://jsdoc.app/tags-returns.html)) especially for any code you write whose purpose may not be immediately obvious to the reader.

## Part 2 - Getting Started with React
First, install React (follow instructions for [MacOS](https://www.geeksforgeeks.org/installation-guide/how-to-install-reactjs-on-macos/) or [Windows](https://www.geeksforgeeks.org/installation-guide/how-to-install-reactjs-on-windows/)). If you have trouble with installation, then get started by using [CodeSandBox](https://codesandbox.io/) and visit office hours so we can help  you with installation. 

Second, create a Board.jsx file and add the following code we went over in lecture. Complete this React example to implement the Tic Tac Toe Game. It should have the following features:
1. Keep track of players turn. You can assume X always starts the game. 
2. Keep track of scores for X and O (need to update code to display this new state)
3. Create function to compute Winner and display the results.
4. Create a 'New Game' button to allow user to start a new game. 
5. (1 point Extra Credit) Add at least 1 additional page and incorporate React Routing. You have the freedom to customize the new page.<br>
It can be an About page where you include info about the team mates working on this lab. 
![Part 2 - Image 1](instructions/part2_image1.png)