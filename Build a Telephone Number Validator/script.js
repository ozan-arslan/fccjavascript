const input = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

checkButton.addEventListener("click", (event) => {
  event.preventDefault();
  const phoneNumber = input.value.trim();
  if (input.value === "") {
    alert("Please provide a phone number");
  } else {
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
    if (phoneRegex.test(phoneNumber)) {
      results.textContent = `Valid US number: ${phoneNumber}`;
    } else {
      results.textContent = `Invalid US number: ${phoneNumber}`;
    }
  }
});

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  results.textContent = "";
});

/* Valid Numbers
1 555-555-5555
1 (555) 555-5555
5555555555
555-555-5555
(555)555-5555
1(555)555-5555
1 555 555 5555
1 456 789 4444

*/
