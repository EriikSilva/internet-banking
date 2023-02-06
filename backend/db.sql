-- create table usuarios(
-- 	id_usuario int not null primary key AUTO_INCREMENT,
--     nome varchar(80) not null,
--     email varchar(150) not null unique,
--     senha varchar(80) not null,
--     numero_conta int(6) not null DEFAULT (rand() * (999999 - 100000) + 100000),
--     saldo bigint default 10000
-- )


-- create table conta_usuario(
-- 	   criado_em datetime not null default current_timestamp(),
--     conta_id int(11) not null,
--     usuario_id int(11) not null,
--     constraint fk_conta_id FOREIGN KEY (conta_id) REFERENCES conta(id_conta) ON DELETE CASCADE,
--     constraint fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
-- )

-- create table transferencias(
-- 	id_tranferencia int not null AUTO_INCREMENT,
--     quantidade bigint not null,
--     numero_conta int not null,
--     data_transferencia datetime not null DEFAULT CURRENT_TIMESTAMP(), 
--     constraint fk_numero_conta FOREIGN key quantidade REFERENCES conta(numero)
-- )


-- create table transferencias(
-- 	id int not null primary key AUTO_INCREMENT,
--     criado_em datetime not null default CURRENT_TIMESTAMP(),
--     nome_pagador varchar(100),
--     numero_pagador int not null,
--     nome_recebedor varchar(100),
--     numero_recebedor int not null,
--     valor bigint not null
-- )


-- create table transferencias(
-- 	id_transferencia int not null primary key AUTO_INCREMENT,
--     criado_em datetime not null default current_timestamp(),
--     id_usuario_pagador int not null,
--     id_usuario_recebedor int not null,
--     valor bigint not null,
--     CONSTRAINT fk_id_usuario_pagador FOREIGN KEY (id_usuario_pagador) REFERENCES usuarios(id_usuario),
--     CONSTRAINT fk_id_usuario_recebedor FOREIGN KEY (id_usuario_recebedor) REFERENCES usuarios(id_usuario)
-- )


-- select 
-- t.criado_em as data,
-- uPagador.nome as pagador,
-- uRecebedor.nome as recebedor,
-- t.valor
-- from transferencias as t 
-- left join usuarios as uPagador 
-- on (t.id_usuario_pagador = uPagador.id_usuario)
-- left join usuarios as uRecebedor
-- on (t.id_usuario_recebedor= uRecebedor.id_usuario )


-- select 
-- id_usuario_pagador as quemPagou,
-- id_usuario_recebedor as quemRecebeu, 
-- uPagador.nome as quemPagouNome, 
-- uRecebedor.nome as quemRecebeuNome,
-- valor
-- from transferencias as t
-- inner join usuarios as uPagador
-- on t.id_usuario_pagador = uPagador.id_usuario
-- inner join usuarios as uRecebedor 
-- on t.id_usuario_recebedor = uRecebedor.id_usuario
-- where t.id_usuario_pagador = 3


-- UPDATE 
-- usuarios as uPagador
-- inner join transferencias
-- on uPagador.id_usuario = transferencias.id_usuario_pagador
-- inner join usuarios as uRecebedor
-- on uRecebedor.id_usuario = transferencias.id_usuario_recebedor
-- set uPagador.saldo = uPagador.saldo - transferencias.valor,
-- uRecebedor.saldo = uRecebedor.saldo + transferencias.valor
-- where transferencias.id_transferencia = (SELECT id_transferencia FROM transferencias WHERE transferencias.id_usuario_pagador = 4 ORDER BY id_transferencia DESC LIMIT 1)
