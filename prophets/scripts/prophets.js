const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
async function getProphetData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/'); // request
  const data = await response.json();} // parse the JSON data
  //console.log(data);
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => { // temp output test of data response 

        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        let image = document.createElement('img');
        
        // Build the h2 content out to show the prophet's full name
        h2.textContent = `${prophet.firstName} ${prophet.lastName}`; // Set the full name

        // Build the image portrait by setting all the relevant attributes
        image.setAttribute('src', prophet.imageurl);
        image.setAttribute('alt', `Portrait of ${prophet.firstName} ${prophet.lastName}`); // fill in the blank
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        card.appendChild(h2);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(image);

        cards.appendChild(card);
    });
};
