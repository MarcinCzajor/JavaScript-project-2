const currencyAPI = "https://api.nbp.pl/api/exchangerates/tables/a/";

const inputCurrency = document.querySelector("#cur-amount");
const currButton = document.querySelector("#exchange");
const curSelect = document.querySelector("#cur-select");
const exchValue = document.querySelector("#exch-value");

const convertCurrency = () => {
	const selectedValue = curSelect.value;
	fetch(currencyAPI)
		.then((response) => response.json())
		.then((data) => {
			const currecyTable = data[0].rates;
			const selectedCurrency = currecyTable.find(
				(item) => item.code === selectedValue
			);
			exchValue.innerText = (
				inputCurrency.value * selectedCurrency.mid
			).toFixed(2);
		})
		.catch((err) => {
			alert(err.message);
		});
};
const validateInputValue = () => {
	if (inputCurrency.value < 1) {
		alert("wpisz prawidłową wartość");

	} else {
		convertCurrency();
	}
	inputCurrency.value = 0;
	exchValue.innerText = "";
};

currButton.addEventListener("click", validateInputValue);

const exchangeAmount = document.createElement("span");
