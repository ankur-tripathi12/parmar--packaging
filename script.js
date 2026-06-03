// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");

  if (navLinks) {
    navLinks.classList.toggle("show");
  }
}
// Product filter + section-wise numbering
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

function updateProductNumbers(visibleProducts) {
  visibleProducts.forEach((product, index) => {
    const numberBox = product.querySelector(".product-number");

    if (numberBox) {
      numberBox.textContent = String(index + 1).padStart(2, "0");
    }
  });
}

function filterProducts(filter) {
  const visibleProducts = [];

  products.forEach((product) => {
    const shouldShow = filter === "all" || product.classList.contains(filter);

    if (shouldShow) {
      product.style.display = "block";
      product.classList.remove("hide-product");

      // Restart animation every time category changes
      void product.offsetWidth;
      product.classList.add("show-product");

      visibleProducts.push(product);
    } else {
      product.classList.remove("show-product");
      product.classList.add("hide-product");

      setTimeout(() => {
        product.style.display = "none";
      }, 250);
    }
  });

  updateProductNumbers(visibleProducts);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;
    filterProducts(filter);
  });
});

// Number all products correctly on page load
updateProductNumbers([...products]);

// Close mobile menu when clicking any nav link
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("show");
    }
  });
});

// Active navbar link on scroll
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});