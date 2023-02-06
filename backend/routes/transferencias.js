const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `
    SELECT * FROM transferencias
    `,
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        const response = {
          // quantidade_de_funcionarios: result.length,
          transferencias: result.map((transf) => {
            return {
              nome_pagador: transf.nome_pagador,
              numero_pagador: transf.numero_pagador,
              nome_recebedor: transf.nome_recebedor,
              numero_recebedor: transf.numero_recebedor,
              valor: transf.valor,
              request: {
                tipo: "GET",
                url: "http://localhost:3000/transferencias/",
              },
            };
          }),
        };

        return res.status(200).send(response);
      }
    );
  });
});



// //CADASTRO DE TRANSFERENCIAS
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    //CHECANDO SE USER JA EXISTE

    //CADASTRANDO
    conn.query(
      `
      INSERT INTO 
      transferencias 
      (id_usuario_pagador,id_usuario_recebedor, valor) VALUES (?,?,?);
  
      UPDATE 
      usuarios as uPagador
      INNER JOIN transferencias
      ON uPagador.id_usuario = transferencias.id_usuario_pagador
      INNER JOIN usuarios as uRecebedor
      ON uRecebedor.id_usuario = transferencias.id_usuario_recebedor
      SET uPagador.saldo = uPagador.saldo - transferencias.valor,
      uRecebedor.saldo = uRecebedor.saldo + transferencias.valor
      WHERE 
      transferencias.id_transferencia = (SELECT id_transferencia FROM transferencias WHERE transferencias.id_usuario_pagador = ? 
      ORDER BY id_transferencia DESC LIMIT 1)
      `,
      [
        req.body.id_usuario_pagador,
        req.body.id_usuario_recebedor,
        req.body.valor,
        req.body.id_usuario_pagador
      ],
      (error, result) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        response = {
          message: "Transferencia",
          trasnferencia: {
            id_usuario_pagador:req.body.id_usuario_pagador,
            id_usuario_recebedor:req.body.id_usuario_recebedor,
            valor: req.body.valor,
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});
// router.patch("/:id_transferencia", (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({
//         error: error,
//       });
//     }

//     conn.query(

//       `
//       UPDATE
//       usuarios as uPagador
//       inner join transferencias
//       on uPagador.id_usuario = transferencias.id_usuario_pagador
//       inner join usuarios as uRecebedor
//       on uRecebedor.id_usuario = transferencias.id_usuario_recebedor
//       set uPagador.saldo = uPagador.saldo - transferencias.valor,
//       uRecebedor.saldo = uRecebedor.saldo + transferencias.valor
//       where transferencias.id_transferencia = (SELECT id_transferencia FROM transferencias WHERE transferencias.id_usuario_pagador = ? ORDER BY id_transferencia DESC LIMIT 1)

//       `,
//       [
//         req.params.id_transferencia
//       ],
//       (error, result, field) => {
//         conn.release();
//         if (error) {
//           return res.status(500).send({
//             error: error,
//           });
//         }
//         res.status(201).send({
//           message: "FUNCIONARIO ATUALIZADO COM SUCESSO",
//           resultado: field,
//         });
//       }
//     );
//   });
// });

module.exports = router;
