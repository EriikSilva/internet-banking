create table usuarios(
	id_usuario int not null primary key AUTO_INCREMENT,
    nome varchar(80) not null,
    email varchar(150) not null unique,
    senha varchar(80) not null,
    numero_conta int(6) not null DEFAULT (rand() * (999999 - 100000) + 100000) unique,
    saldo bigint default 10000
)


create table transferencias(
	id_transferencia int not null primary key AUTO_INCREMENT,
    criado_em datetime not null default current_timestamp(),
    numero_conta_pagador int not null,
    numero_conta_recebedor int not null,
    valor bigint not null,
    CONSTRAINT fk_numero_conta_pagador FOREIGN KEY (numero_conta_pagador) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_numero_conta_recebedor FOREIGN KEY (numero_conta_recebedor) REFERENCES usuarios(id_usuario)
)


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


-- insert into transferencias(numero_conta_pagador, numero_conta_recebedor, valor) VALUES
-- 						  (342152,627144, 100);
                          
-- UPDATE 
--       usuarios as uPagador
--       INNER JOIN transferencias
--       ON uPagador.numero_conta = transferencias.numero_conta_pagador
--       INNER JOIN usuarios as uRecebedor
--       ON uRecebedor.numero_conta = transferencias.numero_conta_recebedor
--       SET uPagador.saldo = uPagador.saldo - transferencias.valor,
--       uRecebedor.saldo = uRecebedor.saldo + transferencias.valor
--       WHERE 
--       transferencias.id_transferencia = (SELECT id_transferencia FROM transferencias WHERE transferencias.numero_conta_pagador = 342152
--       ORDER BY id_transferencia DESC LIMIT 1) 