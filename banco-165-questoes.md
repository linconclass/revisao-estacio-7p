# Banco de revisão — 165 questões de múltipla escolha

Questões autorais; não são exercícios oficiais da Estácio. No site, perguntas e alternativas são sorteadas por rodada.

## NoSQL

### N1 · Fundamentos e modelos
Qual associação está correta?

A) MongoDB–grafos
B) Neo4j–grafos
C) Cassandra–documentos
D) Redis–relacional exclusivo

**Gabarito: B.** Neo4j é grafos; MongoDB documentos; Cassandra famílias de colunas; Redis chave-valor.

### N2 · JSON e PostgreSQL
Para obter cliente como texto no PostgreSQL:

A) detalhes -> 'cliente'
B) detalhes ->> 'cliente'
C) jsonb_pretty(detalhes)
D) count(cliente)

**Gabarito: B.** ->> retorna texto; -> retorna elemento JSON/JSONB.

### N3 · Fundamentos e modelos
Schemaless quer dizer:

A) dados sem significado
B) nenhum registro pode ter estrutura
C) não se exige esquema rígido uniforme previamente fixado
D) validação é proibida

**Gabarito: C.** Flexibilidade não elimina organização/validação.

### N4 · Documentos e agregados
O que faz db.alunos.find({nota: {$gte: 7}})?

A) Seleciona alunos com nota maior ou igual a 7
B) Altera todas as notas para 7
C) Remove alunos com nota abaixo de 7
D) Retorna somente alunos com nota exatamente 7

**Gabarito: A.** seleciona documentos com nota maior ou igual a 7. Não altera notas.

### N5 · Cassandra e CQL
Em PRIMARY KEY ((loja,mes),dia), quais campos definem a partição e qual é clustering?

A) loja e mes definem a partição; dia é clustering
B) loja é partição; mes e dia são clustering
C) dia define a partição; loja e mes são índices
D) Todos são clustering; não existe chave de partição

**Gabarito: A.** loja e mes formam a partition key; dia é clustering.

### N6 · Grafos e Cypher
Para representar seguidores e percorrer relacionamentos, qual modelo é o encaixe mais direto?

A) Grafos
B) Chave-valor sem consulta a relações
C) Tabelas de cache por expiração
D) Arquivos de texto sequenciais

**Gabarito: A.** grafos, com relacionamentos explícitos entre entidades.

### N7 · Grafos e Cypher
O que retorna MATCH (a:Pessoa)-[:SEGUE]->(b:Pessoa) RETURN b.nome? Pode haver repetição?

A) Nomes das pessoas seguidas; podem se repetir
B) Nomes dos seguidores, sempre sem repetição
C) Todos os nomes, mesmo sem relação SEGUE
D) Quantidade de seguidores agrupada por pessoa

**Gabarito: A.** nomes de pessoas seguidas por pessoas correspondentes ao padrão. Pode repetir: não há DISTINCT e uma pessoa pode ter vários seguidores.

### N8 · Documentos e agregados
Embutir itens no documento de um pedido significa:

A) criar grafo
B) reunir agregado
C) eliminar toda duplicação
D) impor esquema uniforme a todas as coleções

**Gabarito: B.** Pedido/itens formam agregado; isso não garante ausência de duplicação.

### N9 · Fundamentos e modelos
Diferencie replicação e particionamento.

A) Replicar mantém cópias; particionar divide os dados
B) Replicar divide dados; particionar só duplica
C) Os dois mecanismos apenas aumentam a memória da máquina
D) Particionar elimina a necessidade de comunicação em rede

**Gabarito: A.** replicação mantém cópias; particionamento divide subconjuntos entre nós.

### N10 · Cassandra e CQL
Sobre ALLOW FILTERING no Cassandra, qual afirmação é correta?

A) Autoriza certas filtragens, mas não garante eficiência
B) Garante o uso de índice em qualquer consulta
C) Cria automaticamente a partition key
D) Elimina a necessidade de modelar pelas consultas

**Gabarito: A.** A filtragem autorizada pode ser custosa.

### N11 · Fundamentos e modelos
Um aplicativo precisa ampliar a capacidade distribuindo dados entre máquinas. Que tipo de escala está buscando?

A) Horizontal
B) Vertical
C) Normalização até a terceira forma normal
D) Conversão obrigatória para XML

**Gabarito: A.** Escala horizontal adiciona nós; vertical aumenta recursos de uma máquina.

### N12 · Fundamentos e modelos
Um cadastro aceita documentos com campos diferentes, mas valida cada entrada. Isso é compatível com NoSQL?

A) Sim, flexibilidade de esquema não elimina validação
B) Não, schemaless proíbe validação
C) Não, todos os documentos precisam ter campos idênticos
D) Somente se os dados forem imagens

**Gabarito: A.** Schemaless não significa ausência de estrutura ou de regras na aplicação.

### N13 · Fundamentos e modelos
Qual afirmação evita uma generalização incorreta sobre NoSQL?

A) A escolha do modelo depende das necessidades da aplicação
B) Todo NoSQL dispensa consistência
C) Todo NoSQL é mais rápido em qualquer consulta
D) NoSQL proíbe qualquer linguagem parecida com SQL

**Gabarito: A.** Os modelos atendem necessidades diferentes; não há superioridade universal.

### N14 · Fundamentos e modelos
Uma rede mantém cópias dos mesmos dados em servidores diferentes. Qual mecanismo descreve isso?

A) Replicação
B) Particionamento exclusivo
C) Clustering de linhas
D) Projeção de campos

**Gabarito: A.** Replicação mantém cópias; particionamento divide o conjunto de dados.

### N15 · JSON e PostgreSQL
Qual opção descreve JSONB no PostgreSQL?

A) Representação binária processada com operações e indexação próprias
B) Texto que sempre conserva espaços e chaves duplicadas
C) Extensão exclusiva para relações entre nós
D) Formato que só admite strings sem arrays

**Gabarito: A.** JSONB processa a representação, diferentemente da preservação textual de JSON.

### N16 · JSON e PostgreSQL
Qual função apresenta um documento JSONB de maneira legível?

A) jsonb_pretty
B) json_each
C) count
D) json_typeof

**Gabarito: A.** jsonb_pretty formata a apresentação; json_each desdobra objetos e count agrega.

### N17 · JSON e PostgreSQL
Para filtrar nome como texto em dados JSONB, qual expressão está adequada?

A) dados ->> 'nome' = 'Ana'
B) jsonb_pretty(dados) = 'Ana'
C) count(dados) = 'Ana'
D) dados ->> 'nome' = 10

**Gabarito: A.** O operador ->> extrai texto, que pode ser comparado à string Ana.

### N18 · JSON e PostgreSQL
Qual afirmação sobre HSTORE está correta?

A) Representa pares chave-valor textuais no PostgreSQL
B) É linguagem de grafos do Neo4j
C) É chave de partição obrigatória do Cassandra
D) É coleção BSON do MongoDB

**Gabarito: A.** HSTORE é uma extensão de chave-valor; não confunda com BSON ou Cypher.

### N19 · Documentos e agregados
No MongoDB, qual comando altera apenas o campo nota de um aluno correspondente?

A) updateOne com $set
B) find com $gte
C) createCollection com capped
D) deleteOne com projeção

**Gabarito: A.** updateOne seleciona o documento e $set atualiza os campos indicados.

### N20 · Documentos e agregados
Qual é a equivalência útil entre relacional e MongoDB?

A) Linha corresponde a documento; tabela a coleção
B) Linha corresponde a coleção; tabela a documento
C) Coluna corresponde a banco; linha a índice
D) Tabela corresponde a relacionamento Cypher

**Gabarito: A.** Coleções agrupam documentos; documentos contêm campos.

### N21 · Documentos e agregados
Um pedido é normalmente lido com todos os seus itens. Embutir itens no documento pode favorecer:

A) A recuperação conjunta do agregado
B) A ausência absoluta de duplicação em toda a base
C) Joins relacionais obrigatórios
D) A divisão de cada atributo em um servidor

**Gabarito: A.** Um agregado reúne dados relacionados; a escolha depende do padrão de acesso.

### N22 · Documentos e agregados
Qual diferença entre deleteOne e drop numa coleção MongoDB?

A) deleteOne remove documento correspondente; drop remove coleção
B) Ambos removem sempre o banco inteiro
C) drop apenas atualiza um campo
D) deleteOne cria índice; drop consulta documentos

**Gabarito: A.** O escopo da operação importa: documento e coleção são níveis distintos.

### N23 · Cassandra e CQL
Na chave PRIMARY KEY (sensor, instante), sem parênteses internos, sensor e instante são:

A) Chave de partição e coluna de clustering, respectivamente
B) Duas chaves de partição independentes
C) Duas foreign keys obrigatórias
D) Coluna de clustering e chave de partição, respectivamente

**Gabarito: A.** O primeiro elemento simples define a partição; os seguintes são clustering.

### N24 · Cassandra e CQL
Ao modelar tabelas no Cassandra, qual ponto de partida é mais adequado?

A) As consultas e padrões de acesso necessários
B) Eliminar toda duplicação a qualquer custo
C) Garantir joins arbitrários entre todas as tabelas
D) Usar ALLOW FILTERING em toda consulta

**Gabarito: A.** A modelagem por consulta favorece acesso eficiente e pode aceitar duplicação.

### N25 · Cassandra e CQL
Qual coleção representa valores únicos no Cassandra?

A) set
B) list
C) map com chaves repetidas
D) Uma coluna timestamp

**Gabarito: A.** Set representa unicidade; list é sequência e pode repetir valores.

### N26 · Cassandra e CQL
Qual é a função de um keyspace?

A) Agrupar tabelas e configurações como replicação
B) Ordenar caracteres dentro de toda string
C) Substituir cada documento BSON
D) Criar automaticamente relações entre todos os nós

**Gabarito: A.** Keyspace é o agrupamento lógico, com configurações como estratégia de replicação.

### N27 · Grafos e Cypher
Em Cypher, qual comando modifica propriedades de um nó localizado?

A) SET
B) RETURN
C) COUNT
D) MATCH sem outra cláusula

**Gabarito: A.** MATCH localiza o padrão; SET altera propriedades.

### N28 · Grafos e Cypher
Em (a)-[r:SEGUE]->(b), r representa:

A) Um relacionamento do tipo SEGUE
B) Uma tabela relacional chamada SEGUE
C) O rótulo obrigatório de todos os nós
D) Um campo JSON de a chamado b

**Gabarito: A.** Colchetes indicam o relacionamento; parênteses indicam nós.

### N29 · Grafos e Cypher
Para excluir um nó junto com seus relacionamentos, reconheça:

A) DETACH DELETE
B) RETURN DISTINCT
C) SET NULL sobre o banco inteiro
D) MATCH sem DELETE

**Gabarito: A.** DETACH DELETE remove o nó e os relacionamentos conectados a ele.

### N30 · Grafos e Cypher
Um relacionamento Neo4j pode ter data de início como propriedade?

A) Sim, relacionamentos também podem ter propriedades
B) Não, só bancos relacionais aceitam datas
C) Não, propriedades existem apenas em rótulos
D) Sim, mas isso o transforma em coleção MongoDB

**Gabarito: A.** Nós e relacionamentos podem armazenar propriedades, como desde e peso.

### N31 · JSON e PostgreSQL
A coluna dados contém {"cores":["azul","verde","cinza"]}. Qual é o resultado de dados -> 'cores' ->> 1?

A) verde, como texto
B) azul, como texto
C) verde, como objeto JSON
D) O array completo

**Gabarito: A.** O índice começa em zero; 1 aponta para o segundo item e ->> extrai texto.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/107834666/cct-0853-banco-de-dados-nosql-aula-4). Conferência: PostgreSQL, JSON Functions and Operators; apostila chave-valor, parte II.

### N32 · Grafos e Cypher
Um catálogo será representado em grafo. Qual instrução adiciona uma entidade Produto com uma propriedade de identificação?

A) CREATE (:Produto {codigo:'P7'})
B) INSERT INTO (:Produto {codigo:'P7'})
C) ADD NODE Produto SET codigo='P7'
D) MATCH (:Produto) RETURN 'P7'

**Gabarito: A.** Cypher usa CREATE com o padrão de nó entre parênteses; MATCH procura um padrão existente.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/115160982/prova-av-banco-de-dados-nosql). Conferência: Apostilas de grafos, partes I e II.

### N33 · Cassandra e CQL
Registros de vendas precisam ser colocados nas partições do Cassandra segundo a região. Que parte da chave é responsável por essa distribuição?

A) Partition key
B) Somente clustering column
C) Alias do SELECT
D) Nome de uma propriedade Cypher

**Gabarito: A.** A partition key identifica a partição; clustering organiza linhas dentro dela.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/115160982/prova-av-banco-de-dados-nosql). Conferência: Apostilas de Cassandra, partes I e II.

## Métodos Quantitativos

### M1 · Modelagem e aplicações
A consome 2 horas por unidade e B consome 3; há no máximo 60 horas. Escreva a restrição para quantidades x e y.

A) 2x + 3y ≤ 60
B) 2x + 3y ≥ 60
C) 3x + 2y ≤ 60
D) x + y = 60

**Gabarito: A.** 2x+3y≤60. Acrescente x,y≥0 no modelo completo.

### M2 · Modelagem e aplicações
É preciso obter pelo menos 25 unidades entre produção própria x e compra y. Escreva a restrição.

A) x + y ≥ 25
B) x + y ≤ 25
C) x − y ≥ 25
D) 25x + 25y = 1

**Gabarito: A.** x+y≥25; “pelo menos” é limite inferior.

### M3 · Solução gráfica
Resolva por vértices: max 4x+3y, com x+y≤5, x≤3, y≤4, x,y≥0.

A) x=3, y=2 e Z=18
B) x=1, y=4 e Z=16
C) x=3, y=4 e Z=24
D) x=0, y=4 e Z=12

**Gabarito: A.** vértices (0,0), (3,0), (3,2), (1,4), (0,4); Z=0,12,18,16,12. Ótimo (3,2), Z=18.

### M4 · Método Simplex
No teste de razão do Simplex primal, coeficientes positivos da coluna entrante são 2 e 1; termos independentes, 8 e 3. Qual linha sai?

A) A segunda: 3/1 é a menor razão admissível
B) A primeira: 8/2 é a maior razão
C) A primeira: seu coeficiente 2 é maior
D) Nenhuma: ambas as razões são positivas

**Gabarito: A.** segunda linha, pois 8/2=4 e 3/1=3; menor razão admissível.

### M5 · Dualidade
Escreva o dual: max 5x+4y, com 2x+y≤10, x+3y≤12, x,y≥0.

A) min 10u+12v; 2u+v≥5; u+3v≥4; u,v≥0
B) max 10u+12v; 2u+v≤5; u+3v≤4; u,v≥0
C) min 5u+4v; 2u+v≥10; u+3v≥12; u,v≥0
D) min 10u+12v; 2u+3v≥5; u+v≥4; u,v≥0

**Gabarito: A.** min 10u+12v, com 2u+v≥5, u+3v≥4, u,v≥0. Matriz transposta e papéis de b/c trocados.

### M6 · Sensibilidade
Preço-sombra 6; capacidade aumenta 2 unidades dentro do intervalo de validade. Quanto varia o ótimo?

A) Aumenta 12 unidades
B) Aumenta 3 unidades
C) Aumenta 6 unidades
D) Diminui 12 unidades

**Gabarito: A.** aumento de 12 unidades no objetivo, nas condições dadas.

### M7 · Dualidade
Uma restrição tem folga zero na solução ótima. Sobre seu preço-sombra:

A) Pode ser zero ou não, conforme o problema
B) É obrigatoriamente positivo
C) É obrigatoriamente negativo
D) É sempre igual à folga

**Gabarito: A.** Folga zero permite preço zero. Folga estritamente positiva exige preço zero.

### M8 · Modelagem e aplicações
Estoque inicial 10, produção 40, demanda 35. Estoque final?

A) 15 unidades
B) 65 unidades
C) 5 unidades
D) 25 unidades

**Gabarito: A.** 10+40−35=15 unidades.

### M9 · Modelagem e aplicações
Mistura com pelo menos 30% de nutriente; x contém 20% e y contém 50%. Escreva a restrição.

A) 0,20x+0,50y ≥ 0,30(x+y)
B) 0,20x+0,50y ≤ 0,30(x+y)
C) 0,20x+0,50y ≥ 0,30
D) x+y ≥ 0,30

**Gabarito: A.** 0,20x+0,50y≥0,30(x+y); equivale a y≥0,5x, com não negatividade.

### M10 · Sensibilidade
Para max 3x+2y, x+y≤4, x≤2, y≤3, o ótimo é (2,2), Z=10 e o preço-sombra da primeira restrição é 2. Se a capacidade passa a 6, é correto prever ganho de 4? Calcule o novo ótimo.

A) Não: o novo ótimo é (2,3), Z=12; o preço marginal mudou
B) Sim: o novo ótimo vale 14 em qualquer capacidade
C) Não: o novo ótimo é (0,3), Z=6
D) Sim: o novo ótimo é (3,2), Z=13

**Gabarito: A.** não. O preço 2 só se mantém até capacidade 5, fixados os outros limites. Com capacidade 6, ótimo (2,3), Z=12; ganho de 2, não 4.

### M11 · Modelagem e aplicações
Cada produto A usa 4 kg e B usa 2 kg; há 80 kg disponíveis. Qual restrição modela a capacidade?

A) 4x+2y≤80
B) 4x+2y≥80
C) 2x+4y=80
D) x+y≤4

**Gabarito: A.** Multiplique consumo unitário por quantidade e limite pela disponibilidade.

### M12 · Modelagem e aplicações
Em um modelo, x é a quantidade de mesas por semana. Qual função maximiza lucro de 30 por mesa e 12 por cadeira y?

A) max 30x+12y
B) min 30x+12y
C) max 12x+30y
D) max x+y≤42

**Gabarito: A.** Os coeficientes do objetivo são lucros unitários, coerentes com as variáveis.

### M13 · Modelagem e aplicações
Num nó de transbordo sem geração nem consumo, vale:

A) Entrada total igual à saída total
B) Entrada sempre menor que saída
C) Saída sempre nula
D) Entrada mais saída igual a um

**Gabarito: A.** A conservação do fluxo impõe o balanço no nó intermediário.

### M14 · Modelagem e aplicações
Uma tarefa deve ser atribuída a exatamente um agente. Como modelar a decisão xij?

A) Variável binária e soma dos agentes para a tarefa igual a 1
B) Variável livre e soma igual a 0
C) Variável sempre igual a 2
D) Variável contínua negativa sem restrições

**Gabarito: A.** Alocação um a um usa decisões binárias e restrições de atribuição.

### M15 · Solução gráfica
Maximize 2x+y, com x+y≤4, x≤3, x,y≥0. Qual é o ótimo?

A) (3,1), Z=7
B) (0,4), Z=4
C) (3,4), Z=10
D) (4,0), Z=8

**Gabarito: A.** Os dois últimos pontos violam restrições. Entre os vértices viáveis, (3,1) maximiza Z.

### M16 · Solução gráfica
Qual ponto é inviável para x+y≤6, x≤4, y≤5 e x,y≥0?

A) (4,3)
B) (4,2)
C) (1,5)
D) (0,0)

**Gabarito: A.** Em (4,3), x+y=7 ultrapassa a capacidade 6.

### M17 · Solução gráfica
Uma região viável é ilimitada. Isso basta para afirmar que o objetivo também é ilimitado?

A) Não; depende da função objetivo e do sentido de otimização
B) Sim, em qualquer problema
C) Sim, desde que exista uma variável x
D) Não; toda região ilimitada é inviável

**Gabarito: A.** Região ilimitada pode ter ótimo finito. Geometria da região e direção do objetivo diferem.

### M18 · Solução gráfica
Dois vértices adjacentes são ótimos e todo o segmento entre eles é viável. Numa PL, o segmento:

A) Também contém soluções ótimas
B) É sempre inviável
C) Contém apenas soluções inteiras
D) Elimina a possibilidade de ótimo finito

**Gabarito: A.** A linearidade conserva o valor ótimo ao longo desse segmento.

### M19 · Método Simplex
Para transformar 2x+y≤10 em igualdade, usa-se:

A) 2x+y+s=10, s≥0
B) 2x+y−s=10, s≥0
C) 2x+y=10 sem variável adicional
D) 2x+y+s=0, s≥0

**Gabarito: A.** Folga soma o recurso não utilizado para completar o lado direito.

### M20 · Método Simplex
Na coluna entrante do Simplex, coeficiente zero participa do teste de razão como divisor?

A) Não; usam-se coeficientes estritamente positivos no teste primal usual
B) Sim; basta dividir o termo independente por zero
C) Sim; ele sempre determina a saída
D) Somente se o termo independente também for zero

**Gabarito: A.** O teste considera coeficientes positivos; divisão por zero não é admissível.

### M21 · Método Simplex
Após escolher um pivô de valor 2, qual é a primeira operação de normalização?

A) Dividir toda a linha do pivô por 2
B) Multiplicar só o termo independente por 2
C) Somar 2 a todas as linhas
D) Excluir a variável entrante do modelo

**Gabarito: A.** Normalizar torna o pivô igual a 1; depois a coluna é eliminada nas outras linhas.

### M22 · Método Simplex
Na convenção Z−4x−y=0 para maximização, há coeficientes negativos na linha Z. Isso indica:

A) Possibilidade de melhoria antes de confirmar otimalidade
B) Otimalidade garantida
C) Inviabilidade automática do modelo
D) Necessidade de apagar as restrições

**Gabarito: A.** O critério depende da convenção; nesta, negativos indicam oportunidade de entrada.

### M23 · Dualidade
Um primal padrão tem 3 restrições e 2 variáveis. O dual terá:

A) 3 variáveis e 2 restrições
B) 2 variáveis e 3 restrições
C) 6 variáveis e nenhuma restrição
D) Sempre a mesma matriz sem transposição

**Gabarito: A.** Cada restrição primal gera variável dual e cada variável primal gera restrição dual.

### M24 · Dualidade
Para primal max cᵀx com Ax≤b e x≥0, o dual padrão é:

A) min bᵀu com Aᵀu≥c e u≥0
B) max bᵀu com Au≤c e u≥0
C) min cᵀu com Aᵀu≤b e u≤0
D) max cᵀx sem restrições

**Gabarito: A.** Transponha A e troque os papéis de b e c, com os sentidos do caso padrão.

### M25 · Dualidade
No ótimo, uma restrição apresenta folga estritamente positiva. Pela complementaridade, a variável dual correspondente é:

A) Zero
B) Sempre 1
C) Obrigatoriamente negativa
D) Igual à folga positiva

**Gabarito: A.** O produto da folga pela variável dual é zero; folga positiva força variável dual nula.

### M26 · Dualidade
Soluções viáveis primal max e dual min têm o mesmo valor 42. O que se conclui?

A) Ambas são ótimas
B) Ambas são inviáveis
C) O primal precisa alcançar 84
D) É necessário inverter a matriz novamente

**Gabarito: A.** A igualdade dos valores viáveis atinge o limite dado pela dualidade fraca e certifica otimalidade.

### M27 · Sensibilidade
Preço-sombra 4; recurso aumenta 3 unidades dentro do intervalo válido. A variação prevista de Z é:

A) 12
B) 7
C) 4/3
D) 3/4

**Gabarito: A.** Use variação marginal vezes alteração do recurso: 4×3=12.

### M28 · Sensibilidade
Um coeficiente do objetivo muda dentro da faixa de estabilidade, preservando o mesmo ponto ótimo. O valor de Z:

A) Pode mudar mesmo sem mudar as quantidades ótimas
B) É obrigado a permanecer igual
C) Fica sempre zero
D) Torna a solução automaticamente inviável

**Gabarito: A.** O valor do objetivo depende dos coeficientes, além das quantidades.

### M29 · Sensibilidade
A soma das frações da regra dos 100% ultrapassa 1. Quando a regra é aplicável, isso significa:

A) A regra não garante estabilidade; é preciso reavaliar
B) A solução necessariamente ficou inviável
C) A solução necessariamente deixou de ser ótima
D) Os preços-sombra dobraram

**Gabarito: A.** A regra dá condição suficiente; ultrapassá-la retira a garantia, sem provar mudança.

### M30 · Sensibilidade
O recurso está além do intervalo do preço-sombra informado. Qual conduta é correta?

A) Reotimizar ou reavaliar a sensibilidade
B) Extrapolar o mesmo preço indefinidamente
C) Multiplicar sempre por zero
D) Ignorar as demais restrições

**Gabarito: A.** O preço marginal é local; mudanças de base podem alterar seu valor.

### M31 · Modelagem e aplicações
Uma oficina decide as quantidades de dois produtos, limitadas pelos estoques de três metais. Quantas variáveis representam as decisões de produção?

A) Duas: uma por produto
B) Três: uma por metal
C) Cinco: produtos mais metais
D) Seis: produtos vezes metais

**Gabarito: A.** Produtos definem as decisões; recursos geram as restrições.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/127112363/prova-metodos-quantitativos). Conferência: Aplicações da programação linear: identificação de variáveis e recursos.

### M32 · Modelagem e aplicações
Cada tonelada dos produtos X e Y consome, respectivamente, 0,4 e 0,15 tonelada de cobre. Há 12 toneladas de cobre. Qual limite está correto?

A) 0,4x+0,15y≤12
B) 0,4x+0,15y≥12
C) 0,15x+0,4y≤12
D) x+y=12

**Gabarito: A.** Consumo unitário vezes quantidade não pode ultrapassar o estoque disponível. Os dados são novos e explícitos.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/127112363/prova-metodos-quantitativos). Conferência: Aplicações da programação linear: mistura e disponibilidade.

### M33 · Modelagem e aplicações
Um gestor usa uma miniatura de armazém e uma equação de custos. Como classificar essas representações?

A) Modelo físico e matemático, respectivamente
B) Variável de decisão e estoque
C) Dois processos necessariamente aleatórios
D) Modelo matemático e físico, respectivamente

**Gabarito: A.** A miniatura representa materialmente; a equação usa símbolos matemáticos.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/127112363/prova-metodos-quantitativos). Conferência: PO como ferramenta de apoio à decisão: representações e modelos.

## LPS

### L1 · Fundamentos e engenharias
Qual engenharia cria os ativos reutilizáveis?

A) Engenharia do domínio
B) Engenharia da aplicação
C) Somente a equipe de suporte de cada cliente
D) Somente a gestão de contratos

**Gabarito: A.** engenharia do domínio: desenvolve para reuso e para a família.

### L2 · Fundamentos e engenharias
Qual engenharia seleciona as variantes de um produto para uma clínica específica?

A) Engenharia da aplicação
B) Engenharia do domínio, sem requisitos do cliente
C) Somente a auditoria externa
D) A ferramenta de teste, sem configuração

**Gabarito: A.** engenharia da aplicação: deriva produto concreto.

### L3 · Variabilidade
No ponto de variação “autenticação”, senha e biometria são o quê?

A) Variantes
B) Domínios de negócio independentes
C) Requisitos delta necessariamente
D) Arquiteturas de referência completas

**Gabarito: A.** variantes do ponto de variação.

### L4 · Variabilidade
A requires B: A presente/B ausente é configuração válida?

A) Não, pois selecionar A exige selecionar B
B) Sim, porque requires apenas sugere B
C) Sim, porque A e B se excluem
D) Não, porque A é sempre proibida

**Gabarito: A.** não; selecionar A exige B.

### L5 · Estratégias de adoção
Extrair comunalidades de produtos existentes é adoção:

A) proativa
B) extrativa
C) força bruta
D) aplicação pura

**Gabarito: B.** Extrativa parte de sistemas existentes.

### L6 · Variabilidade
Para que serve o Modelo Ortogonal de Variabilidade?

A) Documentar variabilidade e conectá-la aos artefatos
B) Substituir os requisitos por código-fonte
C) Eliminar todas as diferenças entre produtos
D) Testar automaticamente todas as configurações

**Gabarito: A.** documentar pontos, variantes, dependências/restrições e sua conexão com artefatos de desenvolvimento.

### L7 · Aplicação e rastreabilidade
O que é requisito delta?

A) Necessidade da aplicação não totalmente coberta pelo domínio
B) Qualquer requisito comum a todos os produtos
C) Um defeito necessariamente causado pelo cliente
D) Uma variante obrigatória já implementada

**Gabarito: A.** necessidade da aplicação não completamente coberta pelos requisitos/ativos de domínio; exige avaliação de impacto.

### L8 · Testes de LPS
Depois de testar os ativos de domínio, o que fazer na aplicação?

A) Testar configuração, integração e requisitos específicos
B) Dispensar qualquer teste adicional
C) Testar apenas a cor da interface
D) Remover os testes reutilizáveis

**Gabarito: A.** Configuração, integração e deltas precisam de testes de aplicação.

### L9 · Variabilidade
Quatro pontos independentes, exatamente uma escolha entre duas variantes em cada: quantas configurações sem outras restrições?

A) 16
B) 8
C) 4
D) 32

**Gabarito: A.** 2^4=16 nas condições dadas.

### L10 · Aplicação e rastreabilidade
Mudança em variante altera requisito/código, mas o teste ficou desatualizado. Qual prática ajuda a identificar esse impacto?

A) Rastreabilidade
B) Apenas contagem de linhas de código
C) Somente renomear a variante
D) Desativar os testes comuns

**Gabarito: A.** rastreabilidade entre variabilidade, requisitos, implementação e testes.

### L11 · Fundamentos e engenharias
Uma família de produtos compartilha arquitetura, requisitos e testes e permite opções planejadas. Isso caracteriza:

A) Linha de Produtos de Software
B) Cópia casual sem gestão de diferenças
C) Produto único sem qualquer reutilização
D) Migração obrigatória para microsserviços

**Gabarito: A.** LPS combina ativos comuns e variabilidade gerida em um domínio.

### L12 · Fundamentos e engenharias
Qual ativo pode ser reutilizado numa LPS além do código?

A) Requisitos, arquitetura e casos de teste
B) Apenas o nome comercial
C) Somente o contrato do fornecedor
D) Exclusivamente imagens da interface

**Gabarito: A.** Reuso sistemático abrange diversos artefatos do desenvolvimento.

### L13 · Fundamentos e engenharias
Uma arquitetura que serve à família inteira é chamada:

A) Arquitetura de referência
B) Instância exclusiva de um cliente
C) Requisito delta
D) Teste unitário descartável

**Gabarito: A.** A arquitetura de referência orienta as especializações das aplicações.

### L14 · Fundamentos e engenharias
Qual associação está correta?

A) Domínio desenvolve para reuso; aplicação desenvolve com reuso
B) Domínio só vende; aplicação cria toda a plataforma do zero
C) Domínio só testa; aplicação define o mercado inteiro
D) Ambas dispensam gestão de variabilidade

**Gabarito: A.** A distinção central é criar ativos reutilizáveis e derivar produtos com eles.

### L15 · Variabilidade
Uma variante A excludes B. O produto pode incluir ambas?

A) Não; a restrição impede coexistência
B) Sim; excludes significa que B é obrigatória
C) Sim; restrições só valem nos testes
D) Não; toda variante opcional é proibida

**Gabarito: A.** Excludes representa incompatibilidade entre escolhas.

### L16 · Variabilidade
Um grupo permite escolher entre 1 e 2 de 3 variantes. Qual seleção é válida?

A) Duas variantes
B) Nenhuma variante
C) As três variantes
D) Quatro variantes

**Gabarito: A.** A cardinalidade [1,2] limita a quantidade mínima e máxima escolhida.

### L17 · Variabilidade
A escolha de banco é definida apenas na configuração de implantação. Isso descreve:

A) Tempo de ligação da variabilidade
B) Duplicação do domínio
C) Eliminação do ponto de variação
D) Defeito de compilação inevitável

**Gabarito: A.** Tempo de ligação é quando se resolve a escolha entre variantes.

### L18 · Variabilidade
Qual é exemplo de variabilidade interna?

A) Escolher a biblioteca de persistência usada pela implementação
B) Cliente escolher o plano visível na tela
C) Usuário selecionar o idioma exibido
D) Cliente contratar o módulo de faturamento

**Gabarito: A.** Variabilidade interna diz respeito a decisões técnicas; a externa é percebida pelo cliente.

### L19 · Estratégias de adoção
Uma empresa constrói ativos-base antes de derivar a família prevista. A abordagem é:

A) Proativa
B) Extrativa
C) Aplicação pura
D) Força bruta

**Gabarito: A.** Proativa antecipa os ativos; extrativa parte de produtos existentes.

### L20 · Estratégias de adoção
A base da LPS é ampliada conforme chegam novos requisitos e produtos. Isso é:

A) Abordagem reativa
B) Abordagem extrativa obrigatória
C) Teste de força bruta
D) Ausência de engenharia de domínio

**Gabarito: A.** Reativa evolui a plataforma incrementalmente conforme as demandas.

### L21 · Estratégias de adoção
Qual risco deve ser considerado ao adotar LPS?

A) Investimento inicial e gestão de configurações
B) Proibição de reutilizar testes
C) Impossibilidade de produzir mais de um produto
D) Ausência de qualquer custo de manutenção

**Gabarito: A.** Benefícios de reuso exigem investimento, escopo adequado e gestão.

### L22 · Estratégias de adoção
Três sistemas existentes serão analisados para formar uma plataforma comum. Qual estratégia descreve a iniciativa?

A) Extrativa
B) Proativa sem produtos prévios
C) Exclusão de variantes
D) Teste de aplicação pura

**Gabarito: A.** A abordagem extrativa identifica comuns e variáveis em produtos já existentes.

### L23 · Aplicação e rastreabilidade
Um cliente pede recurso ausente nos ativos de domínio. Primeiro, é adequado:

A) Avaliar o delta e seu impacto em custo, arquitetura e testes
B) Adicionar código sem analisar efeitos
C) Ignorar o requisito sem negociação
D) Eliminar a arquitetura de referência

**Gabarito: A.** Deltas precisam de análise e podem exigir extensão dos ativos ou adaptação específica.

### L24 · Aplicação e rastreabilidade
Ao derivar uma aplicação, qual relação entre suas arquiteturas é esperada?

A) A arquitetura da aplicação especializa a de referência
B) As arquiteturas jamais podem compartilhar elementos
C) A arquitetura de referência contém apenas dados de um cliente
D) A aplicação precisa eliminar todos os componentes comuns

**Gabarito: A.** A derivação seleciona e adapta elementos da plataforma para o produto concreto.

### L25 · Aplicação e rastreabilidade
Uma alteração de variante exige descobrir requisitos e testes afetados. Qual vínculo é necessário?

A) Rastreabilidade entre artefatos
B) Somente quantidade de commits
C) Apenas data de criação do produto
D) Duplicação de todo o repositório

**Gabarito: A.** Rastreabilidade permite analisar impactos ao conectar variabilidade e artefatos.

### L26 · Aplicação e rastreabilidade
Reutilizar um componente numa aplicação significa que:

A) Ele ainda precisa ser integrado e validado no contexto
B) Seu comportamento nunca depende do contexto
C) Todos os testes da aplicação são dispensáveis
D) Ele deve ser necessariamente reescrito

**Gabarito: A.** Reuso economiza esforço, mas não elimina verificação da configuração e integração.

### L27 · Testes de LPS
Testar todas as combinações possíveis de uma LPS é a estratégia:

A) Força bruta
B) Aplicativo de amostra
C) Reativa
D) Extrativa

**Gabarito: A.** Força bruta pode se tornar impraticável pela explosão combinatória.

### L28 · Testes de LPS
Qual vantagem dos aplicativos de amostra no teste de domínio?

A) Antecipar validação com configurações representativas
B) Garantir que nenhuma aplicação precise de teste
C) Cobrir automaticamente todas as combinações possíveis
D) Eliminar a necessidade de variantes

**Gabarito: A.** Amostras ajudam a validar cedo, mas exigem complementação nos produtos reais.

### L29 · Testes de LPS
Concentrar testes somente nos produtos finais, sem testar ativos no domínio, caracteriza:

A) Aplicação pura
B) Desenvolvimento proativo
C) Teste de força bruta
D) Modelo ortogonal

**Gabarito: A.** Aplicação pura perde validação antecipada e pode repetir esforço entre produtos.

### L30 · Testes de LPS
Cinco pontos independentes, exatamente uma escolha entre duas opções em cada, geram:

A) 32 configurações
B) 10 configurações
C) 25 configurações
D) 64 configurações

**Gabarito: A.** O produto das escolhas é 2⁵=32, sem outras restrições.

### L31 · Testes de LPS
Uma família atende a uma clínica e a um hospital com exigências diferentes de disponibilidade. Como avaliar a qualidade?

A) Considerar os requisitos de cada produto
B) Exigir o mesmo limiar para todos
C) Testar só o produto menor
D) Medir apenas o número de módulos

**Gabarito: A.** Uma base compartilhada não torna idênticos os requisitos de qualidade.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/118752483/cct-1027-linhas-de-produtos-de-software). Conferência: Conceitos de LPS e testes de aplicação.

### L32 · Fundamentos e engenharias
Uma biblioteca comum foi ajustada para servir a mais produtos. Essa mudança é compatível com a engenharia dos ativos-base?

A) Sim, com evolução planejada e documentada
B) Não; ativos-base são imutáveis
C) Somente eliminando o reuso
D) Sim, dispensando documentação

**Gabarito: A.** Ativos-base podem evoluir e receber adaptações para ampliar sua reutilização.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/118752483/cct-1027-linhas-de-produtos-de-software). Conferência: Conceitos de LPS: Core Asset Development, páginas 13–14.

### L33 · Variabilidade
Escolher as variantes de uma aplicação e identificar quando a escolha ocorre corresponde a:

A) Resolução de variabilidade e tempo de ligação
B) Normalização e tempo de resposta
C) Extração e compilação obrigatória
D) Teste de amostra e preço-sombra

**Gabarito: A.** A resolução concretiza opções; o tempo de ligação identifica o momento da decisão.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/118752483/cct-1027-linhas-de-produtos-de-software). Conferência: Variabilidade em LPS: resolução e tempo de ligação.

## Android

### A1 · Componentes e interface
Diferencie props e state.

A) Props são recebidas; state é gerenciado pelo componente
B) Props são banco local; state é banco remoto
C) Props são sempre mutáveis pelo filho; state nunca muda
D) State vem apenas da URL; props são funções de teste

**Gabarito: A.** props recebidas do pai; state gerenciado pelo componente para representar dados mutáveis.

### A2 · Componentes e interface
Para lista grande: FlatList ou ScrollView com todos os filhos? Por quê?

A) FlatList, por virtualizar a renderização dos itens
B) ScrollView, pois sempre renderiza menos itens
C) ScrollView, pois não usa memória para os filhos
D) FlatList, porque transforma itens em tabelas SQL

**Gabarito: A.** FlatList, por virtualização; ScrollView com todos os filhos os renderiza juntos.

### A3 · Persistência
Por que usar JSON.stringify antes de guardar um objeto em AsyncStorage?

A) Serializar o objeto em texto antes de armazenar
B) Criptografar o objeto com chave secreta
C) Criar uma tabela relacional automaticamente
D) Transformar uma Promise em operação síncrona

**Gabarito: A.** AsyncStorage guarda valores textuais; stringify serializa e parse reconstrói na leitura.

### A4 · Persistência
Qual tecnologia fornece um banco relacional local no aplicativo?

A) SQLite
B) MongoDB remoto
C) Base64
D) Redux

**Gabarito: A.** SQLite é um banco relacional local; Redux gerencia estado, Base64 é codificação e MongoDB remoto requer acesso ao serviço.

### A5 · Rede e Offline First
Após const r = await fetch(url), como obter o corpo interpretado como JSON?

A) await r.json()
B) JSON.stringify(r)
C) r.data()
D) await r.executeSql()

**Gabarito: A.** await r.json(); confira também r.ok e trate falhas.

### A6 · Rede e Offline First
Detectar conectividade em um app Offline First:

A) É só parte da solução; faltam sincronização e conflitos
B) Resolve automaticamente conflitos entre edições
C) Impede a reentrega de operações pendentes
D) Dispensa armazenamento local

**Gabarito: A.** É preciso sincronizar e lidar com duplicações/conflitos.

### A7 · Arquiteturas e Redux
No Redux, quem calcula o próximo estado a partir de estado anterior e action?

A) Reducer
B) Dispatcher obrigatório separado do Redux
C) Componente TextInput
D) Driver SQLite

**Gabarito: A.** reducer, calculando novo estado sem modificar diretamente o anterior.

### A8 · Segurança e qualidade
Base64 garante sigilo? Justifique.

A) Não: é codificação reversível sem segredo
B) Sim: exige uma chave secreta para decodificar
C) Sim: é uma função hash de sentido único
D) Sim: substitui HTTPS no transporte

**Gabarito: A.** não; é codificação reversível sem chave secreta.

### A9 · Componentes e interface
Diferencie onPress={salvar} e onPress={salvar()}.

A) A primeira passa a função; a segunda a executa e passa o retorno
B) Ambas sempre aguardam o toque para executar salvar
C) A primeira executa agora; a segunda passa callback
D) Nenhuma das duas aceita função JavaScript

**Gabarito: A.** a primeira passa callback; a segunda executa a função naquele momento e passa seu retorno.

### A10 · Componentes e interface
Cite os três modelos de navegação e a função de um deles.

A) Stack, tabs e drawer; stack organiza avanço e retorno em pilha
B) Stack, SQL e drawer; SQL organiza as telas
C) Props, state e tabs; state é um menu lateral
D) MVC, Flux e Redux; todos são menus nativos

**Gabarito: A.** stack, tabs, drawer; exemplo: stack organiza avanço/retorno em pilha.

### A11 · Componentes e interface
Em React Native, justifyContent atua em qual eixo?

A) No eixo principal definido por flexDirection
B) Sempre no eixo horizontal, independentemente do layout
C) Sempre no eixo vertical, independentemente do layout
D) No eixo de persistência de dados

**Gabarito: A.** Os eixos dependem de flexDirection; alignItems atua no transversal.

### A12 · Componentes e interface
Qual componente organiza uma lista em grupos com cabeçalhos de seção?

A) SectionList
B) TextInput
C) Image
D) Button

**Gabarito: A.** SectionList é apropriado para listas seccionadas; FlatList organiza uma lista virtualizada simples.

### A13 · Componentes e interface
Qual propriedade liga a digitação de um TextInput à atualização do nome?

A) onChangeText
B) onPressText obrigatório
C) executeSql
D) keyExtractor

**Gabarito: A.** onChangeText recebe o texto e pode chamar o atualizador do estado.

### A14 · Componentes e interface
Qual modelo de navegação representa um menu lateral?

A) Drawer
B) Stack
C) Reducer
D) DAO

**Gabarito: A.** Drawer apresenta menu lateral; stack é pilha e tabs são abas.

### A15 · Persistência
Ao recuperar um texto JSON do AsyncStorage, usa-se para reconstruir o objeto:

A) JSON.parse
B) JSON.stringify
C) Base64.encode
D) executeSql

**Gabarito: A.** parse desserializa JSON; stringify faz o caminho do objeto para texto.

### A16 · Persistência
Qual sequência corresponde ao SQLite apresentado no material?

A) Abrir banco, iniciar transação, executar SQL
B) Criar action, dispatcher, renderizar
C) Codificar Base64, consultar WSDL, fechar view
D) Definir props, emitir tópico, criar Servlet

**Gabarito: A.** O fluxo usa conexão e transação para executar operações SQL.

### A17 · Persistência
Encerrar o aplicativo faz desaparecer um objeto mantido só em state. Por quê?

A) Estado em memória não equivale a persistência
B) State é sempre salvo em disco automaticamente
C) Todo objeto React é banco Realm
D) O aplicativo só poderia funcionar conectado

**Gabarito: A.** Persistência mantém dados além do ciclo de vida do processo; state é memória de execução.

### A18 · Persistência
Na solução React Native com MongoDB remoto do material, o cliente normalmente acessa:

A) Um servidor/API intermediário
B) Diretamente os arquivos físicos do banco no dispositivo
C) Apenas um StyleSheet
D) Uma função de navegação drawer

**Gabarito: A.** O backend expõe operações de persistência ao aplicativo por uma API.

### A19 · Rede e Offline First
No Axios, o corpo da resposta costuma ser acessado em:

A) resposta.data
B) resposta.executeSql
C) resposta.props
D) resposta.reducer

**Gabarito: A.** Axios normalmente converte o corpo e o expõe em data; Fetch usa Response e json().

### A20 · Rede e Offline First
Para enviar um objeto como JSON com Fetch, qual combinação é apropriada?

A) Content-Type application/json e body com JSON.stringify
B) Content-Type image/png e body com função React
C) Só mudar o nome da URL para json
D) Usar JSON.parse no objeto antes de enviá-lo

**Gabarito: A.** O cabeçalho descreve o formato; stringify converte o objeto em texto JSON.

### A21 · Rede e Offline First
Fetch recebe uma resposta HTTP 404. Qual conduta é adequada?

A) Verificar r.ok/status e tratar o erro HTTP
B) Assumir que toda Promise foi rejeitada automaticamente
C) Tratar 404 como sucesso de criação
D) Apagar o banco local imediatamente

**Gabarito: A.** Erros HTTP e falhas de rede são situações distintas na API Fetch.

### A22 · Rede e Offline First
Dois usuários editaram o mesmo item offline. Ao sincronizar, é necessário:

A) Uma política de resolução de conflitos
B) Apenas trocar View por Text
C) Apenas verificar se o Wi-Fi está ligado
D) Eliminar todos os dados locais sem comparar

**Gabarito: A.** Conectividade não decide qual versão prevalece ou como mesclar mudanças.

### A23 · Arquiteturas e Redux
No MVC, um DAO é responsável principalmente por:

A) Encapsular acesso aos dados
B) Desenhar botões e cores
C) Distribuir rotas de navegação
D) Assinar o pacote para a loja

**Gabarito: A.** DAO separa operações de persistência do restante da aplicação.

### A24 · Arquiteturas e Redux
Qual ação de um reducer Redux é adequada?

A) Calcular e devolver novo estado a partir de estado e action
B) Modificar diretamente o objeto recebido e ocultar a mudança
C) Atualizar o banco dentro de cada renderização
D) Substituir a View por um dispatcher

**Gabarito: A.** Reducers calculam transições sem mutação direta do estado recebido.

### A25 · Arquiteturas e Redux
Qual elemento é característico do Flux descrito no material?

A) Dispatcher encaminhando ações às stores
B) Repository JPA executado no dispositivo
C) WSDL definindo a interface visual
D) Keyspace renderizando componentes

**Gabarito: A.** Flux organiza fluxo unidirecional com actions, dispatcher, stores e views.

### A26 · Arquiteturas e Redux
Uma action no Redux descreve principalmente:

A) Um evento que orienta a transição de estado
B) A posição fixa de um botão na tela
C) Um algoritmo de criptografia
D) Um arquivo de banco SQLite

**Gabarito: A.** Action informa o evento; reducer determina a mudança de estado.

### A27 · Segurança e qualidade
Qual é uma propriedade de uma função hash?

A) Produzir resumo sem operação normal de reversão
B) Usar sempre a mesma chave para cifrar e decifrar
C) Ser sinônimo de Base64
D) Garantir reconstrução exata do original por decode

**Gabarito: A.** Hash não é criptografia reversível nem codificação Base64.

### A28 · Segurança e qualidade
Na criptografia simétrica, usa-se:

A) A mesma chave secreta para cifrar e decifrar
B) Uma chave pública obrigatória para cada propriedade JSX
C) Nenhuma chave
D) Um hash reversível chamado parse

**Gabarito: A.** AES é exemplo de criptografia simétrica; assimétrica utiliza um par de chaves.

### A29 · Segurança e qualidade
Em um teste Jest, expect serve para:

A) Verificar se um resultado satisfaz uma expectativa
B) Publicar automaticamente o app
C) Abrir conexão SQLite
D) Criar token de autenticação

**Gabarito: A.** Testes usam expectativas para conferir o comportamento observado.

### A30 · Segurança e qualidade
Antes da distribuição de um aplicativo, qual etapa faz parte do processo?

A) Gerar build de distribuição, assinar e testar
B) Apenas mudar o título de uma View
C) Converter todo o código para Base64
D) Excluir os testes para acelerar

**Gabarito: A.** O fluxo de publicação envolve build, assinatura, identificação e validação.

### A31 · Persistência
Uma preferência foi gravada sob a chave idioma no AsyncStorage. Qual operação recupera o valor dessa chave?

A) await AsyncStorage.getItem('idioma')
B) await AsyncStorage.getAllKeys('idioma')
C) await AsyncStorage.setItem('idioma')
D) await AsyncStorage.removeItem('idioma')

**Gabarito: A.** getItem lê por chave. getAllKeys lista chaves; setItem grava e removeItem exclui.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/110159010/av-programacao-para-dispositivos-moveis-em-android-estacio). Conferência: Persistência com React Native, páginas 7–8.

### A32 · Componentes e interface
Uma FlatList precisa buscar mais resultados quando o usuário se aproxima do fim. Qual propriedade é destinada a sinalizar essa situação?

A) onEndReached
B) keyExtractor
C) initialNumToRender
D) ListHeaderComponent

**Gabarito: A.** onEndReached permite disparar a busca; keyExtractor identifica itens e initialNumToRender configura a renderização inicial.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/110159010/av-programacao-para-dispositivos-moveis-em-android-estacio). Conferência: Interface gráfica com React Native, página 20.

### A33 · Arquiteturas e Redux
Num aplicativo MVC, uma classe consulta o banco e um componente JSX apresenta os resultados. A quais responsabilidades pertencem, respectivamente?

A) Model e View
B) View e Model
C) Controller e Model
D) View e Controller

**Gabarito: A.** Acesso aos dados fica no modelo/DAO; apresentação é responsabilidade da View.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/110159010/av-programacao-para-dispositivos-moveis-em-android-estacio). Conferência: Tópicos avançados: MVC e DAO.

## Back-end

### B1 · Formatos e HTTP
Qual formato representa dados com tags e hierarquia?

A) XML
B) JDBC
C) JMS
D) Servlet

**Gabarito: A.** XML; os outros são tecnologias de acesso/mensageria/processamento.

### B2 · Java Web e JDBC
Diferencie Servlet e JSP.

A) Servlet processa requisições; JSP é apresentação traduzida para Servlet
B) JSP roda somente no navegador; Servlet só no banco
C) Servlet é arquivo de estilo; JSP é driver SQL
D) JSP substitui HTTP; Servlet substitui Java

**Gabarito: A.** Servlet processa requisições em Java; JSP é apresentação processada no servidor e traduzida para Servlet.

### B3 · Java Web e JDBC
Qual método JDBC é apropriado para executar SELECT e receber um ResultSet?

A) executeQuery
B) executeUpdate
C) setInt
D) close

**Gabarito: A.** executeQuery; executeUpdate serve para operações como INSERT/UPDATE/DELETE, entre outros comandos adequados.

### B4 · Spring e persistência
Relacione JPA, Hibernate e Spring Data JPA.

A) JPA especifica; Hibernate implementa; Spring Data JPA oferece repositórios
B) Hibernate especifica; JPA é banco; Spring Data é driver
C) Os três são nomes do mesmo servidor HTTP
D) JPA é linguagem SQL; Hibernate é broker; Spring Data é XML

**Gabarito: A.** JPA especifica; Hibernate implementa; Spring Data JPA abstrai repositórios usando JPA.

### B5 · Spring e persistência
Qual anotação do Spring converte o corpo da requisição em um objeto?

A) @RequestBody
B) @PathVariable
C) @Entity
D) @Id

**Gabarito: A.** @RequestBody. @PathVariable captura parte da URL; @Entity marca entidade JPA.

### B6 · Mensageria
Qual relação entre JMS e RabbitMQ está correta?

A) JMS é API/especificação; RabbitMQ é broker
B) São dois nomes de um mesmo produto
C) JMS é banco; RabbitMQ é formato de dados
D) JMS é protocolo HTTP; RabbitMQ é Servlet

**Gabarito: A.** JMS é API/especificação; RabbitMQ é broker.

### B7 · Mensageria
Para enviar logs a três filas independentes, qual exchange simples atende: fanout ou direct com uma única chave ligada a uma só fila?

A) Fanout com as três filas vinculadas
B) Direct ligado somente a uma fila
C) Uma fila única sem assinantes
D) Headers sem nenhum binding

**Gabarito: A.** fanout, com três filas vinculadas; cada uma recebe a publicação.

### B8 · Serviços e integração
Qual é protocolo e qual é estilo arquitetural: SOAP e REST?

A) SOAP é protocolo; REST é estilo arquitetural
B) REST é protocolo XML; SOAP é banco
C) Ambos são bancos de dados distribuídos
D) SOAP exige JSON; REST exige WSDL

**Gabarito: A.** SOAP protocolo; REST estilo arquitetural.

### B9 · Serviços e integração
No GraphQL, que operação altera dados e que função fornece valor de campo?

A) Mutation altera; resolver obtém valor de campo
B) Query altera; schema é sempre o broker
C) Resolver é o banco; mutation apenas lê
D) Mutation é método DELETE obrigatório; query é GET obrigatório

**Gabarito: A.** mutation altera; resolver fornece valor do campo.

### B10 · Serviços e integração
Uma API REST stateless pode autenticar com token?

A) Sim, com o contexto necessário em cada requisição
B) Não, autenticação exige sempre sessão implícita
C) Não, stateless proíbe cabeçalhos
D) Sim, mas só se não acessar banco de dados

**Gabarito: A.** Token pode acompanhar cada requisição, fornecendo contexto suficiente.

### B11 · Formatos e HTTP
Qual código HTTP indica recurso criado?

A) 201
B) 404
C) 500
D) 401

**Gabarito: A.** 201 indica criação; 404 é ausência, 500 erro interno e 401 falta de autenticação válida.

### B12 · Formatos e HTTP
Qual método HTTP é associado a substituir o estado do recurso identificado e tem semântica idempotente?

A) PUT
B) POST sem garantia adicional
C) CONNECT
D) TRACE

**Gabarito: A.** PUT é idempotente; repetir o mesmo estado tem o mesmo efeito pretendido.

### B13 · Formatos e HTTP
AJAX pode transmitir JSON?

A) Sim; não está limitado a XML
B) Não; o nome proíbe qualquer outro formato
C) Somente se a aplicação não tiver servidor
D) Somente por meio de JDBC

**Gabarito: A.** AJAX descreve comunicação assíncrona para atualização da interface e aceita vários formatos.

### B14 · Formatos e HTTP
Qual condição é de XML bem formado?

A) Raiz única e tags corretamente aninhadas
B) Todas as tags definidas obrigatoriamente pelo HTML
C) Chaves e colchetes em vez de tags
D) Proibição de atributos

**Gabarito: A.** Bem formado é diferente de validar contra DTD/XSD; fechamento e hierarquia precisam estar corretos.

### B15 · Java Web e JDBC
Qual ordem resume o ciclo de vida de um Servlet?

A) init, atendimento por service, destroy
B) destroy, init, executeQuery
C) render, reducer, dispatcher
D) commit, rollback, parse

**Gabarito: A.** O contêiner inicializa, atende requisições e encerra o Servlet.

### B16 · Java Web e JDBC
Um redirect HTTP faz o quê?

A) Orienta o cliente a fazer nova requisição
B) Encaminha internamente sem resposta ao cliente
C) Transforma JSP em tabela
D) Abre transação no banco automaticamente

**Gabarito: A.** Redirect difere de forward: o cliente realiza uma nova requisição.

### B17 · Java Web e JDBC
Qual benefício de PreparedStatement com parâmetros?

A) Separar dados do comando em vez de concatenar entradas
B) Eliminar a necessidade de conexão
C) Transformar SQL em interface gráfica
D) Garantir resposta em tempo constante

**Gabarito: A.** Parâmetros evitam construir a instrução SQL com concatenação do conteúdo do usuário.

### B18 · Java Web e JDBC
Qual distinção entre Tomcat e GlassFish é adequada ao material?

A) Tomcat é contêiner Servlet/JSP; GlassFish oferece serviços corporativos mais amplos
B) Tomcat é banco de dados; GlassFish é linguagem
C) Ambos são apenas bibliotecas de JSON
D) GlassFish só roda no navegador

**Gabarito: A.** Não trate Tomcat isolado como implementação de todos os serviços Java EE/Jakarta EE.

### B19 · Spring e persistência
A injeção de dependências permite:

A) Receber dependências geridas pelo contêiner
B) Eliminar todos os objetos Java
C) Dispensar interfaces HTTP
D) Executar toda consulta no navegador

**Gabarito: A.** DI entrega as dependências, reduzindo a necessidade de o objeto construí-las diretamente.

### B20 · Spring e persistência
Em JpaRepository, Long representa:

A) O tipo do identificador da entidade
B) O tempo máximo da requisição
C) O nome da tabela
D) O tamanho obrigatório de cada campo

**Gabarito: A.** Os parâmetros genéricos indicam entidade e tipo do ID.

### B21 · Spring e persistência
Qual anotação captura o valor de id em uma rota /alunos/{id}?

A) @PathVariable
B) @Entity
C) @Document
D) @Service

**Gabarito: A.** PathVariable captura parte variável da URL; RequestBody lê o corpo.

### B22 · Spring e persistência
Qual sequência de camadas é usual numa API com Spring?

A) Controller, service, repository, banco
B) Banco, View, dispatcher, CSS
C) Repository, navegador, WSDL, modelo gráfico
D) Controller, driver de tela, reducer, props

**Gabarito: A.** O controller recebe, o serviço coordena regras e o repositório acessa persistência.

### B23 · Mensageria
No RabbitMQ, uma exchange serve principalmente para:

A) Rotear mensagens para filas conforme bindings
B) Substituir o consumidor como processador de negócio
C) Armazenar páginas JSP
D) Executar consultas JPA

**Gabarito: A.** Exchange roteia; filas mantêm entregas para os consumidores.

### B24 · Mensageria
Uma exchange direct normalmente usa:

A) Correspondência de routing key com binding key
B) Sempre todas as filas, ignorando chaves
C) Somente a ordem alfabética dos consumidores
D) Chaves de partição Cassandra

**Gabarito: A.** Direct usa correspondência; fanout distribui a todas as filas vinculadas.

### B25 · Mensageria
Um consumidor recebe novamente uma mensagem após falha. Que característica ajuda a evitar efeitos duplicados?

A) Processamento idempotente
B) Adicionar um novo botão
C) Remover todos os acknowledgments
D) Trocar JSON por XML sem outra mudança

**Gabarito: A.** Idempotência permite repetir a operação sem duplicar seu efeito pretendido.

### B26 · Mensageria
Em JMS, Queue e Topic representam respectivamente:

A) Fila ponto a ponto e destino publish/subscribe
B) Banco relacional e banco documental
C) Servlet e página JSP
D) Request e Response HTTP

**Gabarito: A.** São os dois domínios clássicos de mensageria; não são tecnologias de persistência.

### B27 · Serviços e integração
No SOAP, qual documento descreve o contrato do serviço?

A) WSDL
B) JSX
C) BSON
D) CQL

**Gabarito: A.** WSDL descreve a interface do serviço; SOAP usa mensagens XML.

### B28 · Serviços e integração
Um serviço devolve exatamente os campos pedidos pelo cliente por meio de um schema e resolvers. A tecnologia é:

A) GraphQL
B) JDBC
C) JMS
D) HSTORE

**Gabarito: A.** GraphQL permite consultas com seleção de campos e resolução por schema.

### B29 · Serviços e integração
Qual anotação é característica de JAX-RS para definir caminho de recurso?

A) @Path
B) @Entity
C) @Id
D) @WebMethod

**Gabarito: A.** JAX-RS está associado a REST; WebMethod aparece no contexto de SOAP/JAX-WS.

### B30 · Serviços e integração
Uma resposta REST precisa ser obrigatoriamente JSON?

A) Não; pode utilizar outras representações, como XML
B) Sim; REST é o nome de um formato JSON
C) Sim; XML só existe em bancos
D) Não; REST proíbe qualquer corpo de resposta

**Gabarito: A.** REST é estilo arquitetural e não impõe um único formato de representação.

### B31 · Java Web e JDBC
Uma aplicação Java Web usa descritor de implantação para associar uma URL a um Servlet. Em qual arquivo ficam esses mapeamentos?

A) WEB-INF/web.xml
B) tomcat-users.xml
C) application.yml obrigatório
D) package.json

**Gabarito: A.** web.xml é o descritor da aplicação e pode conter servlet-mapping; tomcat-users.xml trata usuários do Tomcat.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/124108077/av-desenvolvimento-de-back-end). Conferência: Programação servidor com Java, página 9; exemplo oficial Apache Tomcat.

### B32 · Spring e persistência
O controller fornece uma coleção de pedidos a um template Thymeleaf. Qual atributo repete uma linha HTML para cada pedido?

A) th:each
B) th:text
C) th:if
D) th:fragment

**Gabarito: A.** th:each itera; th:text altera texto, th:if condiciona e th:fragment declara um fragmento.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/124108077/av-desenvolvimento-de-back-end). Conferência: Persistência com Spring Data, página 12; tutorial Thymeleaf, seção Iteration.

### B33 · Java Web e JDBC
Um sistema aplica Front Controller. Qual fluxo mantém as responsabilidades adequadas?

A) Servlet recebe e coordena; JSP apresenta os dados
B) JSP executa todas as regras e o Servlet apenas muda cores
C) O navegador executa os métodos de negócio Java do servidor
D) O banco escolhe diretamente qual arquivo JSP renderizar

**Gabarito: A.** O controller coordena o atendimento e encaminha à camada de apresentação; as regras não passam a executar no navegador.

Adaptação autoral a partir de [registro público](https://www.passeidireto.com/arquivo/122043951/gabarito-simulado-desenvolvimento-de-back-end). Conferência: Programação servidor com Java: Servlet, JSP e encaminhamento.
