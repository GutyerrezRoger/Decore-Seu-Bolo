// script.js

// Abrir e fechar modal
function openModal() {
  document.getElementById("cakeWizard").style.display = "flex";
}

function closeModal() {
  document.getElementById("cakeWizard").style.display = "none";
}

// Controle de passos
let currentStep = 1;
const steps = document.querySelectorAll(".step");

function showStep(stepNumber) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === stepNumber - 1);
  });
  currentStep = stepNumber;
}

// Botões "Próximo"
document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Exemplo para o Passo 1
    if (currentStep === 1) {
      const massaSelecionada = document.getElementById("massa").value;
      if (massaSelecionada === "") {
        alert("Por favor, selecione uma massa.");
        return; // Impede o avanço do passo
      }
    }
    // Adicione a validação para os outros passos aqui (recheio e cobertura)

    if (currentStep < steps.length) {
      showStep(currentStep + 1);
    }
  });
});

// Botões "Voltar"
document.querySelectorAll(".prev-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });
});

// Botão "Recomeçar"
document.querySelectorAll(".restart-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("massa").value = "";
    document.getElementById("recheio").value = "";
    document.getElementById("cobertura").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("resumoFinal").innerHTML = "";
    document.getElementById("precoFinal").textContent = "0,00";
    showStep(1);
  });
});

// Atualiza resumo e preço no passo 4
function updateResumo() {
  const massa = document.getElementById("massa").value;
  const recheio = document.getElementById("recheio").value;
  const cobertura = document.getElementById("cobertura").value;
  const peso = document.getElementById("peso").value;
  
  // Atualiza resumo do pedido
  document.querySelector(".summary").innerHTML = `
    <p><strong>Massa:</strong> ${massa || "Não selecionado"}</p>
    <p><strong>Recheio:</strong> ${recheio || "Não selecionado"}</p>
    <p><strong>Cobertura:</strong> ${cobertura || "Não selecionado"}</p>
    <p><strong>Peso:</strong> ${peso || "Não selecionado"}</p>
  `;

  // Controle de exibição do preço
  const priceContainer = document.getElementById("price-container");
  
  if (peso) {
    let preco = 0;
    if (peso === "1kg") preco = 60;
    if (peso === "0.5kg") preco = 35;
    priceContainer.innerText = `Preço: R$ ${preco.toFixed(2)}`;
    priceContainer.style.display = "block";
  } else {
    priceContainer.style.display = "none";
  }
}



