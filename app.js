require('dotenv').config();
const express = require("express");
const app = express();
const routes = require('./index');

//================================================================
const http = require('http')                /* Node.js 기본 내장 모듈 불러오기 */
const server = http.createServer(app)       /* express http 서버 생성 */
const socketIO = require('./chat/socket');
socketIO(server)
//================================================================

//################################
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//################################


app.use('/', routes);

//일반 서버
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT + " 서버를 가동합니다");
  });

//채팅용 서버, 이걸 사용하면 도메인을 두배로 잡아먹는가?? 굳이 따로 쓸 필요가 있는가????
server.listen(process.env.PORT_CHAT, function() {/* 서버를 4500 포트로 listen */
  console.log(process.env.PORT_CHAT+ ' 서버를 가동합니다')
})

