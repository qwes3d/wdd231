import { courseList } from './courses.js';

const coursesContainer = document.querySelector('.courses');
const totalCreditsEl = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
  coursesContainer.innerHTML = '';

  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;

  filteredCourses.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    if (course.completed) {
      div.classList.add('completed');
    }

    div.innerHTML = `
      <h3>${course.subject} ${course.number}: ${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;

    coursesContainer.appendChild(div);
  });
}

function filterCourses(category) {
  if (category === 'all') {
    displayCourses(courseList);
  } else {
    const filtered = courseList.filter(course => course.subject.toLowerCase() === category.toLowerCase());
    displayCourses(filtered);
  }
}

document.querySelector('button[data-filter="all"]').addEventListener('click', () => filterCourses('all'));
document.querySelector('button[data-filter="cse"]').addEventListener('click', () => filterCourses('cse'));
document.querySelector('button[data-filter="wdd"]').addEventListener('click', () => filterCourses('wdd'));

// initially show all
displayCourses(courseList);
