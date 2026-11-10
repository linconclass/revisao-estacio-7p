# Revisão Estácio — 7º período

[Abrir site](https://linconclass.github.io/revisao-estacio-7p/#treino)

Resumos de cinco disciplinas e **150 questões autorais, todas de múltipla escolha**: 30 por matéria, organizadas em cinco temas por matéria, baseadas no material local disponível. Os PDFs originais não são redistribuídos.

## Como usar

Escolha a matéria e um exercício por tema (blocos de 3 ou 5 perguntas), ou revise a matéria com 10 perguntas. Cada nova rodada sorteia questões e embaralha as quatro alternativas. O banco é finito: quando se esgota o conjunto, conteúdos voltam a aparecer.

- **Treino inteligente:** correção imediata, prioridade para erros, dúvidas e revisões pendentes. Quando há espaço, uma variante do tema errado volta depois de três outras perguntas. Não substitui questões já respondidas.
- **Sorteio livre:** rodada variada sem priorização por desempenho.
- **Modo prova:** permite navegar e alterar escolhas; corrige somente ao finalizar todas as respostas.
- **Reforço:** seleciona itens com último resultado errado ou marcados como dúvida, se disponíveis no recorte.

Confiança é opcional. Acerto com dúvida continua pendente de reforço. Histórico e rodada são salvos localmente no navegador; respostas não são enviadas a um servidor. A migração preserva somente as antigas questões com correção automática, evitando contar autoavaliações escritas como acertos. A confirmação de apagar histórico também remove o registro antigo.

## Método de estudo

Prática de recuperação, correção explicativa e retomada após um intervalo, com mistura de temas e atenção às dúvidas. As regras de 10 minutos, 1 hora e 4 horas são uma adaptação prática para a revisão de véspera, não intervalos individualmente validados. O resultado do treino não prevê nota oficial.

Referências:

- [Smith e Karpicke, 2014 — Retrieval practice with short-answer, multiple-choice, and hybrid tests](https://learninglab.psych.purdue.edu/downloads/2014/2014_Smith_Karpicke_Memory.pdf)
- [Guia de prática de recuperação e feedback](https://hr.utexas.edu/sites/default/files/How%20To%20Use%20Retrieval%20Practice%20to%20Improve%20Learning.pdf)
- [Rawson et al., 2018 — Investigating and explaining the effects of successive relearning](https://pubmed.ncbi.nlm.nih.gov/29431462/)

## Arquivos

- `index.html`, `quiz.css`: página de revisão e interface do treino.
- `quiz-data.js`: 150 questões, quatro alternativas, tema e explicação.
- `quiz-engine.js`: seleção, embaralhamento e regras de prioridade.
- `quiz.js`: navegação, correção, histórico e apresentação.
- `banco-150-questoes.md`: alternativa textual, com gabaritos.
- `guia-intensivo-estacio.md`: resumos e exercícios resolvidos.
- `fontes-e-cobertura.md`: relação e limites das apostilas consultadas.

## Verificação

`node scripts/test-engine.cjs` verifica banco, quatro alternativas distintas, cobertura dos 25 temas, conjuntos diferentes entre tentativas, embaralhamento, filtro de erros e agendamento.

Banco reconstruível com `python scripts/build-bank.py` (Python padrão). O arquivo original de autoria é preservado em `scripts/original-bank.json` apenas para reconstrução; o simulado gerado contém exclusivamente múltipla escolha.

Verificado no navegador: migração do histórico anterior, ausência de campos escritos, correção após embaralhar, acerto com dúvida, modo prova sem antecipar gabarito, resultado por tema, recarga com preservação da rodada, novas tentativas variadas e cancelamento de substituição da rodada. Layout conferido em largura de celular, sem transbordamento horizontal, e tela ampla.

## Publicação

Site estático sem dependências, servido pelo GitHub Pages a partir da raiz de `main`. Questões e explicações são autorais; não são o banco oficial da Estácio. Datas e horários foram fornecidos pelo estudante.
