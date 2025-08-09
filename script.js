// script.js

// Tabela de preços baseada no seu cardápio.
// Adicionei os preços que você me passou, mas você precisa completar os que faltam!
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
        return; // Impede o avanço do passo
      }
    }
    
    // Avança para o próximo passo se a validação passar
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
    // Limpar as seleções e resetar o estado
    document.getElementById("sabor").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("resumoFinal").innerHTML = "";
    document.getElementById("price-container").style.display = "none";
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

  // Calcula o preço com base no objeto `precos`
  if (sabor && peso && precos[sabor] && precos[sabor][peso]) {
    const preco = precos[sabor][peso];
    // Adiciona um tratamento para o caso de preço não disponível (e.g., doce-de-leite-com-ameixa para 1/2kg)
    if (preco !== null) {
      priceContainer.innerText = `Preço: R$ ${preco.toFixed(2)}`;
      priceContainer.style.display = "block";
    } else {
      priceContainer.innerText = "Preço: Indisponível para este peso.";
      priceContainer.style.display = "block";
    }
  } else {
    // Esconder o preço se não houver seleção válida
    priceContainer.style.display = "none";
  }
}

// Chame a função de atualização sempre que uma seleção mudar
document.getElementById("sabor").addEventListener("change", updateSummaryAndPrice);
document.getElementById("peso").addEventListener("change", updateSummaryAndPrice);
