const incomeTable = [];
const spendTable = [];

const nameIncomeInput = document.querySelector("#income-name");
const amountIncomeInput = document.querySelector("#income-amount");
const submitInput = document.querySelector("#form-submit");
const nameSpendInput = document.querySelector("#spend-name");
const amountSpendInput = document.querySelector("#spend-amount");
const incomeList = document.querySelector("#incomeList");
const spendList = document.querySelector("#spendList");
const incomeForm = document.querySelector("#income-form");
const spendForm = document.querySelector("#spend-form");
const incomeListCont = document.querySelector(".income-list-cont");
const spendListCont = document.querySelector(".spend-list-cont");
const totalIncomeAmount = document.querySelector("#totalIncomeAmount");
const totalSpendAmount = document.querySelector("#totalSpendAmount");
const totalCounter = document.querySelector("#totalCounter");

incomeForm.addEventListener("submit", function (event) {
	//wysyla submit dofunkcji izaprzestaje odswiezania
	event.preventDefault();
	let insideTableIncome = {
		//tworzy tablice glowna income
		id: Math.random(),
		Name: nameIncomeInput.value,
		Amount: amountIncomeInput.value,
	};
	incomeTable.push(insideTableIncome); //wysyla elementy do tablicy Income
	addIncome();

	sumTotal();
});

const sumTotal = () => {
	let przychody = 0;
	for (let i = 0; i < incomeTable.length; i++) {
		przychody += Number(incomeTable[i].Amount);
	}
	totalIncomeAmount.innerHTML = przychody;

	let wydatki = 0;
	for (let i = 0; i < spendTable.length; i++) {
		wydatki += Number(spendTable[i].Amount);
	}
	totalSpendAmount.innerHTML = wydatki;

	let roznica = 0;
	roznica = przychody - wydatki;
	if (roznica > 0) {
		totalCounter.innerHTML = `Jesteś na plusie ${roznica} zł`;
	} else if (roznica < 0) {
		totalCounter.innerHTML = `Jesteś na minusie ${roznica} zł`;
	} else if (roznica === 0) {
		totalCounter.innerHTML = `Jestes na zero `;
	}
};

spendForm.addEventListener("submit", function (event) {
	event.preventDefault();
	let insideTableSpend = {
		id: Math.random(),
		Name: nameSpendInput.value,
		Amount: amountSpendInput.value,
	};
	spendTable.push(insideTableSpend);
	addSpend();

	sumTotal();
});

const addIncome = () => {
	incomeListCont.innerHTML = "";

	incomeTable.forEach((element, index) => {
		let inputName = element.Name;
		let inputAmount = element.Amount;

		const listTextCont = document.createElement("div");
		const listElement = document.createElement("li");
		const listAmount = document.createElement("span");
		const listText = document.createElement("span");
		const listEdit = document.createElement("button");
		const listDelete = document.createElement("button");

		listElement.id = element.id;

		listEdit.id = "buttonEdit";
		listEdit.textContent = "✏️";
		listDelete.id = "buttonDelete";
		listDelete.textContent = "❌";

		listText.textContent = inputName;
		listAmount.textContent = inputAmount;
		listAmount.classList.add("spanAmount");

		listTextCont.appendChild(listText);
		listTextCont.appendChild(listAmount);
		listElement.appendChild(listTextCont);
		listElement.appendChild(listEdit);
		listElement.appendChild(listDelete);
		incomeListCont.appendChild(listElement);

		listDelete.addEventListener("click", () => {
			deleteItems(incomeTable[index], "income");
		});

		listEdit.addEventListener("click", () => {
			listTextCont.innerHTML = "";
			listEdit.classList.add("not-visible");
			listDelete.classList.add("not-visible");

			const nameEdit = document.createElement("input");
			const AmountEdit = document.createElement("input");

			nameEdit.value = element.Name;
			AmountEdit.value = element.Name;
			AmountEdit.type = "number";
			

			listTextCont.appendChild(nameEdit);
			listTextCont.appendChild(AmountEdit);
		});
	});

	nameIncomeInput.value = "";
	amountIncomeInput.value = "";
};

const addSpend = () => {
	let spendName = nameSpendInput.value;
	let spendAmount = amountSpendInput.value;

	const listElement = document.createElement("li");
	const listAmount = document.createElement("span");
	const listText = document.createElement("span");
	const listEdit = document.createElement("button");
	const listDelete = document.createElement("button");

	listEdit.id = "buttonEdit";
	listEdit.textContent = "✏️";
	listDelete.id = "buttonDelete";
	listDelete.textContent = "❌";

	listText.textContent = spendName;
	listAmount.textContent = spendAmount;
	listAmount.classList.add("spanAmountSpend");

	listElement.appendChild(listText);
	listElement.appendChild(listAmount);
	listElement.appendChild(listEdit);
	listElement.appendChild(listDelete);
	spendListCont.appendChild(listElement);

	nameSpendInput.value = "";
	amountSpendInput.value = "";
};

const deleteItems = (item, type) => {
	if (type === "income") {
		const itemToRemove = incomeTable.findIndex(
			(income) => income.id == item.id
		);
		incomeTable.splice(itemToRemove, 1);

		addIncome();
		sumTotal();
	} else {
		const itemToRemove = spendTable.findIndex(
			(expence) => expence.id == item.id
		);
		spendTable.splice(itemToRemove, 1);

		addSpend();
		sumTotal();
	}
};
