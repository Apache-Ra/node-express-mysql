const config = {
    // 启动端口
    port: 3000,
    // 数据库配置
    database: {
        DATABASE: 'test',
        USERNAME: 'root',
        PASSWORD: 'summer',
        PORT: '3306',
        HOST: 'localhost',
        insecureAuth : true,
        useConnectionPooling: true
    }
}

module.exports = config