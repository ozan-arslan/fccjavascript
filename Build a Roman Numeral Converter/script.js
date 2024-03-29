const number = document.getElementById("number");
const output = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");

const compute = (num) => {
  output.innerText = "";
  const roman = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  const arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  for (let i = 0; i < arabic.length; i++) {
    while (arabic[i] <= num) {
      num -= arabic[i];
      output.innerText += roman[i];
    }
  }
};

convertBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const onlyIntegers = number.value.match(/^-?\d+$/g);
  if (onlyIntegers === null) {
    output.innerText = "Please enter a valid number";
  } else if (onlyIntegers[0] < 1) {
    output.innerText = "Please enter a number greater than or equal to 1";
  } else if (onlyIntegers[0] > 3999) {
    output.innerText = "Please enter a number less than or equal to 3999";
  } else if (onlyIntegers > 0 && onlyIntegers < 4000) {
    compute(parseInt(onlyIntegers[0]));
  }
});
