const btn = document.querySelector("button");
const selected = document.querySelector(".convert");
const title = document.querySelector(".title");
const input = document.querySelector("input");
const real = document.querySelector(".real-value ");
const converted = document.querySelector(".convert-value");
const img = document.querySelector(".country-img");

function verify(value) {
    if (value === "EUR") return value;
    else if (value === "USD") return value;
    else if (value === "BTC") return value;
}

function convert(value, dados) {
    real.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(input.value);

    if (value === "USD") {
        converted.innerHTML = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
        }).format(dados);
        title.innerHTML = "Dolar Americano";
        img.src = "assets/united-states.png";
    }

    if (value === "EUR") {
        converted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(dados);
        img.src = "assets/euro.png";
        title.innerHTML = "Euro";
    }

    if (value === "BTC") {
        converted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC",
        }).format(dados);
        img.src = "assets/bitcoin.png";
        title.innerHTML = "Bitcoin";
    }
}
async function finaly() {
    let selectValue = verify(selected.value);

    let value = await dados("BRL", selectValue, input.value);

    convert(selectValue, value.new_amount);
    valueFunction = { selectValue, value };
    // console.log(valueFunction);
}

btn.addEventListener("click", finaly);

selected.addEventListener("change", finaly);

const dados = async (have, want, amount) => {
    const data = await fetch(
        `https://api.api-ninjas.com/v1/convertcurrency?want=${want}&have=${have}&amount=${amount}`
    ).then((response) => response.json());

    return data;
};
