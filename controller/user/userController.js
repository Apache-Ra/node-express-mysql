/**
 * description：用户
 * createTime: 2018-11-02
 * message: 不接受任何私下吐槽，直接提出意见即可
 */
const _ = require('lodash');
const DB = require('../../config/DBHelp.js');
/**
 * 返回的状态信息
 */
const resultData = {code: '', data: '', message:''}
// 处理数据库操作成功后
const handleResultSuccess = (response, results) =>{
    resultData.code = results.code || null;
    resultData.data = results.data || null;
    resultData.message = results.message || null;
    response.end(JSON.stringify(resultData));
}
const handleResultError = (response, error) =>{
    resultData.code = error.code;
    resultData.data = '';
    resultData.message = error.sqlMessage;
    response.end(JSON.stringify(resultData));
}
class userController {
    /**
     * 添加用户
     * @param request
     * @param response
     * @param next
     */
    static add(request, response, next) {
        const data = request.body;
        const SQL_ = 'SELECT * FROM user WHERE user_name='+JSON.stringify(data.user_name);
        const SQL = 'INSERT INTO user (user_name, user_password, remarks) VALUES (?,?,?)';
        const SQL_DATA = [data.user_name, data.user_password, data.remarks];
        // 判断用户是否存在SELECT * FROM `user` WHERE user_name='donglei'
        DB(SQL_).then(results =>{
           if (results.length == 0) {
               DB(SQL, SQL_DATA).then(results => {
                   results.code = '200';
                   results.message = '成功';
                   handleResultSuccess(response, results);
               }).catch(error => {
                   handleResultError(response, error);
               });
           } else {
               results.message = '该用户已经存在';
               handleResultSuccess(response, results);
           }
        }).catch(error =>{
            handleResultError(response, error);
        })
    };
    /**
     * 删除用户
     * @param request
     * @param response
     * @param next
     */
    static delete(request, response, next) {
        const data = request.query;
        const SQL = 'DELETE FROM user WHERE user_id='+data.user_id
        DB(SQL).then(results =>{
            results.code = '200';
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error =>{
            handleResultError(response, error);
        })
    };

    /**
     * 用户修改
     * @param request
     * @param response
     * @param next
     */
    static update (request, response, next) {
        const data = request.body;
        let SQL = 'UPDATE user SET ';
        // 遍历拼接生成SQL语句
        _.forEach(data, (val, key) =>{
            val = JSON.stringify(val)
            if (key != 'user_id'){
                SQL = SQL + key+'='+val+',';
            } else {
                // 去掉最后一次拼接的逗号
                SQL = SQL.substring(0,SQL.length-1);
                SQL = SQL + ' WHERE ' + key+'='+val;
            }
        });

        DB(SQL).then(results =>{
            results.code = '200';
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error =>{
            handleResultError(response, error);
        })
    };
    /**
     * 获取用户列表
     * @param request
     * @param response
     * @param next
     */
    static list(request, response, next) {
        const SQL = 'SELECT * FROM user';
        DB(SQL).then(results => {
            results.code = '200';
            results.data = results;
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error => {
            handleResultError(response, error);
        });
    };

    /**
     * 用户查找
     * @param request
     * @param response
     * @param next
     */
    static find(request, response, next) {
        const data = request.query;
        // SQL 语句
        let SQL = 'SELECT * FROM user WHERE user_id='+data.user_id;

        console.log(SQL)
        DB(SQL).then(results => {
            results.code = '200';
            results.data = results;
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error => {
            handleResultError(response, error);
        })
    };
}

module.exports = userController