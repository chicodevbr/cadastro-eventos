let validador = {
  handleSubmit: (event) => {
    event.preventDefault();
    let cadastrar = true;

    let inputs = cadastro.querySelectorAll("input");

    validador.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = validador.checkInput(input);
      if (check !== true) {
        cadastrar = false;
        validador.showError(input, check);
      }
    }

    if (cadastrar) {
      cadastro.submit();
    }
  },

  checkInput: (input) => {
    let rules = input.getAttribute("data-rules");
    let agora = new Date();
    let dateEvent = document.getElementById("data_evento");
    let futuro = new Date(dateEvent.value);
    let diasAgora = agora.getTime();
    let diasFuturo = futuro.getTime();

    if (rules !== null) {
      rules = rules.split("|");
      for (let k in rules) {
        let rulesDetails = rules[k].split("=");

        switch (rulesDetails[0]) {
          case "required":
            if (input.value == "") {
              return "Campo obrigatório";
            }
            break;
          case "min":
            if (input.value.length < rulesDetails[1]) {
              return `O campo deve ter no mínimo ${rulesDetails[1]} caracteres.`;
            }
            break;
          case "data":
            if (diasAgora > diasFuturo) {
              return "Data inválida";
            }
            break;
          case "vagas":
            if (vagasDisponiveis === 0) {
              return "Desculpe, mas o evento já está lotado";
            }
        }
      }
    }

    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = "#FF0000";

    let errorElement = document.createElement("div");
    errorElement.classList.add("error");
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.ElementSiblingpapla);
  },

  clearErrors: () => {
    let inputs = cadastro.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = "";
    }

    let errorElements = document.querySelectorAll(".error");
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  },
};

let vagas = 100;
let cadastrados = ["João"];
let vagasDisponiveis = vagas - cadastrados.length;

let displayVagas = document.querySelector(".displayVagas");
displayVagas.innerText = vagas;

let displayVagasRestantes = document.querySelector(".displayVagasRestantes");
displayVagasRestantes.innerText = vagasDisponiveis;

let cadastro = document.querySelector(".valida");
cadastro.addEventListener("submit", validador.handleSubmit);
