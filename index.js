const currencyAPI = "http://api.nbp.pl/api/exchangerates/tables/a/";

const inputCurrency = document.querySelector("#cur-amount");
const CurrButton = document.querySelector("#exchange");
const curSelect = document.querySelector("#cur-select");
const exchValue = document.querySelector("#exch-value");

const GetCurrencyList = () => {
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
const plusValue = () => {
	if (inputCurrency.value < 0) {
		alert("wpisz prawidłową wartość");
        exchValue.innerText = ""

		inputCurrency.value = 0;
	} else {
        exchValue.innerText = ""
		GetCurrencyList();
        
	}
};

CurrButton.addEventListener("click", plusValue);

const exchangeAmount = document.createElement("span");
