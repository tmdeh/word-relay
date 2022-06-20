끝말 잇기(word-relay)
===
2022년 3월 31일 ~ 2022년 6월 21일(약 3개월)

### Intro

심심할 때 간단하게 친구들과 함께 시간을 때울 수 있는 끝말 잇기 게임 입니다.

3학년 1학기 프로젝트 실습과목의 개인 프로젝트 입니다. 

---
### Why?(프로젝트 계기)
* 웹 소켓 통신을 사용한 서비스를 개발하고 싶었다.
    *  학교에서 진행하던 나르샤 프로젝트에서 채팅 서비스를 협업하여 개발 하였으나 소켓을 어깨 너머로만 보았고 사용은 해보지 못 하였기 때문에 이번 기회에 소켓을 사용해보고 싶었다.   
* 프론트와 백 모두를 사용하여 혼자서 프로젝트의 끝을 보고 싶었다.
* 웹 게임을 만들어 보고 싶었다.

### 프로젝트 기술 스택
* Front-End
    *  React.js
    *  Recoil
    *  socket.io-client
* Back-End
    *  Express/Node.js
    *  Mongo DB/Mongoose
    *  socket.io

### 흐름

1. 닉네임 설정
<img src="https://user-images.githubusercontent.com/66948129/174593658-6c5b4471-de50-4d0e-ac17-2cc58d633751.png" width="70%" height="70%"/>
2. 홈/메인
<img src="https://user-images.githubusercontent.com/66948129/174593776-8a595609-7540-4b5b-a068-0fcbd21a245b.png" width="70%" height="70%"/>
3. 방
<img src="https://user-images.githubusercontent.com/66948129/174593840-0a5a2fab-5eab-4331-947c-533c7c460ee3.png" width="70%" height="70%"/>
4. 게임
<img src="https://user-images.githubusercontent.com/66948129/174593973-10add371-a625-400b-a6c6-58974b536102.png" width="70%" height="70%"/>
4. 결과
<img src="https://user-images.githubusercontent.com/66948129/174594002-4e5dcbe2-6791-494e-864b-e779373cb2d3.png" width="70%" height="70%"/>

----

### 주요 기능

* 닉네임 설정/수정
* 방 생성
   *  비밀번호 설정
*  방 입장
*  끝말 잇기
   *  배치되어진 순서대로 진행한다.
   *  글자 수에 따라 점수를 얻는다 ex)가나다 = 3점
   *  시간 내에 응답을 하지 못한 경우 목숨이 깎인다.
   *  목숨이 0이 되면 게임이 끝난다.
*  결과 출력 및 DB에 저장

---

### 프로젝트를 진행하며
* socket.io 사용 법을 익혔으며 React에서 socket.io를 사용하는 방법을 알 수 있었다.
* npm에서 필요한 모듈을 받아 프로젝트에 적용하는 방법을 익혔다.
* StackOverflow에서 많은 문제들을 해결 하였다.
    * React에서 Socket.io사용하기
    * Mongoose로 배열 요소 삽입/수정하기
* MongoDB/Mongoose를 사용하며 NoSQL 경험을 얻을 수 있었다.
* 새로운 것에 대한 배움을 즐길 수 있었다.
