# Teste Back-end - NodeJs - MongoDB

## Descrição do Projeto

<p align="center">
    O projeto segue as exigencias descritas no PDF do teste, e tem como objetivo:

    - Guardar as universidades num banco de dados Mongo atravez da rota: 
      - http://localhost:3000/registeruniversities;
      
    - Listar as universidades: method: "GET"
      - Exemplo(s): 
        - listagem das 20 universidades por pagina: http://localhost:3000/universities;
        - listagem de todas as universidades: http://localhost:3000/universities?limit_20=false;
        - listagem das universidades por id: http://localhost:3000/universities?id=618d62a502e0eb95913c2836;
        - listagem das universidades por país: http://localhost:3000/universities?contry=uruguay;
        - listagem das universidades usando todos os filtros: http://localhost:3000/universities?country=argentina&id=618d62a502e0eb95913c2848&limit_20=false;

    - Criação de universidades: method: POST"
      - Exemplo(s): 
        - ciração de universidade: http://localhost:3000/universities;
      - Dados necessarios para criar:
         {
             	alpha_two_code: "Sígla do País",
                web_pages: ["URL's da universidade"],
                name: "Nome da Universidade",
                country: "País da Universidade",
                domains: ["Dominios da Universidade"],
                state_province: "Estado da Universidade",
         };
      
    - Atualização de dados da Universidade: method: "PUT"
      - Exemplos:
        - atualização dos dados: http://localhost:3000/universities/:id;
      - Dados necessarios para atualizar:
        {
            web_pages: ["URL's da universidade"],
            name: "Nome da Universidade",
            domains: ["Dominios da Universidade"],
        };
    
    - Deleção de Universidade: method: "DELETE"
      - Exemplo(s):
        - atualização dos dados: http://localhost:3000/universities/:id;
</p>


### Features

- [x] Listagem de Universidades
- [x] Cadastro de Universidades
- [x] Atualização de Cadastro das Universidades
- [x] Deleção de Universidades

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o NodeJs (servidor)

```bash
# Clone este repositório
$ git clone <https://gitlab.com/dev.jpedro/teste-back-end-nodejs-mongodb.git>

# Vá para a pasta server
$ cd teste-node-mongo

# Instale as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>