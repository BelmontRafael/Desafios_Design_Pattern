# Desafios Design Patterns

Desafios envolvendo a utilização de Design Patterns em TypeScript.

Exercícios propostos pelo professor Diego Cardoso — CEFET Maria da Graça, RJ.

---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Padrões de Projeto Abordados](#padrões-de-projeto-abordados)
- [Desafios](#desafios)
  - [Desafio 1 — Monitor de Criptomoedas](#desafio-1--monitor-de-criptomoedas)
  - [Desafio 2 — Gerador de Currículo](#desafio-2--gerador-de-currículo)
  - [Desafio 3 — Processador de Arquivos de Produtos](#desafio-3--processador-de-arquivos-de-produtos)
  - [Desafio 4 — Editor de Texto](#desafio-4--editor-de-texto)
  - [Desafio 5 — Rastreamento de Encomendas](#desafio-5--rastreamento-de-encomendas)
  - [Desafio 6 — Sistema de Logging](#desafio-6--sistema-de-logging)
  - [Desafio 7 — Plataforma de Streaming de Vídeo](#desafio-7--plataforma-de-streaming-de-vídeo)
  - [Desafio 8 — Sistema de Mensagens com Decoradores](#desafio-8--sistema-de-mensagens-com-decoradores)
  - [Desafio 9 — Simulador de Sistema de Arquivos](#desafio-9--simulador-de-sistema-de-arquivos)
- [Como Executar](#como-executar)
- [Autor](#autor)

---

## Sobre o Projeto

Este repositório reúne uma série de desafios práticos desenvolvidos com o objetivo de aprofundar o conhecimento em **Padrões de Projeto (Design Patterns)**. Cada desafio explora um ou mais padrões em um contexto de aplicação real, implementado em **TypeScript**.

---

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [ts-node](https://typestrong.org/ts-node/) — execução direta de TypeScript em desenvolvimento

---

## Padrões de Projeto Abordados

| Padrão       | Categoria     | Desafios                  |
|--------------|---------------|---------------------------|
| Strategy     | Comportamental | 1, 2, 6, 7               |
| Command      | Comportamental | 4, 6, 7, 9               |
| Observer     | Comportamental | 5, 6                     |
| State        | Comportamental | 5                        |
| Memento      | Comportamental | 4                        |
| Adapter      | Estrutural    | 1, 3                     |
| Proxy        | Estrutural    | 7                        |
| Decorator    | Estrutural    | 8                        |
| Composite    | Estrutural    | 9                        |
| Singleton    | Criacional    | 1, 4, 5                  |
| Builder      | Criacional    | 2                        |
| Factory      | Criacional    | 3, 8                     |

---

## Desafios

### Desafio 1 — Monitor de Criptomoedas

**Padrões:** Strategy · Adapter · Singleton

Aplicação de monitoramento de preços de criptomoedas (Bitcoin, Ethereum, Solana, etc.) em tempo real via API do [CoinGecko](https://www.coingecko.com/). O usuário seleciona qual moeda monitorar e configura alertas com base em limites fixos de preço (Threshold) ou variação percentual (Variation), podendo trocar a estratégia de alerta em tempo de execução.

- **Strategy** — troca da estratégia de alerta sem alterar o código de monitoramento.
- **Adapter** — `CoinGeckoAdapter` traduz a resposta da API externa para a interface interna.
- **Singleton** — `ConfigurationManager` mantém uma única instância das configurações da aplicação.

---

### Desafio 2 — Gerador de Currículo

**Padrões:** Builder · Strategy

Constrói um currículo completo de forma interativa, passo a passo, usando uma API fluente (encadeamento de métodos). O resultado final pode ser exportado em dois formatos diferentes.

- **Builder** — `ResumeBuilder` guia a criação do objeto `Resume` com campos como nome, contato, experiências e formação acadêmica.
- **Strategy** — formatadores `JSONFormatter` e `TextFormatter` permitem gerar a saída em JSON ou texto simples.

---

### Desafio 3 — Processador de Arquivos de Produtos

**Padrões:** Factory · Adapter

Lê e processa dados de produtos a partir de arquivos em diferentes formatos. O sistema detecta automaticamente o formato pela extensão do arquivo e aciona o adaptador correto.

- **Factory** — `ProductProviderFactory` instancia o adaptador adequado (CSV, JSON ou XML).
- **Adapter** — cada adaptador (`CSVAdapter`, `JSONAdapter`, `XMLAdapter`) normaliza os dados para uma interface comum.

---

### Desafio 4 — Editor de Texto

**Padrões:** Memento · Command · Singleton

Editor de texto com funcionalidade de desfazer (undo). O usuário pode adicionar e remover linhas, salvar estados do documento e restaurar versões anteriores.

- **Memento** — `TextMemento` captura e restaura o estado interno do editor.
- **Command** — `WriteCommand` encapsula a operação de escrita como um objeto.
- **Singleton** — `UserInputHelper` fornece uma única instância para leitura de entrada do usuário.

---

### Desafio 5 — Rastreamento de Encomendas

**Padrões:** State · Singleton · Observer

Sistema de rastreamento de encomendas que percorre uma sequência de estados ao longo do ciclo de entrega.

Estados: **Registrado → Centro de Distribuição → Em Trânsito → Entregue**

- **State** — cada estado (`RegisteredState`, `DistributionCenterState`, `InTransitState`, `DeliveredState`) define o comportamento da encomenda naquele momento.
- **Singleton** — `PackageManager` gerencia todas as encomendas em uma única instância.
- **Observer** — mudanças de estado notificam os observadores cadastrados.

---

### Desafio 6 — Sistema de Logging

**Padrões:** Observer · Command · Strategy

Sistema de registro de eventos interativo com múltiplos modos de saída. O usuário registra mensagens via REPL e pode alternar entre saída no console, em arquivo ou em resumo diário.

Comandos disponíveis:
- `log <mensagem>` — registra um novo evento
- `mostrar` — exibe todos os eventos registrados
- `modo console|arquivo|resumo` — altera o modo de saída

- **Observer** — `LoggerSubject` notifica `ConsoleLogObserver` e `FileLogObserver` a cada novo evento.
- **Command** — operações de log, exibição, alteração de modo e saída são encapsuladas como comandos.
- **Strategy** — as estratégias `ConsoleOutputStrategy`, `FileOutputStrategy` e `DailySummaryStrategy` determinam como os logs são apresentados.

---

### Desafio 7 — Plataforma de Streaming de Vídeo

**Padrões:** Proxy · Strategy · Command

Plataforma educacional de vídeos com controle de acesso baseado em tipo de conta (normal ou premium). O proxy intercepta tentativas de acesso e autoriza ou nega com base na estratégia do usuário.

- **Proxy** — `VideoProxy` controla o acesso aos vídeos verificando as permissões antes de reproduzi-los.
- **Strategy** — `NormalUserStrategy` e `PremiumUserStrategy` definem quais vídeos cada perfil pode assistir.
- **Command** — login, logout, listar vídeos e assistir vídeo são comandos independentes.

---

### Desafio 8 — Sistema de Mensagens com Decoradores

**Padrões:** Decorator · Factory

Sistema que aplica transformações dinâmicas a mensagens por meio de decoradores encadeados. Os decoradores são aplicados em sequência, modificando o conteúdo sem alterar a interface.

Decoradores disponíveis:
- **PriorityDecorator** — adiciona prefixo de prioridade
- **TimestampDecorator** — inclui data/hora
- **UpperCaseDecorator** — converte o texto para maiúsculas

- **Decorator** — cada decorador envolve o objeto `SimpleMessage` adicionando comportamento extra.
- **Factory** — `MessageFactory` cria a mensagem e aplica os decoradores solicitados.

---

### Desafio 9 — Simulador de Sistema de Arquivos

**Padrões:** Composite · Command

Simulador de sistema de arquivos em linha de comando com estrutura hierárquica de pastas e arquivos.

Comandos disponíveis:
- `criar pasta <nome>` — cria uma nova pasta no diretório atual
- `criar arquivo <nome>` — cria um novo arquivo no diretório atual
- `entrar <nome>` — navega para dentro de uma pasta
- `voltar` — retorna ao diretório anterior
- `listar` — exibe o conteúdo do diretório atual
- `sair` — encerra o simulador

- **Composite** — `Folder` (nó composto) e `File` (nó folha) herdam de `FileSystemComponent`, permitindo tratamento uniforme.
- **Command** — `CommandProcessor` mapeia cada comando a sua ação correspondente.

---

## Como Executar

Cada desafio é um projeto Node.js independente. Para executar qualquer um deles:

```bash
# Entre na pasta do desafio
cd Desafio_X

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

> Substitua `X` pelo número do desafio desejado (1 a 9).

---

## Autor

Desenvolvido por **Rafael Belmont**  
Exercícios propostos pelo professor **Diego Cardoso** — CEFET Maria da Graça, RJ
