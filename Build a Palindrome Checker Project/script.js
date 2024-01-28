const button = document.getElementById("check-btn");
const input = document.getElementById("text-input");
const result = document.getElementById("result");
button.addEventListener("click", (event) => {
  event.preventDefault();
  if (input.value === "") {
    alert("Please input a value");
  } else {
    engine(input.value);
  }
});
function engine(str) {
  const alphaNumeric = /[a-zA-Z0-9]/g;
  const straightStr = str.match(alphaNumeric);
  const reverseStr = str.match(alphaNumeric).reverse();
  if (
    JSON.stringify(straightStr).toLowerCase() ===
    JSON.stringify(reverseStr).toLowerCase()
  ) {
    result.innerText = `${str} is a palindrome`;
  } else {
    result.innerText = `${str} is not a palindrome`;
  }
}
