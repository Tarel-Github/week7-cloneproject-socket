const SocketIO =require('socket.io');
const ChatsRepository = require("./chat.repository");//리포지토리의 내용을 가져와야한다.


module.exports = (server) =>{

    const chatsRepository = new ChatsRepository();
    const io = SocketIO(server) 
    io.sockets.on('connection', function(socket) {
        console.log('READY')

        // this.chatsRepository.create
        socket.on('newUser', function(name) {              /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
            console.log(name + ' 님이 접속하였습니다.')  
            socket.name = name                                /* 소켓에 이름 저장해두기 */
            io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})/*socket.emit은 특정 개인에게만 보내지만 io.socket.emit은 모든 소켓에게 전송 */
        })

        /* 전송한 메시지 받기 *///on은 프론트엔드에서 보내준 데이터를 확인할 때 사용할 수 있다.
        socket.on('message', function(data) {  
            data.name = socket.name                                       /* 받은 데이터에 누가 보냈는지 이름을 추가 */
            
            console.log(data)                                             //메시지를 보낼 때 마다 타입, 내용, 보낸사람이 표시된다.
            console.log(data.message)                                     //메시지 내용중 mesaage에 해당하는 부분만을 추출

            console.log(data.chatListId)
            //################################################################
            const userId = 1;
            const chatListId = 4;//파람스를 통해 채팅룸아이디를 가져오기 전까지 보류
            const message = data.message;
            //################################################################
            const chat = chatsRepository.createChats(message, userId, chatListId);
            socket.broadcast.emit('update', data);                        /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
            
        })

        /* 접속 종료 */
        socket.on('disconnect', function() {                          
            console.log(socket.name + '님이 나가셨습니다.')
            console.log(socket.id, "나간사람의 아이디 입니다.")//이걸 보면 알듯 소켓에 접속하면 ID가 부여된다.
            socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'}); /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
        })
    })
}


