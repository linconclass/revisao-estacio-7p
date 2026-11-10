# Simulado intensivo — 50 questões

Questões autorais baseadas nos assuntos das apostilas disponíveis. Não são questões oficiais nem previsão de cobrança. Resolva antes de abrir o gabarito. Nas discursivas, use uma ou duas frases. Ao corrigir, marque o tema do erro, revise e repita a questão sem olhar.

## 1. NoSQL — 10/11, 10h

**N1.** Qual associação está correta? A) MongoDB–grafos; B) Neo4j–grafos; C) Cassandra–documentos; D) Redis–relacional exclusivo.

**N2.** Para obter cliente como texto no PostgreSQL: A) `detalhes -> 'cliente'`; B) `detalhes ->> 'cliente'`; C) `jsonb_pretty(detalhes)`; D) `count(cliente)`.

**N3.** Schemaless quer dizer: A) dados sem significado; B) nenhum registro pode ter estrutura; C) não se exige esquema rígido uniforme previamente fixado; D) validação é proibida.

**N4.** O que faz `db.alunos.find({nota: {$gte: 7}})`?

**N5.** Em `PRIMARY KEY ((loja,mes),dia)`, quais campos definem a partição e qual é clustering?

**N6.** Para representar seguidores e percorrer relacionamentos, qual modelo é o encaixe mais direto?

**N7.** O que retorna `MATCH (a:Pessoa)-[:SEGUE]->(b:Pessoa) RETURN b.nome`? Pode haver repetição?

**N8.** Embutir itens no documento de um pedido significa: A) criar grafo; B) reunir agregado; C) eliminar toda duplicação; D) impor esquema uniforme a todas as coleções.

**N9.** Diferencie replicação e particionamento.

**N10.** Verdadeiro ou falso: ALLOW FILTERING garante consulta eficiente.

## 2. Métodos Quantitativos — 10/11, 12h

**M1.** A consome 2 horas por unidade e B consome 3; há no máximo 60 horas. Escreva a restrição para quantidades x e y.

**M2.** É preciso obter pelo menos 25 unidades entre produção própria x e compra y. Escreva a restrição.

**M3.** Resolva por vértices: `max 4x+3y`, com `x+y≤5`, `x≤3`, `y≤4`, `x,y≥0`.

**M4.** No teste de razão do Simplex primal, coeficientes positivos da coluna entrante são 2 e 1; termos independentes, 8 e 3. Qual linha sai?

**M5.** Escreva o dual: `max 5x+4y`, com `2x+y≤10`, `x+3y≤12`, `x,y≥0`.

**M6.** Preço-sombra 6; capacidade aumenta 2 unidades dentro do intervalo de validade. Quanto varia o ótimo?

**M7.** Verdadeiro ou falso: toda restrição com folga zero tem preço-sombra estritamente positivo.

**M8.** Estoque inicial 10, produção 40, demanda 35. Estoque final?

**M9.** Mistura com pelo menos 30% de nutriente; x contém 20% e y contém 50%. Escreva a restrição.

**M10.** Para `max 3x+2y`, `x+y≤4`, `x≤2`, `y≤3`, o ótimo é (2,2), Z=10 e o preço-sombra da primeira restrição é 2. Se a capacidade passa a 6, é correto prever ganho de 4? Calcule o novo ótimo.

## 3. LPS — 10/11, 17h

**L1.** Qual engenharia cria os ativos reutilizáveis?

**L2.** Qual engenharia seleciona as variantes de um produto para uma clínica específica?

**L3.** No ponto de variação “autenticação”, senha e biometria são o quê?

**L4.** A requires B: A presente/B ausente é configuração válida?

**L5.** Extrair comunalidades de produtos existentes é adoção: A) proativa; B) extrativa; C) força bruta; D) aplicação pura.

**L6.** Para que serve o Modelo Ortogonal de Variabilidade?

**L7.** O que é requisito delta?

**L8.** Verdadeiro ou falso: testes dos ativos de domínio dispensam testes de aplicação.

**L9.** Quatro pontos independentes, exatamente uma escolha entre duas variantes em cada: quantas configurações sem outras restrições?

**L10.** Mudança em variante altera requisito/código, mas o teste ficou desatualizado. Qual prática ajuda a identificar esse impacto?

## 4. Android / React Native — 10/11, 19h

**A1.** Diferencie props e state.

**A2.** Para lista grande: FlatList ou ScrollView com todos os filhos? Por quê?

**A3.** Por que usar JSON.stringify antes de guardar um objeto em AsyncStorage?

**A4.** Qual opção é relacional local: MongoDB remoto, SQLite, Base64 ou Redux?

**A5.** Após `const r = await fetch(url)`, como obter o corpo interpretado como JSON?

**A6.** Verdadeiro ou falso: detectar rede resolve os conflitos de Offline First.

**A7.** No Redux, quem calcula o próximo estado a partir de estado anterior e action?

**A8.** Base64 garante sigilo? Justifique.

**A9.** Diferencie `onPress={salvar}` e `onPress={salvar()}`.

**A10.** Cite os três modelos de navegação e a função de um deles.

## 5. Back-end — 11/11, 19h

**B1.** Qual usa tags para representar dados: XML, JDBC, JMS ou Servlet?

**B2.** Diferencie Servlet e JSP.

**B3.** Para SELECT com JDBC: executeQuery ou executeUpdate?

**B4.** Relacione JPA, Hibernate e Spring Data JPA.

**B5.** Quem lê objeto do corpo: @RequestBody, @PathVariable ou @Entity?

**B6.** Verdadeiro ou falso: JMS e RabbitMQ são o mesmo produto.

**B7.** Para enviar logs a três filas independentes, qual exchange simples atende: fanout ou direct com uma única chave ligada a uma só fila?

**B8.** Qual é protocolo e qual é estilo arquitetural: SOAP e REST?

**B9.** No GraphQL, que operação altera dados e que função fornece valor de campo?

**B10.** Verdadeiro ou falso: uma API stateless não pode usar token de autenticação.

## Gabarito comentado

### NoSQL

- **N1: B.** Neo4j é grafos; MongoDB documentos; Cassandra famílias de colunas; Redis chave-valor.
- **N2: B.** ->> retorna texto; -> retorna elemento JSON/JSONB.
- **N3: C.** Flexibilidade não elimina organização/validação.
- **N4:** seleciona documentos com nota maior ou igual a 7. Não altera notas.
- **N5:** loja e mes formam a partition key; dia é clustering.
- **N6:** grafos, com relacionamentos explícitos entre entidades.
- **N7:** nomes de pessoas seguidas por pessoas correspondentes ao padrão. Pode repetir: não há DISTINCT e uma pessoa pode ter vários seguidores.
- **N8: B.** Pedido/itens formam agregado; isso não garante ausência de duplicação.
- **N9:** replicação mantém cópias; particionamento divide subconjuntos entre nós.
- **N10: Falso.** A filtragem autorizada pode ser custosa.

### Métodos Quantitativos

- **M1:** 2x+3y≤60. Acrescente x,y≥0 no modelo completo.
- **M2:** x+y≥25; “pelo menos” é limite inferior.
- **M3:** vértices (0,0), (3,0), (3,2), (1,4), (0,4); Z=0,12,18,16,12. Ótimo (3,2), Z=18.
- **M4:** segunda linha, pois 8/2=4 e 3/1=3; menor razão admissível.
- **M5:** min 10u+12v, com 2u+v≥5, u+3v≥4, u,v≥0. Matriz transposta e papéis de b/c trocados.
- **M6:** aumento de 12 unidades no objetivo, nas condições dadas.
- **M7: Falso.** Folga zero permite preço zero. Folga estritamente positiva exige preço zero.
- **M8:** 10+40−35=15 unidades.
- **M9:** 0,20x+0,50y≥0,30(x+y); equivale a y≥0,5x, com não negatividade.
- **M10:** não. O preço 2 só se mantém até capacidade 5, fixados os outros limites. Com capacidade 6, ótimo (2,3), Z=12; ganho de 2, não 4.

### LPS

- **L1:** engenharia do domínio: desenvolve para reuso e para a família.
- **L2:** engenharia da aplicação: deriva produto concreto.
- **L3:** variantes do ponto de variação.
- **L4:** não; selecionar A exige B.
- **L5: B.** Extrativa parte de sistemas existentes.
- **L6:** documentar pontos, variantes, dependências/restrições e sua conexão com artefatos de desenvolvimento.
- **L7:** necessidade da aplicação não completamente coberta pelos requisitos/ativos de domínio; exige avaliação de impacto.
- **L8: Falso.** Configuração, integração e deltas precisam de testes de aplicação.
- **L9:** 2^4=16 nas condições dadas.
- **L10:** rastreabilidade entre variabilidade, requisitos, implementação e testes.

### Android

- **A1:** props recebidas do pai; state gerenciado pelo componente para representar dados mutáveis.
- **A2:** FlatList, por virtualização; ScrollView com todos os filhos os renderiza juntos.
- **A3:** AsyncStorage guarda valores textuais; stringify serializa e parse reconstrói na leitura.
- **A4:** SQLite.
- **A5:** await r.json(); confira também r.ok e trate falhas.
- **A6: Falso.** É preciso sincronizar e lidar com duplicações/conflitos.
- **A7:** reducer, calculando novo estado sem modificar diretamente o anterior.
- **A8:** não; é codificação reversível sem chave secreta.
- **A9:** a primeira passa callback; a segunda executa a função naquele momento e passa seu retorno.
- **A10:** stack, tabs, drawer; exemplo: stack organiza avanço/retorno em pilha.

### Back-end

- **B1:** XML; os outros são tecnologias de acesso/mensageria/processamento.
- **B2:** Servlet processa requisições em Java; JSP é apresentação processada no servidor e traduzida para Servlet.
- **B3:** executeQuery; executeUpdate serve para operações como INSERT/UPDATE/DELETE, entre outros comandos adequados.
- **B4:** JPA especifica; Hibernate implementa; Spring Data JPA abstrai repositórios usando JPA.
- **B5:** @RequestBody. @PathVariable captura parte da URL; @Entity marca entidade JPA.
- **B6: Falso.** JMS é API/especificação; RabbitMQ é broker.
- **B7:** fanout, com três filas vinculadas; cada uma recebe a publicação.
- **B8:** SOAP protocolo; REST estilo arquitetural.
- **B9:** mutation altera; resolver fornece valor do campo.
- **B10: Falso.** Token pode acompanhar cada requisição, fornecendo contexto suficiente.

## Como usar seu resultado

Registre acertos por disciplina: NoSQL __/10; Métodos __/10; LPS __/10; Android __/10; Back-end __/10. Esses números medem apenas este treino, sem estimar nota oficial.

Para cada erro, escreva uma frase: “Confundi ___ com ___; a regra correta é ___”. Depois refaça a questão sem consulta. Em Métodos, refaça as contas e confira unidades e sinais.
