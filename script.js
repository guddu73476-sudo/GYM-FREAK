
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Membership selection
const planSelect = document.getElementById("plan");

document.querySelectorAll(".select-plan").forEach((button) => {
  button.addEventListener("click", () => {
    planSelect.value = button.dataset.plan;

    document.getElementById("join").scrollIntoView({
      behavior: "smooth"
    });

    document.getElementById("name").focus({
      preventScroll: true
    });
  });
});

// Demo membership enquiry form
const joinForm = document.getElementById("joinForm");
const formNote = document.getElementById("formNote");

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const plan = planSelect.value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email) {
    formNote.textContent = "Please fill in your name and email.";
    return;
  }

  // Create an enquiry draft for the user.
  const enquiry = [
    "IRONFORGE FITNESS - MEMBERSHIP ENQUIRY",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Selected Plan: ${plan}`,
    `Message: ${message || "No additional message"}`
  ].join("\n");

  formNote.textContent =
    "Your enquiry draft is ready. Choose how you want to send it.";

  // Display a copy option and an email option.
  let actions = document.getElementById("enquiryActions");

  if (!actions) {
    actions = document.createElement("div");
    actions.id = "enquiryActions";
    actions.className = "hero-buttons";
    actions.style.marginTop = "12px";
    formNote.insertAdjacentElement("afterend", actions);
  }

  actions.replaceChildren();

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "btn btn-outline";
  copyButton.textContent = "COPY ENQUIRY";

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(enquiry);
      formNote.textContent = "Enquiry copied successfully!";
    } catch {
      formNote.textContent =
        "Copy unavailable. Please select and copy the enquiry details manually.";
    }
  });

  const emailButton = document.createElement("a");
  emailButton.className = "btn btn-primary";
  emailButton.textContent = "OPEN EMAIL APP ↗";

  // Replace this placeholder with the real gym email address.
  const gymEmail = "yourgym@example.com";

  emailButton.href =
    `mailto:${gymEmail}?subject=${encodeURIComponent("Gym Membership Enquiry")}` +
    `&body=${encodeURIComponent(enquiry)}`;

  actions.append(copyButton, emailButton);
});

// Automatically update the footer year
document.getElementById("year").textContent =
  new Date().getFullYear();
