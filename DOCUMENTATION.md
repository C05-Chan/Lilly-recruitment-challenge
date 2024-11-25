# Lilly Technical Challenge Documentation Template

*This documentation template serves as a place for you to discuss how you approached this challenge, any issues you faced & how you overcame them, or any other points that you feel would be relevant for the interviewers to know. The text in italics is here to guide you - feel free to remove it once you fill out each section!*

***Not every section in this document is required. This is just a template to help get you started. Feel free to add or remove sections as you feel necessary.***

## Approach
First Steps
- Thought about the layout I wanted to use and how I would tackle each objective.
- Looked for references to begin the HTML as I wanted to create a list in a sidebar and a container for the main outputs.
- Once I have created the sidebar I researched on how to do JavaScript and find a way to start a function when the link was clicked.

Show All Medicine
- When I have figured out how to use eventListener and Document Object Model (DOM) with the help of references I moved onto coding a `addEventListener` for "Show All medicine" which would call `displayAllMedicines` function.
- Used more chatGPT and other references to help understand how to use `fetch` command and coded the function.

Tables
- Saw the layout was a list so I decided to to make a function to make the output display as a table (function `createTable`). I used a lot of W3 Schools, GeeksforGeeks and MDN Web Docs for table basic and tried to code it. When I did found some errors I asked chatGPT to resolve and explain.
- I created a header row for the table and inputted cells for the header names and then assigned it to the row. Then looped round all the medicine to create a row and then created the cells to input the name and price. It checks that the price and name is not `null` or `undefined`, otherwise it will put `N/A` as the placeholder.

Search Medicine
- Designed the form for `Search Medicine` with some help from W3 schools as I needed a slight jog of memory from first year on how to create input fields.
- Repeated the process of creating an `addEventListener` for "Search Medicine" and then coded the `searchForMedicine` function using pattern recognition from the `displayAllMedicine` and what I had understood from the references.
- Although I had to research how to get the input from the HTML and use it in my JavaScript.

Clear Content
- Realised that I need to clear the previous content, so I refered to webDocs and W3 School do understand how the display none/block works as well as the inner.HTML values.

Adding New Medicine
- I did the same as before with creating a form `addEventListener` and coding the function.
- The form, I had added validation to multiple things.
  - Both fields has to be completed.
  - The price fields is limited to numbers and price.
  - Negative numbers can not be inputted.
- Struggled with the `fetch` as it was not the same as before so I had to refer to the references and ChatGPT.

Update and Delete Medicine
- Copied the same search bar from search query and tried to use the same function from before to check if the medicine was in the database. However it didn't work so I created a new function called `searchForMedicineToUpdateOrDelete`, it basically does the same thing but checks if it would pop up the `updateFields` for the price or the `DeleteMedicineButton` if the medicine is found.
- Validation is added to ensure that they are updating/ deleting a medicine that is actually in the database.
- Did the same by `addEventListener` and coding the functions for both.

CSS
- Completed all the functions and decided to make the sidebars, tables, input fields and the buttons look nicer and less cramped. So I looked at some references and used past knowledge and made it look nicer.

References:
- DevDocs – Quick reference for JavaScript and DOM manipulation.
- MDN Web Docs – Deep dive into JavaScript methods like `fetch` and DOM elements.
- W3Schools – Useful for HTML forms, CSS styling, and beginner-friendly examples.
- GeeksforGeeks – Resource for building tables and understanding event handling.
- ChatGPT – Helped debug issues, clarify concepts, and provide code explanations.

## Objectives - Innovative Solutions
- The objectives were very broad, so I had a little trouble to understand what I really had to do.
- I struggled a lot at coding this as I didn't have much experience.
- Had to code some validation multiple times.
- Had rewrite the update and functions multiple times.

## Problems Faced
- **Update and Delete Medicine Search**: Copied the same search bar from search query and tried to use the same function from before to check if the medicine was in the database. However from the references I learnt that the functions are asynchronous so it means that it would always return false before the `fetch` completes so I created a new function called `searchForMedicineToUpdateOrDelete`.
- **Time Constraint**: Completing the challenge within 60 minutes was too difficult as I did not have enough experience and had some trouble with the code.

## Evaluation
As I read through the README, I realised that this task was probably going to take more than the 60 minutes I had. I decided to keep going anyway because I wanted to give it my best shot. In the end, I ran out of time, and the challenge felt really difficult, especially trying to complete it within such a tight limit. However, I don't like to leave task undone, so I tried to complete it.

The beginning went pretty well, as things were easier to understand and implement as it was similar to DART and reminded me of my pervious coursework. But as I got deeper into the JavaScript part, it became harder to follow, and I started struggling more. It felt like the difficulty ramped up quickly, and I was trying to keep up.

Even though it was tough, I’m glad I did it. I got to learn a little more about JavaScript, and it also reminded me how to work with HTML and CSS. Overall, it was challenging but a good experience.
