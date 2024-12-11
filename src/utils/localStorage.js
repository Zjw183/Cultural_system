const TOKEN_NAME = 'token'
const USER_ACCOUNT = 'uid'
//保存
export const saveToken = (tokenObj=>{
    localStorage.setItem(TOKEN_NAME,JSON.stringify(tokenObj))
})
export const saveAccount = (account=>{
    localStorage.setItem(USER_ACCOUNT,account)
})


// 2. 获取
export const getToken = () => {
    return JSON.parse(localStorage.getItem(TOKEN_NAME))
}
export const getAccount = () => {
    return JSON.parse(localStorage.getItem(USER_ACCOUNT))
}
   
// 3. 删除
export const delToken = () => {
    localStorage.removeItem(TOKEN_NAME)
}
export const delAccount = () => {
    localStorage.removeItem(USER_ACCOUNT)
}