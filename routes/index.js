let express = require('express');
let router = express.Router();
let getArticle = require('../controller/article/getArticle_controller.js');
let addArticle = require('../controller/article/addArticle_controller.js');
/**
 * 数据查询
 */
router.get('/article/list/get', (request, response, next)=>{
  getArticle(request.query, data =>{
    response.end(JSON.stringify(data));
  })
});
/**
 * 数据新增
 * @type {Router|router}
 * request.body.XX
 */
router.post('/article/list/add', (request, response, next)=>{
  request.body = {
    name: '物种起源',
    url: 'http://www.abcdefghigk.aa',
    alexa: '32',
    country: 'CN'
  }

  addArticle(request.body, data =>{
    response.end(JSON.stringify(data));
  })
});
module.exports = router;
