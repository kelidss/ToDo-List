## Configuração do Ambiente

1. Copie o arquivo `.env_example` para `.env` e preencha as variáveis de ambiente necessárias:
    ```sh
    cp .env_example .env
    ```

2. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

## Como Executar

1. Construa e inicie os contêineres Docker:
    ```sh
    docker-compose up --build
    ```

2. Acesse a aplicação web em `http://localhost`.

## Endpoints da API

A API possui os seguintes endpoints:

- `POST /tasks/`: Cria uma nova tarefa.
- `GET /tasks/`: Retorna uma lista de tarefas.
- `GET /tasks/{task_id}`: Retorna uma tarefa específica pelo ID.
- `PUT /tasks/{task_id}`: Atualiza uma tarefa específica pelo ID.
- `DELETE /tasks/{task_id}`: Deleta uma tarefa específica pelo ID.

## Estrutura do Banco de Dados

A aplicação utiliza PostgreSQL como banco de dados. A tabela [tasks](http://_vscodecontentref_/18) possui a seguinte estrutura:

- [id](http://_vscodecontentref_/19): Inteiro, chave primária, autoincremento.
- [title](http://_vscodecontentref_/20): String, não nulo.
- [description](http://_vscodecontentref_/21): String, opcional.
- [status](http://_vscodecontentref_/22): String, não nulo.
- [created_at](http://_vscodecontentref_/23): DateTime, padrão para a hora atual.
- [updated_at](http://_vscodecontentref_/24): DateTime, atualizado automaticamente na modificação.

## Autenticação

A autenticação é feita utilizando JWT. O token é gerado e verificado pelo módulo [jwt.py](http://_vscodecontentref_/25).

## Tecnologias Utilizadas

- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Docker](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)

