# Bootcamp Valorant

Projeto front-end de uma landing page (página de vendas) imersiva e interativa para um treinamento focado no jogo Valorant.

## 📜 Sobre o Projeto

Foi desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla JS), focando em boas práticas de desenvolvimento, como a clara separação de estrutura (HTML), estilo (CSS) e lógica (JS). O design adota uma estética **Gamer** com foco em conversão, proporcionando uma experiência de usuário envolvente com sons interativos, animações de rolagem e feedback visual claro.

## ✨ Funcionalidades Principais

* **Experiência Imersiva (Áudio e Visual)**: 
  Uso da Web Audio API para gerar sons de *hover* e *click* diretamente pelo navegador (sem arquivos externos), além de um cursor customizado em formato de mira para telas grandes.
* **Modo Claro/Escuro (Theme Toggle)**: 
  Alternância de temas com persistência de dados utilizando o `localStorage`, garantindo que o navegador lembre da preferência do usuário.
* **Animações e Interatividade**: 
  Contadores numéricos animados dinamicamente nas estatísticas e elementos que surgem suavemente na tela conforme a rolagem (*Intersection Observer*).
* **Validação de Formulários e Modal**: 
  Sistema de captura de leads com validação de dados em tempo real (ex: formato correto da Riot ID) e um simulador de modal de checkout para a assinatura dos planos.
* **Componentes Modernos de UI**: 
  Menu de navegação fixo responsivo, botão de voltar ao topo, sistema de FAQ em formato "sanfona" (accordion) e notificações flutuantes na tela (Toasts).

## 🛠️ Tecnologias Utilizadas

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white): Para a estrutura semântica da página, organização das seções e formulários.
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white): Para a estilização avançada, utilizando `Flexbox`, `Grid Layout`, variáveis CSS para controle de tema e animações customizadas (`@keyframes`).
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black): Para toda a lógica de interatividade, manipulação do DOM, controle de estado, geração de sons matemáticos e validações.

## 🚀 Como Executar

Por ser um projeto puramente front-end, não há necessidade de um servidor ou dependências complexas.

1. Clone ou baixe os arquivos do projeto.
2. Certifique-se de que os arquivos `index.html`, `style.css` e `script.js` estejam na mesma pasta.
3. Abra o arquivo `index.html` diretamente em um navegador web moderno (como Google Chrome, Mozilla Firefox ou Microsoft Edge).

---
* **Desenvolvido por**: Aliana Moraes