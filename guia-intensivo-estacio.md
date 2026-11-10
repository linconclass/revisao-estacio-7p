# Revisão intensiva — Estácio — 10 e 11/11/2026

Base: 28 apostilas locais, 1.048 páginas. Horários informados por você, sem consulta ao portal. Os resumos seguem os conteúdos disponíveis; as questões são autorais, sem promessa de antecipar a prova.

## Ordem e plano de revisão

| Prova | Data | Hora | Foco |
|---|---|---|---|
| NoSQL | 10/11, terça | 10h | Modelos, JSON/JSONB, MongoDB, Cassandra, Cypher |
| Métodos Quantitativos | 10/11 | 12h | Modelagem, Simplex, dualidade, sensibilidade |
| Linhas de Produtos de Software | 10/11 | 17h | Domínio × aplicação, variabilidade, testes |
| Android | 10/11 | 19h | React Native, persistência, rede, Redux |
| Back-end | 11/11, quarta | 19h | Java Web, Spring, mensageria e serviços |

**Estude ativamente:** leia um bloco, feche o texto, explique em voz alta e resolva as questões. Volte ao conteúdo dos erros. Evite tentar ler integralmente todas as apostilas agora.

**Se tiver 3 horas úteis hoje:** 65 min NoSQL, 65 min Métodos, 30 min LPS, 20 min Android, com pausas curtas adicionais. Reserve tempo para dormir. Se o tempo for menor, preserve NoSQL e os exemplos de Métodos. Não dependa do intervalo entre 10h e 12h para aprender Métodos.

**10/11:** antes da primeira prova, repasse a folha rápida de NoSQL. Entre provas, revise conforme duração real e deslocamento permitirem. Depois de Métodos, concentre-se em LPS; depois, em Android.

**11/11:** três blocos de 50 min para Back-end: Java Web/JDBC; Spring Data; integração/mensageria. Depois faça as questões, corrija e repita as erradas.

## 1. NoSQL — 10/11, 10h

### Conceitos e quatro modelos

NoSQL significa **Not Only SQL**, uma família de modelos para diferentes necessidades de flexibilidade, escala e distribuição. Não significa que todos dispensem consistência ou sejam melhores que o relacional em qualquer situação.

**Estruturados:** esquema de campos, como cadastro tabular. **Semiestruturados:** organização flexível por chaves/tags, como JSON/XML. **Não estruturados:** conteúdo como áudio, vídeo e texto livre. **Schemaless:** registros não precisam compartilhar um esquema rígido previamente fixado; a aplicação ainda precisa validar e compreender os dados.

| Modelo | Organização | Uso típico | SGBD |
|---|---|---|---|
| Chave-valor | Chave identifica valor | Cache e sessões | Redis; material também usa HSTORE no PostgreSQL |
| Documentos | Campos, objetos e listas | Catálogos e cadastros variáveis | MongoDB |
| Famílias de colunas | Partições e colunas para padrões de acesso | Grandes cargas distribuídas | Cassandra, HBase |
| Grafos | Nós, relações e propriedades | Redes sociais e caminhos | Neo4j |

**Escala vertical:** ampliar a máquina. **Horizontal:** distribuir por máquinas. **Replicação:** cópias. **Particionamento:** divisão dos dados. Não confunda esses dois mecanismos.

### JSON, JSONB e HSTORE no PostgreSQL

HSTORE é extensão para pares chave-valor textuais. JSON guarda a representação textual validada. JSONB guarda representação binária processada, com indexação/operações próprias; não preserva necessariamente espaços, ordem das chaves ou chaves duplicadas.

- `->` retorna elemento como JSON/JSONB; `->>` retorna texto.
- `json_each` desdobra objeto JSON em pares chave-valor.
- `jsonb_pretty` formata para leitura; não filtra.
- `@>` testa contenção em JSONB.

```sql
CREATE TABLE pedidos (id serial PRIMARY KEY, detalhes jsonb);
INSERT INTO pedidos (detalhes)
VALUES ('{"cliente":"Ana","total":120}');
SELECT detalhes -> 'cliente' FROM pedidos;
SELECT detalhes ->> 'cliente' FROM pedidos;
SELECT * FROM pedidos WHERE detalhes ->> 'cliente' = 'Ana';
SELECT * FROM pedidos WHERE detalhes @> '{"cliente":"Ana"}'::jsonb;
```

JSON estrito usa aspas duplas para nomes de propriedades e strings. Admite objetos, arrays, números, strings, booleanos e null. Usar JSONB não torna PostgreSQL exclusivamente NoSQL.

### MongoDB

Tabela → coleção; linha → documento; coluna → campo. Documentos são armazenados em BSON, representação binária com tipos adicionais em relação ao JSON.

**Agregado:** conjunto relacionado tratado como unidade lógica, por exemplo pedido com seus itens. Embutir favorece a leitura conjunta; referenciar pode evitar duplicações e atender entidades com vida própria. A decisão depende de acesso e atualização.

```javascript
use escola
db.createCollection('alunos')
db.alunos.insertOne({nome:'Ana', nota:8, curso:'ADS'})
db.alunos.find({nota: {$gte:7}})
db.alunos.find({curso:'ADS'}, {nome:1, _id:0})
db.alunos.updateOne({nome:'Ana'}, {$set:{nota:9}})
db.alunos.deleteOne({nome:'Ana'})
```

`$gt` maior; `$gte` maior/igual; `$lt` menor; `$lte` menor/igual; `$ne` diferente; `$in` pertence à lista. `$set` altera campos. `drop()` exclui coleção; `deleteOne()` exclui documento correspondente. Reconheça também formas antigas usadas nas apostilas, como insert/update/remove, observando quantos documentos afetam.

**Capped collection:** coleção com limite de tamanho e substituição dos documentos antigos ao atingir o limite.

### Cassandra / CQL

Keyspace agrupa tabelas e configurações como replicação. **Partition key** determina a partição; **clustering columns** organizam linhas dentro dela. Modele segundo as consultas; duplicação pode ser deliberada. CQL lembra SQL, mas não oferece automaticamente a mesma liberdade de consultas e joins.

```sql
CREATE TABLE leituras (
 sensor text, instante timestamp, valor double,
 PRIMARY KEY (sensor, instante)
);
SELECT * FROM leituras WHERE sensor = 's1';
```

`sensor` é partition key; `instante` é clustering. Em `PRIMARY KEY ((a,b),c)`, a partição usa a e b; c é clustering. `ALLOW FILTERING` permite determinadas filtragens, sem garantir eficiência. `list` é sequência e admite repetição; `set` tem valores únicos; `map` associa chaves a valores.

### Neo4j / Cypher

Nó representa entidade/ocorrência; rótulo classifica nós; relacionamento liga nós, tem direção/tipo e pode ter propriedades. Nó não é uma tabela inteira.

```cypher
CREATE (:Pessoa {nome:'Ana'})
CREATE (:Pessoa {nome:'Bia'})
MATCH (a:Pessoa {nome:'Ana'}), (b:Pessoa {nome:'Bia'})
CREATE (a)-[:SEGUE]->(b)
MATCH (a:Pessoa)-[:SEGUE]->(b:Pessoa)
RETURN a.nome, b.nome
MATCH (p:Pessoa {nome:'Ana'}) SET p.idade = 23
MATCH (p:Pessoa) RETURN count(p)
```

`()` nó; `[]` relacionamento; `:Pessoa` rótulo; `{}` propriedades. MATCH localiza; WHERE filtra; RETURN projeta; SET altera; DELETE remove. DETACH DELETE remove o nó e seus relacionamentos. COUNT/SUM/AVG fazem agregações.

**Complemento:** ACID = atomicidade, consistência, isolamento e durabilidade. BASE = disponibilidade básica, estado flexível, consistência eventual. No CAP, durante uma partição de rede não se garantem simultaneamente consistência forte e disponibilidade para todas as operações. Evite decorar apenas “escolher dois de três”.

**Revisão de 5 minutos:** quatro modelos e usos; `->`/`->>`; find/$set; partition key/clustering; MATCH/RETURN/SET.

## 2. Métodos Quantitativos — 10/11, 12h

### PO e modelagem

Pesquisa operacional apoia decisões com modelos quantitativos. Defina problema/dados, formule, resolva, valide e implemente/acompanhe. Modelo simplifica a realidade; o ótimo matemático precisa fazer sentido no contexto.

**Programação linear (PL):** função objetivo linear e restrições lineares. Pressupostos clássicos: proporcionalidade, aditividade, divisibilidade e certeza dos parâmetros. Se a quantidade precisar ser inteira, pode ser necessário um modelo inteiro; arredondar a solução contínua pode violar restrições.

Roteiro: **variáveis com unidades → objetivo → restrições → não negatividade/integralidade**.

- “Até”, “no máximo”, “capacidade”: normalmente ≤.
- “Pelo menos”, “mínimo”: normalmente ≥.
- “Exatamente”, “balanço”: =.

Exemplo: x mesas e y cadeiras; consumos de 3 e 2 horas; capacidade 120 horas: `3x+2y≤120`. Lucros unitários de 50 e 20: `max Z=50x+20y`. Não troque lucro por consumo de recurso.

### Exercício resolvido — gráfico

```
max Z = 3x + 2y
x + y ≤ 4
x ≤ 2
y ≤ 3
x,y ≥ 0
```

| Vértice viável | Z |
|---|---:|
| (0,0) | 0 |
| (2,0) | 6 |
| (2,2) | 10 |
| (1,3) | 9 |
| (0,3) | 6 |

**Ótimo: x=2, y=2, Z=10.** Folgas: primeira restrição 0; segunda 0; terceira `3−2=1`.

Havendo ótimo finito e vértices viáveis, há ótimo em um vértice. Pode haver múltiplos ótimos, inviabilidade ou objetivo ilimitado. Região ilimitada não implica automaticamente objetivo ilimitado.

### Simplex — exemplo com duas iterações

O Simplex percorre soluções básicas viáveis para melhorar o objetivo.

- Restrição ≤ recebe folga `+s`.
- Restrição ≥ recebe excesso `−s`; pode exigir artificial para iniciar a base.
- Igualdade também pode exigir artificial. Duas fases/Big M ajudam a obter base viável.

**Convenção aqui:** linha `Z−3x−2y=0`. Coeficiente negativo na linha Z indica melhoria possível na maximização. Tabelas com Cj−Zj usam outro sinal: confira a convenção antes de escolher.

Tabela inicial:

| Base | x | y | s1 | s2 | s3 | b |
|---|---:|---:|---:|---:|---:|---:|
| s1 | 1 | 1 | 1 | 0 | 0 | 4 |
| s2 | 1 | 0 | 0 | 1 | 0 | 2 |
| s3 | 0 | 1 | 0 | 0 | 1 | 3 |
| Z | -3 | -2 | 0 | 0 | 0 | 0 |

Entra x. Teste de razão apenas com coeficientes da coluna estritamente positivos: `4/1=4`, `2/1=2`. A terceira linha não participa. Sai s2; pivô 1.

| Base | x | y | s1 | s2 | s3 | b |
|---|---:|---:|---:|---:|---:|---:|
| s1 | 0 | 1 | 1 | -1 | 0 | 2 |
| x | 1 | 0 | 0 | 1 | 0 | 2 |
| s3 | 0 | 1 | 0 | 0 | 1 | 3 |
| Z | 0 | -2 | 0 | 3 | 0 | 6 |

Entra y. Razões `2/1=2` e `3/1=3`. Sai s1.

| Base | x | y | s1 | s2 | s3 | b |
|---|---:|---:|---:|---:|---:|---:|
| y | 0 | 1 | 1 | -1 | 0 | 2 |
| x | 1 | 0 | 0 | 1 | 0 | 2 |
| s3 | 0 | 0 | -1 | 1 | 1 | 1 |
| Z | 0 | 0 | 2 | 1 | 0 | 10 |

Não restam coeficientes negativos na linha Z: ótimo. Variáveis não básicas s1=s2=0; básicas y=2, x=2, s3=1; Z=10.

**Pivotamento:** dividir a linha do pivô pelo pivô; nas demais, `nova linha = antiga − coeficiente da coluna × nova linha do pivô`.

### Dualidade e interpretação econômica

```
Primal padrão: max cᵀx, Ax≤b, x≥0
Dual:          min bᵀu, Aᵀu≥c, u≥0
```

Cada restrição primal gera uma variável dual; cada variável primal gera uma restrição dual. Transponha a matriz e troque os papéis dos coeficientes do objetivo e dos termos independentes.

Dual do exemplo:

```
min W = 4u1 + 2u2 + 3u3
u1 + u2 ≥ 3
u1 + u3 ≥ 2
u1,u2,u3 ≥ 0
```

`u1=2,u2=1,u3=0` é viável e dá W=10=Z, certificando a otimalidade.

**Dualidade fraca:** qualquer valor primal viável de maximização não supera qualquer valor dual viável de minimização. **Forte:** havendo ótimos finitos, os valores são iguais.

**Complementaridade:** `ui × folga_i=0`. Folga estritamente positiva implica preço-sombra zero. **Folga zero não obriga preço positivo**; também pode ser zero. A apostila simplifica isso; preserve a distinção.

Para primal de maximização: restrição ≥ gera variável dual ≤0; igualdade gera variável dual livre. Variável primal livre gera igualdade no dual.

**Dual-Simplex:** tipicamente mantém viabilidade dual enquanto corrige inviabilidade primal; não é só trocar max por min sem alterar o procedimento.

### Sensibilidade

Preço-sombra é a variação marginal do ótimo para alteração no lado direito da restrição, dentro do intervalo e das condições de validade.

No exemplo, elevar a capacidade `x+y≤4` para 4,5 permite `(2;2,5)`, Z=11. Ganho `0,5×2=1`. Mantendo os outros limites, o preço 2 vale no intervalo de capacidade de **2 a 5**; depois disso, y já atingiu seu limite 3.

- Alterar coeficiente do objetivo pode manter o mesmo ponto ótimo e mudar Z.
- Alterar disponibilidade pode mudar as quantidades ótimas, mesmo mantendo a base.
- Custo reduzido ajuda a interpretar quanto o coeficiente de uma variável não básica deve melhorar para que sua entrada possa ser atrativa. Sinal depende da convenção/max/min.
- Regra dos 100%: quando aplicável, somar as frações das alterações sobre seus limites permitidos fornece uma condição suficiente de estabilidade se a soma ≤1. Se >1, perde-se a garantia; isso não prova que o ótimo mudou.

### Modelos clássicos

| Problema | Ideia de modelagem |
|---|---|
| Fazer/comprar | Quantidades produzidas e compradas; custo mínimo; demanda/capacidade |
| Mistura | Custo dos ingredientes e composição: nutriente total ≥ percentual × total |
| Produção/estoque | Estoque anterior + produção − demanda = estoque final |
| Transporte | xij enviado da origem i ao destino j; minimizar Σcij xij; oferta/demanda |
| Transbordo | Nó intermediário sem geração/consumo: entrada = saída |
| Alocação | xij binário; na atribuição um a um, somas por agente/tarefa = 1 |

Balanceamento de transporte pode usar origem/destino fictício, com custos que representem o contexto. Não coloque custo zero automaticamente se houver penalidade real de falta ou sobra.

**Revisão de 5 minutos:** sinais das restrições; vértices; razão positiva; matriz transposta; preço-sombra com intervalo; folga positiva → preço zero.

## 3. Linhas de Produtos de Software — 10/11, 17h

### Ideia central e duas engenharias

LPS é uma família de sistemas de um domínio produzida a partir de ativos comuns, com variabilidade planejada. Reuso inclui requisitos, arquitetura, componentes, processos, documentação e testes.

Exemplo: sistemas para clínicas. Cadastro e agenda são comuns; faturamento, teleconsulta e autenticação variam. Cada configuração atende a uma clínica.

**Domínio:** área de negócio/problema. **Ativos-base/plataforma:** artefatos reutilizáveis. **Comunalidade:** o compartilhado. **Variabilidade:** diferenças permitidas e geridas. **Customização em massa:** combinar reuso com necessidades distintas.

| Engenharia do domínio | Engenharia da aplicação |
|---|---|
| Desenvolve PARA reuso | Desenvolve COM reuso |
| Define comuns e variáveis da família | Seleciona variantes do produto concreto |
| Cria requisitos, arquitetura de referência, componentes e testes reutilizáveis | Deriva requisitos, arquitetura, implementação e testes da aplicação |

Gestão de produtos orienta escopo e roteiro da linha. Requisitos, projeto, realização e testes interagem e admitem retorno. A arquitetura da aplicação especializa a arquitetura de referência. O framework LPS articula as duas engenharias e a gestão da variabilidade.

### Variabilidade: vocabulário que precisa dominar

- Sujeito de variabilidade: o que varia no mundo real, como forma de autenticação.
- Objeto de variabilidade: opção concreta, como senha/biometria.
- Ponto de variação (PV): representação de onde existe uma decisão nos artefatos.
- Variante (V): opção de um ponto de variação.
- Obrigatória: presente nas condições especificadas; opcional: pode ou não ser selecionada.
- Grupo alternativo/cardinalidade: observe quantas opções são permitidas, `[mínimo,máximo]`; não presuma sempre uma só.
- Requires: A exige B. Excludes: A impede coexistência com B.
- Tempo de ligação: quando a escolha é resolvida — requisitos, projeto, compilação/configuração ou execução.
- Variabilidade externa: percebida pelo cliente. Interna: decisão técnica, como biblioteca usada.

**Modelo Ortogonal de Variabilidade (MOV):** documenta pontos, variantes, dependências e restrições, ligados transversalmente aos artefatos. Ortogonal não significa desconectado de requisitos/código.

**Rastreabilidade:** variante → requisito → arquitetura/componente → teste. Se teleconsulta exige vídeo, essa escolha precisa aparecer em todas as partes pertinentes.

### Adoção, deltas e custos

**Proativa:** prepara ativos-base antes dos produtos previstos. **Reativa:** evolui a base incrementalmente conforme surgem necessidades. **Extrativa:** analisa produtos existentes e extrai comuns/variáveis.

**Requisito delta:** necessidade da aplicação não completamente atendida pelo domínio disponível. Avalie custo, impacto arquitetural, interfaces, testes e eventual incorporação à família.

Benefícios: produtividade, qualidade, consistência e menor tempo de entrega. Dificuldades: investimento inicial, escopo inadequado, versões/configurações e explosão combinatória. Reusar não dispensa adaptar ou validar.

### Testes

Domínio valida ativos reutilizáveis e prepara testes; aplicação valida a configuração concreta, integração e deltas.

- Força bruta: todas as configurações; pode se tornar inviável.
- Aplicação pura: testes concentrados em cada aplicação, sem validação antecipada de domínio e com repetição de esforço.
- Aplicativos de amostra: configurações representativas antecipam validação; ainda se testam aplicações reais.

Dez pontos independentes, uma escolha entre 3 variantes em cada um: `3^10=59.049`. O total muda com cardinalidades/restrições. A apostila imprime 359.049 em um exemplo semelhante; não memorize esse número como 3^10.

**Revisão de 5 minutos:** domínio cria ativos; aplicação deriva produto; PV decisão/V opção; requires/excludes; rastreabilidade; deltas; testes complementares.

## 4. Android / React Native — 10/11, 19h

### Foco do material e componentes

Os cinco PDFs disponíveis são de **React Native**. Priorize esse conteúdo. React Native usa JavaScript/TypeScript e componentes para interfaces nativas; JSX descreve interface, sem ser HTML de uma página convencional.

Ferramentas citadas: Node/NPM ou Yarn, ambiente Android, Metro e Expo/CLI. Entenda suas funções; não gaste a revisão decorando versões/comandos de instalação.

| Recurso | Papel |
|---|---|
| View | Contêiner e layout |
| Text | Texto |
| TextInput | Entrada de texto |
| Image | Imagem |
| Button / componentes de toque | Ações |
| ScrollView | Conteúdo rolável com seus filhos renderizados |
| FlatList | Lista com virtualização |
| SectionList | Lista por seções |

**Props:** dados recebidos do pai. **State:** dados controlados pelo componente; atualizar pode disparar renderização. Não modifique diretamente o estado esperando o comportamento correto.

```jsx
const [nome, setNome] = useState('');
const [contador, setContador] = useState(0);
<TextInput value={nome} onChangeText={setNome} />
<Button title="Somar" onPress={() => setContador(c => c + 1)} />
```

`onPress={salvar}` passa função; `onPress={salvar()}` executa durante a renderização e passa o retorno. `useEffect` coordena efeitos, como carregar dados; dependências controlam quando roda. `[]` representa execução na montagem, com particularidades dos modos de desenvolvimento. Evite requisição involuntária a cada renderização.

### Interface e navegação

FlatList: `data`, `renderItem`, chave estável via `keyExtractor`. Índice pode ser uma chave ruim quando itens mudam de posição.

**Stack:** pilha de telas/voltar. **Tabs:** abas. **Drawer:** menu lateral.

StyleSheet organiza estilos em objetos JavaScript; propriedades em camelCase, como backgroundColor. Flexbox distribui elementos; direção padrão no React Native é coluna. justifyContent atua no eixo principal; alignItems no transversal. Os eixos mudam com flexDirection. Animated permite animar valores/propriedades.

### Persistência

| Tecnologia | Uso/modelo |
|---|---|
| AsyncStorage | Chave-valor local assíncrono; valores textuais |
| SQLite | Banco relacional local, SQL e transações |
| Realm | Objetos persistentes com esquema |
| MongoDB via serviço/API | Persistência remota intermediada pelo servidor |

```javascript
await AsyncStorage.setItem('perfil', JSON.stringify({nome:'Ana'}));
const texto = await AsyncStorage.getItem('perfil');
const perfil = texto === null ? null : JSON.parse(texto);
```

Serializar transforma objeto em representação armazenável/transmissível; desserializar reconstrói. Estado em memória não é persistência.

No SQLite dos exemplos: openDatabase abre, transaction inicia transação, executeSql executa comando. Parâmetros separam dados de SQL. Operações assíncronas exigem aguardar ou usar callback; não leia o resultado antes da conclusão.

### Rede e Offline First

```javascript
async function carregar(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Falha HTTP');
  return await r.json();
}
```

Fetch entrega Response e depois se extrai JSON; Axios normalmente expõe o corpo convertido em `resposta.data`. Erro de rede e resposta HTTP de erro diferem: um 404 não faz necessariamente Fetch rejeitar a Promise.

Envio JSON com Fetch: método, `Content-Type: application/json`, `body: JSON.stringify(objeto)`. Token pode ir em `Authorization: Bearer ...`.

**Offline First:** operação local e sincronização posterior. Exige fila de operações, reconexão, duplicação e conflitos. Detectar internet não sincroniza tudo. Exemplo: dois usuários alteram o mesmo cadastro offline; é preciso reconciliar ou decidir prevalência.

### Arquiteturas, segurança, testes e publicação

- MVC: Model dados/regras; View apresentação; Controller coordenação. DAO encapsula acesso a dados.
- Flux: fluxo unidirecional com actions, dispatcher, stores e views.
- Redux: store central e reducers. Action descreve evento; reducer calcula novo estado a partir do anterior/action, sem alterar diretamente o estado recebido.
- Base64: codificação reversível, sem chave secreta; não fornece sigilo.
- Criptografia simétrica: mesma chave secreta para cifrar/decifrar; exemplo AES.
- Assimétrica: par pública/privada, com operações apropriadas para sigilo/assinatura.
- Hash: resumo de sentido único; não há etapa normal de “descriptografar hash”. O material cita MD5/SHA1 como exemplos; isso não é recomendação de proteção de senhas.
- Jest: test/expect/verificações; mocks substituem dependências em testes controlados.
- Performance: renderizações, listas, memória e trabalho desnecessário.
- Publicação: build de distribuição, assinatura, identificação/versão, testes e envio à loja. O guia trata o fluxo didático, sem verificar ferramentas atuais.

**Revisão de 5 minutos:** props/state; FlatList; navegação; stringify/parse; local/remoto; Response.json/Axios.data; action/reducer/store; Base64 não é criptografia.

## 5. Desenvolvimento de Back-end — 11/11, 19h

### Formatos e HTTP

XML usa tags/atributos/hierarquia. Documento bem formado tem raiz única, fechamento e aninhamento corretos; validação por DTD/XSD é adicional. JSON usa objetos/arrays/valores; texto JSON e objeto em memória diferem. YAML é serialização legível, com hierarquia frequentemente indicada por indentação.

AJAX permite comunicação assíncrona e atualização de partes da interface; pode usar JSON/texto, além de XML.

HTTP trabalha com requisição/resposta e não mantém, por si só, sessão entre elas. Cookies/sessões acrescentam continuidade.

| Método | Intenção habitual |
|---|---|
| GET | Consultar sem solicitar alteração do estado |
| POST | Submeter/criar/processar; sem garantia geral de idempotência |
| PUT | Criar/substituir estado no recurso identificado; idempotente |
| PATCH | Alteração parcial; idempotência depende da operação |
| DELETE | Remoção; idempotente na semântica HTTP |

Idempotente: repetir tem o mesmo efeito pretendido que executar uma vez; não exige respostas idênticas.

200 sucesso; 201 criado; 204 sucesso sem corpo; 400 requisição inválida; 401 falta de autenticação válida; 403 acesso negado; 404 ausente; 500 erro interno. Usar corpo em POST não torna dados secretos; proteção de transporte depende de HTTPS.

### Ambiente Java, Servlet, JSP e JDBC

**Tomcat:** contêiner Servlet/JSP. **GlassFish:** servidor de aplicações com serviços corporativos mais amplos. Tomcat isolado não implementa automaticamente todos os serviços Java EE/Jakarta EE.

Servlet recebe requisições/gera respostas. Reconheça doGet/doPost e ciclo init → service → destroy. Não se cria necessariamente instância nova por usuário. Request contém dados recebidos; Response define status/cabeçalhos/corpo.

JSP é apresentação processada no servidor e traduzida para Servlet. Não confunda execução no servidor com JavaScript do navegador. Sessão mantém dados entre requisições; cookie pode carregar seu identificador. Forward encaminha internamente; redirect orienta o cliente a fazer nova requisição.

JDBC: API Java para acesso por drivers. Fluxo Connection → PreparedStatement → execução → ResultSet quando houver consulta → fechamento.

```java
String sql = "SELECT nome FROM aluno WHERE id = ?";
try (PreparedStatement ps = con.prepareStatement(sql)) {
  ps.setInt(1, id);
  try (ResultSet rs = ps.executeQuery()) {
    while (rs.next()) System.out.println(rs.getString("nome"));
  }
}
```

executeQuery retorna resultado de consulta; executeUpdate atende INSERT/UPDATE/DELETE e informa linhas afetadas. Parâmetro `?` evita montar SQL concatenando conteúdo do usuário.

### Spring e persistência

IoC: contêiner gerencia objetos/ciclo de vida. Injeção de dependências entrega dependências ao objeto, reduzindo acoplamento. Spring Boot simplifica configuração/inicialização. Spring Data abstrai repositórios e acesso.

JPA é especificação objeto-relacional; Hibernate é implementação; Spring Data JPA oferece repositórios apoiados nessa infraestrutura.

Fluxo: **requisição → controller → service → repository → banco**.

| Recurso | Função |
|---|---|
| @RestController | Retorno escrito no corpo da resposta |
| @GetMapping / @PostMapping etc. | Método HTTP e rota |
| @PathVariable | Parte variável da URL |
| @RequestParam | Parâmetro da requisição |
| @RequestBody | Converter corpo em objeto |
| @Service | Componente de lógica de serviço |
| @Entity / @Id | Entidade JPA e identificador |
| JpaRepository<Aluno, Long> | Entidade e tipo do ID no repositório JPA |
| @Document / MongoRepository | Mapeamento/repositório MongoDB |

Operações usuais: findAll, findById, save, deleteById. Consultas derivadas usam convenções, como findByNome. save não significa apenas INSERT em toda situação.

Postman testa APIs como cliente. Retrofit consome HTTP em Java com interfaces/conversores. Controller fornece endpoint; cliente consome.

### Mensageria, JMS e RabbitMQ

Comunicação por mensagens desacopla produtor/consumidor e pode absorver picos. Exige tratar falhas, reentregas, ordem e consistência entre processos.

- Produtor publica; consumidor processa; broker intermedeia.
- Fila/ponto a ponto: consumidores podem competir; cada entrega vai a um consumidor. Falha pode causar reentrega.
- Publish/subscribe: diferentes assinantes podem receber publicação conforme configuração.
- JMS é API/especificação Java, não broker específico.
- Componentes JMS: ConnectionFactory, Connection, Session, Destination (Queue/Topic), MessageProducer/Consumer.
- RabbitMQ é broker. Fluxo do material: produtor → exchange → fila(s) → consumidor(es).

| Exchange | Regra |
|---|---|
| Direct | Combinação de routing key com binding correspondente |
| Fanout | Todas as filas vinculadas |
| Topic | Padrões de routing keys |
| Headers | Atributos dos cabeçalhos |

Ack confirma conforme o modo utilizado. Durabilidade da fila, persistência da mensagem e ack resolvem partes diferentes da confiabilidade. Fila não garante sozinha processamento exatamente uma vez. Consumidor idempotente ajuda em reentregas.

### SOAP, REST e GraphQL

SOA organiza capacidades como serviços. API é interface/contrato. Web Service integra sistemas em rede, mesmo com linguagens/plataformas distintas.

| SOAP | REST |
|---|---|
| Protocolo | Estilo arquitetural |
| Mensagens XML | Diferentes representações, incluindo JSON/XML |
| Envelope, Header opcional, Body, Fault | Recursos/URIs, interface uniforme e interações stateless |
| WSDL descreve contrato; UDDI aparece como registro/descoberta | Métodos HTTP na aplicação sobre HTTP |

Java do material: JAX-WS com SOAP; JAX-RS com REST. Reconheça @WebService/@WebMethod e @Path/@GET/@POST/@Produces/@Consumes. Pacotes/disponibilidade dependem da versão; foco é interpretação da apostila.

Stateless não significa sem banco ou sem autenticação: cada requisição fornece contexto suficiente, sem depender de conversa implícita de sessão.

GraphQL permite selecionar campos desejados. Schema define tipos/operações; resolver obtém valor de campo; query consulta; mutation altera. Não é banco nem broker. Query/mutation não equivalem obrigatoriamente a métodos HTTP específicos.

**Revisão de 5 minutos:** Servlet/JSP; JDBC/JPA/Spring Data; IoC/DI; SOAP/REST; JMS/RabbitMQ; exchange/fila; query/mutation/resolver.

## Observações sobre cobertura

Foram extraídos os textos dos 28 PDFs. Figuras/equações e trechos só disponíveis em vídeo podem não aparecer integralmente na extração. O guia é uma síntese intensiva.

Os arquivos de NoSQL chamados Aula 2 a Aula 11 correspondem internamente às aulas 1 a 10. No arquivo Aula 11, página 2, há trecho sobre Unreal Engine alheio ao tema, desconsiderado.

Não foram encontrados arquivos de Tema 1 nas quatro disciplinas organizadas por temas. Isso não comprova ausência desses conteúdos na avaliação.

Os exemplos numéricos e o simulado são autorais. O guia não verifica versões atuais de instalação ou procedimentos das lojas. A relação dos 28 arquivos está em fontes-e-cobertura.md.
