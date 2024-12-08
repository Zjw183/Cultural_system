<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="app">
    <!-- 聊天窗口 -->
     <div class="xiaohong_back">
        <div class="xiaohong_licon"><i class="el-icon-d-arrow-left" @click="ret" style="color: #fff;"></i></div>
        <div id="xiaohong_header1" class="xiaohong_header1 clearfix" style="font-size: 20px;">“苏区红”文物探索智能助手</div>
     </div>
    <div id="content_overflow" class="xiaohong_chat-window">
      <div class="messages_box">
        <div v-for="(message, index) in messages" :key="index"  :class="{ 'own-message': message.senderId === '学生' }" id="message">
        
        <div v-if="message.avatarUrl" class="xiaohong_avatar-container">
          <img :src="message.avatarUrl" style="width: 40px; height: 40px; border-radius:50%" alt="Avatar"> 
           
          <span class="xiaohong" v-if="message.senderId==='苏小红' ">“苏区红”小助手</span>
        </div> 
         
        <div v-if ="message.type === 'text' " class="xiaohong_message-content" >
          <!-- <span v-html="markdownToHtml(message.content)"></span> -->
          你好呀，我是你的文物探索小助手，很高兴认识你!你有什么关于苏区革命文物相关的问题，想要了解的吗?
        </div>
        <!-- <div v-if="message.type == 'audio'" class="xiaohong_message-content">  -->
           <!--  音频文件  -->
            <!-- <div :style="{'width': message.duration*2+80+'px','height':'20px'}" @click="playAudio(message.audioUrl,index)">
                      <div class="wifi-warp ">
                          <div class="wifi-symbol">
                              <div class="wifi-circle first"></div>
                              <div class="wifi-circle second"></div>
                              <div class="wifi-circle third"></div>
                          </div>
                      </div>
                      <span style="font-size:14px;line-height:25px; white-space: nowrap"> {{message.audioUrl.duration==0?1:message.audioUrl.duration}} </span>
                  </div> -->
<!-- 
        </div>  -->
      </div>
    </div>
  </div>
       <!-- 消息输入框 -->
  <div class="bottom_input">
        <div class="xiaohong_input-area">
            <!-- <button class='btn-voice' :class="{ recording: isRecording }" @click="toggleRecording">
            <i class="el-icon-mic"></i>
          </button> -->
            
            <input v-model="newMessage" type="textarea" autosize placeholder="有什么问题尽管问我" @click="windowmove()" class="input-content">
             

            <td
            class="btn-send"
            id="btnSend"
            :style="{'color': newMessage != ''?'#fff':'#00000040','background-color': newMessage !=''?'rgb(228, 36, 23)':'#f5f5f5','border-color': newMessage !=''?'#518EA0':'#f5f5f5', 'cursor': 'default'}"
            @click="sendMessage"
          >
                 <i class="el-icon-s-promotion"></i>
           </td>
           
        </div>
  </div>

  <!-- <div class="xiaohong_chat-window1" v-if="this.isshow">
    <div class="content">{{  recordingStatus }}</div>
    <div class="music">
      <div class="item one"></div> 
      <div class="item two"></div>
      <div class="item three"></div>
      <div class="item four"></div> 
      <div class="item five"></div> 
      <div class="item six"></div> 
      <div class="item seven"></div>        
    </div>
  </div>  -->


</div>
</template>

<script scoped>
//   import marked from 'marked';
export default {
  data() {
    return {
      messages: [
        {  id: 1, content: '你好呀，我是你的文物探索小助手，很高兴认识你!你有什么关于苏区革命文物相关的问题，想要了解的吗?', senderId: '苏小红', avatarUrl: require('../../assets/zhushou.png'),type:'text'},
        // { id: 2, content: '嗨!', senderId: 'ownId', avatarUrl: require('@/assets/img/th.jpg'),type:'text' },
      ],
      newMessage: '',
      originalScrollPosition :0,
      recording: false,
      chunks: [],
      mediaRecorder: null,
      recordingStatus: '当前没有录音',
      audioSrc: null,
      isshow:false,
      isRecording: false,
      isyyshuru:false,
      url: '',
      timer: null,
      isPlaying: false,
      currentTime: 0,
      currentPlayVideo:'',
      isopen:false,
      lastAudio:'',
      lastMessage:''
    };
  },
  methods: {
    // markdownToHtml(markdown){
    //     // eslint-disable-next-line no-undef
    //     return marked(markdown);
    //   },
     //播放音频
     playAudio(item,index) 
     {
      console.log(this.messages);
      let messages = document.querySelectorAll("#message");

      //判断是否已开始播放，实现动画的开始和结束
      if(!this.isopen) {
        messages[index].children[1].children[0].className='animation';
        this.isopen = !this.isopen;
      }else if (this.isopen) {
        messages[index].children[1].children[0].className='';
        this.isopen = !this.isopen;
      }
      let _this = this;
      let audio = _this.audioDOM;

      //第一次点播放语音时 audio 为 null
      if (audio != null) {
        //判断是否为正在播放的音频

        //如果未播放完再次点击任意一条语音，则 _this.currentPlayVideo 会变为 undefined，与 item.agencyVideoDialogRecordID 一致
        if (_this.currentPlayVideo == item.agencyVideoDialogRecordID) {
          _this.currentPlayVideo = -1;
          this.lastAudio.pause();
          this.lastMessage.children[1].children[0].className='';
          messages[index].children[1].children[0].className='animation';
        }
      } else {
          audio = document.createElement('audio');
          _this.audioDOM = audio;
      }

      audio.src = item;
      audio.onload = function () { audio.play() }
      audio.play()
      this.currentPlayVideo = item.agencyVideoDialogRecordID
      //音频结束后的操作
      audio.addEventListener('ended', () => {
        messages[index].children[1].children[0].className='';
        this.isopen = false;
          _this.currentPlayVideo = -1
          _this.$forceUpdate()
      }, false);
      this.lastAudio = audio;
      this.lastMessage = messages[index];
    },
    // 存储原始的滚动位置
    toggleRecording() {
      
    if (this.isRecording) {
      this.stopRecording();
      this.isRecording = false;
      this.isshow=false
    } else {
      this.isshow=true
      this.startRecording();
      this.isRecording = true;
    }
    
  },
    startRecording() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.recording = true;
          this.recordingStatus = '正在录音';

          this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              console.log(event.data);
              this.chunks.push(event.data);
            }
          };
          console.log(this.chunks);

          this.mediaRecorder.onstop = () => {
            let blob = new Blob(this.chunks, {
              type: 'audio/webm;codecs=opus'
            });
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.src = audioUrl;
            audio.addEventListener('loadedmetadata',() => {
              audio.addEventListener('durationchange',() => {
                console.log(audio.duration);
                if (!isNaN(audio.duration) && audio.duration !== Infinity) {
                console.log('音频时长:', audio.duration);
                // 在这里执行需要依赖音频时长的代码
                } else {
                  console.error('无法获取音频时长');
                }
                const messageId = this.messages.length + 1;
                this.messages.push({
                  id: messageId,
                  audioUrl: audioUrl,
                  senderId: '学生',
                  avatarUrl: require('../../assets/zhushou.png'),
                  type: 'audio',
                  duration:audio.duration
                });
                })
            })
            audio.load();
            
            this.recording = false;
            this.recordingStatus = '录音已结束';
          };
        })
        .catch((err) => {
          console.log('Error accessing microphone: ', err);
        });
    }
  },
  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  },

    windowmove(){
       var originalScrollPosition;
       // 监听窗口大小变化
        // 检查窗口高度是否有变化，这可能是由于键盘的显示或隐藏
        if (document.body.scrollHeight > window.innerHeight) {
          // 键盘显示，保存原始滚动位置，并调整滚动
          originalScrollPosition = window.pageYOffset;
          window.scrollTo(0, originalScrollPosition);
        } else {
          // 键盘隐藏，恢复滚动位置
          window.scrollTo(0, originalScrollPosition);
}
  },
  ret() {
          this.$router.back();
      },
    sendVoice(){

    },
    sendMessage() {
      if (!this.newMessage.trim()) return;
      const newMessage = {
        id: Date.now(),
        content: this.newMessage,
        senderId: '学生', // 假设这是自己的ID
        avatarUrl: '',//学生头像的url 但暂时不用
        type:'text' // 假设这是自己的头像URL
      };
      var answer =   {  id: 1, content: '...', senderId: '苏小红', avatarUrl: require('../../assets/zhushou.png'),type:'text' }
      this.messages.push(newMessage);     
      console.log(this.messages);
      
      var messageContainer = document.getElementById('content_overflow');  
      const data = {
      user_id: "zzp",
      kb_ids: ["KB396aceb167d54be9bc38b4f3c364cc38","KB49b53e27279a4ead8157c488a9843a24","KB4135067f72354a44a9dee4f9e99416d3"
        ,"KBfb06cd2ff0bd40578b122560922df17c","KB04067bfa1fb545d6869ad56d967167a3","KB055ba53ba85f433fab7b6dca3b172eb3"
        ,"KB3398ffc063f14b3b8d9e78b245344c9b","KB92a22c3047d849b6b36b7a847f8ed33c","KB4c5f364e743a4818acd2b20b3bcc5587"
        ,"KBe0ab2fcd16b54f4a95bcffec59067aa0"
      ],
      question: this.newMessage,
      streaming:"true"
      };
      this.newMessage = '';
      this.messages.push(answer)
      var i = 0
      const that = this
      const len = this.messages.length
      // 发送请求
      fetch('http://119.91.38.234/api/local_doc_qa/local_doc_chat', {
        // 可以添加任何必要的配置选项，例如方法、头部等
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
            // 获取响应的可读流
            const reader = response.body.getReader();
            // 读取流中的数据
            function processStream() {
              reader.read().then(function processChunk({ done, value }) {
                if (done) {
                  console.log('Stream complete');
                  return;
                }
                if(i==0){
                  that.messages[len - 1].content = '';
                  i++;
                }
                var decodedData = new TextDecoder().decode(value);
                try {        
                  const responses = decodedData.match(/"response"\s*:\s*"([^"]+)"/g).map(match => match.replace(/"response"\s*:\s*"([^"]+)"/, '$1'));
                  const st = responses.join('');

                  that.messages[len - 1].content += st.replace(/\\n/g, '\n');
                  messageContainer.scrollTop = messageContainer.scrollHeight; 
                } catch (error) {
                  console.error('Error decoding or parsing data:', error);
                }
                // 继续读取下一块数据
                processStream();
              });
            }
            // 开始处理流
            processStream();
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    },
  },
  
watch: {
messages(value) {
      //页面渲染完成后执行
    this.$nextTick(() => {
      this.toBottom();
    });
  },
}

};
</script>

<style scoped>
.xiaohong_chat-window {
  /* background-image:url( "../assets/img/zx.png"); */
  height: calc(100vh - 50px );
  overflow-y: auto;
  background-color: #f5f7fa;
  /* margin-top: 20px; */
  overflow: scroll;

}

.messages_box{
  padding-bottom: 60px;
}
.message {
  display: flex;
  margin-top: 5px;
  margin-left: 10px;
  align-items: center;
  margin-bottom: 10px;

}

.own-message {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.xiaohong_avatar-container{
  display: flex;            /* 使用flex布局  这是包括了头像和名称的div*/
  align-items: center; 
  margin-left: 8px;
  margin-top: 13px;
}

.avatar {
  height: 100%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
  flex-direction: column;
  text-align: right; 
}
.own-avatar {
  margin-left: auto; /* 将消息内容推到右侧 */
  text-align: right; /* 文本在右侧对齐 */
  display: flex;
  align-items: center; 
  justify-content: flex-start;
  border-radius: 50%;
  margin-right: 8px;
}
.xiaohong{
display: flex;
align-items: center;
white-space: nowrap;     /* 防止文本换行 */
margin-left: 8px;
}
 .own-message  {
  order: 2;
  margin-right: 0;
  margin-left: 3px;
  margin-top: 2%;
} 

.xiaohong_message-content {
  /* padding-left: 20px!important; */
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
  word-wrap: break-word;
  margin-top: 2%;
  background-color: white;
  margin-left: 2vh;
  /* padding-top: 0px; */
}

.own-message .xiaohong_message-content {
  background-color: rgb(251, 167, 152);
  margin-left: auto; /* 将消息内容推到右侧 */
  text-align: left; 
  max-width: 80%;
  margin-right: 2vh;

}
.bottom_input {
  position: absolute;
  height: 8%;
  width: 100vw;
  background-color: #f5f7fa;
  bottom: 0px;
  z-index: 1;
}
.xiaohong_input-area {
  box-shadow: 0 2px 12px 0 rgba(202, 200, 200, 0.1);
  display: flex;
  justify-content:space-between;
  align-items: center;
  flex-direction: column;
  padding: 0px 0px;
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;
  background-color: #fff;
  border-radius: 30px;
  height: 6vh;
}


.input-content {
  display: flex;
  resize: none;
  font-size: 17px;
  border:none;
  outline: none;
  height: 6vh;
  margin-left: -40px;
}

.el-icon-s-promotion {
  margin-right: 13px;
  font-size: 32px;
  justify-content: center;
  align-items: center;
}

.xiaohong_header1 {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: rgb(0, 0, 0);
  font-family: 'YaHei';
  font-size: 13px;
  font-weight: 800;
  background-color: #D3D3D3;
 
}
#footer {
  position: absolute;
  padding: 12px 14px;
  width: 80%;
  margin-left: 0;
  left: 0;
  right: 270px;
  margin-left: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 1px 0 0 #eaeaea;

}

.sender, .msg .sender {
  font-size: 12px;
  color: rgba(36,46,51,.4);
  display: block;
  min-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
 
 .btn-send {
  display: flex;
  position: absolute;
 
  right: 32px;
  bottom: 15%;
  z-index: 10;
  font-size: 18px;
  color: rgb(243, 59, 59);
  line-height: 35px;
  border: 1px solid #e6e6e6;
  background: #f5f5f5;
  border-radius: 50%;
  width: 34px; /* 按钮的宽度 */
  height: 34px;
}
.xiaohong_licon {
  position: absolute;
  line-height: 65px;
  left: 5px;
  font-size: 15x;
}

.xiaohong_licon i {
  font-size: 30px;
  color: rgb(255, 255, 255);
}

.el-icon-mic{
font-size: 24px;
margin-right: 18px;
justify-content: center;
align-items: center;
}
.btn-voice{
display: flex;
align-items: center;
position: absolute;
margin-right: 260px;
border: none;
position: absolute;
background-color: white;
}
.xiaohong_chat-window1{
background-color: rgba(207, 216, 226, 0.5);
width:100%;
height:25%;
display: flex;
z-index: 30000;
position: absolute;
bottom: 50px;
margin: 0 auto;
text-align: center;
}

*{
  margin: 0;
  padding: 0;
}
.wifi-symbol {
  margin: 0;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(315deg);
  position: relative;
  margin-right: 1vh;
}

.wifi-circle {
  border: 3px solid #999999;
  border-radius: 999px;
  position: absolute;
}

.first {
  width: 5px;
  height: 5px;
  background-color: #999999;
  top: 25px;
  left: 25px;
  
}

.second {
  width: 25px;
  height: 25px;
  top: 17.5px;
  left: 17.5px;
}

.third {
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
}

.animation .second{
  animation: fadeInOut 1s infinite 0.2s;
}

.animation .third{
  animation: fadeInOut 1s infinite 0.4s;
}

@keyframes fadeInOut {
  0% {
      opacity: 0; /*初始状态 透明度为0*/
  }
  100% {
      opacity: 1; /*结尾状态 透明度为1*/
  }
}

.item {
position: absolute;
width: 8px;
border-radius: 6px;
background-color: #1f94ea;

}  

.music {
width: 100%;
height: 50%;
position: absolute;
bottom: 20%;
left: 0%;
transform: rotate(180deg)
}

.music .one {
height: 18px;
transform: translateX(110px);
}
.music .two {
height: 53px;
transform: translateX(130px);
}
.music .three {
height: 36px;
transform: translateX(150px);
}
.music .four {
height: 70px;
transform: translateX(170px);
}

.music .five {
height: 30px;
transform: translateX(190px);
}

.music .six {
height: 40px;
transform: translateX(210px);
}
.music .seven {
height: 50px;
transform: translateX(230px);
}

@keyframes radius-animation {
100% {
    height: 10px;
    border-radius: 50%;
    filter: contrast(2);
}
}
.music .one {
animation: radius-animation .3s ease;
}
.music .two {
animation: radius-animation .6s ease;
}
.music .three {
animation: radius-animation .57s ease;
}
.music .four {
animation: radius-animation .52s ease;
}
.music .five {
animation: radius-animation .4s ease;
}
.music .six {
animation: radius-animation .3s ease;
}
.music .seven {
animation: radius-animation .7s ease;
}
.music .item {
animation-iteration-count: infinite;
-webkit-animation-iteration-count: infinite;
animation-direction: alternate;
-webkit-animation-direction: alternate; 
}

.content {
width: 100%;
height: 15%;
margin: 5% auto 0;
}
</style>