const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
async function getProphetData(url) { // async function to fetch data
    
  const response = await fetch(url); // request
    const data = await response.json(); // parse the JSON data
    displayProphets(data.prophets); // Call function with the prophets array
  }
getProphetData(); // Call the function to fetch and display data

  //console.log(data);
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => { // temp output test of data response 

        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let name = document.createElement('p');
        let lastname = document.createElement('p');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        let order = document.createElement('p');
        let lenght = document.createElement('p');
        let image = document.createElement('img');
        let death = document.createElement('p');
        

        // Set content
    h2.textContent = `${prophet.name} ${prophet.lastname}`;
    birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
    death.textContent = `Number of Children: ${prophet.numofchildren}`;
    order.textContent = `Order: ${prophet.order}`;
    lenght.textContent = `Length of Service: ${prophet.lengthofservice}`;
        
        // Build the h2 content out to show the prophet's full name
        h2.textContent = `${prophet.nameame} ${prophet.lastName}`; // Set the full name

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
        card.appendChild(name);
        card.appendChild(lastname);
        card.appendChild(order);
        card.appendChild(lenght);
        card.appendChild(death);

        cards.appendChild(card);
    });
};

getProphetData(); // Call the function to fetch and display data