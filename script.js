const cardNumber = document.querySelector(".front-number");
const cardName = document.querySelector(".name");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const backNumber = document.querySelector(".back-number");

const form = document.querySelector(".form");
const formContainer = document.querySelector(".right-content");
const formCompleted = document.querySelector(".form-completed");
const inputName = document.querySelector(".input-name");
const inputNumber = document.querySelector(".input-card-number");
const inputMonth = document.querySelector(".input-month");
const inputYear = document.querySelector(".input-year");
const inputCvc = document.querySelector(".input-cvc");

const btnConfirm = document.getElementById("btn-confirm");
const btnContinue = document.getElementById("btn-continue");
const errorMessage = document.querySelectorAll(".error-message");

const numberRegex = /[^0-9]/g;
const nameRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ .]+$/;

const inputs = [inputName, inputNumber, inputMonth, inputYear, inputCvc];

for (const input of inputs) {
	input.addEventListener("focus", () => {
		input.classList.add("dirty");
	});
}

function cardNumberFun(e) {
	e.target.value =
		e.target.value
			.replace(/\D/g, "")
			.slice(0, 16)
			.match(/.{1,4}/g)
			?.join(" ") ?? "";
	cardNumber.textContent = e.target.value.trim();
}

function cardNameFun(e) {
	cardName.textContent = e.target.value.trim();
}

function cardMonthFun(e) {
	cardMonth.textContent = e.target.value.trim();
	inputMonth.value = e.target.value.replace(numberRegex, "");
}

function cardYearFun(e) {
	cardYear.textContent = e.target.value.trim();
	inputYear.value = e.target.value.replace(numberRegex, "");
}

function cardCvcFun(e) {
	backNumber.textContent = e.target.value.trim();
	inputCvc.value = e.target.value.replace(numberRegex, "");
}

function validateNumberFun(e) {
	const numberError = document.querySelector(".number-error");
	if (e.target.value == "") {
		numberError.textContent = "Can't be blank";
	} else if (e.target.value.length !== 19) {
		numberError.textContent = "Invalid number";
	} else {
		numberError.textContent = "";
	}
}

function validateNameFun(e) {
	const nameError = document.querySelector(".name-error");
	const isValid = nameRegex.test(e.target.value);
	if (e.target.value.trim() == "") {
		nameError.textContent = "Can't be blank";
	} else if (!isValid) {
		nameError.textContent = "invalid name";
	} else {
		nameError.textContent = "";
	}
}

function validateMonthYearFun(e) {
	const dateError = document.querySelector(".date-error");
	inputMonth.value = inputMonth.value
		? Math.min(12, Math.max(1, inputMonth.value)).toString().padStart(2, "0")
		: "";
	cardMonth.textContent = e.target.value;
	if (e.target.value == "") {
		dateError.textContent = "Can't be blank";
	} else if (e.target.value.length !== 2) {
		dateError.textContent = "invalid number";
	} else {
		dateError.textContent = "";
	}
}

function validateCvcFun(e) {
	const cvcError = document.querySelector(".cvc-error");
	if (e.target.value == "") {
		cvcError.textContent = "Can't be blank";
	} else if (e.target.value.length !== 3) {
		cvcError.textContent = "Invalid cvc";
	} else {
		cvcError.textContent = "";
	}
}

function submit(e) {
	e.preventDefault();
	for (let i = 0; i < errorMessage.length; i++) {
		if (errorMessage[i].textContent.trim() !== "") {
			return;
		}
	}

	if (form.checkValidity()) {
		formCompleted.classList.remove("hidden");
		formContainer.classList.add("hidden");
	} else {
		inputs.forEach((input) => input.reportValidity());
	}
}

function continueFun() {
	formContainer.classList.remove("hidden");
	formCompleted.classList.add("hidden");
	inputs.forEach((input) => {
		input.value = "";
		input.classList.remove("dirty");
	});
	cardNumber.textContent = "0000 0000 0000 0000";
	cardName.textContent = "Jane Appleseed";
	cardMonth.textContent = "00";
	cardYear.textContent = "00";
	backNumber.textContent = "000";
}

inputNumber.addEventListener("input", cardNumberFun);
inputName.addEventListener("input", cardNameFun);
inputMonth.addEventListener("input", cardMonthFun);
inputYear.addEventListener("input", cardYearFun);
inputCvc.addEventListener("input", cardCvcFun);

inputNumber.addEventListener("blur", validateNumberFun);
inputName.addEventListener("blur", validateNameFun);
inputMonth.addEventListener("blur", validateMonthYearFun);
inputYear.addEventListener("blur", validateMonthYearFun);
inputCvc.addEventListener("blur", validateCvcFun);

btnConfirm.addEventListener("click", submit);
btnContinue.addEventListener("click", continueFun);
