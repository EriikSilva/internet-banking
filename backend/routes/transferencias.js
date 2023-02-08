const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { emit } = require("nodemon");
const { response } = require("express");
require("dotenv").config();


router.get("/:numero_conta_pagador", (req, res, next) => {
  //   let id = req.params.id_produto;
  // var conta = req.params.numero_conta_pagador

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    var temporaria = 'SET @conta = ?'
    conn.query(
      `
      ${temporaria};
      SELECT 
      criado_em,
       CASE
          WHEN t.numero_conta_recebedor = @conta THEN t.valor
          ELSE t.valor * (-1)
          END as valor,
      	CASE
          WHEN t.numero_conta_recebedor = @conta THEN uPagador.nome
          ELSE uRecebedor.nome
          END as nome,
        CASE
          WHEN t.numero_conta_recebedor = @conta THEN uPagador.numero_conta
          ELSE uRecebedor.numero_conta
          END as conta
      FROM transferencias as t
      INNER JOIN usuarios as uRecebedor 
      ON t.numero_conta_recebedor = uRecebedor.numero_conta
      INNER JOIN usuarios as uPagador
      ON t.numero_conta_pagador = uPagador.numero_conta      
      WHERE t.numero_conta_recebedor = @conta 
      OR t.numero_conta_pagador = @conta 
      ORDER BY criado_em DESC

      `,
    
      [
      req.params.numero_conta_pagador,
      //  req.params.numero_conta_pagador,
      //  req.params.numero_conta_pagador,
      //  req.params.numero_conta_pagador,
      //  req.params.numero_conta_pagador
      ],
      (error, result, field) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        // if (result.length == 0) {
        //   return res.status(404).send({
        //     message: "funcionario não encontrado ou não existe",
        //   });
        // }

        // const response = {
        //   transferencias: result.map((results) => {
        //     // Object.keys(result).length
        //     return{
        //         criado_em:results.criado_em,    
        //         valor:results.valor,
        //         nome:results.nome,      
        //         conta:results.conta,                
        //         // resultado:results
        //         // teste:results.resultado.criado_em
        //         // request: {
        //         //   tipo: "GET",
        //         //   url: "http://localhost:3000/transferencias/",
        //         // },
        //     }
            
        //   })
        // };    
        var data = JSON.stringify(result[1])
        // console.log(data)
        let data2 = JSON.parse(data)
        const response = {
          transferencias: data2.map((results) => {
            return {
              criado_em:results.criado_em, 
              valor:results.valor,
              nome:results.nome,      
              conta:results.conta,
            }
          })

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
    
    conn.query(
      `
      INSERT INTO transferencias(numero_conta_pagador, numero_conta_recebedor, valor) VALUES
      (?, ?, ?);
      
      UPDATE 
      usuarios as uPagador
          INNER JOIN transferencias
      ON uPagador.numero_conta = transferencias.numero_conta_pagador
         INNER JOIN usuarios as uRecebedor
      ON uRecebedor.numero_conta = transferencias.numero_conta_recebedor
         SET uPagador.saldo = uPagador.saldo - transferencias.valor,
      uRecebedor.saldo = uRecebedor.saldo + transferencias.valor
        WHERE 
      transferencias.id_transferencia = 
      (SELECT id_transferencia FROM transferencias WHERE transferencias.numero_conta_pagador = ?
      ORDER BY id_transferencia DESC LIMIT 1) 
      `,
      [
        req.body.numero_conta_pagador,
        req.body.numero_conta_recebedor,
        req.body.valor,
        req.body.numero_conta_pagador,
      ],
      (error, result) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        const response = {
          message: "Transferencia",
          trasnferencia: {
            numero_conta_pagador:req.body.numero_conta_pagador,
            numero_conta_recebedor:req.body.numero_conta_recebedor,
            valor: req.body.valor,
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});


module.exports = router;
