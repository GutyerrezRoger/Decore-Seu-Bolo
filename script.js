// script.js
// Documentação: Este script gerencia a interatividade da página, incluindo o modal de pedidos,
// a atualização dinâmica de preços, a validação de formulário e a criação da mensagem do WhatsApp.

document.addEventListener("DOMContentLoaded", () => {
  // Objeto com os preços dos bolos, organizado por sabor e peso.
  const precos = {
    "Bolo-de-rolo-goiabada": { "0.5kg": 25.0, "1kg": 48.0, "2kg": null },
    "Bolo-de-rolo-bananada": { "0.5kg": 25.0, "1kg": 48.0, "2kg": null },
    "goiabada-com-cobertura": { "0.5kg": 30.0, "1kg": 53.0, "2kg": null },
    "Bolo-de-rolo-cafe": { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    "Bolo-de-rolo-chocolate": { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    "Bolo-de-rolo-doce-de-leite": { "0.5kg": 30.0, "1kg": 60.0, "2kg": 100.0 },
    "Bolo-de-rolo-ninho": { "0.5kg": 30.0, "1kg": 60.0, "2kg": 100.0 },
    "Bolo-de-rolo-limao": { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    "Bolo-de-rolo-maracuja": { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
    "red-velvet": { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
    panetone: { "0.5kg": 45.0, "1kg": 75.0, "2kg": 130.0 },
    "doce-de-leite-com-ameixa": { "0.5kg": null, "1kg": 70.0, "2kg": 125.0 },
    sensacao: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
    napolitano: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
    chocolatudo: { "0.5kg": 40.0, "1kg": 70.0, "2kg": 125.0 },
    oreo: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
  };

  // Funções para gerenciar o modal
  function openModal() {
    document.getElementById("cakeWizard").style.display = "flex";
    showStep(1);
    // Limpa os campos quando o modal é aberto pelo botão principal
    document.getElementById("sabor").value = "";
    updateSummaryAndPrice();
  }

  function openModalWithCake(sabor) {
    document.getElementById("cakeWizard").style.display = "flex";
    document.getElementById("sabor").value = sabor;
    updateSummaryAndPrice();
    // NOVO: Agora, a função apenas define o sabor e mostra o passo 1
    // O usuário precisa clicar em "Próximo" para ir para o passo 2
    showStep(1);
  }

  function closeModal() {
    document.getElementById("cakeWizard").style.display = "none";
    document.getElementById("sabor").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("data-entrega").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("resumoFinal").innerHTML = "";
    document.getElementById("price-container").classList.remove("show");

    // Limpa as classes de erro e mensagens
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));

    showStep(1);
  }

  window.openModal = openModal;
  window.openModalWithCake = openModalWithCake;

  // Eventos do modal
  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  let currentStep = 1;
  const steps = document.querySelectorAll(".step");

  function showStep(stepNumber) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === stepNumber - 1);
    });
    currentStep = stepNumber;
  }

  document.querySelector(".next-btn").addEventListener("click", () => {
    // Validação do passo 1 (sabor, data e telefone)
    const sabor = document.getElementById("sabor").value;
    const dataEntrega = document.getElementById("data-entrega").value;
    const telefone = document
      .getElementById("telefone")
      .value.replace(/\D/g, "");

    // Limpa os erros antes de validar novamente
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));

    let hasError = false;

    if (!sabor) {
      document.getElementById("erro-sabor").textContent =
        "Por favor, selecione um sabor.";
      document.getElementById("sabor").classList.add("input-error");
      hasError = true;
    }

    if (!dataEntrega) {
      document.getElementById("erro-data").textContent =
        "Por favor, selecione uma data.";
      document.getElementById("data-entrega").classList.add("input-error");
      hasError = true;
    } else {
      const hoje = new Date();
      const dataSelecionada = new Date(dataEntrega);
      hoje.setHours(0, 0, 0, 0);
      if (dataSelecionada < hoje) {
        document.getElementById("erro-data").textContent =
          "A data não pode ser anterior à data atual.";
        document.getElementById("data-entrega").classList.add("input-error");
        hasError = true;
      }
    }

    if (telefone.length < 10) {
      document.getElementById("erro-telefone").textContent =
        "Por favor, insira um telefone válido (com DDD).";
      document.getElementById("telefone").classList.add("input-error");
      hasError = true;
    }

    if (!hasError) {
      updateSummaryAndPrice();
      showStep(currentStep + 1);
    }
  });

  document.querySelector(".prev-btn").addEventListener("click", () => {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });

  /* Documentação: A função do botão Recomeçar foi ajustada para apenas limpar os campos e
   voltar para o primeiro passo do modal, sem fechá-lo. */
  document.querySelector(".restart-btn").addEventListener("click", () => {
    document.getElementById("sabor").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("data-entrega").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("resumoFinal").innerHTML = "";
    document.getElementById("price-container").classList.remove("show");

    // Limpa as classes de erro e mensagens
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));

    showStep(1); // Volta para o primeiro passo
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Função para atualizar o resumo e preço
  function updateSummaryAndPrice() {
    const sabor = document.getElementById("sabor").value;
    const pesoSelect = document.getElementById("peso");
    const pesoAtual = pesoSelect.value;
    const priceContainer = document.getElementById("price-container");
    const resumoDiv = document.querySelector(".summary");
    const dataEntrega = document.getElementById("data-entrega").value;
    const telefone = document.getElementById("telefone").value;

    // Limpa os pesos e preenche com os disponíveis para o sabor selecionado
    pesoSelect.innerHTML = '<option value="">Selecione</option>';
    if (sabor && precos[sabor]) {
      for (const p in precos[sabor]) {
        if (precos[sabor][p] !== null) {
          const option = document.createElement("option");
          option.value = p;
          option.textContent = p.replace("0.5kg", "1/2 kg");
          pesoSelect.appendChild(option);
        }
      }
      if (precos[sabor][pesoAtual] !== null && pesoAtual !== "") {
        pesoSelect.value = pesoAtual;
      }
    }

    function formatarSabor(saborValue) {
      if (!saborValue) return "Não selecionado";
      const option = document.querySelector(
        `#sabor option[value="${saborValue}"]`
      );
      return option ? option.textContent : saborValue;
    }

    resumoDiv.innerHTML = `
      <p><strong>Sabor:</strong> ${formatarSabor(sabor)}</p>
      <p><strong>Peso:</strong> ${
        pesoSelect.value.replace("0.5kg", "1/2 kg") || "Não selecionado"
      }</p>
      <p><strong>Data para a encomenda:</strong> ${
        dataEntrega || "Não selecionado"
      }</p>
      <p><strong>Telefone:</strong> ${telefone || "Não selecionado"}</p>
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

  // Eventos para atualizar o resumo e preço
  document.getElementById("sabor").addEventListener("change", () => {
    document.getElementById("peso").value = "";
    updateSummaryAndPrice();
  });
  document
    .getElementById("peso")
    .addEventListener("change", updateSummaryAndPrice);
  document
    .getElementById("data-entrega")
    .addEventListener("change", updateSummaryAndPrice);
  document
    .getElementById("telefone")
    .addEventListener("input", updateSummaryAndPrice);

  function formatarTelefone(event) {
    const input = event.target;
    let valor = input.value.replace(/\D/g, "");
    let formatado = "";
    if (valor.length > 0) {
      formatado += `(${valor.substring(0, 2)}`;
    }
    if (valor.length > 2) {
      formatado += `) ${valor.substring(2, 7)}`;
    }
    if (valor.length > 7) {
      formatado += `-${valor.substring(7, 11)}`;
    }
    input.value = formatado;
  }

  document
    .getElementById("telefone")
    .addEventListener("input", formatarTelefone);

  function enviarPedidoWhatsApp() {
    // Limpa mensagens de erro e classes de erro
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));

    const sabor = document.getElementById("sabor").value;
    const saborTexto = document.querySelector(
      `#sabor option[value="${sabor}"]`
    ).textContent;
    const peso = document.getElementById("peso").value;
    const preco = document.getElementById("price-container").innerText;
    const telefone = document.getElementById("telefone").value;
    const dataEntrega = document.getElementById("data-entrega").value;

    const telefoneLimpo = telefone.replace(/\D/g, "");
    let hasError = false;

    // Validação aprimorada
    if (!peso) {
      document.getElementById("erro-peso").textContent =
        "Por favor, selecione um peso.";
      document.getElementById("peso").classList.add("input-error");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const mensagem = `Olá, gostaria de fazer um pedido de bolo!
*Resumo do Pedido:*
*Sabor:* ${saborTexto}
*Peso:* ${peso.replace("0.5kg", "1/2 kg")}
*Data da Encomenda:* ${dataEntrega}
*Telefone para contato:* ${telefone}
*Preço Total:* ${preco}
    
Fico no aguardo do retorno!`;

    const numeroDestino = "5581988638502";

    const linkWhatsApp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(linkWhatsApp, "_blank");

    setTimeout(() => {
      closeModal();
    }, 1000);
  }

  const sendBtn = document.querySelector(".send-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", enviarPedidoWhatsApp);
  }
});
