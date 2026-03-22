# cara-ou-coroa

Funcionalidades
- Escolha Dinâmica: Seleção de aposta entre Cara ou Coroa.
- Sistema de Sorteio: Lógica baseada em `Math.random()` com 50% de probabilidade real.
- Feedback Visual: Animação de rotação da moeda com efeito "bounce" (salto).
- Placar de Vitórias: Contador persistente durante a sessão do usuário.
- Prevenção de Spam: Bloqueio de cliques múltiplos enquanto a moeda ainda está girando.

Tecnologias Utilizadas
- HTML5: Estruturação semântica.
- CSS3: Design responsivo, variáveis nativas (`:root`) e animações de transição.
- JavaScript (ES6): Manipulação assíncrona do DOM e lógica do motor de sorteio.

Estrutura de Arquivos
```text
├── index.html   # Estrutura e elementos da interface
├── style.css    # Definições de cores, fontes e animações
├── script.js    # Motor do jogo e manipulação de eventos
└── README.md    # Documentação do projeto
