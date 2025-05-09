import { courseList } from './courses.js';



//[
  //{ code: 'CSE 110', name: 'Introduction to Programming', credits: 3, category: 'CSE', completed: true },
  //{ code: 'CSE 111', name: 'Programming with Functions', credits: 3, category: 'CSE', completed: true },
  //{ code: 'CSE 210', name: 'Object-Oriented Programming', credits: 3, category: 'CSE', completed: false },
 // { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, category: 'WDD', completed: true },
 // { code: 'WDD 131', name: 'Responsive Web Design', credits: 3, category: 'WDD', completed: false },
 // { code: 'WDD 231', name: 'Front-End Development', credits: 3, category: 'WDD', completed: false }
//];

const coursesContainer = document.querySelector('.courses');
const creditDisplay = document.getElementById('total-credits');
creditDisplay.style.textAlign = 'center';
creditDisplay.style.marginTop = '1rem';
coursesContainer.parentNode.appendChild(creditDisplay);

// Function to display courses dynamically
function displayCourses(filteredCourses) {
  coursesContainer.innerHTML = ''; // Clear previous course cards
  let totalCredits = 0;

  filteredCourses.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    if (course.category && typeof course.category === 'string') {
    div.classList.add(course.category.toLowerCase());

    // Apply different style if the course is completed
    if (course.completed) {
      div.classList.add('completed'); // add 'completed' class to indicate completion
    }

    // Create inner HTML for each course card
    div.innerHTML = `
      <strong>${course.code}</strong><br>
      ${course.name}<br>
      ${course.credits} credits
    `;
    coursesContainer.appendChild(div);

    // Accumulate total credits of displayed courses
      totalCredits += course.credits;
      }
    });
  
    // Display the total credits dynamically
        creditDisplay.textContent = `Total Credits: ${totalCredits}`;
    }
 

// Function to filter courses based on category (e.g., CSE, WDD, All)
function filterCourses(category) {
  let filtered;
  
  // If the category is 'all', display all courses
  if (category === 'all') {
    filtered = courseList;
  } else {
    // Filter courses by the selected category
    filtered = courseList.filter(course => course.category.toLowerCase() === category.toLowerCase());
  }

  // Display the filtered courses
  displayCourses(filtered);
}

// Initial display
displayCourses(courseList);

// Button listeners
document.querySelector('button[data-filter="all"]').addEventListener('click', () => filterCourses('all'));
document.querySelector('button[data-filter="cse"]').addEventListener('click', () => filterCourses('cse'));
document.querySelector('button[data-filter="wdd"]').addEventListener('click', () => filterCourses('wdd'));

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {navMenu.classList.toggle('show')});