const btn = document.querySelector("button");
const select = document.querySelector(".convert");
const title = document.querySelector(".title");
const input = document.querySelector("input");
let value;
let bid;

const convert = () => {
    const input = document.querySelector("input");
    const realValue = document.querySelector(".real-value");
    const convertValue = document.querySelector(".convert-value");
    const img = document.querySelector(".country-img");
    const inputValue = input.value;
    realValue.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(input.value);

    if (select.value === "dolar") {
        convertValue.innerHTML = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
        }).format(inputValue / bid);
        img.src = "assets/united-states.png";
        title.innerHTML = "Dolar Americano";
    }

    if (select.value === "euro") {
        convertValue.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(inputValue / bid);
        img.src = "assets/euro.png";
        title.innerHTML = "Euro";
    }

    if (select.value === "bitcoin") {
        convertValue.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC",
        }).format(inputValue / bid / 100);
        img.src = "assets/bitcoin.png";
        title.innerHTML = "Bitcoin";
    }

    // input.addEventListener("change", convert);
};

btn.addEventListener("click", convert);

select.addEventListener("change", (event) => {
    if (event.target.value === "dolar") value = "USD-BRL";
    else if (event.target.value === "euro") value = "EUR-BRL";
    else if (event.target.value === "bitcoin") value = "BTC-BRL";
    dados(value);
    convert();
});

const dados = async (tax) => {
    const data = await fetch(` https://economia.awesomeapi.com.br/last/${tax}`)
        .then((response) => response.json())
        .then((dados) => dados[tax.replace("-", "")].bid);
    console.log(data);
    bid = data;
};
