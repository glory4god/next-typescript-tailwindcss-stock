# 주(식하는) 사(람들의) (이야)기

## 프로젝트 소개
- 처음 개발 공부를 시작하면서 단순히 공부만 하는것에 그치지않고 직접 내가 해보고 싶었던 것을 개발하면서 성장하자는 생각과 당시 가장 흥미롭게 생각했던 주식이라는 소재를 갖고, 기존에 존재하는 게시글, 채팅으로만 소통하던 주식 관련 커뮤니티가 아닌 주식에 관심있는 사람들의 더 다양한 정보를 통해 소통하는 커뮤니티를 만들어보자라는 생각으로 시작했던 프로젝트입니다.
- 다양한 정보란 사용자가 원하는 기업에 내가 원하는 조건에 따른 차트를 직접 그려보고 그 차트를 통해서 전달하고자하는 말이 무엇인지를 소개하는 리포트 형식의 커뮤니티 게시판을 만드려합니다.


#### 로고

- 로고의 의미는 프로젝트 이름의 주사기를 누를 때 나오는 물줄기가 주식차트의 실시간 틱이 움직임과 비슷함을 통해 제작하였다.
<img src="https://user-images.githubusercontent.com/78658208/145834912-be7df61c-3174-44d9-8961-f907dde6ea16.png" width="200" height="200"/>


## Stack
#### FE
 - Nextjs + TypeScript (create-next-app)
 - React hooks 
 - TailwindCSS / module.css
 - reponsive web
 - react-redux / redux toolkit 
 - materialUI /recharts / datepicker
 - sockjs / stompjs

#### BE
 - https://github.com/glory4god/stock-backend


## Page Preview
### 1. /chart/line
<img src="https://user-images.githubusercontent.com/78658208/145825785-651ce2ed-4c9e-4b84-a9b7-45f651b2361b.png" width="100%" height="500"/>

 - 주식 종목을 직접 선택하여 그리고 싶은 차트를 그린다.
 - 국내 주식 종목 / 원하는 기간(datepicker) / 시가, 고가, 저가, 종가, 시가&종가, 시가&종가&고가&저가 / 라인, 히스토그램 차트 선택이 가능하다. 
 
<img src="https://user-images.githubusercontent.com/78658208/145825527-459bac6f-e704-4738-ba15-822748105697.png" width="100%" height="500"/>

 - recharts 라이브러리를 활용한 라인, 히스토그램 차트와 직접 커스텀한 캔들차트, 거래량을 그린다.
 - 그린 차트에 대한 정보를 게시글로 저장하여 다른 사람과 공유 / 다시 보기가 가능하다.

### 2. /news

<img src="https://user-images.githubusercontent.com/78658208/145825444-471be70e-448d-4ad2-8eaf-ef17885d4b72.png" width="100%" height="500"/>

 - 네이버 뉴스 API를 활용하여 키워드기반 뉴스 검색이 가능하다. (최산순, 관련도순으로 sort 가능)
 - 우측 인기검색어를 통해 사람들이 많이 검색한 키워드와 뉴스를 확인할 수 있다.(일별, 주별 인기 순위 조회 가능)
 - 뉴스 검색시 / 뉴스 클릭시에 데이터가 저장된다.

<img src="https://user-images.githubusercontent.com/78658208/145827430-2da50e57-2538-4e82-8c62-6ae0307ca754.png" width="100%" height="500"/>

 - 일별 hot keyword에 대한 시각적 효과를 높이기 위해 해쉬태그(#) 별로 인기 뉴스를 미리 볼 수 있다. (클릭시에 해당 뉴스 URL로 이동)
 - 우측 상단 클립보드 저장을 눌러 URL만 복사도 가능하다.

### 3. /board/chart, /board/chart/:[boardId]

<img src="https://user-images.githubusercontent.com/78658208/145831613-a5a3a529-f7a5-4be3-a6d6-a9b75160be32.png" width="100%" height="500"/>

 - 조회한 차트에 대한 정보를 다른 사람들과 공유할 수 있는 게시판이다.
 - 좌측 상단 셀렉트를 통해 원하는 종목별 게시글 조회가 가능하다.
   (AutoComplete 기능으로 원하는 종목을 쉽게 찾는다. / Redux로 상태관리하여 당시 상태를 통해 게시글 아래 목록에 영향을 미친다.) 
 - 우측 상단 버튼을 통해 최신순 / 좋아요 높은순 / 조회수 높은순으로 sort가 가능하다.

<img src="https://user-images.githubusercontent.com/78658208/145828681-a08d68b1-3bf9-4fd1-addb-c617520020e9.png" width="100%" height="500"/>

 - 게시글의 "차트 보기" 버튼을 누르면 글쓴이가 조회한 차트에 대한 정보를 얻는다.(미구현 상태)
 - 글작성, 수정, 삭제, 좋아요, 싫어요, 조회수 등의 기능으로 게시글에 대한 CRUD 기능이 존재한다. (댓글기능 미구현 상태)
 - 하단 다른 게시글 목록으로 현재 게시글과 연관된 게시글을 제공한다.

### 4. /board/bulletin, /board/chart/:[boardId]

<img src="https://user-images.githubusercontent.com/78658208/145830098-a333c5f7-3cf8-4fbe-a015-2e2268b1b74a.png" width="100%" height="500"/>

 - 자유게시판 형태로 기본적인 기능은 /borad/chart의 기능을 갖는다.
 - 
### 5. /board/my, /board/my/:[boardId]

 - 내가 쓴 게시글 목록을 얻을 수 있다.


## Responsive Web

 - 다양한 환경 제공(pc / tablet / mobile)
 - transition을 이용한 부드러운 움직임 제공
 
<img src="https://user-images.githubusercontent.com/78658208/145832203-fe939f54-5a91-44fe-bbfa-8b3147c75476.png" width="330" height="650"/> <img src="https://user-images.githubusercontent.com/78658208/145832358-1ba8fff3-9d86-4971-8003-30897f545b1b.png" width="330" height="650"/> <img src="https://user-images.githubusercontent.com/78658208/145832539-27d40f35-6bfc-4d75-a637-3bd3ef3d1d0b.png" width="330" height="650"/>
 <img src="https://user-images.githubusercontent.com/78658208/145832690-bce3a239-d22a-4d1d-8c05-c21be8228d28.png"  width="500" height="600"/>
 <img src="https://user-images.githubusercontent.com/78658208/145832665-96347198-820d-4a6f-af0e-d6b7e303e96f.png" width="500" height="600"/>


## 실시간 채팅

 - webSocket을 이용한 실시간채팅으로 양방향 통신이 가능하다.
 - 로그인(카카오 API)한 유저만 채팅에 참여할 수 있다. (비로그인 상태에선 보기만 가능)
 
<img src="https://user-images.githubusercontent.com/78658208/145834369-8e6634d3-c560-45c7-b8b7-529344ef9496.png" width="330" height="450"/>
 

## 프로젝트 기술서는 아래 링크에 있습니다.
https://fixed-mask-ed8.notion.site/1e018fbaa0b34f5d86be186ccd062544
