# 🍰 Cake Builder: Montador de Bolos Personalizados

[![Status do Projeto](https://img.shields.io/badge/status-refatorado%20e%20aprimorado-blue)](link-para-o-seu-projeto)
[![Tecnologias](https://img.shields.io/badge/tecnologias-HTML%2C%20CSS%2C%20JS-green)](link-para-o-seu-projeto)

Este é um projeto interativo para um site de confeitaria, permitindo que os usuários montem bolos personalizados e vejam o preço em tempo real. A aplicação foi desenvolvida com foco em uma experiência de usuário intuitiva e visualmente atraente.

## 🔗 Live Demo
Confira a aplicação em funcionamento:
https://gutyerrezroger.github.io/Decore-Seu-Bolo

## 🎯 Objetivo Principal
O principal objetivo deste projeto é criar uma experiência de navegação fluida e agradável para clientes que desejam um bolo sob medida. O foco está na usabilidade, em um design temático de confeitaria e no feedback visual imediato para cada escolha.

## ✨ Principais Funcionalidades
- **Interface por Etapas (Wizard):** Guia o usuário passo a passo, facilitando a montagem do pedido. A navegação entre as etapas foi aprimorada.
- **Validação de Formulário Aprimorada:** Feedback visual em tempo real para campos obrigatórios, substituindo o uso de `alert()` por mensagens diretas na interface.
- **Máscara de Telefone:** Adição de uma máscara para formatar o campo de telefone, melhorando a usabilidade.
- **Design Responsivo:** A interface se adapta perfeitamente a diferentes tamanhos de tela (desktop e mobile), com o layout de cards corrigido para maior consistência visual.
- **Cálculo Dinâmico:** O preço é atualizado automaticamente conforme as escolhas de sabor e peso.
- **Opção de Reiniciar:** Possibilita ao usuário recomeçar a montagem a qualquer momento sem fechar o modal.

## 🎨 Paleta de Cores Gourmet
A paleta foi atualizada para um tema mais escuro, selecionada para transmitir sofisticação e elegância.

| Cor            | Hex Code   | Descrição                   |
|----------------|------------|-----------------------------|
| Marrom Escuro  | `#401404`  | Cor de fundo, remete a chocolate escuro |
| Laranja        | `#f2a649`  | Cor principal, usada em botões e destaques |
| Cinza Claro    | `#f2f2f2`  | Cor de texto e destaque, para contraste |
| Marrom Claro   | `#672913`  | Cor dos cards, um tom mais claro para os elementos |

*Nota: As cores foram ajustadas para um tema mais escuro e moderno.*

## 🛠️ Tecnologias Utilizadas
- **HTML5:** Estrutura semântica do site.
- **CSS3:** Estilização e animações, com o uso de variáveis CSS para fácil manutenção e layout responsivo com Flexbox e Grid.
- **JavaScript Vanilla (ES6+):** Lógica do `wizard`, validação de formulário aprimorada com máscara de telefone e cálculo de preços.

## 📁 Estrutura do Projeto
📦montador-bolos/
┣ 📁css/
┃ ┗ 📄style.css
┣ 📁js/
┃ ┗ 📄script.js
┣ 📄index.html
┗ 📄README.md

## 🚀 Como Executar o Projeto
1. Clone o repositório para a sua máquina local.
   `git clone https://github.com/seu-usuario/montador-bolos.git`
2. Abra o arquivo `index.html` em seu navegador de preferência.

## 🔮 Possíveis Melhorias Futuras
- **Persistência de Dados:** Armazenar sabores e preços em um arquivo JSON externo para facilitar a manutenção.
- **Compartilhamento:** Funcionalidade para exportar o pedido final como PDF ou compartilhar via WhatsApp (a ser expandida).
- **Personalização Adicional:** Adicionar opções para mensagens no bolo ou decoração extra.
- **Otimização de Performance:** Lazy loading de imagens e otimizações de código.
- **Backend:** Integrar com um sistema de login e histórico de pedidos.

## Feito com 💛 por **Gutyerrez Roger** – Desenvolvedor e Fotógrafo.
