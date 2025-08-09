// script.js

// Tabela de preços expandida para incluir a opção de 2kg
const precos = {
  "goiabada": { "0.5kg": 25.00, "1kg": 48.00, "2kg": null }, 
  "bananada": { "0.5kg": 25.00, "1kg": 48.00, "2kg": null },
  "goiabada-com-cobertura": { "0.5kg": 30.00, "1kg": 53.00, "2kg": null },
  "cafe": { "0.5kg": 35.00, "1kg": 65.00, "2kg": 110.00 },
  "chocolate": { "0.5kg": 35.00, "1kg": 65.00, "2kg": 110.00 },
  "doce-de-leite": { "0.5kg": 30.00, "1kg": 60.00, "2kg": 100.00 },
  "ninho": { "0.5kg": 30.00, "1kg": 60.00, "2kg": 100.00 },
  "limao": { "0.5kg": 35.00, "1kg": 65.00, "2kg": 110.00 },
  "maracuja": { "0.5kg": 35.00, "1kg": 65.00, "2kg": 110.00 },
  "red-velvet": { "0.5kg": 40.00, "1kg": 68.00, "2kg": 120.00 },
  "panetone": { "0.5kg": 45.00, "1kg": 75.00, "2kg": 130.00 },
  "doce-de-leite-com-ameixa": { "0.5kg": null, "1kg": 70.00, "2kg": 125.00 },
  "sensacao": { "0.5kg": 40.00, "1kg": 68.00, "2kg": 120.00 },
  "napolitano": { "0.5kg": 40.00, "1kg": 68.00, "2kg": 120.00 },
  "chocolatudo": { "0.5kg": 40.00, "1kg": 70.00, "2kg": 125.00 },
  "oreo": { "0.5kg": 40.00, "1kg": 68.00, "2kg": 120.00 },
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

// Função para atualizar resumo e preço, e validar dinamicamente as opções de peso
function updateSummaryAndPrice() {
  const sabor = document.getElementById("sabor").value;
  const pesoSelect = document.getElementById("peso");
  const pesoAtual = pesoSelect.value;
  const priceContainer = document.getElementById("price-container");
  const resumoDiv = document.querySelector(".summary");

  // Limpa e recria as opções de peso com base no sabor selecionado
  pesoSelect.innerHTML = '<option value="">Selecione</option>';
  if (sabor && precos[sabor]) {
      const pesosDisponiveis = precos[sabor];
      for (const p in pesosDisponiveis) {
          if (pesosDisponiveis[p] !== null) {
              const option = document.createElement("option");
              option.value = p;
              option.textContent = p.replace("0.5kg", "1/2 kg").replace("1kg", "1 kg").replace("2kg", "2 kg");
              pesoSelect.appendChild(option);
          }
      }
      if (pesosDisponiveis[pesoAtual] !== null && pesoAtual !== "") {
          pesoSelect.value = pesoAtual;
      }
  }

  // Atualiza o resumo
  resumoDiv.innerHTML = `
    <p><strong>Sabor:</strong> ${sabor || "Não selecionado"}</p>
    <p><strong>Peso:</strong> ${pesoSelect.value.replace("0.5kg", "1/2 kg") || "Não selecionado"}</p>
  `;

  // Calcula o preço
  if (sabor && pesoSelect.value && precos[sabor] && precos[sabor][pesoSelect.value] !== null) {
    const preco = precos[sabor][pesoSelect.value];
    priceContainer.innerText = `Preço: R$ ${preco.toFixed(2)}`;
    priceContainer.classList.add("show");
  } else {
    // Esconde o preço se não houver uma combinação válida
    priceContainer.classList.remove("show");
  }
}

// Event listeners para chamar a função de atualização
document.getElementById("sabor").addEventListener("change", () => {
    // Ao mudar o sabor, reseta a opção de peso para evitar combinações inválidas
    document.getElementById("peso").value = ""; 
    updateSummaryAndPrice();
});
document.getElementById("peso").addEventListener("change", updateSummaryAndPrice);
