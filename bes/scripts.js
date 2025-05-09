const courses = [
  { code: 'CSE 110', name: 'Introduction to Programming', credits: 3, category: 'CSE', completed: true },
  { code: 'CSE 111', name: 'Programming with Functions', credits: 3, category: 'CSE', completed: true },
  { code: 'CSE 210', name: 'Object-Oriented Programming', credits: 3, category: 'CSE', completed: false },
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 3, category: 'WDD', completed: true },
  { code: 'WDD 131', name: 'Responsive Web Design', credits: 3, category: 'WDD', completed: false },
  { code: 'WDD 231', name: 'Front-End Development', credits: 3, category: 'WDD', completed: false }
];

const coursesContainer = document.querySelector('.courses');
const creditDisplay = document.createElement('p');
creditDisplay.style.textAlign = 'center';
creditDisplay.style.marginTop = '1rem';
coursesContainer.parentNode.appendChild(creditDisplay);

function displayCourses(filteredCourses) {
  coursesContainer.innerHTML = ''; // Clear previous
  let totalCredits = 0;

  filteredCourses.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    div.classList.add(course.category.toLowerCase());

    // Apply different style if completed
    if (course.completed) {
      div.classList.add('completed');
    }

    div.innerHTML = `<strong>${course.code}</strong><br>${course.name}<br>${course.credits} credits`;
    coursesContainer.appendChild(div);

    totalCredits += course.credits;
  });

  creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}

function filterCourses(category) {
  if (category === 'all') {
    displayCourses(courses);
  } else {
    const filtered = courses.filter(course => course.category.toLowerCase() === category.toLowerCase());
    displayCourses(filtered);
  }
}

// Initial display
displayCourses(courses);

// Button listeners
document.querySelector('button[data-filter="all"]').addEventListener('click', () => filterCourses('all'));
document.querySelector('button[data-filter="cse"]').addEventListener('click', () => filterCourses('cse'));
document.querySelector('button[data-filter="wdd"]').addEventListener('click', () => filterCourses('wdd'));
