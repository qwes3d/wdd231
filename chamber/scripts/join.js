
    // Timestamp setup
    document.getElementById("timestamp").value = new Date().toISOString();

    function openModal(id) {
      document.getElementById(id).style.display = "block";
    }

    function closeModal(id) {
      document.getElementById(id).style.display = "none";
    }

    window.onclick = function(event) {
      document.querySelectorAll(".modal").forEach(modal => {
        if (event.target === modal) modal.style.display = "none";
      });
    };


  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

