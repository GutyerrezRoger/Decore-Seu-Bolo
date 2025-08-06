const modal = document.getElementById("modal");
const steps = document.querySelectorAll(".step");
const resumo = document.getElementById("resumoFinal");
const preco = document.getElementById("precoFinal");

const precos = {
  "Goiabada": { "1kg": 48, "0.5kg": 25 },
  "Bananada": { "1kg": 48, "0.5kg": 25 },
  "Goiabada com cobertura": { "1kg": 53, "0.5kg": 30 },
  "Café": { "1kg": 65, "0.5kg": 35 },
  "Chocolate": { "1kg": 65, "0.5kg": 35 },
  "Doce de leite": { "1kg": 65, "0.5kg": 35 },
  "Ninho": { "1kg": 65, "0.5kg": 35 },
  "Limão": { "1kg": 65, "0.5kg": 35 },
  "Maracujá": { "1kg": 65, "0.5kg": 35 },
  "Red velvet": { "1kg": 68, "0.5kg": 40 },
  "Panetone": { "1kg": 75, "0.5kg": 45 },
  "Doce de leite com ameixa": { "1kg": 70 },
  "Sensação": { "1kg": 68, "0.5kg": 40 },
  "Napolitano": { "1kg": 68, "0.5kg": 40 },
  "Chocolatudo": { "1kg": 70, "0.5kg": 40 },
  "Oreo": { "1kg": 68, "0.5kg": 40 }
};

function openModal() {
  modal.style.display = "flex";
}

function nextStep(n) {
  const saborSelecionado = document.getElementById("sabor").value;
  if (n === 2 && !saborSelecionado) {
    alert("Por favor, selecione um sabor antes de continuar.");
    return;
  }
  steps.forEach((step) => step.classList.remove("active"));
  document.getElementById("step" + n).classList.add("active");
  if (n === 3) updateResumo();
}

function updateSabor() {
  const sabor = document.getElementById("sabor").value;
  const pesoSelect = document.getElementById("peso");
  if (!precos[sabor]?.["0.5kg"]) {
    pesoSelect.innerHTML = `<option value="1kg">1kg</option>`;
  } else {
    pesoSelect.innerHTML = `
      <option value="1kg">1kg</option>
      <option value="0.5kg">1/2kg</option>`;
  }
}

function updateResumo() {
  const sabor = document.getElementById("sabor").value;
  const peso = document.getElementById("peso").value;
  const valor = precos[sabor][peso];
  resumo.innerHTML = `
    <p><strong>Sabor:</strong> ${sabor}</p>
    <p><strong>Peso:</strong> ${peso}</p>
  `;
  preco.textContent = `Total: R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function reiniciar() {
  document.getElementById("sabor").value = "";
  document.getElementById("peso").value = "1kg";
  updateSabor();
  nextStep(1);
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    reiniciar();
  }
};
