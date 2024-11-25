# Lilly Technical Challenge Documentation Template

*This documentation template serves as a place for you to discuss how you approached this challenge, any issues you faced & how you overcame them, or any other points that you feel would be relevant for the interviewers to know. The text in italics is here to guide you - feel free to remove it once you fill out each section!*

***Not every section in this document is required. This is just a template to help get you started. Feel free to add or remove sections as you feel necessary.***

## Approach
### First Steps
- Thought about the layout I wanted to use and how I would tackle each objective.
- Looked for references to begin the HTML as I wanted to create a list in a sidebar and a container for the main outputs.
- Once I created the sidebar, I researched how to do JavaScript and find a way to start a function when the link was clicked.

### Show All Medicine
- When I figured out how to use `addEventListener` and Document Object Model (DOM) with the help of references, I moved onto coding an `addEventListener` for "Show All Medicine," which would call the `displayAllMedicines` function.
- Used more ChatGPT and other references to help understand how to use the `fetch` command and coded the function.
### Tables
- Saw the layout was a list, so I decided to make a function to display the output as a table (`createTable` function). I used references like W3Schools, GeeksforGeeks, and MDN Web Docs for table basics.
- When I encountered errors, I asked ChatGPT to resolve and explain them.
- Created a header row for the table, added cells for the header names, and assigned them to the row. Then looped through all the medicines to create rows and input cells for the name and price, using "N/A" for null or undefined values.
### Search Medicine
- Designed the form for "Search Medicine" with some help from W3Schools as I needed a refresher on creating input fields.
- Repeated the process of creating an `addEventListener` for "Search Medicine" and coded the `searchForMedicine` function using patterns from `displayAllMedicine` and insights from references.
- Researched how to get the input from HTML and use it in my JavaScript.
### Clear Content
- Realized I needed to clear the previous content, so I referred to webDocs and W3Schools to understand `display: none/block` and `innerHTML` values.
### Adding New Medicine
- Created a form and `addEventListener`, then coded the function for adding new medicine.
- Added validation to ensure:
  - Both fields are completed.
  - The price field only accepts valid numbers.
  - Negative numbers are not allowed.
- Struggled with `fetch` differences and consulted references and ChatGPT for guidance.
### Update and Delete Medicine
- Adapted the search bar from "Search Medicine" and created a new function, `searchForMedicineToUpdateOrDelete`, since the original function did not work due to asynchronous issues.
- Added validation to ensure actions apply only to medicines in the database.
- Created `addEventListener` and coded functions for both update and delete actions.
### CSS
- Improved the appearance of sidebars, tables, input fields, and buttons by consulting references and using past knowledge.

### References:
- DevDocs: Quick reference for JavaScript and DOM manipulation.
- MDN Web Docs: In-depth explanation of JavaScript methods like `fetch` and DOM elements.
- W3Schools: Useful for HTML forms, CSS styling, and beginner-friendly examples.
- GeeksforGeeks: Resource for building tables and understanding event handling.
- ChatGPT: Helped debug issues, clarify concepts, and provide code explanations.

## Objectives - Innovative Solutions
- The objectives were broad, and I initially struggled to understand them.
- I faced difficulties coding due to limited experience.
- Validations had to be re-implemented multiple times.
- Rewrote the update functions multiple times for accuracy.

## Problems Faced
- **Update and Delete Medicine Search**: Learned about asynchronous behavior through references. Created a new function (`searchForMedicineToUpdateOrDelete`) to handle these issues.
- **Time Constraint**: Completing the challenge within 60 minutes was difficult due to limited experience and coding challenges.

## Evaluation
As I read through the README, I realised that this task was probably going to take more than the 60 minutes I had. I decided to keep going anyway because I wanted to give it my best shot. In the end, I ran out of time, and the challenge felt really difficult, especially trying to complete it within such a tight limit. However, I don't like to leave task undone, so I tried to complete it.

The beginning went pretty well, as things were easier to understand and implement as it was similar to DART and reminded me of my pervious coursework. But as I got deeper into the JavaScript part, it became harder to follow, and I started struggling more. It felt like the difficulty ramped up quickly, and I was trying to keep up 

Even though it was tough, I’m glad I did it. I got to learn a little more about JavaScript, and it also reminded me how to work with HTML and CSS. Overall, it was challenging but a good experience.
