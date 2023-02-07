const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//separar recebidos e transferidos

router.get("/recebidos/:numero_conta_pagador", (req, res, next) => {
  //   let id = req.params.id_produto;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `
      SELECT 
      numero_conta_recebedor as numero_recebedor, 
      uRecebedor.nome as recebedor_nome,
      uPagador.nome as pagador_nome,
      t.valor as valor_recebido,
      criado_em
      FROM transferencias as t
      INNER JOIN usuarios as uRecebedor 
      ON t.numero_conta_recebedor = uRecebedor.numero_conta
      INNER JOIN usuarios as uPagador
      ON t.numero_conta_pagador = uPagador.numero_conta      
      WHERE t.numero_conta_recebedor =  ?;
   

      `,
      [req.params.numero_conta_pagador],
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

        const response = {
          transferencias: result.map((results) => {
            // Object.keys(result).length
            return{
                
                // message: "transferencias encontradas",
                criado_em:results.criado_em,    
                numero_recebedor:results.numero_recebedor,
                valor_recebido:results.valor_recebido, 
                numero_pagador:results.numero_pagador,      
                pagador_nome:results.pagador_nome,      
                // recebedor_nome:results.recebedor_nome,    
            
                // valor_recebido:results.valorRecebido,    
                 
                // resultado:results,
                // teste:results.numero_pagador
                // request: {
                //   tipo: "GET",
                //   url: "http://localhost:3000/transferencias/",
                // },
            }
            
          })
        };

        return res.status(200).send(response);
      }
    );
  });
});

router.get("/pagos/:numero_conta_pagador", (req, res, next) => {
  //   let id = req.params.id_produto;

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `
      SELECT 
      numero_conta_pagador as numero_pagador,
      numero_conta_recebedor as numero_recebedor, 
      uPagador.nome as pagador_nome, 
      uRecebedor.nome as recebedor_nome,
      t.valor as valor_pago,
      criado_em
      FROM transferencias as t
      INNER JOIN usuarios as uPagador
      ON t.numero_conta_pagador = uPagador.numero_conta
      INNER JOIN usuarios as uRecebedor 
      ON t.numero_conta_recebedor = uRecebedor.numero_conta
   		    
     WHERE t.numero_conta_pagador =  ?;
   

      `,

      //       SELECT 
      // tPagador.numero_conta_pagador as pagadorConta,
      // tPagador.valor as valorP,
      // tPagador.numero_conta_recebedor as recebedorConta
      // from usuarios as u
      // inner join transferencias as tPagador
      // on u.numero_conta = tPagador.numero_conta_pagador
      // inner join transferencias as tRecebedor
      // on u.numero_conta = tRecebedor.numero_conta_recebedor
      // WHERE tPagador.numero_conta_pagador = 233167 
//////////////////////////////////////////////////////////////////////


      // SELECT 
      // numero_conta_pagador as numero_pagador,
      // uPagador.nome as pagador_nome, 
      // t.valor as valorPago,
      // criado_em
      // FROM transferencias as t
      // INNER JOIN usuarios as uPagador
      // ON t.numero_conta_pagador = uPagador.numero_conta
      // WHERE t.numero_conta_pagador =  ?;
      
      // SELECT 
      // numero_conta_recebedor as numero_recebedor, 
      // uRecebedor.nome as recebedor_nome,
      // t.valor as valorRecebido,
      // criado_em
      // FROM transferencias as t
      // INNER JOIN usuarios as uRecebedor 
      // ON t.numero_conta_recebedor = uRecebedor.numero_conta
      // WHERE t.numero_conta_recebedor =  ?
      ///////////////////////////////////////////////
      // SELECT 
      // numero_conta_pagador as numero_pagador,
      // numero_conta_recebedor as numero_recebedor, 
      // uPagador.nome as pagador_nome, 
      // uRecebedor.nome as recebedor_nome,
      // t.valor as valorPago,
      // t.valor as valorRecebido,
      // criado_em
      // FROM transferencias as t
      // INNER JOIN usuarios as uPagador
      // ON t.numero_conta_pagador = uPagador.numero_conta
      // INNER JOIN usuarios as uRecebedor 
      // ON t.numero_conta_recebedor = uRecebedor.numero_conta
      // WHERE t.numero_conta_pagador =  233167
      [req.params.numero_conta_pagador],
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

        const response = {
          transferencias: result.map((results) => {
            // Object.keys(result).length
            return{
                
                // message: "transferencias encontradas",
                criado_em:results.criado_em,    
                numero_recebedor:results.numero_recebedor,
                valor_pago:results.valor_pago, 
                numero_pagador:results.numero_pagador,      
                pagador_nome:results.pagador_nome,      
                recebedor_nome:results.recebedor_nome,    
            
                // valor_recebido:results.valorRecebido,    
                 
                // resultado:results,
                // teste:results.numero_pagador
                // request: {
                //   tipo: "GET",
                //   url: "http://localhost:3000/transferencias/",
                // },
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

        response = {
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
