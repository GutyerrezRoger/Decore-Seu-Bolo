import { useState, useEffect } from "react";
import {
  ShoppingBag,
  ChevronRight,
  Phone,
  Instagram,
  X,
  Check,
  Calendar,
  Weight,
} from "lucide-react";

// --- BASE DE DADOS UNIFICADA ---
// Aqui centralizamos tudo: imagem, descrição e a tabela de preços de cada bolo.
const cakesData = [
  {
    id: "bolo-rolo-chocolate",
    name: "Bolo de Rolo: Chocolate",
    description:
      "Massa fofinha de chocolate com recheio de brigadeiro gourmet.",
    image: "/img/bolo1.jpg",
    prices: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
  },
  {
    id: "red-velvet",
    name: "Naked: Red Velvet",
    description: "Massa clássica Red Velvet com cobertura de cream cheese.",
    image: "/img/bolo2.jpg",
    prices: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
  },
  {
    id: "bolo-rolo-cafe",
    name: "Bolo de Rolo: Café",
    description: "Sabor intenso de café com recheio de doce de leite cremoso.",
    image: "/img/bolo3.jpg",
    prices: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
  },
  {
    id: "goiabada",
    name: "Bolo de Rolo: Goiabada",
    description:
      "Massa fininha e macia com recheio generoso de goiabada derretida.",
    image: "/img/goiabada.jpg",
    prices: { "0.5kg": 25.0, "1kg": 48.0 },
  },
  {
    id: "bananada",
    name: "Bolo de Rolo: Bananada",
    description:
      "Aconchego em cada fatia com recheio de bananada super cremoso.",
    image: "/img/bananada.jpg",
    prices: { "0.5kg": 25.0, "1kg": 48.0 },
  },
  {
    id: "ninho",
    name: "Bolo de Rolo: Ninho",
    description: "Massa leve com recheio irresistível de creme de Ninho.",
    image: "/img/ninho.jpg",
    prices: { "0.5kg": 30.0, "1kg": 60.0, "2kg": 100.0 },
  },
  {
    id: "limao",
    name: "Bolo de Rolo: Limão",
    description: "Recheio cremoso e refrescante. O azedinho na medida certa.",
    image: "/img/limao.jpg",
    prices: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
  },
  {
    id: "maracuja",
    name: "Bolo de Rolo: Maracujá",
    description:
      "Uma fatia de verão! Massa suave e acidez deliciosa do maracujá.",
    image: "/img/maracuja.jpg",
    prices: { "0.5kg": 35.0, "1kg": 65.0, "2kg": 110.0 },
  },
  {
    id: "panetone",
    name: "Naked: Panetone",
    description: "O sabor do Natal o ano todo com frutas e cremosidade.",
    image: "/img/panetone.jpg",
    prices: { "0.5kg": 45.0, "1kg": 75.0, "2kg": 130.0 },
  },
  {
    id: "oreo",
    name: "Naked: Oreo",
    description:
      "Creme irresistível com pedacinhos crocantes de biscoito Oreo.",
    image: "/img/oreo.jpg",
    prices: { "0.5kg": 40.0, "1kg": 68.0, "2kg": 120.0 },
  },
];

export default function App() {
  // Estados do Modal e Formulário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCake, setSelectedCake] = useState(null);

  // Dados do Pedido
  const [formData, setFormData] = useState({
    cakeId: "",
    weight: "",
    date: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // Abrir Modal
  const openModal = (cake = null) => {
    setStep(1);
    setErrors({});
    if (cake) {
      setSelectedCake(cake);
      setFormData((prev) => ({ ...prev, cakeId: cake.id, weight: "" }));
    } else {
      setSelectedCake(null);
      setFormData({ cakeId: "", weight: "", date: "", phone: "" });
    }
    setIsModalOpen(true);
  };

  // Atualizar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Máscara de Telefone
    if (name === "phone") {
      const v = value.replace(/\D/g, "");
      let formatted = v;
      if (v.length > 2) formatted = `(${v.substring(0, 2)}) ${v.substring(2)}`;
      if (v.length > 7)
        formatted = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7, 11)}`;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    // Se mudar o bolo no select, atualiza o objeto selectedCake para pegar os preços novos
    if (name === "cakeId") {
      const cake = cakesData.find((c) => c.id === value);
      setSelectedCake(cake);
      setFormData((prev) => ({ ...prev, cakeId: value, weight: "" })); // Reseta o peso pois os preços mudam
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validação e Próximo Passo
  const handleNext = () => {
    const newErrors = {};
    if (!formData.cakeId) newErrors.cakeId = "Escolha um sabor delicioso!";
    if (!formData.date) newErrors.date = "Precisamos saber a data da festa.";
    if (!formData.phone || formData.phone.length < 14)
      newErrors.phone = "Informe um WhatsApp válido.";

    // Validação de data (não permitir passado)
    if (formData.date) {
      const selected = new Date(formData.date + "T00:00:00"); // Força timezone local
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = "A data não pode ser no passado.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  // Finalizar e Enviar WhatsApp
  const handleSend = () => {
    if (!formData.weight) {
      setErrors({ weight: "Selecione o tamanho do bolo." });
      return;
    }

    const price = selectedCake.prices[formData.weight];
    const weightLabel = formData.weight.replace("0.5kg", "1/2 kg");
    const total = price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const message =
      `Olá! Gostaria de fazer um pedido na Docinhos de Mainha! 🍰\n\n` +
      `*Pedido:* ${selectedCake.name}\n` +
      `*Tamanho:* ${weightLabel}\n` +
      `*Data:* ${formData.date.split("-").reverse().join("/")}\n` +
      `*Contato:* ${formData.phone}\n\n` +
      `*Total Estimado:* ${total}`;

    const link = `https://wa.me/5581988638502?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-brown text-brand-cream font-sans selection:bg-brand-light selection:text-brand-brown">
      {/* HEADER */}
      <header className="bg-brand-light text-brand-brown py-8 px-4 text-center shadow-lg sticky top-0 z-30">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Docinhos de Mainha
        </h1>
        <p className="font-semibold opacity-90 mt-2">
          Crie o bolo perfeito para qualquer ocasião
        </p>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* HERO CTA */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <p className="text-xl md:text-2xl text-brand-cream/90 max-w-2xl mx-auto">
            Conheça nossas criações artesanais ou personalize o seu próprio bolo
            do jeito que você ama.
          </p>
          <button
            onClick={() => openModal()}
            className="bg-brand-light text-brand-brown text-lg font-bold py-4 px-8 rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl flex items-center gap-2 mx-auto"
          >
            <ShoppingBag /> Monte seu Bolo Personalizado
          </button>
        </div>

        {/* VITRINE DE BOLOS */}
        <section>
          <h2 className="text-3xl font-bold text-center text-brand-light mb-10">
            Nossos Sabores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakesData.map((cake) => {
              // Pegar o menor preço para exibir "A partir de..."
              const minPrice = Math.min(...Object.values(cake.prices));

              return (
                <div
                  key={cake.id}
                  onClick={() => openModal(cake)}
                  className="bg-brand-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-white/10"
                >
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-6 flex flex-col h-[220px]">
                    <h3 className="text-xl font-bold text-brand-light mb-2">
                      {cake.name}
                    </h3>
                    <p className="text-brand-cream/80 text-sm mb-4 flex-1">
                      {cake.description}
                    </p>

                    <div className="mt-auto">
                      <p className="text-lg font-bold text-white mb-3">
                        A partir de R$ {minPrice.toFixed(2).replace(".", ",")}
                      </p>
                      <button className="w-full py-3 bg-brand-light text-brand-brown font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                        Encomendar <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#181717] text-white py-12 mt-12 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-brand-light mb-4">
              Docinhos de Mainha
            </h3>
            <p className="text-gray-400">Amor e doçura em cada fatia.</p>
          </div>

          <div className="space-y-2 text-gray-300">
            <p>📍 Jaboatão dos Guararapes - PE</p>
            <p>📞 (81) 98863-8502</p>
            <p>📧 contato@docinhosdemainha.com</p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/georgiafreitasdoces"
              target="_blank"
              className="p-3 bg-white/10 rounded-full hover:bg-brand-light hover:text-brand-brown transition-colors"
            >
              <Instagram />
            </a>
            <a
              href="https://wa.me/5581988638502"
              target="_blank"
              className="p-3 bg-white/10 rounded-full hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <Phone />
            </a>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm mt-10">
          © {new Date().getFullYear()} Docinhos de Mainha. Desenvolvido com
          carinho.
        </div>
      </footer>

      {/* MODAL WIZARD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-brown border border-brand-light/30 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header Modal */}
            <div className="bg-brand-card p-4 flex justify-between items-center border-b border-brand-light/20">
              <h3 className="font-bold text-xl text-brand-light">
                {step === 1 ? "Monte seu Pedido" : "Confirme os Detalhes"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-brand-cream hover:text-white"
              >
                <X />
              </button>
            </div>

            {/* Conteúdo Scrollavel */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {/* PASSO 1: DADOS INICIAIS */}
              {step === 1 && (
                <div className="space-y-4 animate-slide-in">
                  {/* Select Sabor */}
                  <div>
                    <label className="block text-sm font-bold mb-1 text-brand-light">
                      Sabor do Bolo
                    </label>
                    <select
                      name="cakeId"
                      value={formData.cakeId}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-brand-bg border border-brand-card text-white focus:border-brand-light outline-none"
                    >
                      <option value="">Selecione um sabor...</option>
                      {cakesData.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.cakeId && (
                      <span className="text-red-400 text-xs mt-1">
                        {errors.cakeId}
                      </span>
                    )}
                  </div>

                  {/* Input Data */}
                  <div>
                    <label className="block text-sm font-bold mb-1 text-brand-light flex items-center gap-2">
                      <Calendar size={16} /> Data da Festa
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-brand-bg border border-brand-card text-white focus:border-brand-light outline-none [color-scheme:dark]"
                    />
                    {errors.date && (
                      <span className="text-red-400 text-xs mt-1">
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Input Telefone */}
                  <div>
                    <label className="block text-sm font-bold mb-1 text-brand-light flex items-center gap-2">
                      <Phone size={16} /> Seu WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(81) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={15}
                      className="w-full p-3 rounded-lg bg-brand-bg border border-brand-card text-white focus:border-brand-light outline-none"
                    />
                    {errors.phone && (
                      <span className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* PASSO 2: PESO E RESUMO */}
              {step === 2 && selectedCake && (
                <div className="space-y-6 animate-slide-in">
                  <div className="bg-brand-bg p-4 rounded-lg flex gap-4 items-center">
                    <img
                      src={selectedCake.image}
                      alt=""
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-brand-light">
                        {selectedCake.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {formData.date.split("-").reverse().join("/")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-3 text-brand-light flex items-center gap-2">
                      <Weight size={16} /> Escolha o Tamanho
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedCake.prices).map(
                        ([weight, price]) => (
                          <button
                            key={weight}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, weight }));
                              setErrors({});
                            }}
                            className={`p-4 rounded-xl border transition-all ${
                              formData.weight === weight
                                ? "bg-brand-light text-brand-brown border-brand-light font-bold shadow-[0_0_15px_rgba(242,166,73,0.4)]"
                                : "bg-brand-card border-transparent text-gray-300 hover:border-brand-light/50"
                            }`}
                          >
                            <div className="text-lg">
                              {weight.replace("0.5kg", "1/2 kg")}
                            </div>
                            <div className="text-sm opacity-80">
                              R$ {price.toFixed(2)}
                            </div>
                          </button>
                        ),
                      )}
                    </div>
                    {errors.weight && (
                      <span className="text-red-400 text-xs mt-2 block">
                        {errors.weight}
                      </span>
                    )}
                  </div>

                  {formData.weight && (
                    <div className="text-center p-4 border border-brand-light/30 rounded-lg bg-brand-bg/50">
                      <span className="text-gray-400 text-sm">
                        Total Estimado
                      </span>
                      <div className="text-3xl font-bold text-brand-light">
                        R$ {selectedCake.prices[formData.weight].toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Modal (Botões) */}
            <div className="p-4 bg-brand-card border-t border-brand-light/10 flex gap-3">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-lg border border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-brown transition-colors font-bold"
                >
                  Voltar
                </button>
              )}

              <button
                onClick={step === 1 ? handleNext : handleSend}
                className="flex-1 py-3 bg-brand-light text-brand-brown font-bold rounded-lg hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {step === 1 ? "Próximo Passo" : "Enviar Pedido no WhatsApp"}
                {step === 1 ? <ChevronRight size={18} /> : <Check size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
