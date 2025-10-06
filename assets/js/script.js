'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);

class Project {
  constructor({
    title,
    description,
    category,
    href,
    imgSrc,
    imgAlt = null
  }) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.href = href;
    this.img = {
      src: imgSrc,
      alt: imgAlt || title // Use title as fallback for alt text
    };
  }

  // Static method to create project from object
  static fromObject(projectData) {
    return new Project({
      title: projectData.title,
      description: projectData.description,
      category: projectData.category,
      href: projectData.href,
      imgSrc: projectData.img?.src,  // use nested value
      imgAlt: projectData.img?.alt
    });
  }

  // Method to convert project to HTML string
  toHTML() {
    return `
    <li
      class="project-item active"
      data-filter-item
      data-category="${this.category}"
    >
      <a
        href="${this.href}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
            <div class="project-item-img-box">
          <img
            src="${this.img.src}"
            alt="${this.img.alt}"
            loading="lazy"
          />
            </div>
        </figure>
        <h3 class="project-title">
          ${this.title}
        </h3>
        <p class="project-category">
          ${this.description}
        </p>
      </a>
    </li>
    `;
  }


  // Method to get project data as plain object
  toObject() {
    return {
      title: this.title,
      description: this.description,
      category: this.category,
      href: this.href,
      img: { ...this.img }
    };
  }

  // Method to update project properties
  update(updates) {
    Object.assign(this, updates);

    // Handle img updates specially
    if (updates.imgSrc) {
      this.img.src = updates.imgSrc;
    }
    if (updates.imgAlt) {
      this.img.alt = updates.imgAlt;
    }
  }

  // Method to validate project data
  isValid() {
    return this.title &&
      this.description &&
      this.category &&
      this.href &&
      this.img.src;
  }
}

const projects = [
  {
    title: "Dictionary App",
    description: "A word based dictionary that allows you to have your own set of words using FreeDictionaryAPI.",
    category: "gui projects",
    href: "https://github.com/Bahadorrj/Dictionary-App",
    img: {
      src: "assets/images/projects/dict.png",
      alt: "Dictionary App"
    },
  },
  {
    title: "Minesweeper Game",
    description: "Mine Sweeper game with AI completions",
    category: "featured tools",
    href: "https://github.com/Bahadorrj/Mine-Sweeper",
    img: {
      src: "assets/images/projects/mine_sweeper.png",
      alt: "Minesweeper"
    },
  },
  {
    title: "Music Selector",
    description: "A song selection app for choosing your favorite song from available songs list",
    category: "web development",
    href: "https://github.com/Bahadorrj/Song-Selector-App",
    img: {
      src: "assets/images/projects/music.jpeg",
      alt: "Song Selector"
    },
  },
];

function displayAllProjects(projectsArray) {
  const projectsHTML = projectsArray
    .map(p => Project.fromObject(p))
    .map(project => project.toHTML())
    .join('');

  document.querySelector('.project-list').innerHTML = projectsHTML;
}


displayAllProjects(projects)




// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting in the default way

  // Show the popup (you can style this to your preference)
  document.getElementById('popupMessage').style.display = 'block';

  // Send the form data using Fetch API
  const formData = new FormData(event.target);

  fetch(event.target.action, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      // Handle successful submission (if needed)
      console.log('Form successfully submitted!', response);
    })
    .catch(error => {
      // Handle errors (if any)
      console.error('Error submitting form:', error);
    });
});

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// // add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }

//   });
// }

// Contact Form Handler with Success Assurance
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.popup = document.getElementById('popupMessage');
    this.submitBtn = document.querySelector('[data-form-btn]');
    this.inputs = document.querySelectorAll('[data-form-input]');

    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));

      // Add real-time validation
      this.inputs.forEach(input => {
        input.addEventListener('blur', this.validateField.bind(this));
        input.addEventListener('input', this.clearError.bind(this));
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields before submission
    if (!this.validateAllFields()) {
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);

      // Submit to FormCarry
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.showSuccess();
        this.resetForm();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      this.showError(error.message);
    } finally {
      this.setLoadingState(false);
    }
  }

  validateAllFields() {
    let isValid = true;

    this.inputs.forEach(input => {
      if (!this.validateField({ target: input })) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    this.clearError(e);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = `${this.getFieldLabel(field)} is required`;
      isValid = false;
    }

    // Email validation
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Name validation (no numbers or special characters)
    else if (field.name === 'fullname' && value) {
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      if (!nameRegex.test(value)) {
        errorMessage = 'Name should only contain letters, spaces, hyphens, and apostrophes';
        isValid = false;
      }
    }

    // Message length validation
    else if (field.name === 'message' && value && value.length < 10) {
      errorMessage = 'Message should be at least 10 characters long';
      isValid = false;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';

    field.parentNode.appendChild(errorDiv);
  }

  clearError(e) {
    const field = e.target;
    field.classList.remove('error');

    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  getFieldLabel(field) {
    switch (field.name) {
      case 'fullname': return 'Full name';
      case 'email': return 'Email address';
      case 'message': return 'Message';
      default: return 'This field';
    }
  }

  setLoadingState(isLoading) {
    const buttonText = this.submitBtn.querySelector('span');
    const buttonIcon = this.submitBtn.querySelector('ion-icon');

    if (isLoading) {
      this.submitBtn.disabled = true;
      buttonText.textContent = 'Sending...';
      buttonIcon.name = 'hourglass-outline';
      this.submitBtn.style.opacity = '0.7';
      this.showPopup('Your message is being sent...', 'info');
    } else {
      this.submitBtn.disabled = false;
      buttonText.textContent = 'Send Message';
      buttonIcon.name = 'paper-plane';
      this.submitBtn.style.opacity = '1';
    }
  }

  showSuccess() {
    this.showPopup('✅ Message sent successfully! I\'ll get back to you soon.', 'success');

    // Optional: Hide form and show thank you message
    // this.form.style.display = 'none';
    // this.showThankYouMessage();
  }

  showError(errorMessage) {
    this.showPopup(`❌ Failed to send message. ${errorMessage}. Please try again.`, 'error');
  }

  showPopup(message, type = 'info') {
    const popup = this.popup;
    const messageP = popup.querySelector('p');

    messageP.textContent = message;

    // Style based on type
    popup.style.display = 'block';
    popup.style.padding = '1rem';
    popup.style.borderRadius = '0.5rem';
    popup.style.marginTop = '1rem';
    popup.style.border = '1px solid';

    switch (type) {
      case 'success':
        popup.style.backgroundColor = '#d4edda';
        popup.style.borderColor = '#c3e6cb';
        popup.style.color = '#155724';
        break;
      case 'error':
        popup.style.backgroundColor = '#f8d7da';
        popup.style.borderColor = '#f5c6cb';
        popup.style.color = '#721c24';
        break;
      default:
        popup.style.backgroundColor = '#d1ecf1';
        popup.style.borderColor = '#bee5eb';
        popup.style.color = '#0c5460';
    }

    // Auto-hide after 5 seconds (except for errors)
    if (type !== 'error') {
      setTimeout(() => {
        popup.style.display = 'none';
      }, 5000);
    }
  }

  resetForm() {
    this.form.reset();

    // Clear any remaining error states
    this.inputs.forEach(input => {
      input.classList.remove('error');
      const errorMessage = input.parentNode.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    });
  }

  showThankYouMessage() {
    const thankYou = document.createElement('div');
    thankYou.className = 'thank-you-message';
    thankYou.innerHTML = `
      <h3>Thank You!</h3>
      <p>Your message has been sent successfully. I'll get back to you as soon as possible.</p>
      <button onclick="location.reload()" class="form-btn">Send Another Message</button>
    `;
    thankYou.style.textAlign = 'center';
    thankYou.style.padding = '2rem';

    this.form.parentNode.appendChild(thankYou);
  }
}

// Alternative: Simple function-based approach
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('popupMessage');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Basic validation
    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!fullname || !email || !message) {
      showMessage('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading
    const submitBtn = form.querySelector('[data-form-btn]');
    const originalText = submitBtn.querySelector('span').textContent;
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        throw new Error('Server error');
      }

    } catch (error) {
      showMessage('❌ Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.querySelector('span').textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function showMessage(text, type) {
    const messageP = popup.querySelector('p');
    messageP.textContent = text;
    popup.style.display = 'block';

    // Style based on type
    if (type === 'success') {
      popup.style.color = '#5bc8bb';
    } else if (type === 'error') {
      popup.style.color = '#dc3545';
    }

    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => {
        popup.style.display = 'none';
      }, 5000);
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// Initialize the form handler
document.addEventListener('DOMContentLoaded', function () {
  // Choose one approach:

  // Option 1: Class-based (more features)
  // new ContactFormHandler();

  // Option 2: Simple function (basic functionality)
  setupContactForm();
});

// Additional CSS for error states (add to your stylesheet)
const additionalCSS = `
.form-input.error {
  border-color: #ff6b6b !important;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
}

.error-message {
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.thank-you-message {
  background: #f8f9fa;
  border-radius: 0.5rem;
  margin-top: 1rem;
}
`;



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
