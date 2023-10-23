/**
 * 这里连接github 获取用户公开库的API接口
 */
const axios = require('axios')

axios.interceptors.response.use(res => {
    return res.data;
})

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
    return axios.get('https://api.github.com/users/zs0902/repos')
}

module.exports = {
    getRepoList
}