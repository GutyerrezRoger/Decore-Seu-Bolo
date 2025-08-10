// script.js

document.addEventListener("DOMContentLoaded", () => {
  const precos = {
    goiabada: { "0.5kg": 25.0, "1kg": 48.0, "2kg": null },
    bananada: { "0.5kg": 25.0, "1kg": 48.0, "2kg": null },
    "goiabada-com-cobertura": { "0.5kg": 30.0, "1kg": 53.0, "2kg": null },
    cafe: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    chocolate: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    "doce-de-leite": { "0.5kg": 30.0, "1kg": 60.0, "2kg": 100.0 },
    ninho: { "0.5kg": 30.0, "1kg": 60.0, "2kg": 100.0 },
    limao: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    maracuja: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    "red-velvet": { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
    panetone: { "0.5kg": 45.0, "1kg": 75.0, "2kg": 130.0 },
    "doce-de-leite-com-ameixa": { "0.5kg": null, "1kg": 70.0, "2kg": 125.0 },
    sensacao: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
    napolitano: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
    chocolatudo: { "0.5kg": 40.0, "1kg": 70.0, "2kg": 125.0 },
    oreo: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
  };

  function openModal() {
    document.getElementById("cakeWizard").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("cakeWizard").style.display = "none";
    document.getElementById("sabor").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("resumoFinal").innerHTML = "";
    document.getElementById("price-container").classList.remove("show");
    showStep(1);
  }

  window.openModal = openModal;

  // Seleciona o novo botão de fechar
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", closeModal);

  let currentStep = 1;
  const steps = document.querySelectorAll(".step");

  function showStep(stepNumber) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === stepNumber - 1);
    });
    currentStep = stepNumber;
  }

  document.querySelectorAll(".next-btn").forEach((btn) => {
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

  document.querySelectorAll(".prev-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  });

  document.querySelectorAll(".restart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("sabor").value = "";
      document.getElementById("peso").value = "";
      document.getElementById("resumoFinal").innerHTML = "";
      document.getElementById("price-container").classList.remove("show");
      showStep(1);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  function updateSummaryAndPrice() {
    const sabor = document.getElementById("sabor").value;
    const pesoSelect = document.getElementById("peso");
    const pesoAtual = pesoSelect.value;
    const priceContainer = document.getElementById("price-container");
    const resumoDiv = document.querySelector(".summary");

    pesoSelect.innerHTML = '<option value="">Selecione</option>';
    if (sabor && precos[sabor]) {
      const pesosDisponiveis = precos[sabor];
      for (const p in pesosDisponiveis) {
        if (pesosDisponiveis[p] !== null) {
          const option = document.createElement("option");
          option.value = p;
          option.textContent = p
            .replace("0.5kg", "1/2 kg")
            .replace("1kg", "1 kg")
            .replace("2kg", "2 kg");
          pesoSelect.appendChild(option);
        }
      }
      if (pesosDisponiveis[pesoAtual] !== null && pesoAtual !== "") {
        pesoSelect.value = pesoAtual;
      }
    }

    resumoDiv.innerHTML = `
      <p><strong>Sabor:</strong> ${sabor || "Não selecionado"}</p>
      <p><strong>Peso:</strong> ${
        pesoSelect.value.replace("0.5kg", "1/2 kg") || "Não selecionado"
      }</p>
    `;

    if (
      sabor &&
      pesoSelect.value &&
      precos[sabor] &&
      precos[sabor][pesoSelect.value] !== null
    ) {
      const preco = precos[sabor][pesoSelect.value];
      priceContainer.innerText = `Preço: R$ ${preco.toFixed(2)}`;
      priceContainer.classList.add("show");
    } else {
      priceContainer.classList.remove("show");
    }
  }

  document.getElementById("sabor").addEventListener("change", () => {
    document.getElementById("peso").value = "";
    updateSummaryAndPrice();
  });
  document
    .getElementById("peso")
    .addEventListener("change", updateSummaryAndPrice);
});
