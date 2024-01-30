const number = document.getElementById("number");
const output = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");

const compute = (num) => {
  console.log(num);
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
    compute(onlyIntegers);
  }
});
