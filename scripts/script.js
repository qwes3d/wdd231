// Responsive menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Dynamic last modified
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;

// Course array
const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "CSE 110", name: "Introduction to Programming", credits: 2, completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: false },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: false },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: false },
  { code: "WDD 231", name: "Front-end Development I", credits: 3, completed: false }
];

// DOM elements
const courseContainer = document.querySelector('.courses');
const creditDisplay = document.createElement('p');
courseContainer.insertAdjacentElement('afterend', creditDisplay);

// Display courses
function displayCourses(courseList) {
  courseContainer.innerHTML = ''; // clear
  let totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  
  courseList.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    div.textContent = `${course.code}: ${course.name} (${course.credits} credits)`;
    if (course.completed) {
      div.classList.add('completed'); // different style for completed
    }
    courseContainer.appendChild(div);
  });
  
  creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}

// Initial display: All courses
displayCourses(courses);

// Filter buttons
document.querySelectorAll('.filter-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.textContent.toLowerCase();
    if (filter === 'all') {
      displayCourses(courses);
    } else {
      const filtered = courses.filter(course => course.code.startsWith(filter.toUpperCase()));
      displayCourses(filtered);
    }
  });
});
