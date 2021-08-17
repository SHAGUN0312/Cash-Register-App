var billAmt = document.querySelector("#billAmt");
var cashAmt = document.querySelector("#cashAmt");
var cashGiven = document.querySelector("#cashGiven");

var nextBtn = document.querySelector("#next");
var checkBtn = document.querySelector("#check");

var output = document.querySelector(".result");

var errorMsg = document.querySelector(".error");

var noOfNotes = document.querySelectorAll(".notes");

var data = [2000, 500, 100, 20, 10, 5, 1];

nextBtn.addEventListener("click", () => {
  clearErr();
  if (Number(billAmt.value > 0)) {
    nextBtn.style.display = "none";
    cashGiven.style.display = "block";
  } else {
    showErr("Please Enter a valid Bill Amount.");
  }
});

checkBtn.addEventListener("click", () => {
  clearErr();
  clearCache();
  if (billAmt.value > 0 && cashAmt.value > 0) {
    if (!Number.isInteger(Number(cashAmt.value))) {
      showErr("Enter valid Cash Amount");
      return;
    }
    if (Number(billAmt.value) > Number(cashAmt.value)) {
      showErr(
        "Looks like the Cash amount is less than the Bill. Please enter the right amount."
      );
      return;
    }
    result(billAmt.value, cashAmt.value);
  } else {
    showErr("Enter valid inputs to continue");
  }
});

//calculate change
function result(bill, cash) {
  var change = cash - bill;
  if (change < 1) {
    showErr("No Change Pending");
    return;
  }
  output.style.display = "block";

  for (var i = 0; i < data.length; i++) {
    change = calculate(change, data[i], i);
  }
}

//calculate minimum number of notes

function calculate(remainder, noteValue, index) {
  if (remainder >= noteValue) {
    var num = Math.floor(remainder / noteValue);
    remainder = remainder - noteValue * num;
    noOfNotes[index].innerText = `${num}`;
  }
  return remainder;
}

//Error Handling

function showErr(msg) {
  errorMsg.style.display = "block";
  errorMsg.innerText = msg;
  output.style.display = "none";
}

function clearErr() {
  errorMsg.style.display = "none";
}

//Refresh
function clearCache() {
  for (let notes of noOfNotes) {
    notes.innerText = "";
  }
}
