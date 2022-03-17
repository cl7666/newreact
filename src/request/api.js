import request from './request'

// 首页默认数据
export const HomeDefaultApi = () => request.get('/6666');

// 登录接口
export const LoginApi = (params) => request.post('/login', params)

// 注册接口
export const RegisterApi = (params) => request.post('/register', params)

//获取文章列表
export const ArticleListApi = (params) => request.get('/article', params)

