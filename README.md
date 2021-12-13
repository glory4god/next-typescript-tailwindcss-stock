# 주(식하는) 사(람들의) (이야)기


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
1. /chart/line
<img src="https://user-images.githubusercontent.com/78658208/145825785-651ce2ed-4c9e-4b84-a9b7-45f651b2361b.png" width="700" height="400"/>
 - 주식 종목을 직접 선택하여 그리고 싶은 차트를 그린다.
 - 국내 주식 종목 / 원하는 기간(datepicker) / 시가, 고가, 저가, 종가, 시가&종가, 시가&종가&고가&저가 / 라인, 히스토그램 차트 선택이 가능하다. 
<img src="https://user-images.githubusercontent.com/78658208/145825527-459bac6f-e704-4738-ba15-822748105697.png" width="700" height="400"/>
 - recharts 라이브러리를 활용한 라인, 히스토그램 차트와 직접 커스텀한 캔들차트, 거래량을 그린다.
 - 그린 차트에 대한 정보를 게시글로 저장하여 다른 사람과 공유 / 다시 보기가 가능하다.

2. /news
<img src="https://user-images.githubusercontent.com/78658208/145825444-471be70e-448d-4ad2-8eaf-ef17885d4b72.png" width="700" height="400"/>
 - 네이버 뉴스 API를 활용하여 키워드기반 뉴스 검색이 가능하다. (최산순, 관련도순으로 sort 가능)
 - 우측 인기검색어를 통해 사람들이 많이 검색한 키워드와 뉴스를 확인할 수 있다.(일별, 주별 인기 순위 조회 가능)
 - 뉴스 검색시 / 뉴스 클릭시에 데이터가 저장된다.

<img src="https://user-images.githubusercontent.com/78658208/145827430-2da50e57-2538-4e82-8c62-6ae0307ca754.png" width="700" height="400"/>
 - 일별 hot keyword에 대한 시각적 효과를 높이기 위해 해쉬태그(#) 별로 인기 뉴스를 미리 볼 수 있다. (클릭시에 해당 뉴스 URL로 이동)
 - 우측 상단 클립보드 저장을 눌러 URL만 복사도 가능하다.

3. /board/chart, /board/chart/:[boardId]
<img src="https://user-images.githubusercontent.com/78658208/145827430-2da50e57-2538-4e82-8c62-6ae0307ca754.png" width="700" height="400"/>
 - 조회한 차트에 대한 정보를 다른 사람들과 공유할 수 있는 게시판이다.
 - 좌측 상단 셀렉트를 통해 원하는 종목별 게시글 조회가 가능하다.
   (AutoComplete 기능으로 원하는 종목을 쉽게 찾는다. / Redux로 상태관리하여 당시 상태를 통해 게시글 아래 목록에 영향을 미친다.) 
 - 우측 상단 버튼을 통해 최신순 / 좋아요 높은순 / 조회수 높은순으로 sort가 가능하다.

<img src="https://user-images.githubusercontent.com/78658208/145828681-a08d68b1-3bf9-4fd1-addb-c617520020e9.png" width="700" height="400"/>
 - 게시글의 "차트 보기" 버튼을 누르면 글쓴이가 조회한 차트에 대한 정보를 얻는다.(미구현 상태)
 - 글작성, 수정, 삭제, 좋아요, 싫어요, 조회수 등의 기능으로 게시글에 대한 CRUD 기능이 존재한다. (댓글기능 미구현 상태)
 - 하단 다른 게시글 목록으로 현재 게시글과 연관된 게시글을 제공한다.

3. /board/bulletin, /board/chart/:[boardId]
<img src="https://user-images.githubusercontent.com/78658208/145830098-a333c5f7-3cf8-4fbe-a015-2e2268b1b74a.png" width="700" height="400"/>
 - 자유게시판 형태로 기본적인 기능은 /borad/chart의 기능을 갖는다.


4. /board/my, /board/my/:[boardId] 
 - 내가 쓴 게시글 목록을 얻을 수 있다.


