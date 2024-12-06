<template>
    <div>
        <div class="show-video-head">
            <div class="header-box">
                <div class="header-left">
                    <img src="@/assets/苏区红文物展览系统.png" class="logo-title"/>
                </div>
            
                <div class="search-box">
                    <el-input
                        v-model="keyword"
                        type="text"
                        placeholder="请输入检索关键词..."
                        class="search-input"
                        @input="handleInput()">
                    </el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()"></el-button>
                </div>
                <!-- 原先的请求 -->
                <!-- <div v-if="!this.$store.state.User.username">
                    <button class="login" @click="openLoginBox">
                        <span>登录</span>
                    </button>
                </div>
                <div v-else class="user_name" @click="showUser">
                    <div class="header-name">
                        <div class="show-name">
                        {{ this.$store.state.User.username }}
                        </div>
                        <i class="el-icon-arrow-up" :class="{show :isShow}"></i>
                        <i class="el-icon-arrow-down" :class="{show :!isShow}"></i>
                    </div>
                </div> -->
                <div >
                    <button class="login" @click="openLoginBox">
                        <span>登录</span>
                    </button>
                </div>
                <!-- <div class="user_name" @click="showUser">
                    <div class="header-name">
                        <div class="show-name">
                        {{ this.$store.state.User.username }}
                        </div>
                        <i class="el-icon-arrow-up" :class="{show :isShow}"></i>
                        <i class="el-icon-arrow-down" :class="{show :!isShow}"></i>
                    </div>
                </div> -->
            </div>

            <!-- <div id="user" :class="{ show: isShow }">
                <div class="under-name">
                    <div>{{ this.$store.state.User.username }}</div>
                </div>
                <hr />
                <div class="limit">
                    <div class="user-nav">
                        <i class="el-icon-folder"></i>
                        <router-link to="/backendTranslation">后台管理</router-link>
                    </div>
                    
                    <div class="user-nav" @click="logout">
                        <i class="el-icon-switch-button"></i>
                        <router-link to="">退出登录</router-link>
                    </div>
                </div>
            </div> -->
        </div>

        <!-- <el-dialog title="登录" 
            :visible.sync="loginBoxVisible" 
            :width="dialogWidth"
            >
            <span>
                <div class="login-card-content">
                    <div>
                        <el-input prefix-icon="el-icon-s-custom" placeholder="请输入账号" v-model="userInfo.account"
                            clearable class="input_message">
                        </el-input>
                    </div>

                    <div>
                        <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="userInfo.password"
                            show-password class="input_message"></el-input>
                    </div>

                    <div class="check_box">
                        <el-input prefix-icon="el-icon-user" placeholder="请输入验证码" v-model="userInfo.code"
                            @keyup.enter="login"></el-input>
                        <img :src="captchaUrl" @click="clickImg()" class="check_img" />
                    </div>

                    <div class="rememberPwd">
                        <el-checkbox v-model="remember" class="remember_password">记住密码</el-checkbox>
                    </div>

                    <div class="input">
                        <el-button class="login-button" type="primary" style="width: 90%; margin: 10px 5%; padding: 10px;" @click="login">登录</el-button>
                    </div>
                </div>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
// import { _ } from 'core-js';
import { mapActions } from 'vuex';
import { ElInput, ElButton } from 'element-ui';
export default {
    data() {
        return {
            captchaUrl: '',
            loginBoxVisible: false,
            userInfo: {
                account: "",
                password: "",
                code: "",   // 验证码
            },
            remember: '',
            isShow: true,
            dialogWidth: '50%',
            isMobile: false,
            // isSearchPage:this.$route.path.includes('/searchpage'),
            keyword:''
        }
    },
    components: {
        ElInput,
        ElButton
    },
    mounted() {
        // console.log(this.$store.state.User)

        // 按窗口屏幕改变登录弹窗大小
        this.handleResize();
        window.addEventListener("keyup", this.keyDown);
        window.addEventListener('resize', this.handleResize);
        this.firstTOSearchPage();
    },
    beforeDestroy() {
        // 销毁事件
        window.removeEventListener("keydown", this.keyDown, false);
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleInput(value) {
        // 当输入框内容变化时执行的逻辑（可选）
        console.log('Input value:', value);
        },
        handleSearch() {
        // 当点击搜索按钮时执行的逻辑
        console.log('Searching for:', this.keyword);
        },
        // 返回上一个页面
        back() {
            if(this.$route.path!='/')
                this.$router.back()
        },
        // 页面大小改变，改变登录窗口大小
        handleResize() {
            if (window.innerWidth <= 768) {
                this.dialogWidth = '80%';
                this.isMobile = true;
            } else {
                this.dialogWidth = '35%';
                this.isMobile = false;
            }
        },
        firstTOSearchPage(){
          // 进入搜索页面 username不显示 右边距增加
            if(this.isSearchPage){
                document.querySelector('.search-input').focus();
                document.querySelector('.user_name').style.display = 'none';
                document.querySelector('.search-box').style.marginRight = '20%';
                document.querySelector('.search-button').style.display = 'block';
            }
        },
        toSearchPage(){
            console.log(this.isMobile)
            console.log(this.isSearchPage)
            //手机主页面且非搜索页面时，点击即可输入框即跳转搜索页面
            if(this.isMobile && !this.isSearchPage){
                this.$router.push({
                    path:'/HistoricalLibrary_searchpage'
                })
            }
        },
        // 搜索按钮
        toSearch() {
            if (!this.$store.state.User.token){
                this.$message.warning("请先登录后才可进行检索操作！");
                return;
            }

            if (this.keyword && !this.keyword.match(/^[ ]*$/) ) {
                // 首页搜索跳转searchpage
                if(!this.isSearchPage){
                    this.$router.push({
                        path: "/HistoricalLibrary_searchpage",
                    })
                }
                // 在搜索页面，将keyword传给searchpage
                this.$emit('dataFromChild',this.keyword);
            }else{console.log("error to search")}
            
        },
        // 登录弹窗
        openLoginBox() {
            this.getCaptcha();
            this.loginBoxVisible = true;
        },
        login() {
            this.$axios({
                method: "post",
                url: `/user/login?account=${this.userInfo.account}&password=${this.userInfo.password}&key=${this.key}&code=${this.userInfo.code}`,
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code === 400) {
                        this.$message.error(res.data.data);
                        setTimeout(() => {
                            if (res.data.message === '验证码已过期，请重新获取！') {
                                location.reload();
                            }
                        }, 1500);

                    } else if (res.data.code === 200) {

                        const data = res.data.data;
                        console.log(data);
                        this.loginBoxVisible = false;
                        this.setStoreState(data);
                        this.$store.commit('SET_TOKEN', data.token); // 使用 mutation 更新 token  
                        localStorage.setItem('token', JSON.stringify(data.token)); // 将 token 写入 localStorage  
                        localStorage.setItem('user', JSON.stringify(data)); // 将用户信息写入 localStorage  
                        localStorage.setItem('loginSuccess', true); // 新增一个标志表示登录成功
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.$message.error(err);
                });
        },
        getCaptcha() {
            this.key = Math.random()
            if (window.trueUrl == "http://127.0.0.1:8022") {
                // 验证码（本地后端和服务器后端）传本地的验证码
                this.captchaUrl = `http://localhost:8021/captcha?key=${this.key}`
            }
            else {
                //传服务器的验证码
                this.captchaUrl = `http://sqh.gnnu.edu.cn/api/captcha?key=${this.key}`
            }
            let account = this.getCookie("account")
            let password = this.getCookie("password")
            // 如果存在赋值给表单，并且将记住密码勾选
            if (account) {
                this.userInfo.account = account
                this.userInfo.password = password
                // this.userInfo.school = school
                this.userInfo.remember = true
            }
        },
        // 回车 = 搜索/登录
        keyDown(e) {
            // 回车则执行登录方法 enter键的ASCII是13
            if (e.keyCode == 13) {
                    this.login();
                }
            },
        setStoreState(data) {
            this.$store.commit('SET_USER', {
                id: data.id,
                username: data.username,
                account: data.account,
                role: data.role
            });
            this.$store.commit('SET_USER', data);
        },
        getCookie(key) {
            if (document.cookie.length > 0) {
                var start = document.cookie.indexOf(key + '=')
                if (start !== -1) {
                    start = start + key.length + 1
                    var end = document.cookie.indexOf(';', start)
                    if (end === -1) end = document.cookie.length
                    return unescape(document.cookie.substring(start, end))
                }
            }
            return ''
        },
        showUser() {
            this.isShow = !this.isShow;
        },
        ...mapActions(['clearUserInfo']),
        logout() { // 退出逻辑
            this.clearUserInfo(); // 清除用户信息
            localStorage.removeItem('token'); // 清除token
            window.location.reload(); // 刷新页面
        }
    }
}

</script>

<style scoped>
@import './responsive_css/header.css';

/* common style 涉及宽度、高度、边距大小 写在响应式css */
/* -------------------头部------------------------ */
.show-video-head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: rgb(24, 49, 69);
    top:0;
    height:120px;
    position: absolute;
}
/* 头部 子盒子行排列 居中 靠左右均匀分布 */
.header-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
}
/* 返回 图片 */
.backimg{
    width: 30px;
    height: 30px;
    cursor: pointer;
}
/* 搜索 */
.search-box {
    display: flex;
    align-items: center;
}
/* 搜索框 */
.search-input {
    color: rgb(0, 0, 0);
    font-size: 18px;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 4px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.search-input:focus {
    border: 1px solid #4d6266;
}
/* 搜索按钮 */
.search-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: 2px solid #0056b3;
    /* 为按钮添加左侧边框 */
}

.search-button:hover {
    background-color: #0056b3;
}

/* 登录按钮 */
.login {
    border: 1px solid #fff;
    box-shadow: 0 2px 0 0 rgba(125, 125, 125, 0.2);
    color: #fff;
    font-size: 16px;
    border-radius: 10%;
    background-color: transparent;
    cursor: pointer;
    margin-top:32px;
}

.login:hover {
    font-weight: bold;
}
/* 用户信息 */
.user_name {
    text-align: center;
    color: #fff;
    cursor: pointer;
}

.header-name{
    display: flex;
    flex-direction: row;
}
.show-name{
    white-space: nowrap;      /* 保持文本在一行内 */
    overflow: hidden;         /* 隐藏超出部分 */
    text-overflow: ellipsis;  /* 超出部分显示省略号 */
}
/* ------------------------user展开---------------- */
#user {
    position: absolute;
    z-index: 9;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 5%;
    background-color: rgb(211, 226, 252);

}


/*-------------------------登录弹窗 --------------- */
 .el-dialog {
    border-radius: 14px;
    box-shadow: 0px 0px 3px 3px rgba(86, 96, 104, 0.5);
    background-color: #fff;
}

/* 确定登录按钮样式 */
.login-button {
  margin-top: 20px;
  border-radius: 4px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 按钮阴影 */
  height: 4.3hw;
}

/* 鼠标悬浮在按钮上时的样式 */
.login-button:hover {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
}
/* 账号密码输入框 */
.input_message {
    /* 居中对齐 */
    left: 50%;
    width: 90%;
    margin-top: 30px;
    transform: translateX(-50%);
}
/* 验证码 盒子 */
.check_box {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    padding-left: 5%;
    gap: 10px;
}
.check_img {
    height:38px;
    width:50%; 
}
.remember_password {
    margin-top: 30px;
    margin-bottom: 28px;
    margin-left: 20px;

}
/* 登录后 信息框 */
.show {
    display: none!important;
}
.header-left {
    margin-left: 15%;
    margin-right: -5%;
}

.logo-title {
    width: 130%;
    margin-left: 12%;
}
.search-box {
  width: 35%;
}
.search-input {
  width: 100%;
}
</style>