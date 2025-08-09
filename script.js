// script.js

// Tabela de preços baseada no seu cardápio.
const precos = {
  "goiabada": { "0.5kg": 25.00, "1kg": 48.00 },
  "bananada": { "0.5kg": 25.00, "1kg": 48.00 },
  "goiabada-com-cobertura": { "0.5kg": 30.00, "1kg": 53.00 },
  "cafe": { "0.5kg": 35.00, "1kg": 65.00 },
  "chocolate": { "0.5kg": 35.00, "1kg": 65.00 },
  "doce-de-leite": { "0.5kg": 30.00, "1kg": 60.00 }, 
  "ninho": { "0.5kg": 30.00, "1kg": 60.00 },
  "limao": { "0.5kg": 35.00, "1kg": 65.00 },
  "maracuja": { "0.5kg": 35.00, "1kg": 65.00 },
  "red-velvet": { "0.5kg": 40.00, "1kg": 68.00 },
  "panetone": { "0.5kg": 45.00, "1kg": 75.00 },
  "doce-de-leite-com-ameixa": { "0.5kg": null, "1kg": 70.00 },
  "sensacao": { "0.5kg": 40.00, "1kg": 68.00 },
  "napolitano": { "0.5kg": 40.00, "1kg": 68.00 },
  "chocolatudo": { "0.5kg": 40.00, "1kg": 70.00 },
  "oreo": { "0.5kg": 40.00, "1kg": 68.00 },
};

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

// Validação e navegação para "Próximo"
document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Validação para o Passo 1 (Sabor)
    if (currentStep === 1) {
      const saborSelecionado = document.getElementById("sabor").value;
      if (saborSelecionado === "") {
        alert("Por favor, selecione um sabor.");
        return; 
      }
    }
    
    if (currentStep < steps.length) {
      showStep(currentStep + 1);
    }
  });
});

// Botão "Voltar"
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
    document.getElementById("sabor").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("resumoFinal").innerHTML = "";
    document.getElementById("price-container").classList.remove("show");
    showStep(1);
  });
});

// Função para atualizar resumo e preço no passo final
function updateSummaryAndPrice() {
  const sabor = document.getElementById("sabor").value;
  const peso = document.getElementById("peso").value;
  const priceContainer = document.getElementById("price-container");
  const resumoDiv = document.querySelector(".summary");
  
  // Atualiza o resumo
  resumoDiv.innerHTML = `
    <p><strong>Sabor:</strong> ${sabor || "Não selecionado"}</p>
    <p><strong>Peso:</strong> ${peso || "Não selecionado"}</p>
  `;

  // Calcula o preço
  if (sabor && peso && precos[sabor] && precos[sabor][peso]) {
    const preco = precos[sabor][peso];
    if (preco !== null) {
      priceContainer.innerText = `Preço: R$ ${preco.toFixed(2)}`;
      priceContainer.classList.add("show");
    } else {
      priceContainer.innerText = "Preço: Indisponível para este peso.";
      priceContainer.classList.add("show");
    }
  } else {
    priceContainer.classList.remove("show");
  }
}

// Event listeners para chamar a função de atualização
document.getElementById("sabor").addEventListener("change", updateSummaryAndPrice);
document.getElementById("peso").addEventListener("change", updateSummaryAndPrice);
