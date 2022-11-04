const fs = require('fs') 
const { SalePosts} = require('../models');          //모델 데이터를 가져오고

const ChatsRepository = require('./chat.repository');

class chatsRoom{
    chatsRepository = new ChatsRepository

    createRoom = async(req,res,next)=> {

      //바디로 가져올 데이터는, 포스트아이디와 유저 아이디
      // const { postId } = req.params;  //덧글을 작성할 포스트
      // const { postId } =req.body;    //덧글의 내용


      //################################################################임시데이터
      
      //const post = await SalePosts.findByPk(postId);          //포스트 아이디는 판매자 아이디, 바디에서 가져온다.
      //const { userId } = req.app.locals.user;     //유저아이디는 구매자 아이디, 로그인 정보에서 가져온다.
      const userId = 2;//여기서 유저 아이디는 구매자 id다.
      const postId = 1;//여기서 유저 아이디는 판매자 id다.
      const createChattingRoom = await this.chatsRepository.createRoom(userId, postId);
      //################################################################

      fs.readFile('./chat/static/index.html', function(err, data) {//이부분은 그저 html 파일을 보여주기 위한 부분이다.
          if(err) {
            res.send('에러')
          } else {
            res.writeHead(200, {'Content-Type':'text/html'})
            res.write(data)
            res.end()
          }
      })
      return createChattingRoom;
    }


    chat = async (req,res,next) =>{

    }


    
}
module.exports = chatsRoom;