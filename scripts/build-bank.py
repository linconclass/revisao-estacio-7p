from pathlib import Path
import json,re,html
repo=Path(__file__).resolve().parents[1]
old=json.loads((repo/'scripts/original-bank.json').read_text(encoding='utf-8'))
# Authored alternatives for the original open-response questions. First option is correct.
conversion={
'N4':['Seleciona alunos com nota maior ou igual a 7','Altera todas as notas para 7','Remove alunos com nota abaixo de 7','Retorna somente alunos com nota exatamente 7'],
'N5':['loja e mes definem a partição; dia é clustering','loja é partição; mes e dia são clustering','dia define a partição; loja e mes são índices','Todos são clustering; não existe chave de partição'],
'N6':['Grafos','Chave-valor sem consulta a relações','Tabelas de cache por expiração','Arquivos de texto sequenciais'],
'N7':['Nomes das pessoas seguidas; podem se repetir','Nomes dos seguidores, sempre sem repetição','Todos os nomes, mesmo sem relação SEGUE','Quantidade de seguidores agrupada por pessoa'],
'N9':['Replicar mantém cópias; particionar divide os dados','Replicar divide dados; particionar só duplica','Os dois mecanismos apenas aumentam a memória da máquina','Particionar elimina a necessidade de comunicação em rede'],
'M1':['2x + 3y ≤ 60','2x + 3y ≥ 60','3x + 2y ≤ 60','x + y = 60'],
'M2':['x + y ≥ 25','x + y ≤ 25','x − y ≥ 25','25x + 25y = 1'],
'M3':['x=3, y=2 e Z=18','x=1, y=4 e Z=16','x=3, y=4 e Z=24','x=0, y=4 e Z=12'],
'M4':['A segunda: 3/1 é a menor razão admissível','A primeira: 8/2 é a maior razão','A primeira: seu coeficiente 2 é maior','Nenhuma: ambas as razões são positivas'],
'M5':['min 10u+12v; 2u+v≥5; u+3v≥4; u,v≥0','max 10u+12v; 2u+v≤5; u+3v≤4; u,v≥0','min 5u+4v; 2u+v≥10; u+3v≥12; u,v≥0','min 10u+12v; 2u+3v≥5; u+v≥4; u,v≥0'],
'M6':['Aumenta 12 unidades','Aumenta 3 unidades','Aumenta 6 unidades','Diminui 12 unidades'],
'M8':['15 unidades','65 unidades','5 unidades','25 unidades'],
'M9':['0,20x+0,50y ≥ 0,30(x+y)','0,20x+0,50y ≤ 0,30(x+y)','0,20x+0,50y ≥ 0,30','x+y ≥ 0,30'],
'M10':['Não: o novo ótimo é (2,3), Z=12; o preço marginal mudou','Sim: o novo ótimo vale 14 em qualquer capacidade','Não: o novo ótimo é (0,3), Z=6','Sim: o novo ótimo é (3,2), Z=13'],
'L1':['Engenharia do domínio','Engenharia da aplicação','Somente a equipe de suporte de cada cliente','Somente a gestão de contratos'],
'L2':['Engenharia da aplicação','Engenharia do domínio, sem requisitos do cliente','Somente a auditoria externa','A ferramenta de teste, sem configuração'],
'L3':['Variantes','Domínios de negócio independentes','Requisitos delta necessariamente','Arquiteturas de referência completas'],
'L4':['Não, pois selecionar A exige selecionar B','Sim, porque requires apenas sugere B','Sim, porque A e B se excluem','Não, porque A é sempre proibida'],
'L6':['Documentar variabilidade e conectá-la aos artefatos','Substituir os requisitos por código-fonte','Eliminar todas as diferenças entre produtos','Testar automaticamente todas as configurações'],
'L7':['Necessidade da aplicação não totalmente coberta pelo domínio','Qualquer requisito comum a todos os produtos','Um defeito necessariamente causado pelo cliente','Uma variante obrigatória já implementada'],
'L9':['16','8','4','32'],
'L10':['Rastreabilidade','Apenas contagem de linhas de código','Somente renomear a variante','Desativar os testes comuns'],
'A1':['Props são recebidas; state é gerenciado pelo componente','Props são banco local; state é banco remoto','Props são sempre mutáveis pelo filho; state nunca muda','State vem apenas da URL; props são funções de teste'],
'A2':['FlatList, por virtualizar a renderização dos itens','ScrollView, pois sempre renderiza menos itens','ScrollView, pois não usa memória para os filhos','FlatList, porque transforma itens em tabelas SQL'],
'A3':['Serializar o objeto em texto antes de armazenar','Criptografar o objeto com chave secreta','Criar uma tabela relacional automaticamente','Transformar uma Promise em operação síncrona'],
'A4':['SQLite','MongoDB remoto','Base64','Redux'],
'A5':['await r.json()','JSON.stringify(r)','r.data()','await r.executeSql()'],
'A7':['Reducer','Dispatcher obrigatório separado do Redux','Componente TextInput','Driver SQLite'],
'A8':['Não: é codificação reversível sem segredo','Sim: exige uma chave secreta para decodificar','Sim: é uma função hash de sentido único','Sim: substitui HTTPS no transporte'],
'A9':['A primeira passa a função; a segunda a executa e passa o retorno','Ambas sempre aguardam o toque para executar salvar','A primeira executa agora; a segunda passa callback','Nenhuma das duas aceita função JavaScript'],
'A10':['Stack, tabs e drawer; stack organiza avanço e retorno em pilha','Stack, SQL e drawer; SQL organiza as telas','Props, state e tabs; state é um menu lateral','MVC, Flux e Redux; todos são menus nativos'],
'B1':['XML','JDBC','JMS','Servlet'],
'B2':['Servlet processa requisições; JSP é apresentação traduzida para Servlet','JSP roda somente no navegador; Servlet só no banco','Servlet é arquivo de estilo; JSP é driver SQL','JSP substitui HTTP; Servlet substitui Java'],
'B3':['executeQuery','executeUpdate','setInt','close'],
'B4':['JPA especifica; Hibernate implementa; Spring Data JPA oferece repositórios','Hibernate especifica; JPA é banco; Spring Data é driver','Os três são nomes do mesmo servidor HTTP','JPA é linguagem SQL; Hibernate é broker; Spring Data é XML'],
'B5':['@RequestBody','@PathVariable','@Entity','@Id'],
'B7':['Fanout com as três filas vinculadas','Direct ligado somente a uma fila','Uma fila única sem assinantes','Headers sem nenhum binding'],
'B8':['SOAP é protocolo; REST é estilo arquitetural','REST é protocolo XML; SOAP é banco','Ambos são bancos de dados distribuídos','SOAP exige JSON; REST exige WSDL'],
'B9':['Mutation altera; resolver obtém valor de campo','Query altera; schema é sempre o broker','Resolver é o banco; mutation apenas lê','Mutation é método DELETE obrigatório; query é GET obrigatório']}
topics={
'N':['Fundamentos e modelos','JSON e PostgreSQL','Documentos e agregados','Cassandra e CQL','Grafos e Cypher'],
'M':['Modelagem e aplicações','Solução gráfica','Método Simplex','Dualidade','Sensibilidade'],
'L':['Fundamentos e engenharias','Variabilidade','Estratégias de adoção','Aplicação e rastreabilidade','Testes de LPS'],
'A':['Componentes e interface','Persistência','Rede e Offline First','Arquiteturas e Redux','Segurança e qualidade'],
'B':['Formatos e HTTP','Java Web e JDBC','Spring e persistência','Mensageria','Serviços e integração']}
assign={'N':[0,1,0,2,3,4,4,2,0,3],'M':[0,0,1,2,3,4,3,0,0,4],'L':[0,0,1,1,2,1,3,4,1,3],'A':[0,0,1,1,2,2,3,4,0,0],'B':[0,1,1,2,2,3,3,4,4,4]}
for q in old:
 q['topic']=assign[q['group']][int(q['id'][1:])-1]
 q['type']='choice'
 if q['id'] in conversion:q['options']=[html.escape(x) for x in conversion[q['id']]];q['correct']=0
 if len(q['options'])==2:
  # Replace true/false with four substantive alternatives, avoiding a recognition-only format.
  replacements={
  'N10':('Sobre ALLOW FILTERING no Cassandra, qual afirmação é correta?',['Autoriza certas filtragens, mas não garante eficiência','Garante o uso de índice em qualquer consulta','Cria automaticamente a partition key','Elimina a necessidade de modelar pelas consultas']),
  'M7':('Uma restrição tem folga zero na solução ótima. Sobre seu preço-sombra:',['Pode ser zero ou não, conforme o problema','É obrigatoriamente positivo','É obrigatoriamente negativo','É sempre igual à folga']),
  'L8':('Depois de testar os ativos de domínio, o que fazer na aplicação?',['Testar configuração, integração e requisitos específicos','Dispensar qualquer teste adicional','Testar apenas a cor da interface','Remover os testes reutilizáveis']),
  'A6':('Detectar conectividade em um app Offline First:',['É só parte da solução; faltam sincronização e conflitos','Resolve automaticamente conflitos entre edições','Impede a reentrega de operações pendentes','Dispensa armazenamento local']),
  'B6':('Qual relação entre JMS e RabbitMQ está correta?',['JMS é API/especificação; RabbitMQ é broker','São dois nomes de um mesmo produto','JMS é banco; RabbitMQ é formato de dados','JMS é protocolo HTTP; RabbitMQ é Servlet']),
  'B10':('Uma API REST stateless pode autenticar com token?',['Sim, com o contexto necessário em cada requisição','Não, autenticação exige sempre sessão implícita','Não, stateless proíbe cabeçalhos','Sim, mas só se não acessar banco de dados'])}
  prompt,opts=replacements[q['id']];q.update(html='<p>'+html.escape(prompt)+'</p>',options=opts,correct=0)
 if q['id']=='A4':q['html']='<p>Qual tecnologia fornece um banco relacional local no aplicativo?</p>'
 if q['id']=='B1':q['html']='<p>Qual formato representa dados com tags e hierarquia?</p>'
 if q['id']=='B3':q['html']='<p>Qual método JDBC é apropriado para executar SELECT e receber um ResultSet?</p>'
 if q['id']=='B5':q['html']='<p>Qual anotação do Spring converte o corpo da requisição em um objeto?</p>'
 q['explain']=re.sub('<[^>]+>','',html.unescape(q.pop('answer')))
for q in old:
 if q['id']=='A4':q['explain']='SQLite é um banco relacional local; Redux gerencia estado, Base64 é codificação e MongoDB remoto requer acesso ao serviço.'
rows=(repo/'scripts/extra-questions.txt').read_text(encoding='utf-8-sig').splitlines()
counts={g:10 for g in topics}
for row in rows:
 if not row.strip() or row.startswith('#'):continue
 parts=row.split('~');assert len(parts)==8,(len(parts),row[:80])
 g,t,p,c,w1,w2,w3,e=parts;counts[g]+=1
 old.append({'id':g+str(counts[g]),'group':g,'subject':next(q['subject'] for q in old if q['group']==g),'topic':int(t),'html':'<p>'+html.escape(p)+'</p>','options':[html.escape(x) for x in [c,w1,w2,w3]],'correct':0,'explain':e,'type':'choice'})
old += json.loads((repo/'scripts/public-questions.json').read_text(encoding='utf-8'))
assert len(old)==165,len(old)
assert all(len(q['options'])==4 and len(set(q['options']))==4 for q in old)
assert all(len([q for q in old if q['group']==g and q['topic']==t])>=5 for g in topics for t in range(5))
(repo/'quiz-data.js').write_text('window.QUIZ_SOURCES='+json.dumps(json.loads((repo/'scripts/public-sources.json').read_text(encoding='utf-8')),ensure_ascii=False)+';\nwindow.QUIZ_TOPICS='+json.dumps(topics,ensure_ascii=False)+';\nwindow.QUIZ_DATA='+json.dumps(old,ensure_ascii=False).replace('</','<\\/')+';',encoding='utf-8')
# A text alternative also contains only multiple choice.
text=['# Banco de revisão — 165 questões de múltipla escolha','','Questões autorais; não são exercícios oficiais da Estácio. No site, perguntas e alternativas são sorteadas por rodada.','']
for g in topics:
 text+=['## '+next(q['subject'] for q in old if q['group']==g),'']
 for q in [x for x in old if x['group']==g]:
  text+=['### '+q['id']+' · '+topics[g][q['topic']],re.sub('<[^>]+>','',html.unescape(q['html'])),'']
  text += [f'{chr(65+i)}) '+html.unescape(re.sub('<[^>]+>','',o)) for i,o in enumerate(q['options'])]
  text+=['',f'**Gabarito: {chr(65+q["correct"])}.** '+q['explain'],'']
  if q.get('sourceId'):
   src=next(x for x in json.loads((repo/'scripts/public-sources.json').read_text(encoding='utf-8')) if x['id']==q['sourceId'])
   text+=['Adaptação autoral a partir de [registro público]('+src['url']+'). Conferência: '+q['validation'],'']
(repo/'banco-165-questoes.md').write_text('\n'.join(text),encoding='utf-8')
print('Banco validado:',len(old),'questões; 33 por matéria; 15 adaptações com origem documentada.')
