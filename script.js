const form = document.getElementById("surveyForm");
const submitButton = document.getElementById("submitButton");
const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");
const roundInput = document.getElementById("round");
const sharpInput = document.getElementById("sharp");

[roundInput, sharpInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^a-zA-Z]/g, "").slice(0, 5).toLowerCase();
  });
});

function selected(name) {
  return form.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function addHidden(name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  input.dataset.generated = "true";
  form.appendChild(input);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorBox.hidden = true;
  successBox.hidden = true;

  const errors = [];
  const english = selected("english_ui");
  const us = selected("us_ui");
  const linguistics = selected("ling_ui");
  const round = roundInput.value.trim().toLowerCase();
  const sharp = sharpInput.value.trim().toLowerCase();

  if (!document.getElementById("consent").checked) errors.push("Please confirm the consent statement.");
  if (!english) errors.push("Please answer the English-language question.");
  if (!us) errors.push("Please answer the U.S.-childhood question.");
  if (!linguistics) errors.push("Please answer the linguistics question.");
  if (!/^[a-z]{4,5}$/.test(round)) errors.push("The round string must contain exactly 4–5 English letters.");
  if (!/^[a-z]{4,5}$/.test(sharp)) errors.push("The sharp string must contain exactly 4–5 English letters.");
  if (round && sharp && round === sharp) errors.push("Please use different strings for round and sharp.");

  if (errors.length) {
    errorBox.textContent = errors.join("\n");
    errorBox.hidden = false;
    return;
  }

  form.querySelectorAll('[data-generated="true"]').forEach((el) => el.remove());
  form.action = FORM_CONFIG.FORM_ACTION;

  addHidden(FORM_CONFIG.ENTRY_ENGLISH, english);
  addHidden(FORM_CONFIG.ENTRY_US_CHILDHOOD, us);
  addHidden(FORM_CONFIG.ENTRY_LINGUISTICS, linguistics);
  addHidden(FORM_CONFIG.ENTRY_ROUND, round);
  addHidden(FORM_CONFIG.ENTRY_SHARP, sharp);

  submitButton.disabled = true;
  submitButton.textContent = "Submitting…";
  form.submit();

  setTimeout(() => {
    form.reset();
    form.querySelectorAll('[data-generated="true"]').forEach((el) => el.remove());
    successBox.textContent = "Thank you! Your anonymous response has been recorded.";
    successBox.hidden = false;
    submitButton.disabled = false;
    submitButton.textContent = "Submit anonymous response";
    successBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 900);
});