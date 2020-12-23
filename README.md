# Packages:
---

```
npm install knex --save our yarn add knex --save

npm install mysql2 --save our yarn add mysql2 --save

npm install express --save our yarn add express --save

npm install body-parser --save our yarn add body-parser --save

npm install bcrypt --save our yarn add bcrypt --save

npm install jsonwebtoken --save yarn add jsonwebtoken --save

npm install uuid --save our yarn add uuid --save

npm install nodemailer --save our yarn add nodemailer --save

npm install cors our yarn add cors

```
# Passos a seguir:
---

- [x] Criar um servidor que roda na porta 3000 com o express.

- [x] Criar um banco de dados e suas tabelas: Users/Customers/Password/Purchases.

- [x] Se conectar com o banco de dados com o knex.

- [x] Criar as rotas post, get, put e delete.

- [x] Criar os controllers para a criação de usuários administradores, criação dos clientes da loja, busca por todos e por um único id dos clientes da loja, atualização e deleção desses clientes. Mas também os controllers que gerenciam as senhas, para que os usuários possam atualizá-las, isso tudo com o devido tratamento de erros, pois exige mudança do hash. Ademais, criar os controllers de estoque da loja.

- [x] Api criada.



# Tables:
---

| Tables_in_app_store |  
|:--------------------|
| Users               |
| Customers           |
| Password                    |
| Purchases           |


### Table Users:

```
CREATE TABLE Users(
  id int(4) AUTO_INCREMENT NOT NULL,
  name varchar(50) NOT NULL,
  email varchar(50) NOT NULL UNIQUE,
  password varchar(50) NOT NULL,
  role int(4),
  PRIMARY KEY (id)
);

```

| id |  name |  email | password | role |
|----|-------|--------|----------|------|
|  1 | Marie | xxx@xx | xxx-xxx  |  1   |
|  2 | Lily  | xxx@xx | xxx-xxx  |  0   |
|  3 |  Ted  | xxx@xx | xxx-xxx  |  1   |

### Table Customers:

```
CREATE TABLE Customers(
  id INT(4) AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL,
  purchase VARCHAR(200) NOT NULL,
  price FLOAT(20) NOT NULL,
  amount INT(20) NOT NULL,
  date DATE,
  PRIMARY KEY (id)
);

```

| id |  name | purchase | price | amount |     date      |
|----|-------|--------- |-------|--------|---------------|
|  1 | Marie |  shirt   |  R$:  |   1    |    02/08      |
|  2 | Ostion|  short   |  R$:  |   5    |    01/02      |
|  3 | Levin |  trouser |  R$:  |   10   |    xx/xx      |



**Ao longo do processo de criação das tabelas do banco de dados precisei criar uma nova coluna na tabela ```Customers```, então usei o seguinte comando sql:**

```
ALTER TABLE Customers ADD total FLOAT(20) NOT NULL AFTER date;
```

| id |  name | purchase | price | amount | date          |    total     |
|----|-------|--------- |-------|--------|---------------|--------------|
|  1 | Marie |  shirt   |  R$:  |   1    |    02/08      |price * amount|
|  2 | Ostion|  short   |  R$:  |   5    |    01/02      |              |
|  3 | Levin |  trouser |  R$:  |   10   |    xx/xx      |              |

**Também tive que modificar o tamanho do varchar do password na tabela ```Users```, pois quando comecei a usar o bcrypt o tamanho do token ultrapassou o que eu tinha colocado lá.**

O token possui um tamanho elevado de caracteres então coloque um tamanho grande para que não ocorra conflito.

```
ALTER TABLE Users MODIFY password varchar(200) NOT NULL;

```
**Caso queira alterar algum nome do campo da tabela use o seguinte comando:**

```
ALTER TABLE nome_da_tabela CHANGE nome_atual nome_desejado tipo_do_dado;
```

**Tive que modificar o campo ```date```, pois quando estava na criação do app percebi que não necessariamente deveria deixá-lo com o tipo Date, isso pelo fato de que esse dado seria mostrado para o usuário de uma forma muito técnica e então o modifiquei para varchar.**

```
ALTER TABLE Customers MODIFY date varchar(200);

```
Essa modificação não interfere na lógica, pois o campo date refere-se a data de recebimento do pagamento que os clientes devem fazer. Resolvi colocar varchar para que os dados que o usuário coloque não sejam tão técnicos. Além disso, esse campo pode ser nulo. Com isso ele também dá liberdade ao usuário para colocar a data com "/" ou "-" e se não tiver o dia certo de recebimento poderá deixar nulo.

## Table password_token:


Essa tabela será necessária para que possamos redefinir a senha do usuário. Como ela é criada com um hash, a mesma possui um token para a segurança do usuário e para que ele consiga redefinir a senha é necessário a geração de um novo token.

```
CREATE TABLE Password (
   id_token INT(50) AUTO_INCREMENT PRIMARY KEY NOT NULL,
   token VARCHAR(200) NOT NULL,
   used TINYINT(4),
   id_user INT(4) NOT NULL
);

```
Agora vamos fazer o relacionamento entre as tabelas Users e Password;

```
ALTER TABLE `Password` ADD CONSTRAINT `fk_user` FOREIGN KEY ( `id_user` ) REFERENCES `Users` ( `id` ) ON DELETE CASCADE ON UPDATE CASCADE;

```

| id_token |    token    | used | id_user |
|----------|-------------|------|---------|
|     1    | 02938nhcbvx |  1   |    1    |  
|     2    | hasyuw09383 |  0   |    12   |
|     3    | 7qx3665317d |  1   |    22   |

# Table Purchases:

Essa tabela será necessária para controlar o estoque de compras realizadas e seus respectivos valores, além de mostrar o lucro obtido pelo UserAdm.

Nela vai ter:
- Id da compra;
- Qual foi a compra(Purchase);
- Preço da compra(Price purchase);
- Quantidade de peças(Piece quantity);
- Pagamento da compra(Payment);
- Parcelamento da compra(Installment);
- Valor a vender(Value to sell);
- Lucro(Profit).

```
CREATE TABLE Purchases (
   id INT(50) AUTO_INCREMENT PRIMARY KEY NOT NULL,
   purchase VARCHAR(200) NOT NULL,
   pricePuschase FLOAT(50) NOT NULL,
   pieceQuantity INT(100) NOT NULL,
   payment FLOAT(50) NOT NULL,
   installment INT(10) NOT NULL,
   valueToSell FLOAT(50) NOT NULL,
   profit FLOAT(50) NOT NULL
);

```

**Lucro vai ser dado por:** <br />
(valueToSell *  pieceQuantity) - pricePuschase;


# Knex

Como esse sistema foi para produção, eu resolvi usar as migrations do knex. Essa me auxiliou na criação das tabelas do banco de dados ao fazer o deploy da aplicação e me ajudou bastante em quisitos de produtividade. Em breve explicarei como funciona essas migrações.
