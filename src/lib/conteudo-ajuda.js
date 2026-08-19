/* Conteúdo do assistente, do tutorial e das mensagens prontas.
   Escrito a partir da leitura do próprio código do app e revisado contra ele.
   Ao mudar uma tela, revisar aqui também. */

export const TOPICOS = [
  {
    "id": "entrar-no-app",
    "categoria": "Primeiros passos",
    "pergunta": "Como eu entro no sistema?",
    "variacoes": [
      "como faço login",
      "entrar no app",
      "abrir o sistema",
      "login",
      "como acesso o crm",
      "nao sei entrar",
      "tela de entrada",
      "entrar"
    ],
    "resposta": "Abre o endereço do CRM no navegador do celular. Digita teu e-mail no campo E-mail, a senha no campo Senha e toca no botão dourado Entrar. Se estiver tudo certo tu cai direto no Painel. Depois da primeira vez o app costuma lembrar de ti e abrir sem pedir nada."
  },
  {
    "id": "ver-senha",
    "categoria": "Primeiros passos",
    "pergunta": "Como vejo o que estou digitando na senha?",
    "variacoes": [
      "mostrar senha",
      "botao de olho",
      "senha escondida",
      "ver a senha",
      "olhinho da senha",
      "senha aparece",
      "desmarcar as bolinhas"
    ],
    "resposta": "Do lado direito do campo Senha tem um desenho de olho. Toca nele e a senha aparece por escrito, no lugar das bolinhas. Toca de novo e ela volta a ficar escondida."
  },
  {
    "id": "senha-errada",
    "categoria": "Primeiros passos",
    "pergunta": "Apareceu \"E-mail ou senha incorretos\", o que faço?",
    "variacoes": [
      "esqueci minha senha",
      "nao entra",
      "senha errada",
      "email ou senha incorretos",
      "recuperar senha",
      "nao consigo entrar",
      "travou no login",
      "perdi a senha"
    ],
    "resposta": "Essa mensagem aparece quando alguma letra está diferente. Toca no olho ao lado da senha pra ver o que digitou e confere se o teclado não colocou letra maiúscula no começo do e-mail ou um espaço no fim. Se continuar dando errado, pede pra quem cuida do sistema trocar tua senha, porque dentro do app não tem botão de esqueci a senha."
  },
  {
    "id": "criar-conta",
    "categoria": "Primeiros passos",
    "pergunta": "Como crio minha conta?",
    "variacoes": [
      "primeira vez",
      "criar conta",
      "cadastrar meu email",
      "nunca entrei antes",
      "fazer cadastro",
      "conta nova",
      "comecar do zero"
    ],
    "resposta": "Na tela de entrada, embaixo do botão Entrar, toca em Primeira vez? Criar conta. Preenche teu e-mail e uma senha de pelo menos 6 letras ou números e toca em Criar conta. Vai chegar um e-mail pedindo confirmação: abre esse e-mail, confirma, volta no app e entra pelo Entrar."
  },
  {
    "id": "sair-do-app",
    "categoria": "Primeiros passos",
    "pergunta": "Como saio da minha conta?",
    "variacoes": [
      "sair",
      "deslogar",
      "fechar minha conta",
      "botao de sair",
      "como faço logout",
      "trocar de conta",
      "sair do sistema"
    ],
    "resposta": "No celular, o botão de sair é o desenho de porta com a setinha, lá no alto à direita, do lado da lupa. No computador ele fica na barrinha da esquerda, mais embaixo, perto da bolinha com a letra J. Toca uma vez e tu volta pra tela de e-mail e senha."
  },
  {
    "id": "as-tres-telas",
    "categoria": "Primeiros passos",
    "pergunta": "Quais são as telas do app?",
    "variacoes": [
      "o que tem no app",
      "quantas telas",
      "onde fica cada coisa",
      "nao acho nada",
      "me perdi no app",
      "como funciona o app",
      "pra que serve cada tela"
    ],
    "resposta": "São três telas: Painel, Pacientes e Agenda. O Painel é o resumo do teu dia, quem vem hoje e os números. Pacientes é o quadro com as colunas e o card de cada pessoa. Agenda é o calendário com os atendimentos marcados."
  },
  {
    "id": "navegar-celular",
    "categoria": "Primeiros passos",
    "pergunta": "Como troco de tela no celular?",
    "variacoes": [
      "mudar de tela",
      "barra de baixo",
      "menu do celular",
      "ir pra agenda",
      "voltar pro painel",
      "como navego",
      "onde clico pra trocar"
    ],
    "resposta": "Lá embaixo, fixa na tela, tem uma barrinha com três palavras: Painel, Pacientes e Agenda. Toca na palavra que tu quer e a tela troca na hora. A que está aberta fica com a letra dourada."
  },
  {
    "id": "navegar-computador",
    "categoria": "Primeiros passos",
    "pergunta": "No computador, onde fica o menu?",
    "variacoes": [
      "menu no notebook",
      "barra lateral",
      "icones da esquerda",
      "usar no pc",
      "onde clico no computador",
      "nao tem barra embaixo"
    ],
    "resposta": "No computador o menu vira uma barrinha em pé, do lado esquerdo da tela, com três ícones: um quadradinho de painel, dois bonequinhos de pacientes e um calendário de agenda. Passa o mouse em cima pra ver o nome de cada um. O ícone da tela aberta fica com fundo dourado."
  },
  {
    "id": "busca-do-topo",
    "categoria": "Primeiros passos",
    "pergunta": "Pra que serve a lupa lá em cima?",
    "variacoes": [
      "lupa do topo",
      "busca rapida",
      "procurar de qualquer tela",
      "icone de lupa",
      "buscar paciente em cima",
      "achar alguem rapido"
    ],
    "resposta": "Ela procura qualquer paciente de qualquer tela, sem tu precisar sair de onde está. No celular, toca na lupa do canto de cima à direita e a busca abre em tela cheia. Digita pelo menos 2 letras do nome ou o telefone, e ao tocar no nome que aparecer tu cai na tela Pacientes já com aquela pessoa filtrada."
  },
  {
    "id": "painel-o-que-mostra",
    "categoria": "Primeiros passos",
    "pergunta": "O que aparece no Painel?",
    "variacoes": [
      "pra que serve o painel",
      "tela inicial",
      "resumo do dia",
      "primeira tela",
      "o que sao esses numeros",
      "dashboard",
      "home"
    ],
    "resposta": "O Painel abre com Hoje na agenda, que é a lista de quem vem hoje com horário e procedimento, e com Próximos atendimentos do lado ou logo abaixo. Depois vem Precisam de um retorno, com quem passou da data combinada, e o bloco de dinheiro, que vem com o nome do mês, tipo Dinheiro de agosto, trazendo já recebido e ainda a receber. Mais abaixo vem De onde elas vêm, o Pipeline de pacientes, que mostra quantas pessoas tem em cada coluna do teu quadro, e os contadores do fim."
  },
  {
    "id": "quem-vem-hoje",
    "categoria": "Primeiros passos",
    "pergunta": "Como vejo rapidinho quem vem hoje?",
    "variacoes": [
      "atendimentos de hoje",
      "quem tenho hoje",
      "agenda do dia",
      "quantos atendimentos hoje",
      "ver o dia de hoje",
      "o que tenho pra hoje"
    ],
    "resposta": "Abre o Painel, que é a primeira palavra da barrinha de baixo. O primeiro cartão se chama Hoje na agenda e lista todo mundo do dia, com o horário na frente do nome. Quem já foi atendido ou cancelou aparece apagadinho e com o nome riscado."
  },
  {
    "id": "instalar-na-tela-inicio",
    "categoria": "Primeiros passos",
    "pergunta": "Como coloco o app na tela do meu celular?",
    "variacoes": [
      "instalar o app",
      "icone na tela inicial",
      "virar aplicativo",
      "baixar o app",
      "atalho no celular",
      "nao quero abrir pelo navegador",
      "adicionar a tela de inicio"
    ],
    "resposta": "Tem um botão chamado Instalar na tela de início. Toca nele e o celular te oferece colocar o CRM junto dos teus outros aplicativos. Depois disso tu abre o sistema pelo ícone dourado, sem precisar do navegador nem digitar endereço."
  },
  {
    "id": "tutorial",
    "categoria": "Primeiros passos",
    "pergunta": "Tem um passo a passo pra eu aprender a usar?",
    "variacoes": [
      "tutorial",
      "aprender a usar",
      "passo a passo",
      "tour do app",
      "ver de novo a explicacao",
      "me ensina",
      "primeiros passos"
    ],
    "resposta": "Tem sim, é o Tutorial. Ele te leva pelas telas mostrando onde fica cada coisa, uma etapa por vez. Pode abrir quantas vezes quiser, não some depois da primeira, e dá pra fechar no meio e voltar depois."
  },
  {
    "id": "assistente-ajuda",
    "categoria": "Primeiros passos",
    "pergunta": "Onde peço ajuda dentro do app?",
    "variacoes": [
      "botao de ajuda",
      "assistente",
      "duvida no app",
      "perguntas e respostas",
      "socorro",
      "suporte",
      "como faço tal coisa"
    ],
    "resposta": "Toca no botão de ajuda, o Assistente. Abre uma busquinha onde tu escreve tua dúvida com tuas palavras, tipo como apago uma paciente, e ele mostra a resposta pronta. Serve pra qualquer parte do sistema."
  },
  {
    "id": "precisa-internet",
    "categoria": "Primeiros passos",
    "pergunta": "O app funciona sem internet?",
    "variacoes": [
      "sem internet",
      "offline",
      "4g caiu",
      "nao salvou",
      "confere a internet",
      "deu erro ao salvar",
      "sem sinal no consultorio"
    ],
    "resposta": "Não, ele precisa de internet pra guardar as coisas. Quando o sinal cai e tu toca em Salvar, aparece o aviso Não deu pra salvar, confere a internet e tenta de novo. Nesse caso o que tu digitou continua na tela: espera o sinal voltar e toca em Salvar outra vez, sem começar de novo."
  },
  {
    "id": "celular-e-computador",
    "categoria": "Primeiros passos",
    "pergunta": "Posso usar no celular e no computador ao mesmo tempo?",
    "variacoes": [
      "usar no notebook tambem",
      "dois aparelhos",
      "abre no pc",
      "mesmos dados",
      "sincroniza",
      "muda de aparelho",
      "tablet"
    ],
    "resposta": "Pode. É a mesma conta e os mesmos dados nos dois: tu entra com o mesmo e-mail e senha e vê tudo igual. O que tu cadastra no celular entre um atendimento e outro já está lá quando abrir no computador."
  },
  {
    "id": "bolinha-girando",
    "categoria": "Primeiros passos",
    "pergunta": "Ficou uma bolinha girando no meio da tela",
    "variacoes": [
      "carregando",
      "travou",
      "bolinha rodando",
      "nao abre",
      "fica girando",
      "demora pra abrir",
      "tela em branco"
    ],
    "resposta": "Essa bolinha dourada girando quer dizer que o app está buscando as informações. Normalmente some em poucos segundos. Se ficar muito tempo, é sinal de internet fraca: confere o sinal, fecha o app e abre de novo. Puxar a tela pra baixo não recarrega nada aqui, isso fica desligado pra não atrapalhar quando tu rola as listas."
  },
  {
    "id": "saudacao-e-data",
    "categoria": "Primeiros passos",
    "pergunta": "O que é aquele \"Olá, Julisbel\" lá em cima?",
    "variacoes": [
      "texto do topo",
      "cabecalho",
      "data em cima",
      "dia da semana no topo",
      "meu nome na tela"
    ],
    "resposta": "É só o cabeçalho do app. Embaixo do Olá, Julisbel aparece o dia da semana e a data de hoje, pra tu se localizar rápido. Não precisa tocar em nada ali."
  },
  {
    "id": "cadastrar-paciente",
    "categoria": "Pacientes",
    "pergunta": "Como cadastro uma paciente nova?",
    "variacoes": [
      "adicionar paciente",
      "cadastrar cliente",
      "nova pessoa",
      "criar paciente",
      "botao de mais",
      "incluir alguem",
      "registrar paciente nova"
    ],
    "resposta": "Vai na tela Pacientes e toca no botão dourado Nova paciente, no alto à direita. Abre uma fichinha: preenche pelo menos o Nome, e o WhatsApp se tu já tiver. Escolhe a coluna dela no campo Etapa e toca em Salvar. O card já aparece no quadro."
  },
  {
    "id": "campos-da-paciente",
    "categoria": "Pacientes",
    "pergunta": "O que eu preencho na ficha da paciente?",
    "variacoes": [
      "quais campos",
      "o que colocar",
      "dados da paciente",
      "preencher ficha",
      "campos obrigatorios",
      "tem que preencher tudo"
    ],
    "resposta": "A ficha tem Nome, WhatsApp, Nascimento, E-mail, Etapa, que é a coluna dela, Veio de onde, que é a origem do contato, Falar de novo em, que é a data do próximo retorno, e Anotações / histórico. Só o Nome tem estrelinha, a Etapa já vem preenchida sozinha, e o resto tu completa quando souber. Depois de preencher, toca em Salvar lá embaixo."
  },
  {
    "id": "so-nome-obrigatorio",
    "categoria": "Pacientes",
    "pergunta": "Posso cadastrar só com o nome?",
    "variacoes": [
      "nao sei o telefone dela",
      "cadastrar sem telefone",
      "sem data de nascimento",
      "salvar so o nome",
      "faltou informacao",
      "completar depois"
    ],
    "resposta": "Pode. O único campo com estrelinha é o Nome, então tu salva só com ele e a coluna escolhida. Os outros campos ficam vazios e tu completa depois, é só tocar no card dela, preencher e tocar em Salvar de novo."
  },
  {
    "id": "achar-paciente",
    "categoria": "Pacientes",
    "pergunta": "Como acho uma paciente no meio de tantas?",
    "variacoes": [
      "procurar paciente",
      "buscar nome",
      "onde ta a fulana",
      "filtrar",
      "nao acho a pessoa",
      "pesquisar",
      "busca"
    ],
    "resposta": "Na tela Pacientes, logo abaixo do título, tem a barra Buscar por nome ou telefone. Escreve parte do nome, tipo mari, e o quadro já mostra só quem combina, em todas as colunas ao mesmo tempo. Não precisa escrever o nome inteiro nem se preocupar com maiúscula, mas o acento conta: se tu escrever jessica e o nome estiver salvo como Jéssica, ela não aparece. Nesse caso escreve um pedaço sem acento nenhum, tipo ssica, ou procura pelo telefone."
  },
  {
    "id": "buscar-por-telefone",
    "categoria": "Pacientes",
    "pergunta": "Dá pra procurar pelo número do telefone?",
    "variacoes": [
      "buscar por numero",
      "achar pelo whatsapp",
      "procurar telefone",
      "nao lembro o nome dela",
      "so tenho o numero",
      "pesquisar por celular"
    ],
    "resposta": "Dá. Na mesma barra Buscar por nome ou telefone tu digita os números, sem precisar de traço nem parênteses. Pode digitar só um pedaço, como 99941, que o quadro já filtra quem tem esse trecho no telefone."
  },
  {
    "id": "limpar-busca",
    "categoria": "Pacientes",
    "pergunta": "Como faço o quadro voltar a mostrar todo mundo?",
    "variacoes": [
      "limpar busca",
      "sumiram as pacientes",
      "so aparece uma pessoa",
      "tirar o filtro",
      "voltar tudo",
      "apagar o que digitei na busca",
      "cade as outras"
    ],
    "resposta": "Se tu escreveu algo na barra de busca, o quadro mostra só quem combina. Toca no x que fica na ponta direita dessa barra e o texto some, trazendo todas as pacientes de volta. Apagar as letras com o teclado tem o mesmo efeito."
  },
  {
    "id": "abrir-ficha",
    "categoria": "Pacientes",
    "pergunta": "Como abro a ficha de uma paciente?",
    "variacoes": [
      "ver dados da paciente",
      "abrir cadastro",
      "clicar no card",
      "ver informacoes dela",
      "abrir a pessoa",
      "detalhes da paciente"
    ],
    "resposta": "No quadro, toca em cima do nome dentro do card. Abre a janela Editar paciente com todos os dados dela, as anotações e o histórico dos atendimentos. Pra fechar sem mudar nada, toca no x do canto ou toca fora da janela."
  },
  {
    "id": "editar-paciente",
    "categoria": "Pacientes",
    "pergunta": "Como corrijo o nome ou o telefone de alguém?",
    "variacoes": [
      "mudar telefone",
      "corrigir nome",
      "editar cadastro",
      "atualizar dados",
      "escrevi errado",
      "trocar numero",
      "arrumar informacao"
    ],
    "resposta": "Toca no nome dentro do card pra abrir a janela Editar paciente. Apaga o que está errado, escreve certo e toca em Salvar lá embaixo. A mudança vale na hora, inclusive no link do WhatsApp do card."
  },
  {
    "id": "apagar-paciente",
    "categoria": "Pacientes",
    "pergunta": "Como apago uma paciente?",
    "variacoes": [
      "excluir paciente",
      "deletar pessoa",
      "tirar do sistema",
      "apagar cadastro",
      "remover paciente",
      "cadastrei errado quero tirar",
      "excluir contato"
    ],
    "resposta": "Toca no nome dentro do card, desce até o fim da janela e toca em Apagar paciente, o botão vermelho embaixo do Salvar. O app pergunta se tu tem certeza, avisando que os atendimentos dela também vão embora. Confirmando, não tem como voltar atrás, então se for só uma paciente que desistiu, prefere mover ela pra outra coluna."
  },
  {
    "id": "mudar-coluna-arrastando",
    "categoria": "Pacientes",
    "pergunta": "Como mudo alguém de coluna?",
    "variacoes": [
      "arrastar card",
      "mover paciente",
      "passar pra outra coluna",
      "trocar de etapa",
      "mudar de lista",
      "virou paciente agora",
      "arrastar pro lado"
    ],
    "resposta": "Segura o dedo na alcinha do card, aquele lugar com os traços na ponta esquerda, e arrasta. A coluna de destino acende com uma borda dourada, aí é só soltar. Se estiver arrastando no celular, deixa o dedo parado na beirada da tela que o quadro caminha sozinho até as outras colunas."
  },
  {
    "id": "card-nao-arrasta",
    "categoria": "Pacientes",
    "pergunta": "O card não sai do lugar quando eu arrasto",
    "variacoes": [
      "nao consigo arrastar",
      "card travado",
      "so rola a tela",
      "nao move o cartao",
      "arrastar nao funciona",
      "abre a ficha em vez de mover"
    ],
    "resposta": "O arrasto só começa pela alcinha, a faixinha com os traços na ponta esquerda do card. Se tu puxar pelo nome, o app entende que tu quer abrir a ficha ou rolar a lista. Coloca o dedo bem em cima dos traços, segura e só então arrasta."
  },
  {
    "id": "mudar-coluna-pela-ficha",
    "categoria": "Pacientes",
    "pergunta": "Dá pra mudar de coluna sem arrastar?",
    "variacoes": [
      "trocar coluna pelo cadastro",
      "campo etapa",
      "mudar sem arrastar",
      "escolher a coluna na ficha",
      "meu dedo nao acerta o arrasto",
      "mudar etapa"
    ],
    "resposta": "Dá. Toca no nome dentro do card pra abrir a ficha e procura o campo Etapa. Toca nele, escolhe a coluna que tu quer da listinha e toca em Salvar. O card muda de lugar sozinho."
  },
  {
    "id": "criar-coluna",
    "categoria": "Pacientes",
    "pergunta": "Como crio uma coluna nova?",
    "variacoes": [
      "nova coluna",
      "adicionar lista",
      "criar etapa",
      "botao coluna",
      "quero separar por grupo",
      "criar categoria",
      "nova fase"
    ],
    "resposta": "Na tela Pacientes, toca no botão cinza Coluna, ao lado do Nova paciente. Escreve o nome dela em Nome, uma descrição curta se quiser, escolhe uma cor tocando numa das bolinhas e toca em Salvar. A coluna nova entra no fim do quadro, na ponta direita."
  },
  {
    "id": "renomear-coluna",
    "categoria": "Pacientes",
    "pergunta": "Como mudo o nome de uma coluna?",
    "variacoes": [
      "renomear coluna",
      "editar coluna",
      "lapis da coluna",
      "trocar titulo da lista",
      "escrevi errado o nome da coluna",
      "mudar nome da etapa"
    ],
    "resposta": "No topo de cada coluna tem um lapisinho, do lado do número. Toca nele, apaga o texto do campo Nome, escreve o novo e toca em Salvar. As pacientes continuam todas onde estavam."
  },
  {
    "id": "cor-da-coluna",
    "categoria": "Pacientes",
    "pergunta": "Como troco a cor de uma coluna?",
    "variacoes": [
      "mudar cor",
      "cor da lista",
      "bolinha colorida",
      "deixar mais bonito",
      "cores das colunas",
      "escolher cor"
    ],
    "resposta": "Toca no lapisinho no topo da coluna e desce até Cor. Aparecem seis bolinhas coloridas: dourado, verde escuro, verde claro, rosa, azul e âmbar. Toca na que tu quer, ela ganha um contorno, e toca em Salvar. A cor pinta a listra de cima da coluna e a bolinha do lado do nome."
  },
  {
    "id": "descricao-coluna",
    "categoria": "Pacientes",
    "pergunta": "Como coloco aquele textinho pequeno embaixo do nome da coluna?",
    "variacoes": [
      "descricao da coluna",
      "subtitulo",
      "texto pequeno",
      "legenda da coluna",
      "explicar a coluna",
      "dica embaixo do titulo"
    ],
    "resposta": "Toca no lapisinho no topo da coluna e preenche o campo Descrição, que é opcional. Escreve algo curto, tipo aguardando retorno, e toca em Salvar. Esse texto aparece em letrinha miúda logo abaixo do nome da coluna."
  },
  {
    "id": "mover-coluna-de-lugar",
    "categoria": "Pacientes",
    "pergunta": "Como mudo a ordem das colunas?",
    "variacoes": [
      "trocar colunas de lugar",
      "reordenar",
      "coluna pra esquerda",
      "botar essa coluna primeiro",
      "organizar quadro",
      "posicao das colunas"
    ],
    "resposta": "Toca no lapisinho no topo da coluna que tu quer mexer e procura Posição no quadro. Toca em Esquerda pra ela andar uma casa pra trás ou em Direita pra andar uma casa pra frente. Cada toque move uma posição e a janela fecha sozinha mostrando o resultado."
  },
  {
    "id": "apagar-coluna",
    "categoria": "Pacientes",
    "pergunta": "Como apago uma coluna?",
    "variacoes": [
      "excluir coluna",
      "tirar lista",
      "deletar etapa",
      "nao uso mais essa coluna",
      "remover coluna",
      "apagar categoria"
    ],
    "resposta": "Toca no lapisinho no topo da coluna e, lá embaixo, no botão vermelho Apagar coluna. Ela precisa estar vazia: se ainda tiver pacientes dentro, aparece um aviso vermelho dentro da própria janela dizendo quantas são, e nada é apagado. Move as pessoas pra outra coluna primeiro. Com a coluna zerada, o app pergunta se tu tem certeza e aí sim ela some."
  },
  {
    "id": "coluna-nao-apaga",
    "categoria": "Pacientes",
    "pergunta": "Apareceu que a coluna tem pacientes e não dá pra apagar",
    "variacoes": [
      "nao consigo apagar a coluna",
      "aviso de pacientes na coluna",
      "coluna cheia",
      "move elas pra outra coluna",
      "erro ao apagar coluna"
    ],
    "resposta": "O app protege as pessoas que estão ali dentro, por isso não deixa apagar uma coluna com card. Fecha a janela da coluna no x do canto, arrasta cada paciente pela alcinha pra outra coluna, ou abre a ficha de cada uma e troca o campo Etapa. Quando a coluna ficar com o número zero no topo, o Apagar coluna funciona."
  },
  {
    "id": "contador-da-coluna",
    "categoria": "Pacientes",
    "pergunta": "O que é aquele número na frente do nome da coluna?",
    "variacoes": [
      "numero da coluna",
      "bolinha com numero",
      "quantas pessoas tem na coluna",
      "contador",
      "o que significa esse numero"
    ],
    "resposta": "É quantas pacientes estão naquela coluna agora. Se tu estiver com algo escrito na barra de busca, ele conta só quem apareceu no filtro. Esses mesmos números aparecem juntos no Painel, no bloco Pipeline de pacientes."
  },
  {
    "id": "ver-outras-colunas-celular",
    "categoria": "Pacientes",
    "pergunta": "No celular só vejo uma coluna, cadê as outras?",
    "variacoes": [
      "so aparece interessados",
      "nao vejo as outras colunas",
      "deslizar pro lado",
      "ver mais colunas",
      "sumiu a coluna baby",
      "rolar de lado"
    ],
    "resposta": "No celular as colunas ficam lado a lado e só uma cabe na tela por vez. Desliza o dedo pra esquerda em cima do quadro que a próxima coluna encaixa no lugar. Pra voltar, desliza pra direita. No computador de tela grande o quadro vira uma grade e todas as colunas aparecem, três por linha, uma linha embaixo da outra. Em tablet em pé continua deslizando, igual ao celular."
  },
  {
    "id": "rolar-dentro-da-coluna",
    "categoria": "Pacientes",
    "pergunta": "A coluna tem muita gente, como vejo o fim da lista?",
    "variacoes": [
      "muitos contatos",
      "lista enorme",
      "rolar a coluna",
      "ver o resto dos nomes",
      "317 contatos",
      "nao chego no fim"
    ],
    "resposta": "Cada coluna rola por dentro dela mesma. Coloca o dedo em cima dos cards e desliza pra cima que os próximos nomes vão aparecendo, sem a página inteira sair do lugar. Se tu está atrás de uma pessoa específica, é mais rápido escrever o nome na barra Buscar por nome ou telefone."
  },
  {
    "id": "whatsapp-do-card",
    "categoria": "Pacientes",
    "pergunta": "Como chamo a paciente no WhatsApp?",
    "variacoes": [
      "mandar mensagem",
      "abrir whatsapp",
      "falar com a paciente",
      "zap",
      "numero clicavel",
      "chamar no whats",
      "conversar com ela"
    ],
    "resposta": "No card, embaixo do nome, o telefone aparece em dourado com um desenho de fone. Toca em cima do número: em vez de abrir a conversa em branco, o app te oferece uma lista de mensagens prontas. Escolhe a que serve e o WhatsApp abre com o texto já digitado, tu só confere e envia."
  },
  {
    "id": "mensagens-prontas",
    "categoria": "Pacientes",
    "pergunta": "O que são as mensagens prontas do WhatsApp?",
    "variacoes": [
      "texto pronto",
      "modelo de mensagem",
      "nao quero digitar",
      "mensagem automatica",
      "frases prontas",
      "lembrete pronto",
      "atalho de mensagem"
    ],
    "resposta": "São textos que já ficam escritos pra ti, pra não precisar digitar a mesma coisa toda hora. Ao tocar no telefone da paciente, aparece a listinha: tu escolhe uma, tipo confirmação de horário ou lembrete de retorno, e o WhatsApp abre com o texto já pronto. Dá pra mexer no texto antes de enviar, nada sai sem tu tocar em enviar."
  },
  {
    "id": "historico-de-sessoes",
    "categoria": "Pacientes",
    "pergunta": "Como vejo todos os atendimentos que já fiz nessa paciente?",
    "variacoes": [
      "historico da paciente",
      "quantas sessoes ela fez",
      "atendimentos dela",
      "ficha de sessoes",
      "ver o que ja foi feito",
      "quantas vezes ela veio",
      "evolucao dela"
    ],
    "resposta": "Toca no nome dentro do card pra abrir a ficha dela. Lá dentro tem a lista de todos os atendimentos, com data, procedimento e situação de cada um, e um contador do tipo 6 sessões registradas. Serve bem pra remodelação baby, que precisa de acompanhamento toda semana."
  },
  {
    "id": "proximo-contato",
    "categoria": "Pacientes",
    "pergunta": "Como marco pra lembrar de falar com alguém depois?",
    "variacoes": [
      "proximo contato",
      "lembrete de retorno",
      "data pra chamar ela",
      "nao esquecer de falar",
      "follow up",
      "marcar pra depois",
      "voltar a falar"
    ],
    "resposta": "Abre a ficha dela tocando no nome do card e preenche o campo Falar de novo em com a data em que tu quer falar de novo. Toca em Salvar. A partir daí o card dela mostra essa data, e quando ela chegar aparece falar hoje em amarelo. Se a data passar e ela não voltar, o nome dela entra no bloco Precisam de um retorno, lá no Painel."
  },
  {
    "id": "quem-sumiu",
    "categoria": "Pacientes",
    "pergunta": "Como sei quem sumiu e não voltou mais?",
    "variacoes": [
      "quem nao voltou",
      "pacientes sumidas",
      "perdi contato",
      "quem esta atrasada",
      "lista de sumidas",
      "resgatar paciente",
      "quem parou o tratamento"
    ],
    "resposta": "Isso vem do campo Falar de novo em da ficha de cada paciente. Quando essa data chega ou passa e a pessoa não voltou, o nome dela entra no bloco Precisam de um retorno, no Painel, com um aviso de desde quando. Do lado de cada nome tem o botão falar, que abre o WhatsApp dela na hora. O bloco mostra até oito nomes por vez."
  },
  {
    "id": "origem-do-contato",
    "categoria": "Pacientes",
    "pergunta": "Como registro de onde a paciente veio?",
    "variacoes": [
      "origem",
      "como ela me achou",
      "veio do instagram",
      "indicacao",
      "de onde vem minha cliente",
      "campo de origem",
      "canal"
    ],
    "resposta": "Na ficha da paciente tem o campo Veio de onde. Toca nele e escolhe entre Instagram, Indicação, Anúncio, Site, Google e Outro, depois toca em Salvar. Enquanto tu não escolher, ele fica em não sei. O Painel junta tudo no bloco De onde elas vêm e te mostra de onde as tuas pacientes estão vindo, pra tu saber onde vale a pena investir."
  },
  {
    "id": "anotacoes-paciente",
    "categoria": "Pacientes",
    "pergunta": "Onde escrevo observações sobre a paciente?",
    "variacoes": [
      "anotacoes",
      "observacoes",
      "escrever sobre a paciente",
      "bloco de notas",
      "historico escrito",
      "detalhes clinicos",
      "lembrete sobre ela"
    ],
    "resposta": "Na ficha da paciente, no fim, tem o campo Anotações e histórico. Escreve ali o que tu precisa lembrar, como observações clínicas, preferências ou o que foi combinado, e toca em Salvar. Esse texto fica guardado com ela e tu relê sempre que abrir o card."
  },
  {
    "id": "aniversario",
    "categoria": "Pacientes",
    "pergunta": "Onde coloco a data de nascimento?",
    "variacoes": [
      "aniversario",
      "data de nascimento",
      "idade da paciente",
      "bolinho no card",
      "quando ela nasceu",
      "nascimento do bebe"
    ],
    "resposta": "Na ficha da paciente tem o campo Nascimento. Toca nele, escolhe a data no calendarinho do celular e toca em Salvar. Depois disso a data aparece no card com um desenho de bolo, do lado do telefone. Pros bebês vale muito a pena preencher, porque a idade muda o acompanhamento."
  },
  {
    "id": "paciente-duplicada",
    "categoria": "Pacientes",
    "pergunta": "Cadastrei a mesma pessoa duas vezes, e agora?",
    "variacoes": [
      "paciente repetida",
      "dois cadastros iguais",
      "duplicado",
      "toquei duas vezes no salvar",
      "nome repetido no quadro",
      "tirar o repetido"
    ],
    "resposta": "Escreve o nome dela na barra Buscar por nome ou telefone pra ver os dois cards juntos. Abre o que está mais completo e confere se está tudo certo, depois abre o outro e toca em Apagar paciente. Cuidado: apagar leva junto os atendimentos ligados àquele card, então apaga sempre o que não tem atendimento marcado."
  },
  {
    "id": "erro-salvar-paciente",
    "categoria": "Pacientes",
    "pergunta": "Apareceu \"Não deu pra salvar\", perdi o que digitei?",
    "variacoes": [
      "erro ao salvar",
      "nao salvou a paciente",
      "aviso vermelho",
      "perdi os dados",
      "deu erro",
      "travou no salvar"
    ],
    "resposta": "Não perdeu nada, o que tu escreveu continua na tela. Esse aviso vermelho quer dizer que a internet falhou na hora de enviar. Espera o sinal voltar e toca em Salvar de novo, sem preencher tudo outra vez, e evita ficar tocando várias vezes seguidas pra não criar cadastro repetido."
  },
  {
    "id": "erro-mover-card",
    "categoria": "Pacientes",
    "pergunta": "Movi a paciente de coluna e ela voltou sozinha",
    "variacoes": [
      "card voltou",
      "nao deu pra mover",
      "voltou pra coluna antiga",
      "mudanca nao ficou",
      "erro ao mover",
      "desfez sozinho"
    ],
    "resposta": "Isso acontece quando a internet cai bem na hora do arrasto. Como o app não conseguiu guardar a mudança, ele devolve o card pro lugar de origem em vez de fingir que salvou, e mostra um avisinho no rodapé. Confere o sinal e arrasta de novo pela alcinha do card."
  },
  {
    "id": "importar-contatos",
    "categoria": "Pacientes",
    "pergunta": "Como coloco minha lista do WhatsApp aqui dentro?",
    "variacoes": [
      "importar contatos",
      "subir lista",
      "planilha de clientes",
      "meus 317 contatos",
      "trazer os numeros",
      "importacao",
      "colar lista"
    ],
    "resposta": "Dentro do app não tem botão de importar, o cadastro é feito um por um pelo Nova paciente. A lista grande que já está lá foi carregada por fora, direto no banco de dados. Se tu tiver outra lista pra subir de uma vez, guarda ela num arquivo e pede pra quem cuida do sistema fazer a carga."
  },
  {
    "id": "quantas-pacientes",
    "categoria": "Pacientes",
    "pergunta": "Quantas pacientes eu tenho no total?",
    "variacoes": [
      "total de pacientes",
      "quantos contatos tenho",
      "numero de clientes",
      "contagem geral",
      "quantas pessoas cadastradas"
    ],
    "resposta": "Abre o Painel e olha o quadradinho escrito Pacientes: o número grande ali é o total cadastrado. Se tu quer saber quantas tem em cada situação, o bloco Pipeline de pacientes mostra o número de cada coluna separado."
  },
  {
    "id": "paciente-sem-whatsapp",
    "categoria": "Pacientes",
    "pergunta": "O telefone da paciente não abre o WhatsApp",
    "variacoes": [
      "numero nao clica",
      "telefone cinza",
      "nao abre o zap",
      "link nao funciona",
      "numero errado",
      "nao vira link"
    ],
    "resposta": "O número só vira link dourado quando tem DDD e telefone completos. Se ele aparece em cinza, está faltando dígito ou o campo tem só o número solto. Abre a ficha, escreve no formato 48 99999-9999 no campo WhatsApp e toca em Salvar, que o link volta a funcionar."
  },
  {
    "id": "colunas-livres",
    "categoria": "Pacientes",
    "pergunta": "Posso usar as colunas pra outra coisa além de tratamento?",
    "variacoes": [
      "coluna de mentoria",
      "separar alunas",
      "usar pra outra coisa",
      "organizar do meu jeito",
      "criar minhas categorias",
      "lead curiosa importante"
    ],
    "resposta": "Pode, as colunas são todas tuas e tu cria quantas quiser pelo botão Coluna. Dá pra ter coluna de Mentoria pras profissionais, de Interessados pra quem só perguntou, e o que mais fizer sentido no teu dia. O app não obriga nenhuma ordem nem nome."
  },
  {
    "id": "nao-acho-a-paciente",
    "categoria": "Pacientes",
    "pergunta": "Cadastrei alguém mas não encontro no quadro",
    "variacoes": [
      "sumiu a paciente",
      "cade ela",
      "nao aparece no quadro",
      "perdi um cadastro",
      "desapareceu",
      "onde foi parar"
    ],
    "resposta": "Escreve o nome dela na barra Buscar por nome ou telefone, que a busca olha todas as colunas de uma vez. Se aparecer, é porque ela está numa coluna que tu não estava vendo, e o próprio resultado mostra em qual. Se não aparecer nada, confere se o nome foi escrito de outro jeito, como apelido ou sobrenome primeiro."
  },
  {
    "id": "marcar-atendimento",
    "categoria": "Agenda",
    "pergunta": "Como marco um atendimento?",
    "variacoes": [
      "agendar",
      "novo atendimento",
      "marcar horario",
      "criar agendamento",
      "botao novo",
      "agendar consulta",
      "marcar sessao"
    ],
    "resposta": "Vai na tela Agenda e toca no botão dourado Novo atendimento. Escolhe a Paciente na listinha, o Procedimento, a Data e a Hora, e toca em Salvar. O atendimento já aparece na lista do dia e o dia ganha uma bolinha no calendário."
  },
  {
    "id": "campos-atendimento",
    "categoria": "Agenda",
    "pergunta": "O que preciso preencher pra marcar?",
    "variacoes": [
      "campos do atendimento",
      "o que tem no agendamento",
      "dados do horario",
      "preencher agendamento",
      "obrigatorio na agenda"
    ],
    "resposta": "O atendimento pede Paciente, Procedimento, Data, Hora, Status, Valor, Pagamento, a caixinha Já recebi este valor e Anotações. Só Paciente, Procedimento e Data têm estrelinha, ou seja, são obrigatórios. O resto tu preenche na hora ou depois, abrindo o atendimento de novo."
  },
  {
    "id": "sem-paciente-cadastrada",
    "categoria": "Agenda",
    "pergunta": "O botão Novo atendimento está apagado e não clica",
    "variacoes": [
      "botao desativado",
      "nao consigo agendar",
      "novo atendimento nao funciona",
      "cinza e nao clica",
      "cadastra uma paciente primeiro"
    ],
    "resposta": "Isso acontece quando ainda não existe nenhuma paciente cadastrada, e o app avisa isso numa faixinha logo abaixo do título. Vai na tela Pacientes, toca em Nova paciente, cadastra pelo menos uma pessoa e volta pra Agenda. O botão volta a funcionar na hora."
  },
  {
    "id": "escolher-dia",
    "categoria": "Agenda",
    "pergunta": "Como vejo os atendimentos de um dia específico?",
    "variacoes": [
      "escolher data",
      "clicar no dia",
      "ver outro dia",
      "atendimentos de amanha",
      "dia do calendario",
      "abrir uma data"
    ],
    "resposta": "No calendário, toca no número do dia que tu quer. Ele fica com fundo dourado e a lista de cima passa a mostrar os atendimentos daquela data, com horário, nome e procedimento. Se não tiver nada, aparece o aviso de que nada está marcado nesse dia."
  },
  {
    "id": "bolinha-no-dia",
    "categoria": "Agenda",
    "pergunta": "O que é a bolinha embaixo do número no calendário?",
    "variacoes": [
      "pontinho no dia",
      "bola dourada no calendario",
      "o que significa o ponto",
      "marca no dia",
      "dia com bolinha"
    ],
    "resposta": "A bolinha dourada quer dizer que aquele dia tem pelo menos um atendimento marcado. Dias sem bolinha estão livres. Toca no dia pra ver quem é e a que horas."
  },
  {
    "id": "trocar-mes",
    "categoria": "Agenda",
    "pergunta": "Como vou pro mês seguinte no calendário?",
    "variacoes": [
      "mudar de mes",
      "mes que vem",
      "voltar um mes",
      "setas do calendario",
      "proximo mes",
      "mes passado"
    ],
    "resposta": "No alto do calendário tem uma seta de cada lado do nome do mês. A seta da direita avança um mês, a da esquerda volta um. O nome do mês e o ano ficam sempre escritos no meio, pra ti não se perder."
  },
  {
    "id": "ir-pra-hoje",
    "categoria": "Agenda",
    "pergunta": "Como volto pro dia de hoje?",
    "variacoes": [
      "voltar pra hoje",
      "me perdi no calendario",
      "ir pra hoje",
      "voltar pro mes de hoje",
      "hoje",
      "data de hoje"
    ],
    "resposta": "Toca no nome do mês, no alto do calendário, que ele pula direto pro dia de hoje. Quando tu está olhando outro mês, aparece também o link voltar pro mês de hoje logo abaixo do calendário. E se tu selecionou outro dia, o link ir pra hoje aparece no topo da lista de atendimentos."
  },
  {
    "id": "editar-atendimento",
    "categoria": "Agenda",
    "pergunta": "Como mudo um atendimento que já marquei?",
    "variacoes": [
      "editar agendamento",
      "mudar horario",
      "remarcar",
      "alterar atendimento",
      "corrigir agendamento",
      "trocar procedimento",
      "abrir o atendimento"
    ],
    "resposta": "Na lista do dia, toca em cima do nome da paciente. Abre a janela Editar atendimento com tudo preenchido: muda o que precisa e toca em Salvar. Se tu trocar a data, a lista e o calendário já pulam pro novo dia sozinhos."
  },
  {
    "id": "remarcar",
    "categoria": "Agenda",
    "pergunta": "A paciente pediu pra remarcar, o que eu faço?",
    "variacoes": [
      "remarcar horario",
      "mudar o dia dela",
      "adiar atendimento",
      "transferir de dia",
      "ela nao pode mais vir",
      "trocar data"
    ],
    "resposta": "Toca no nome dela na lista do dia pra abrir o atendimento, muda o campo Data e a Hora e toca em Salvar. Não precisa apagar e criar de novo, é o mesmo atendimento andando de lugar. O calendário já te leva pro novo dia pra tu conferir."
  },
  {
    "id": "apagar-atendimento",
    "categoria": "Agenda",
    "pergunta": "Como apago um atendimento?",
    "variacoes": [
      "excluir agendamento",
      "deletar horario",
      "tirar da agenda",
      "lixeira",
      "marquei errado",
      "remover atendimento"
    ],
    "resposta": "Na lista do dia, cada atendimento tem uma linha de botões embaixo. A lixeirinha vermelha fica na ponta direita dessa linha. Toca nela, confirma na pergunta que aparece e o atendimento some. Se a paciente só desmarcou, é melhor mudar o Status pra Cancelado, assim tu guarda o histórico."
  },
  {
    "id": "status-o-que-significa",
    "categoria": "Agenda",
    "pergunta": "O que significa cada status?",
    "variacoes": [
      "agendado concluido cancelado",
      "cores dos status",
      "o que e status",
      "etiqueta colorida",
      "significado das tags",
      "situacao do atendimento"
    ],
    "resposta": "São três. Agendado, em dourado, é o que ainda vai acontecer. Concluído, em verde, é o que já foi atendido. Cancelado, em vermelho, é o que não vai acontecer mas fica registrado. No Painel, os concluídos e cancelados de hoje aparecem apagadinhos e riscados."
  },
  {
    "id": "marcar-concluido",
    "categoria": "Agenda",
    "pergunta": "Como marco que já atendi a paciente?",
    "variacoes": [
      "marcar como feito",
      "concluir atendimento",
      "ja atendi",
      "dar baixa",
      "finalizar sessao",
      "status concluido"
    ],
    "resposta": "Toca no nome dela na lista do dia, procura o campo Status e escolhe Concluído. Aproveita e preenche o Valor e o Pagamento, e liga a caixinha Já recebi este valor se ela já acertou. Toca em Salvar: a etiqueta do atendimento fica verde e o valor entra no já recebido do mês."
  },
  {
    "id": "marcar-cancelado",
    "categoria": "Agenda",
    "pergunta": "A paciente desmarcou, como registro isso?",
    "variacoes": [
      "cancelar atendimento",
      "ela nao vem mais",
      "desmarcou",
      "faltou",
      "status cancelado",
      "nao compareceu"
    ],
    "resposta": "Toca no nome dela na lista do dia, muda o campo Status pra Cancelado e toca em Salvar. A etiqueta fica vermelha e o horário deixa de contar como conflito, ou seja, tu pode encaixar outra pessoa naquele mesmo horário. Melhor cancelar do que apagar, porque assim fica o registro de que ela desmarcou."
  },
  {
    "id": "retorno-7d",
    "categoria": "Agenda",
    "pergunta": "Pra que serve o botão Retorno 7d?",
    "variacoes": [
      "retorno 7d",
      "botao de retorno",
      "marcar semana que vem",
      "retorno em uma semana",
      "o que e 7d",
      "repetir atendimento"
    ],
    "resposta": "Ele já abre um atendimento novo pra mesma paciente exatamente uma semana depois, no mesmo horário e com o mesmo procedimento. Tu toca em Retorno 7d na linha de baixo do atendimento, confere os dados na janela que abre e toca em Salvar. Nada é marcado antes de tu tocar em Salvar."
  },
  {
    "id": "bebe-toda-semana",
    "categoria": "Agenda",
    "pergunta": "Como agendo a remodelação baby toda semana?",
    "variacoes": [
      "retorno semanal",
      "bebe volta toda semana",
      "remodelacao baby agenda",
      "acompanhamento semanal",
      "marcar varias semanas",
      "toda semana o mesmo horario"
    ],
    "resposta": "Depois de atender o bebê, toca em Retorno 7d na linha de baixo daquele atendimento e toca em Salvar: fica marcado pro mesmo dia da semana seguinte, no mesmo horário. Repete isso a cada visita e a sequência anda sozinha. Se tu quiser deixar várias semanas marcadas de uma vez, é só ir tocando em Retorno 7d a partir de cada atendimento que criar."
  },
  {
    "id": "retorno-outro-prazo",
    "categoria": "Agenda",
    "pergunta": "E se o retorno não for daqui a 7 dias?",
    "variacoes": [
      "retorno em 15 dias",
      "outro prazo",
      "mudar os dias do retorno",
      "retorno mensal",
      "nao quero uma semana",
      "30 dias"
    ],
    "resposta": "Toca em Retorno 7d assim mesmo, porque ele já traz a paciente, o procedimento e o horário prontos. Antes de salvar, muda o campo Data pra data que tu quer, seja daqui a 15 dias ou a um mês. Depois toca em Salvar."
  },
  {
    "id": "conflito-horario",
    "categoria": "Agenda",
    "pergunta": "Apareceu um aviso amarelo de outro atendimento no mesmo horário",
    "variacoes": [
      "dois no mesmo horario",
      "aviso amarelo",
      "conflito",
      "horario ocupado",
      "ja tem alguem nesse horario",
      "sobrepos"
    ],
    "resposta": "É só um lembrete de que já existe outro atendimento naquele mesmo dia e hora, já que tu atende sozinha. O app deixa salvar assim mesmo, ele não bloqueia. Se foi engano, muda a Hora antes de tocar em Salvar. Atendimentos cancelados não geram esse aviso."
  },
  {
    "id": "whatsapp-agenda",
    "categoria": "Agenda",
    "pergunta": "Como falo com a paciente direto pela agenda?",
    "variacoes": [
      "whatsapp na agenda",
      "confirmar horario",
      "mandar mensagem pelo atendimento",
      "lembrar a paciente",
      "botao whatsapp",
      "avisar que esta chegando"
    ],
    "resposta": "Na linha de botões embaixo de cada atendimento tem o botão WhatsApp, em dourado. Toca nele e o app te oferece as mensagens prontas, como confirmar o horário. Escolhe uma e o WhatsApp abre com o texto já escrito, pra tu só conferir e enviar. Esse botão só aparece se a paciente tiver telefone completo no cadastro."
  },
  {
    "id": "atendimento-sem-hora",
    "categoria": "Agenda",
    "pergunta": "Posso marcar sem hora certa?",
    "variacoes": [
      "nao sei o horario",
      "sem hora",
      "deixar horario em branco",
      "marcar so o dia",
      "hora depois",
      "tracinho no lugar da hora"
    ],
    "resposta": "Pode. Deixa o campo Hora vazio e preenche só a Data, que é obrigatória. Na lista do dia esse atendimento aparece com um tracinho no lugar do horário. Quando combinar a hora com ela, é só tocar no nome, preencher a Hora e tocar em Salvar."
  },
  {
    "id": "anotacoes-atendimento",
    "categoria": "Agenda",
    "pergunta": "Onde escrevo o que aconteceu no atendimento?",
    "variacoes": [
      "anotacao do atendimento",
      "observacao da sessao",
      "escrever sobre o dia",
      "registrar o que fiz",
      "campo de notas na agenda",
      "evolucao"
    ],
    "resposta": "Toca no nome da paciente na lista do dia e desce até o campo Anotações, no fim da janela. Escreve ali o que precisa lembrar daquele atendimento e toca em Salvar. Cada atendimento tem a sua anotação, separada das observações gerais da ficha da paciente."
  },
  {
    "id": "procedimentos",
    "categoria": "Agenda",
    "pergunta": "Quais procedimentos posso escolher?",
    "variacoes": [
      "lista de procedimentos",
      "tipos de atendimento",
      "o que tem no procedimento",
      "opcoes de servico",
      "correcao de orelha",
      "fragilizacao"
    ],
    "resposta": "São cinco opções fixas no campo Procedimento: Correção de orelha, Remodelação baby, Fragilização de cartilagem, Retorno / avaliação e Outro. Toca no campo e escolhe uma da listinha. Ela aparece embaixo do nome da paciente na lista do dia."
  },
  {
    "id": "procedimento-outro",
    "categoria": "Agenda",
    "pergunta": "E se o procedimento não estiver na lista?",
    "variacoes": [
      "nao tem esse procedimento",
      "opcao outro",
      "procedimento diferente",
      "criar procedimento",
      "faltou uma opcao",
      "mentoria na agenda"
    ],
    "resposta": "Escolhe a opção Outro no campo Procedimento e explica o que é no campo Anotações, logo abaixo. Assim o atendimento fica marcado no dia certo e tu não perde a informação. Serve bem pra coisas fora da rotina, como um encontro de mentoria."
  },
  {
    "id": "onde-fica-calendario",
    "categoria": "Agenda",
    "pergunta": "No celular o calendário aparece embaixo, está certo?",
    "variacoes": [
      "calendario embaixo",
      "ordem da tela agenda",
      "lista antes do calendario",
      "layout diferente",
      "no pc fica do lado"
    ],
    "resposta": "Está certo. No celular a lista de quem vem vem primeiro, porque é o que tu mais precisa ver correndo entre um atendimento e outro, e o calendário fica logo abaixo. No computador o calendário volta pra esquerda e a lista fica à direita. As duas telas fazem exatamente as mesmas coisas."
  },
  {
    "id": "lista-do-dia-vazia",
    "categoria": "Agenda",
    "pergunta": "Diz que não tem nada marcado nesse dia",
    "variacoes": [
      "dia vazio",
      "nada marcado",
      "lista vazia",
      "sem atendimento",
      "nao tem ninguem nesse dia",
      "agenda em branco"
    ],
    "resposta": "Quer dizer que o dia selecionado, aquele com fundo dourado no calendário, está livre. Se tu esperava alguém ali, confere se não tocou num dia vizinho ou num mês diferente, olhando o nome do mês no alto do calendário. Pra marcar alguém nesse dia, toca em Novo atendimento que a data já vem preenchida com ele."
  },
  {
    "id": "agendar-mes-que-vem",
    "categoria": "Agenda",
    "pergunta": "Como marco um atendimento pro mês que vem?",
    "variacoes": [
      "agendar longe",
      "mes seguinte",
      "marcar pra dezembro",
      "data futura",
      "agendar com antecedencia",
      "proximo mes"
    ],
    "resposta": "Toca em Novo atendimento e, no campo Data, escolhe a data lá na frente pelo calendarinho do celular, sem precisar navegar antes. Preenche o resto e toca em Salvar. Depois de salvar, o calendário do app pula sozinho pro mês daquele atendimento, pra tu ver que ficou registrado."
  },
  {
    "id": "valor-do-atendimento",
    "categoria": "Agenda",
    "pergunta": "Onde coloco quanto a paciente pagou?",
    "variacoes": [
      "valor",
      "quanto ela pagou",
      "preco do atendimento",
      "registrar valor",
      "colocar o dinheiro",
      "cobrar"
    ],
    "resposta": "Toca no nome da paciente na lista do dia e preenche o campo Valor com o que foi combinado, depois toca em Salvar. Esse número é o que alimenta os dois totais do Painel, já recebido e ainda a receber. Se ela ainda não pagou, preenche o valor mesmo assim e deixa a caixinha Já recebi este valor desligada."
  },
  {
    "id": "forma-de-pagamento",
    "categoria": "Agenda",
    "pergunta": "Como registro se foi Pix ou cartão?",
    "variacoes": [
      "forma de pagamento",
      "pix",
      "dinheiro",
      "cartao",
      "como ela pagou",
      "meio de pagamento",
      "transferencia"
    ],
    "resposta": "No mesmo atendimento tem o campo Pagamento. Toca nele e escolhe entre Pix, Dinheiro, Cartão e Transferência, depois toca em Salvar. Enquanto tu não escolher, ele fica em não definido. Assim tu sabe depois por onde o dinheiro entrou."
  },
  {
    "id": "marcar-pago",
    "categoria": "Agenda",
    "pergunta": "Como marco que a paciente já pagou?",
    "variacoes": [
      "marcar pago",
      "quitado",
      "ela pagou",
      "dar baixa no pagamento",
      "a receber",
      "ainda nao pagou",
      "pendente"
    ],
    "resposta": "Abre o atendimento tocando no nome dela na lista do dia e liga a caixinha Já recebi este valor, logo abaixo do campo Pagamento. Toca em Salvar. Enquanto ela ficar desligada, esse valor conta no ainda a receber do Painel. Assim que tu ligar, ele passa pro já recebido do mês."
  },
  {
    "id": "quanto-entrou-no-mes",
    "categoria": "Agenda",
    "pergunta": "Como vejo quanto entrou no mês?",
    "variacoes": [
      "faturamento do mes",
      "quanto ganhei",
      "total do mes",
      "quanto tenho a receber",
      "dinheiro do mes",
      "fechamento",
      "quanto entrou"
    ],
    "resposta": "Abre o Painel e desce até o bloco de dinheiro, que vem com o nome do mês, tipo Dinheiro de agosto. Ele traz dois números: já recebido e ainda a receber. Os dois vêm do campo Valor de cada atendimento daquele mês, e a diferença entre eles é quem ainda está sem a caixinha Já recebi este valor ligada. Se um valor não estiver batendo, abre o atendimento na Agenda e confere o Valor e essa caixinha."
  },
  {
    "id": "atendimento-nao-aparece",
    "categoria": "Agenda",
    "pergunta": "Marquei um atendimento e ele não aparece",
    "variacoes": [
      "sumiu o agendamento",
      "nao ta na lista",
      "cade o atendimento",
      "nao salvou o horario",
      "perdi o agendamento",
      "nao aparece na agenda"
    ],
    "resposta": "Quase sempre é o calendário mostrando outro dia ou outro mês. Confere o nome do mês no alto do calendário e toca no dia certo, que a lista de cima muda junto. Se tu não lembra a data, abre a ficha da paciente na tela Pacientes: lá aparecem todos os atendimentos dela com as datas."
  },
  {
    "id": "atendimentos-de-uma-paciente",
    "categoria": "Agenda",
    "pergunta": "Como vejo tudo que já marquei pra uma paciente só?",
    "variacoes": [
      "historico dela na agenda",
      "todos os atendimentos de uma pessoa",
      "quantas vezes ela veio",
      "ver as sessoes dela",
      "agenda de uma paciente"
    ],
    "resposta": "Isso fica na ficha dela, não no calendário. Vai na tela Pacientes, acha ela pela barra Buscar por nome ou telefone e toca no nome dentro do card. Dentro da ficha aparece a lista de todos os atendimentos, com data, procedimento e situação, e o total de sessões registradas."
  },
  {
    "id": "proximos-atendimentos",
    "categoria": "Agenda",
    "pergunta": "Como vejo os próximos atendimentos sem abrir o calendário?",
    "variacoes": [
      "proximos agendamentos",
      "o que vem por ai",
      "proximos dias",
      "semana que vem",
      "lista dos proximos",
      "o que tenho marcado"
    ],
    "resposta": "Abre o Painel: o cartão Próximos atendimentos mostra os cinco agendamentos mais próximos, com a data na frente do nome. Ali só entram os que estão com status Agendado, ou seja, concluídos e cancelados não aparecem. Tocando em ver tudo, tu cai na Agenda completa."
  },
  {
    "id": "lancar-valor",
    "categoria": "Dinheiro",
    "pergunta": "Como eu coloco quanto a paciente pagou?",
    "variacoes": [
      "onde coloco o valor",
      "lançar preço da sessão",
      "quanto ela pagou",
      "colocar valor do atendimento",
      "valor",
      "preço",
      "botar o dinheiro que recebi",
      "cadastrar valor"
    ],
    "resposta": "Abre a Agenda, toca no dia e toca no atendimento dela. No campo Valor escreve só o número, por exemplo 350. Depois toca em Salvar. Cada atendimento tem o seu valor, então uma paciente que faz várias sessões tem um valor em cada uma."
  },
  {
    "id": "formas-pagamento",
    "categoria": "Dinheiro",
    "pergunta": "Como digo que foi no Pix ou no cartão?",
    "variacoes": [
      "pix",
      "cartão",
      "dinheiro",
      "forma de pagamento",
      "como ela pagou",
      "pagou no pix",
      "transferencia",
      "mudar forma de pagamento"
    ],
    "resposta": "No mesmo atendimento tem o campo Pagamento. Toca nele e escolhe Pix, Dinheiro, Cartão ou Transferência. Toca em Salvar. Se ela pagou uma parte agora e vai pagar o resto depois, coloca a forma do que já entrou e escreve o combinado em Anotações."
  },
  {
    "id": "quanto-entrou-mes",
    "categoria": "Dinheiro",
    "pergunta": "Quanto eu recebi esse mês?",
    "variacoes": [
      "quanto ganhei",
      "faturamento do mês",
      "quanto entrou",
      "total do mês",
      "quanto recebi",
      "fechamento do mês",
      "quanto faturei",
      "grana do mês"
    ],
    "resposta": "Abre o Painel, que é a primeira tela do app. Desce até o bloco de dinheiro, que vem com o nome do mês, tipo Dinheiro de agosto. O primeiro número, o verde, é o já recebido: soma todos os atendimentos daquele mês que estão com a caixinha Já recebi este valor ligada. Ele se atualiza sozinho toda vez que tu salva um pagamento."
  },
  {
    "id": "a-receber",
    "categoria": "Dinheiro",
    "pergunta": "Como vejo quem ainda não me pagou?",
    "variacoes": [
      "quem me deve",
      "a receber",
      "pendente",
      "não pagou ainda",
      "está devendo",
      "falta pagar",
      "em aberto",
      "cobrar paciente"
    ],
    "resposta": "No bloco de dinheiro do Painel, o número amarelo é o ainda a receber. Ele é a soma dos atendimentos do mês que têm Valor preenchido e ainda estão sem a caixinha Já recebi este valor. Ali é só o total, não tem lista de nomes: pra saber quem é, abre a Agenda e procura os atendimentos com a etiqueta amarela escrita a receber. Tocando no atendimento tu liga a caixinha quando o dinheiro entrar."
  },
  {
    "id": "nao-entrou-no-mes",
    "categoria": "Dinheiro",
    "pergunta": "Fiz o atendimento mas o valor não apareceu no mês",
    "variacoes": [
      "não somou",
      "valor não entrou",
      "faltou dinheiro na conta do mês",
      "a conta está errada",
      "não aparece no recebido",
      "sumiu do total",
      "o painel não bate"
    ],
    "resposta": "Abre esse atendimento e confere quatro coisas. Primeira: o campo Valor precisa estar preenchido, atendimento sem valor não soma. Segunda: a caixinha Já recebi este valor precisa estar ligada, senão ele fica no ainda a receber. Terceira: a data tem que ser do mês que está correndo, porque o Painel mostra sempre o mês de agora. Quarta: o status não pode ser Cancelado, cancelado nunca entra na conta."
  },
  {
    "id": "corrigir-valor",
    "categoria": "Dinheiro",
    "pergunta": "Coloquei o valor errado, dá pra arrumar?",
    "variacoes": [
      "mudar o valor",
      "corrigir preço",
      "digitei errado o valor",
      "editar valor",
      "valor errado",
      "trocar o valor depois",
      "desmarcar pago"
    ],
    "resposta": "Dá sim, e pode fazer quantas vezes precisar. Abre o atendimento na Agenda, apaga o que está no campo Valor, escreve o certo e toca em Salvar. Se tu ligou a caixinha Já recebi este valor sem querer, é só desligar e salvar de novo. O Painel se acerta na hora."
  },
  {
    "id": "valor-mentoria",
    "categoria": "Dinheiro",
    "pergunta": "Como lanço o valor de uma mentoria?",
    "variacoes": [
      "cobrar mentoria",
      "mentoria dinheiro",
      "aluna pagou",
      "valor de curso",
      "lançar mentoria",
      "recebi de aluna",
      "mentoria não é atendimento"
    ],
    "resposta": "Funciona igual a um atendimento. Na Agenda toca em Novo atendimento, escolhe a pessoa, marca o procedimento Outro e escreve mentoria em Anotações. Preenche Valor e Pagamento e liga a caixinha Já recebi este valor quando ela pagar. Assim a mentoria entra no já recebido do mês junto com o resto."
  },
  {
    "id": "abrir-conversa",
    "categoria": "WhatsApp",
    "pergunta": "Como falo com a paciente pelo app?",
    "variacoes": [
      "abrir whatsapp",
      "mandar mensagem",
      "falar com a paciente",
      "chamar no zap",
      "conversar",
      "botão do whatsapp",
      "onde clica pra mandar mensagem"
    ],
    "resposta": "No quadro Pacientes, toca no telefone dela, que aparece em dourado no card. Na Agenda dá também: toca em WhatsApp dentro do atendimento do dia. A conversa abre direto no WhatsApp, mesmo que o número não esteja salvo nos contatos do teu celular."
  },
  {
    "id": "editar-mensagem-antes",
    "categoria": "WhatsApp",
    "pergunta": "Dá pra mudar o texto antes de mandar?",
    "variacoes": [
      "editar a mensagem",
      "mudar o texto",
      "personalizar mensagem",
      "acrescentar no texto",
      "apagar parte da mensagem",
      "o app manda sozinho?",
      "envia automático"
    ],
    "resposta": "Dá. O texto chega na caixa de digitação do WhatsApp, então dá pra trocar o nome, apagar ou acrescentar o que quiseres antes de enviar. O app nunca envia nada sozinho, quem toca em enviar és tu."
  },
  {
    "id": "numero-nao-abre",
    "categoria": "WhatsApp",
    "pergunta": "Toco no telefone e o WhatsApp não abre",
    "variacoes": [
      "whatsapp não abre",
      "número não clica",
      "telefone cinza",
      "não vai pro whatsapp",
      "ddd",
      "número errado",
      "não tem whatsapp",
      "o telefone não é link"
    ],
    "resposta": "Se o telefone aparece cinza em vez de dourado, é porque falta número, quase sempre o DDD. Abre a ficha da paciente, arruma o campo WhatsApp no formato 48 99999-9999 e toca em Salvar. Se estiver com DDD certo e mesmo assim o WhatsApp reclamar, é porque aquele número não tem conta no WhatsApp, aí confere com ela na conversa antiga."
  },
  {
    "id": "lembrete-confirmacao",
    "categoria": "WhatsApp",
    "pergunta": "Como mando confirmar o horário de amanhã?",
    "variacoes": [
      "confirmar atendimento",
      "lembrete",
      "confirmação de horário",
      "avisar paciente",
      "mandar lembrete de amanhã",
      "confirmar consulta",
      "ela vem amanhã?",
      "lembrar do horário"
    ],
    "resposta": "Abre a Agenda e toca no dia de amanhã no calendário. Em cada atendimento da lista, toca em WhatsApp e escolhe a mensagem de confirmação de horário. O texto já vem com o combinado, tu só confere e envia. Costuma dar mais retorno quando mandas no fim da tarde do dia anterior."
  },
  {
    "id": "mensagem-quem-sumiu",
    "categoria": "WhatsApp",
    "pergunta": "Como chamo de volta quem sumiu?",
    "variacoes": [
      "quem sumiu",
      "paciente sumida",
      "chamar de volta",
      "retorno atrasado",
      "cutucar paciente",
      "não voltou mais",
      "recuperar paciente",
      "lista de quem não voltou"
    ],
    "resposta": "No Painel tem o bloco Precisam de um retorno, com quem já passou da data de Falar de novo em e não voltou. Toca no botão falar, na ponta direita da linha dela, que abre o WhatsApp com as mensagens prontas. Depois de falar com ela, abre a ficha na tela Pacientes e coloca uma data nova em Falar de novo em, senão ela continua nessa lista."
  },
  {
    "id": "whatsapp-computador",
    "categoria": "WhatsApp",
    "pergunta": "No computador o WhatsApp abre também?",
    "variacoes": [
      "whatsapp web",
      "no notebook",
      "pelo computador",
      "abre no pc",
      "não abre no computador",
      "qr code",
      "tela do computador"
    ],
    "resposta": "Abre. No computador, tocar no telefone leva pro WhatsApp Web numa aba nova. Só precisa estar com o WhatsApp Web já conectado ao teu celular, senão ele vai pedir pra ler aquele quadradinho com a câmera do telefone."
  },
  {
    "id": "instalar-android",
    "categoria": "Celular",
    "pergunta": "Como coloco o app na tela do meu celular Android?",
    "variacoes": [
      "instalar no android",
      "atalho na tela",
      "colocar na tela inicial",
      "virar aplicativo",
      "baixar o app",
      "play store",
      "instalar",
      "ícone no celular"
    ],
    "resposta": "Abre o CRM no Chrome e toca em Instalar na tela de início. O celular pergunta se tu quer instalar, é só confirmar. Se esse botão não aparecer, toca nos três pontinhos do canto de cima do Chrome e escolhe Adicionar à tela inicial. O ícone fica junto dos teus outros aplicativos e abre em tela cheia, sem a barra de endereço atrapalhando."
  },
  {
    "id": "instalar-iphone",
    "categoria": "Celular",
    "pergunta": "E no iPhone, como instala?",
    "variacoes": [
      "iphone",
      "ios",
      "safari",
      "adicionar à tela de início",
      "instalar no iphone",
      "app store",
      "atalho iphone",
      "não acho o botão instalar"
    ],
    "resposta": "No iPhone tem que ser pelo Safari, no Chrome não funciona. Com o CRM aberto, toca no quadradinho com a seta pra cima na barra de baixo, rola a lista e escolhe Adicionar à Tela de Início, depois toca em Adicionar. O ícone aparece na tela junto dos outros aplicativos e abre igual a um app normal."
  },
  {
    "id": "busca-tela-cheia",
    "categoria": "Celular",
    "pergunta": "Como acho uma paciente rápido no celular?",
    "variacoes": [
      "buscar",
      "lupa",
      "procurar paciente",
      "achar paciente",
      "pesquisa",
      "não acho a paciente",
      "buscar por telefone",
      "busca no celular"
    ],
    "resposta": "Toca na lupa lá em cima, do lado direito. A busca abre em tela cheia e o teclado já sobe sozinho. Escreve pelo menos duas letras do nome ou parte do telefone e toca no resultado, que já te leva pro quadro filtrado nela. Pra fechar sem escolher ninguém, toca no X."
  },
  {
    "id": "app-travado",
    "categoria": "Celular",
    "pergunta": "O app travou, e agora?",
    "variacoes": [
      "travou",
      "não carrega",
      "fica girando",
      "tela branca",
      "não abre",
      "parou",
      "bugou",
      "emperrado"
    ],
    "resposta": "Primeiro fecha e abre de novo, isso resolve quase sempre. Se continuar naquela bolinha girando, confere a internet do celular, porque o app busca tudo na hora. Se ainda assim não voltar, fecha o app pela lista de aplicativos abertos e abre outra vez. Nada do que já foi salvo se perde nisso."
  },
  {
    "id": "esqueci-senha",
    "categoria": "Problemas",
    "pergunta": "Esqueci minha senha",
    "variacoes": [
      "esqueci a senha",
      "perdi a senha",
      "recuperar senha",
      "trocar senha",
      "não lembro a senha",
      "senha nova",
      "redefinir senha",
      "como recupero o acesso"
    ],
    "resposta": "Antes de tudo, toca no olho do lado do campo de senha pra ver o que estás digitando, muitas vezes é só uma letra trocada. A tela de entrar não tem recuperação automática de senha hoje. Se esqueceste mesmo, chama quem montou o app pra ti e peça uma senha nova. Teus dados continuam todos lá, isso não apaga nada."
  },
  {
    "id": "email-ou-senha-incorretos",
    "categoria": "Problemas",
    "pergunta": "Aparece E-mail ou senha incorretos",
    "variacoes": [
      "não consigo entrar",
      "erro no login",
      "senha errada",
      "não entra",
      "login não funciona",
      "e-mail ou senha incorretos",
      "acesso negado",
      "fica dando erro pra entrar"
    ],
    "resposta": "Essa mensagem diz que uma das duas coisas não bate. Confere se o e-mail está inteiro e sem espaço sobrando no fim, e toca no olho pra enxergar a senha digitada. O corretor do celular às vezes deixa a primeira letra do e-mail maiúscula, e isso já derruba a entrada. Não toques em Criar conta pra tentar resolver, isso faz uma conta nova e vazia, sem as tuas pacientes."
  },
  {
    "id": "salvei-nao-apareceu",
    "categoria": "Problemas",
    "pergunta": "Salvei e não apareceu nada",
    "variacoes": [
      "salvei e sumiu",
      "não salvou",
      "cadastrei e não aparece",
      "não apareceu",
      "sumiu depois de salvar",
      "salvar não funciona",
      "onde foi parar",
      "não gravou"
    ],
    "resposta": "Primeiro olha se apareceu algum aviso vermelho dizendo Não deu pra salvar, porque nesse caso a internet caiu no meio e basta tocar em Salvar de novo. Se salvou mesmo, o mais comum é a busca estar preenchida e escondendo o card, então toca no X do campo de busca. Se foi um atendimento, confere o mês aberto no topo do calendário, ele pode ter caído em outra data."
  },
  {
    "id": "nao-deu-pra-salvar",
    "categoria": "Problemas",
    "pergunta": "Aparece Não deu pra salvar, confere a internet",
    "variacoes": [
      "erro ao salvar",
      "internet caiu",
      "não deu pra salvar",
      "sem sinal",
      "perdi o que digitei",
      "deu erro vermelho",
      "não conectou"
    ],
    "resposta": "É a internet do celular oscilando, e nada do que digitaste se perdeu. A janela continua aberta com tudo preenchido, então espera o sinal voltar e toca em Salvar outra vez. Não fecha a janela antes disso, senão vais ter que digitar tudo de novo."
  },
  {
    "id": "apaguei-sem-querer",
    "categoria": "Problemas",
    "pergunta": "Apaguei sem querer, como volto?",
    "variacoes": [
      "apaguei",
      "excluí sem querer",
      "desfazer",
      "voltar o que apaguei",
      "recuperar paciente apagada",
      "lixeira",
      "errei e apaguei",
      "tem como recuperar"
    ],
    "resposta": "Não tem desfazer, o que foi apagado não volta. Se era uma paciente, cadastra de novo em Nova paciente com nome e telefone, mas os atendimentos antigos dela não voltam junto. Se foi só um atendimento, marca outra vez em Novo atendimento na data certa. Por isso o app sempre pergunta antes: quando aparecer a pergunta, lê o nome com calma antes de confirmar."
  },
  {
    "id": "paciente-sumiu",
    "categoria": "Problemas",
    "pergunta": "A paciente sumiu do quadro",
    "variacoes": [
      "sumiu a paciente",
      "não acho a paciente",
      "paciente desapareceu",
      "cadê a paciente",
      "card sumiu",
      "coluna vazia",
      "não aparece no quadro",
      "perdi um contato"
    ],
    "resposta": "Quase sempre ela está lá, só não onde estás olhando. Primeiro toca no X do campo de busca, porque com texto digitado cada coluna mostra só quem combina. Depois arrasta o quadro pro lado e olha as outras colunas, ela pode ter mudado de lugar num arrasto sem querer. Se ainda assim não achares, usa a lupa lá em cima e escreve o nome dela."
  },
  {
    "id": "nao-consigo-apagar-coluna",
    "categoria": "Problemas",
    "pergunta": "Não consigo apagar uma coluna",
    "variacoes": [
      "não apaga a coluna",
      "apagar coluna",
      "excluir etapa",
      "essa coluna tem pacientes",
      "tirar coluna",
      "coluna não some",
      "deletar coluna",
      "aviso da coluna"
    ],
    "resposta": "A coluna só é apagada quando está vazia, isso é uma proteção pra nenhuma paciente sumir junto. O aviso te diz quantas pacientes ainda estão dentro dela. Arrasta cada card pela alcinha da esquerda pra outra coluna. Com a coluna zerada, toca no lápis dela e depois em Apagar coluna."
  },
  {
    "id": "app-lento-muitos-contatos",
    "categoria": "Problemas",
    "pergunta": "O app está lento com tanto contato",
    "variacoes": [
      "app lento",
      "demora pra carregar",
      "travando com muitos contatos",
      "arrastar está lento",
      "muito contato",
      "pesado",
      "demora abrir pacientes",
      "317 contatos"
    ],
    "resposta": "Com centenas de contatos numa coluna só, a rolagem fica pesada mesmo. Em vez de rolar procurando com o olho, usa a lupa lá em cima, ela acha na hora. Vale também espalhar os contatos em colunas menores, como Lead e Curiosa, em vez de deixar tudo numa pilha só. Se o app já está aberto há muito tempo, fecha e abre de novo pra aliviar."
  },
  {
    "id": "atendimento-sumiu-agenda",
    "categoria": "Problemas",
    "pergunta": "Marquei um atendimento e ele não está na agenda",
    "variacoes": [
      "atendimento sumiu",
      "não achei o agendamento",
      "cadê o atendimento",
      "calendário vazio",
      "não aparece na agenda",
      "mês errado",
      "perdi o agendamento"
    ],
    "resposta": "Olha o mês que está aberto no topo do calendário, o atendimento pode estar no mês seguinte. Toca no nome do mês pra voltar direto pra hoje. Os dias que têm bolinha embaixo do número são os dias com atendimento marcado, então toca no dia com bolinha pra ver a lista."
  },
  {
    "id": "aviso-mesmo-horario",
    "categoria": "Problemas",
    "pergunta": "Apareceu que já tem outro atendimento nesse horário",
    "variacoes": [
      "conflito de horário",
      "dois no mesmo horário",
      "aviso amarelo",
      "horário ocupado",
      "não deixa salvar?",
      "já tem atendimento nessa hora",
      "sobrepôs"
    ],
    "resposta": "É só um aviso, não é erro, e ele não te impede de salvar. Aparece porque já existe outro atendimento não cancelado naquela hora e tu atendes sozinha. Se foi engano, muda a hora e salva. Se foi de propósito, toca em Salvar assim mesmo."
  },
  {
    "id": "ja-voltou-mas-esta-em-atraso",
    "categoria": "Problemas",
    "pergunta": "Ela já voltou mas continua na lista de quem sumiu",
    "variacoes": [
      "retorno atrasado errado",
      "já atendi e continua na lista",
      "tirar da lista de atrasados",
      "próximo contato",
      "não deveria estar aí",
      "sumiu mas voltou",
      "lista errada"
    ],
    "resposta": "Esse bloco olha só a data de Falar de novo em na ficha da paciente, ele não sabe se ela já veio. Abre a ficha dela tocando no nome do card e coloca a data do próximo contato combinado, ou apaga a data se não for mais preciso acompanhar. Toca em Salvar e ela sai do bloco Precisam de um retorno."
  },
  {
    "id": "icones-do-card",
    "categoria": "Pacientes",
    "pergunta": "O que significam os ícones pequenos no card da paciente?",
    "variacoes": [
      "icones do card",
      "o que e esse desenho no card",
      "bolo no card",
      "broto no card",
      "reloginho no card",
      "falar hoje em amarelo",
      "simbolos embaixo do nome",
      "o que aparece no cartao"
    ],
    "resposta": "Embaixo do nome aparece só o que tu já preencheu. O fone é o WhatsApp dela, o bolinho é o nascimento, o brotinho é de onde ela veio e o reloginho é a data que tu marcou em Falar de novo em. Quando essa data chega ou já passou, no lugar dela aparece falar hoje escrito em amarelo, pra tu não deixar passar."
  },
  {
    "id": "ordem-dos-nomes",
    "categoria": "Pacientes",
    "pergunta": "Em que ordem os nomes aparecem dentro da coluna?",
    "variacoes": [
      "ordem dos cards",
      "ordem alfabetica",
      "por que essa ordem",
      "ordenar por nome",
      "nome fora de ordem",
      "como o quadro organiza",
      "quem aparece primeiro",
      "subir o card"
    ],
    "resposta": "Sempre por ordem alfabética do nome, de A a Z, em todas as colunas. Não dá pra mudar essa ordem nem arrastar um card pra cima ou pra baixo dentro da mesma coluna, o arrasto serve só pra trocar de coluna. Por isso vale cadastrar sempre pelo primeiro nome, senão a pessoa vai parar na letra do apelido."
  },
  {
    "id": "sem-coluna-nenhuma",
    "categoria": "Pacientes",
    "pergunta": "O botão Nova paciente está apagado na tela Pacientes",
    "variacoes": [
      "nova paciente nao clica",
      "botao desativado em pacientes",
      "nenhuma coluna ainda",
      "nao consigo cadastrar paciente",
      "quadro vazio",
      "cria a primeira coluna",
      "sem coluna"
    ],
    "resposta": "Isso quer dizer que não existe nenhuma coluna no quadro, e toda paciente precisa ficar dentro de uma. No meio da tela aparece o aviso Nenhuma coluna ainda. Toca no botão Coluna, dá um nome pra ela e toca em Salvar, que o Nova paciente volta a funcionar na hora."
  },
  {
    "id": "paciente-caiu-na-primeira-coluna",
    "categoria": "Problemas",
    "pergunta": "Cadastrei uma paciente e ela foi parar na coluna errada",
    "variacoes": [
      "foi pra interessados sozinha",
      "coluna errada",
      "nao escolhi a coluna",
      "caiu na primeira coluna",
      "etapa errada",
      "salvou na lista errada",
      "nao era pra estar ai"
    ],
    "resposta": "Quando tu abre o Nova paciente, o campo Etapa já vem preenchido com a primeira coluna do quadro. Se tu não trocar antes de salvar, ela cai lá mesmo. Pra arrumar, toca no nome dentro do card, troca o campo Etapa e toca em Salvar, ou arrasta o card pela alcinha até a coluna certa."
  },
  {
    "id": "etiqueta-valor-agenda",
    "categoria": "Agenda",
    "pergunta": "O que são aquelas etiquetas coloridas no atendimento?",
    "variacoes": [
      "etiqueta verde",
      "etiqueta amarela",
      "recebido a receber no atendimento",
      "tag colorida",
      "o que e esse valor na lista do dia",
      "cores do atendimento",
      "bolinha escrita recebido"
    ],
    "resposta": "Cada atendimento da lista do dia mostra uma etiqueta com o status e, quando tu preencheu o Valor, outra com o dinheiro. Verde escrito recebido quer dizer que a caixinha Já recebi este valor está ligada. Amarelo escrito a receber quer dizer que o valor está lançado mas ainda não entrou. Se não tem etiqueta de dinheiro nenhuma, é porque aquele atendimento está sem valor."
  },
  {
    "id": "trocar-paciente-do-atendimento",
    "categoria": "Agenda",
    "pergunta": "Marquei o atendimento no nome da paciente errada",
    "variacoes": [
      "troquei as pacientes",
      "nome errado no agendamento",
      "mudar a paciente do atendimento",
      "marquei pra pessoa errada",
      "trocar paciente",
      "corrigir quem e a paciente",
      "atendimento na ficha errada"
    ],
    "resposta": "Não precisa apagar e marcar de novo. Toca no nome dela na lista do dia, abre o campo Paciente lá no alto da janela, escolhe a pessoa certa e toca em Salvar. O atendimento sai do histórico de uma e entra no da outra na hora."
  },
  {
    "id": "valor-com-centavos",
    "categoria": "Dinheiro",
    "pergunta": "Como coloco um valor com centavos?",
    "variacoes": [
      "centavos",
      "virgula no valor",
      "350 50",
      "valor quebrado",
      "nao aceita virgula",
      "valor com decimal",
      "meio real",
      "ponto ou virgula"
    ],
    "resposta": "O campo Valor aceita centavos, mas ele entende ponto no lugar da vírgula. Escreve 350.50 em vez de 350,50. Se tu salvar e o valor voltar vazio ou diferente do que digitou, foi a vírgula: abre o atendimento de novo e escreve com ponto."
  },
  {
    "id": "mes-passado",
    "categoria": "Dinheiro",
    "pergunta": "Como vejo quanto entrou no mês passado?",
    "variacoes": [
      "mes anterior",
      "fechamento do mes passado",
      "historico de faturamento",
      "quanto fiz em julho",
      "meses anteriores",
      "relatorio do mes",
      "comparar meses",
      "total do ano"
    ],
    "resposta": "O bloco de dinheiro do Painel mostra só o mês que está correndo, e ele vira sozinho quando o mês muda. Pra ver um mês que já passou, abre a Agenda, volta com a seta da esquerda até aquele mês e olha os dias com bolinha, atendimento por atendimento. O app ainda não junta esse total sozinho."
  },
  {
    "id": "valor-por-sessao-na-ficha",
    "categoria": "Dinheiro",
    "pergunta": "Como vejo quanto cada sessão da paciente custou?",
    "variacoes": [
      "valor das sessoes dela",
      "quanto ela ja pagou",
      "historico de valores",
      "preco de cada atendimento dela",
      "ver valores na ficha",
      "quanto essa paciente rendeu",
      "sessoes e valores"
    ],
    "resposta": "Toca no nome dentro do card pra abrir a ficha dela. Na lista de sessões, cada linha mostra a data, o procedimento, o valor quando tu preencheu e a situação escrita do lado: marcado, feito ou cancelado. As mais novas ficam em cima. O app não soma esse total, mas dá pra conferir sessão por sessão ali mesmo."
  },
  {
    "id": "atalhos-do-painel",
    "categoria": "Primeiros passos",
    "pergunta": "Dá pra ir do Painel direto pra outra tela?",
    "variacoes": [
      "ver tudo",
      "ver kanban",
      "atalho do painel",
      "links do painel",
      "como saio do painel",
      "tocar no bloco do painel",
      "ver pacientes"
    ],
    "resposta": "Dá, os blocos do Painel são atalhos. Em Hoje na agenda e em Próximos atendimentos, o ver tudo te leva pra Agenda. No Pipeline de pacientes, o ver kanban e os próprios quadradinhos com os números te levam pro quadro de Pacientes, e lá no fim da tela o ver pacientes faz a mesma coisa."
  },
  {
    "id": "numeros-do-fim-do-painel",
    "categoria": "Primeiros passos",
    "pergunta": "O que são os três números lá no fim do Painel?",
    "variacoes": [
      "quadradinhos de numero",
      "pacientes atendimentos hoje",
      "proximos agendados",
      "numeros do painel",
      "bloco dourado",
      "contadores do painel",
      "o que significa esse numero grande"
    ],
    "resposta": "São contadores. Pacientes é quanta gente tu tem cadastrada no total. Atendimentos hoje é quantos estão marcados pra hoje, contando também os concluídos e os cancelados. E o bloco dourado, Próximos agendados, é quantos atendimentos futuros ainda estão como Agendado, no máximo cinco, que são os mesmos nomes da lista Próximos atendimentos."
  },
  {
    "id": "qual-conta-estou-usando",
    "categoria": "Primeiros passos",
    "pergunta": "Como sei com qual e-mail eu entrei?",
    "variacoes": [
      "qual conta estou usando",
      "meu email no app",
      "conferir login",
      "de quem e essa conta",
      "email da conta",
      "dados da minha conta",
      "estou na conta certa"
    ],
    "resposta": "Desce até o fim do Painel. No último bloco aparece Julisbel Kurtz e, logo abaixo, o e-mail com que tu entrou. Serve pra conferir quando bater a dúvida de estar na conta certa, principalmente se tu abriu o app no computador de outra pessoa."
  },
  {
    "id": "busca-mostra-poucos-nomes",
    "categoria": "Problemas",
    "pergunta": "A lupa não mostra todas as pacientes que eu procuro",
    "variacoes": [
      "busca incompleta",
      "so aparecem alguns nomes",
      "faltou gente na busca",
      "lupa mostra pouco",
      "varias marias",
      "resultado cortado",
      "nao aparece todo mundo na busca"
    ],
    "resposta": "A busca da lupa mostra no máximo oito nomes de cada vez, pra caber na tela. Se tu tem muita gente com nome parecido, escreve mais letras ou o sobrenome que a lista afina. Quando quiser ver todo mundo que combina, usa a barra Buscar por nome ou telefone dentro da tela Pacientes, porque essa não corta nenhum nome."
  },
  {
    "id": "bloco-sumiu-do-painel",
    "categoria": "Problemas",
    "pergunta": "Um bloco que eu via no Painel não aparece mais",
    "variacoes": [
      "sumiu o bloco de retorno",
      "nao vejo de onde elas vem",
      "painel mudou",
      "bloco desapareceu",
      "precisam de um retorno sumiu",
      "faltando um quadro no painel",
      "o painel ficou menor"
    ],
    "resposta": "Dois blocos do Painel só aparecem quando têm o que mostrar. Precisam de um retorno some quando ninguém está com a data de Falar de novo em vencida, ou seja, é sinal de que está tudo em dia. De onde elas vêm só aparece depois que pelo menos uma paciente tem o campo Veio de onde preenchido. Não é erro, os dois voltam sozinhos."
  }
]

export const SUGESTOES = [
  "Como cadastro uma paciente nova?",
  "Como acho uma paciente no meio de tantas?",
  "Como marco um atendimento?",
  "Como eu coloco quanto a paciente pagou?",
  "Como falo com a paciente pelo app?",
  "Como coloco o app na tela do meu celular Android?"
]

export const TUTORIAL = [
  {
    "titulo": "Esse é o seu app",
    "texto": "Aqui embaixo tem três botões: Painel, Pacientes e Agenda. Painel é o resumo do seu dia, Pacientes é o quadro com todo mundo, Agenda é onde você marca os horários. Esse passo a passo você pode rever quando quiser.",
    "tela": "geral",
    "dica": "Se esquecer alguma coisa depois, toca no botão Ajuda e escreve sua dúvida em vez de procurar pelo app."
  },
  {
    "titulo": "Chegou mensagem, cadastra na hora",
    "texto": "Toca em Pacientes lá embaixo e depois em Nova paciente. Preenche o Nome e o WhatsApp, que é o que importa nessa hora. O resto você completa depois, com calma.",
    "tela": "pacientes",
    "dica": "Escreve o telefone com DDD, assim o número vira link e abre o WhatsApp dela com um toque."
  },
  {
    "titulo": "De onde ela veio e em que coluna",
    "texto": "Ainda na mesma tela, em Origem do contato você escolhe Instagram, Indicação, Anúncio, Site, Google ou Outro. Em Etapa você diz em que coluna ela entra, normalmente Interessados. Toca em Salvar.",
    "tela": "pacientes",
    "dica": "Preencher a origem leva dois segundos e é o que faz o Painel te mostrar depois de onde vêm as suas pacientes."
  },
  {
    "titulo": "Arrasta pela alcinha do card",
    "texto": "Quando ela fechar o tratamento, o card precisa mudar de coluna. Segura a alcinha do lado esquerdo do card, aquela com os pontinhos, e arrasta pra coluna certa, por exemplo Oto ou Baby em tratamento. O quadro anda sozinho quando você chega na beirada.",
    "tela": "pacientes",
    "dica": "Pra achar alguém no meio dos contatos, usa a lupa lá em cima ou o campo Buscar por nome ou telefone."
  },
  {
    "titulo": "Marca o atendimento na Agenda",
    "texto": "Toca em Agenda e depois em Novo atendimento. Escolhe a Paciente, o Procedimento, a Data e a Hora, e toca em Salvar. Se já tiver alguém nesse mesmo horário, aparece um aviso antes de você salvar.",
    "tela": "agenda",
    "dica": "Toca primeiro no dia no calendário: o campo Data já vem preenchido com ele."
  },
  {
    "titulo": "Confirma pelo WhatsApp",
    "texto": "Na lista do dia, cada atendimento tem o botão WhatsApp. Ao tocar, aparecem as mensagens prontas de confirmação e lembrete: escolhe uma e o WhatsApp abre com o texto já escrito, com o nome dela e o horário.",
    "tela": "agenda",
    "dica": "Se quiser mudar alguma palavra, dá pra editar o texto dentro do WhatsApp antes de enviar."
  },
  {
    "titulo": "Terminou: conclui e anota o valor",
    "texto": "Depois do atendimento, toca em cima dele na lista do dia. Muda o Status pra Concluído, escreve o Valor, escolhe a Forma de pagamento e marca Pago se ela já pagou. Toca em Salvar.",
    "tela": "agenda",
    "dica": "Se ela ficou devendo, deixa Pago desmarcado. Esse valor aparece no Painel como A receber pra você não esquecer."
  },
  {
    "titulo": "Já deixa o retorno marcado",
    "texto": "Ainda no atendimento do dia, toca em Retorno 7d. Ele já abre um atendimento novo com a mesma paciente, o mesmo procedimento e a mesma hora, daqui a uma semana. Confere e toca em Salvar.",
    "tela": "agenda",
    "dica": "Esse é o caminho mais rápido pros bebês, que voltam toda semana. Se o retorno for em outro dia, é só trocar a Data antes de salvar."
  },
  {
    "titulo": "A ficha guarda tudo dela",
    "texto": "Toca no card da paciente e a ficha abre com o histórico de sessões: todas as datas, o procedimento e o status, com um contador do tipo 6 sessões registradas. Ali também tem o campo Próximo contato, onde você coloca a data em que precisa falar com ela de novo.",
    "tela": "pacientes",
    "dica": "Usa o Próximo contato pra quem pediu pra pensar. É assim que ela volta a aparecer pra você em vez de sumir na lista."
  },
  {
    "titulo": "O Painel mostra o seu dia",
    "texto": "Toca em Painel. Em Hoje na agenda você vê quem vem hoje, em Próximos atendimentos quem vem depois, e mais abaixo quantas pacientes tem em cada coluna. Tem também a lista de quem já passou da data de Próximo contato e ainda não voltou.",
    "tela": "painel",
    "dica": "Olha essa lista de quem passou da data uma vez por semana. Costuma ser onde estão os atendimentos que você já quase tinha fechado."
  },
  {
    "titulo": "Quanto entrou no mês",
    "texto": "Ainda no Painel você vê quanto entrou no mês e quanto está a receber, somando os atendimentos que você marcou como Concluído. Um pouco mais abaixo aparece de onde vêm as suas pacientes, por origem.",
    "tela": "painel",
    "dica": "Esses números só ficam certos se você anotar o valor na hora que conclui o atendimento. É um toque a mais por paciente e resolve o mês inteiro."
  },
  {
    "titulo": "Coloca o app na tela de início",
    "texto": "Por último, toca em Instalar na tela de início. O app vira um ícone no seu celular, igual aos outros, e abre direto sem precisar de navegador nem de digitar endereço. Se aparecerem instruções na tela, é só seguir o passo a passo do seu aparelho.",
    "tela": "geral",
    "dica": "Depois de instalado, você já entra logado. Só precisa digitar a senha de novo se tocar em Sair."
  }
]

export const MENSAGENS_PRONTAS = [
  {
    "id": "primeira-resposta-preco",
    "rotulo": "Primeira resposta (preço)",
    "quando": "Alguém chamou no direct ou no WhatsApp perguntando quanto custa, antes de ela saber qualquer coisa do caso.",
    "texto": "Oi, {nome}, tudo bem? Aqui é a Julisbel.\n\nEu faço correção de orelha sem cirurgia, em adultos e em crianças.\n\nO valor muda conforme o caso, então prefiro te dizer o certo em vez de jogar um número solto. Me conta pra quem é e, se puder, me manda uma foto da orelha de frente e de lado. Com isso eu já te explico qual técnica serve e quanto fica.\n\nSem compromisso nenhum, viu?",
    "contexto": "paciente"
  },
  {
    "id": "o-que-e-otomodelacao",
    "rotulo": "O que é a otomodelação",
    "quando": "A pessoa demonstrou interesse mas não entendeu o que é o procedimento, ou tem medo de que envolva cirurgia.",
    "texto": "{nome}, te explico rapidinho como funciona.\n\nA otomodelação é a correção da orelha sem cirurgia e sem corte. Eu trabalho a cartilagem e coloco um molde que mantém a orelha na posição nova enquanto ela se acomoda.\n\nÉ feito aqui no consultório, você vai embora no mesmo dia e volta pra sua rotina. Não tem ponto e o incômodo costuma ser bem pequeno.\n\nDepois a gente acompanha de perto, com retornos, até o resultado ficar firme.\n\nQualquer dúvida pode perguntar, por menor que ela pareça pra você.",
    "contexto": "paciente"
  },
  {
    "id": "remodelacao-baby-idade",
    "rotulo": "Remodelação baby e idade",
    "quando": "Mãe ou pai chegou perguntando sobre a orelhinha do bebê e precisa entender a técnica e a janela de idade.",
    "texto": "Oi, {nome}. Sobre a orelhinha do bebê:\n\nNos primeiros meses a cartilagem ainda está bem molinha, então dá pra corrigir com molde, sem cirurgia, sem corte e sem dor pro bebê.\n\nOs melhores resultados vêm nos 3 primeiros meses de vida. Até por volta dos 6 meses ainda costuma dar certo, só que leva mais tempo. Depois dessa fase a cartilagem endurece e o caminho passa a ser outro.\n\nO molde fica na orelhinha e eu troco e avalio toda semana. O bebê mama, dorme e vive normalmente com ele.\n\nMe diz quantos meses o bebê tem que eu te falo se ainda dá tempo e como seria o passo a passo.",
    "contexto": "paciente"
  },
  {
    "id": "confirmar-atendimento",
    "rotulo": "Confirmar atendimento",
    "quando": "Na véspera, pra confirmar quem vem no dia seguinte e liberar o horário caso a pessoa não possa.",
    "texto": "Oi, {nome}, tudo bem? Passando pra confirmar o nosso atendimento amanhã, dia {data}, às {hora}.\n\nSó me responde aqui que está confirmado, que eu deixo tudo preparado pra você.\n\nSe algo mudou e você precisar de outro dia, me avisa ainda hoje que a gente encaixa. Te espero 🙂",
    "contexto": "atendimento"
  },
  {
    "id": "retorno-semanal-bebe",
    "rotulo": "Retorno semanal do bebê",
    "quando": "Lembrete da troca de molde da semana, pra mãe não perder o intervalo do tratamento do bebê.",
    "texto": "Oi, {nome}, tudo bem?\n\nJá chegou a semana da troca do molde. Deixei reservado pra {data}, às {hora}.\n\nEssa troca toda semana é o que garante o resultado, porque nessa fase a orelhinha muda rápido e o molde precisa acompanhar esse crescimento.\n\nSe esse horário não der certo pra vocês, me fala que eu procuro outro dentro da mesma semana.\n\nE se você notar qualquer coisa na pele até lá, me manda uma foto que eu te oriento na hora.",
    "contexto": "atendimento"
  },
  {
    "id": "cuidados-pos-procedimento",
    "rotulo": "Cuidados após o procedimento",
    "quando": "Logo depois do atendimento, com a pessoa ainda saindo do consultório ou já em casa.",
    "texto": "{nome}, anota aqui os cuidados dos próximos dias:\n\nMantenha o curativo e o molde sempre secos. No banho, proteja bem a região.\n\nNão mexa, não puxe e não tente ajustar por conta própria.\n\nDurma de barriga pra cima ou virado pro lado contrário, pra não pressionar a orelha.\n\nEvite piscina, mar, academia e sol direto até eu liberar.\n\nUm incômodo leve nos primeiros dias é esperado. Agora, se aparecer dor forte, calor no local, cheiro ruim ou vermelhidão aumentando, me chama na hora, sem esperar o retorno.\n\nEstou por aqui pra qualquer dúvida.",
    "contexto": "atendimento"
  },
  {
    "id": "reativacao-sumido",
    "rotulo": "Faz tempo que não falamos",
    "quando": "Pessoa que passou da data de próximo contato, conversou uma vez e nunca mais respondeu.",
    "texto": "Oi, {nome}, tudo bem? Aqui é a Julisbel.\n\nA gente conversou faz um tempo sobre a correção da orelha e depois acabou se perdendo. Isso é normal, a vida corre.\n\nNão estou te chamando pra insistir em nada. Só queria dizer que continuo por aqui e que guardei o seu caso comigo.\n\nSe ainda for algo que você quer resolver, é só me responder que eu te atualizo sobre valores e agenda. E se não for o momento, está tudo bem também 🙂",
    "contexto": "paciente"
  },
  {
    "id": "alta-agradecimento",
    "rotulo": "Alta e agradecimento",
    "quando": "No fim do tratamento, quando o resultado estabilizou e a pessoa recebe alta.",
    "texto": "{nome}, hoje é oficialmente a sua alta 🤍\n\nFoi muito bonito acompanhar cada etapa desse processo de perto. Obrigada pela confiança e pela paciência em cada retorno, sei que exigiu tempo seu.\n\nDaqui pra frente é vida normal. Só continue evitando dormir pressionando a orelha e me chama se notar qualquer mudança, mesmo daqui a meses.\n\nSe um dia quiser me mandar uma foto de como está, eu vou adorar ver. Se cuida.",
    "contexto": "paciente"
  },
  {
    "id": "remarcar-quem-faltou",
    "rotulo": "Remarcar quem faltou",
    "quando": "A pessoa não apareceu no horário marcado e ela quer retomar sem cobrar nem constranger.",
    "texto": "Oi, {nome}, tudo bem? Senti sua falta no horário de {data}, às {hora}.\n\nImagino que tenha acontecido algum imprevisto, isso acontece mesmo. Só não quero que o seu acompanhamento fique parado no meio do caminho.\n\nMe manda dois dias e turnos que funcionam pra você que eu já reservo um horário novo.",
    "contexto": "atendimento"
  },
  {
    "id": "interesse-mentoria",
    "rotulo": "Interesse na mentoria",
    "quando": "Outra profissional da saúde chamou perguntando sobre a formação em otomodelação.",
    "texto": "Oi, {nome}, que bom ver o seu interesse na mentoria.\n\nEu ensino otomodelação e remodelação baby do jeito que eu faço no consultório: avaliação do caso, técnica, condução dos retornos e também a conversa com o paciente, que costuma ser a parte que mais trava no começo.\n\nÉ formação pra profissional da saúde, com prática de verdade e suporte depois que você começa a atender.\n\nMe conta um pouco da sua formação e há quanto tempo você atende, que eu te explico qual formato faz mais sentido pro seu momento e as datas das próximas turmas.",
    "contexto": "paciente"
  },
  {
    "id": "como-vir-no-dia",
    "rotulo": "Como vir no dia",
    "quando": "Depois de agendar, pra a pessoa chegar preparada e não perder o atendimento por bobagem.",
    "texto": "{nome}, algumas orientações pro nosso atendimento de {data}, às {hora}:\n\nVenha com o cabelo limpo e seco, sem gel, creme ou spray.\n\nDeixe o cabelo solto ou traga um prendedor, pra facilitar o acesso à orelha.\n\nRetire brincos e piercings da orelha antes de vir.\n\nPode comer normalmente, não precisa de jejum.\n\nSe for atendimento de bebê, traga o que costuma acalmar: chupeta, mamadeira ou a mantinha dele.\n\nE se estiver com febre, gripe ou alguma ferida na orelha, me avisa antes que a gente remarca tranquilo.",
    "contexto": "atendimento"
  },
  {
    "id": "estou-em-atendimento",
    "rotulo": "Estou em atendimento",
    "quando": "Chegou mensagem no meio da agenda dela e ela não consegue responder direito agora.",
    "texto": "Oi, {nome}, tudo bem? Vi a sua mensagem aqui.\n\nEstou em atendimento agora e te respondo com calma assim que eu terminar, ainda hoje.\n\nSe for algo urgente sobre um procedimento que você já fez comigo, me escreve a palavra URGENTE que eu olho entre um paciente e outro.",
    "contexto": "paciente"
  }
]
