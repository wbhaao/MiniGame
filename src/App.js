import './App.css';
import imgLogo from './webtitle.png';
import React, { useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import imgUser1 from './김규민.png';
import imgUser2 from './김상윤.png';
import imgUser3 from './안예성.png';
import imgUser4 from './오창민.png';
import imgUser5 from './이재현.png';
import imgUser6 from './최성훈.png';
import scissor from './scissor.png';
import dollar from './dollar.png';
import location from './location.png';
import folder from './folder.png';
import file from './file.png';
import sphere from './sphere.png';
import flipVideo1 from "./0001-0224.mp4";
import flipVideo2 from "./0001-0225.mp4";
import catFront from "./catfront.jpg";
import catBack from "./catback.jpg";
import catWhy from "./catwhy.jpg";
import luckcat from "./luckcat.jpg";
import popcat from "./pop.gif";
import happycat from "./happycat.gif";
import swal from 'sweetalert';
import soundEffect from './happysong.mp3';
import BGM from './BGM.mp3';
import specialBGM from './specialBGM.mp3';
if (localStorage.getItem("COIN")==null){
  localStorage.setItem("COIN", 1000)
}
if (localStorage.getItem("BACKGROUND")==null){
  localStorage.setItem("BACKGROUND", "background")
}
if (localStorage.getItem("SPEED")==null){
  localStorage.setItem("SPEED", 999999)
}
function Welcome(props) {
  // const [play] = useSound(boopSfx);
  const [user1Img, setUser1Img] = useState(imgUser1)
  const [user2Img, setUser2Img] = useState(imgUser2)
  // const [name1, setName1] = useState(document.getElementById('userInput1'))
  // const [name2, setName2] = useState("asds")
  // const [charactorList, setCharactorList] = useState(['김규민', '안예성', '오창민', '김상윤', '최성훈', '이재현'])
  const [charactorList, setCharactorList] = useState([imgUser1, imgUser2, imgUser3, imgUser4, imgUser5, imgUser6])
  return (
    <div className={`background ${localStorage.getItem("BACKGROUND")} `}>
      <div className='container'>
        <img className='title' src={imgLogo}></img>
        <form className='startButton' onClick={event => {
            event.preventDefault()
            console.log("play Sound")
            props.onStart(user2Img==user1Img)
          }}>
          <input type="submit" value="Start!"></input>
        </form>
        <div className='user' >
          <img title="눌러바" onClick={()=>{
            setUser1Img(charactorList[Math.floor(Math.random() * 6)])
          }} className='userbunny1' src={user1Img}></img>
        </div>
        <div className='user'>
          <img title="눌러바" onClick={()=>{
            setUser2Img(charactorList[Math.floor(Math.random() * 6)])
          }} className='userbunny2' src={user2Img}></img>
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  let desc = 0
  if (!(props.inputText)) {
    return (
      <form id={props.idnum} className='card-box' onSubmit={event => {
        event.preventDefault()
        props.onGamefunc(event.target.id)
        console.log(event.target.id)
      }}>
        <div className='text-wrap'>
          <h1>{props.title}</h1>
          <p>{props.des}</p>
        </div>
        <input value="" type="submit"/>
        <div className='imgCover1'>
          <img src={props.imgLink} onClick={() => {
            props.onGamefunc(props.idnum)
            console.log(props.idnum)
      }}/>
        </div>
    </form>
    );
  }
  else if (props.inputText[0]==props.title[0]){
    return (
      <form id={props.idnum} className='card-box' onSubmit={event => {
        event.preventDefault()
        props.onGamefunc(event.target.id)
        console.log(event.target.id)
      }}>
        <div className='text-wrap'>
          {
              [...props.inputText].forEach(char => {
                console.log("통과 chatr:", char)
                desc = props.title.indexOf(char)
                return false
                
              }
            )
          }
            {console.log(desc)}
            <h1 style={{display:"inline"}}><span style={{backgroundColor:"black"}}>{(props.title.substring(0,desc+1))}</span>{(props.title.substring(desc+1,5))}</h1>
            <h1></h1>
        </div>
        <input value="" type="submit"/>
        <div className='imgCover1'>
          <img src={props.imgLink}/>
        </div>
    </form>
    );
  }
}
function Choose(props) {
  const [audio] = useState(new Audio(
    (localStorage.getItem("BGM"))==null
    ?BGM
    :specialBGM
    ));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  audio.volume = volume
  function playSound() {
    audio.play();
    setIsPlaying(true);
  }

  function pauseSound() {
    audio.pause();
    setIsPlaying(false);
  }

  function stopSound() {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }
  const [inputText, setInputText] = useState("");
  let price = 0;
  let setEventName = "";
  let func = () => {};
  const [coins, setCoins] = useState(localStorage.getItem("COIN"));
  const activeButton = () => {
    switch(inputText){
      case "BGM":
        setEventName = "BGM이 바뀌었습니다"
        price = 10000
        func = () => {
          console.log("bgm 바뀨ㅣㅁ")
          localStorage.setItem("BGM", specialBGM)
          console.log(localStorage.getItem("BGM"))
        }
        break;
      case "EASTER":
        setEventName = "시작화면에서 캐릭터를 똑같이 맞추면"
        price = 5000
        func = () => {
          
        }
        break;
      case "BACK":
        setEventName = "BACKGORUND가 바뀌었습니다"
        price = 5000
        func = () => {
          localStorage.setItem("BACKGROUND", "redbackground")
        }
        break;
      case "SPECIAL":
        setEventName = "SPECIAL"
        price = 50000
        func = () => {
          window.location.replace('https://flappybird.io/');
        }
        break;
    }
    if (Number(localStorage.getItem("COIN"))>=price){
      localStorage.setItem("COIN", Number(localStorage.getItem("COIN"))-price)
      setCoins(Number(localStorage.getItem("COIN")))
      swal(`${setEventName}`, {
      }).then(() => {
        console.log("hello world")
        func()
      })  
    }
    else{ 
      swal("돈이 부족한데", {
      }).then(() => {
      })  
    }
  }
  const activeEnter = (e) => { 
    if(e.key === "Enter") {
      activeButton();
    }
  }
  return (
    <div className={`background ${localStorage.getItem("BACKGROUND")} `}>
      <div className='coin'>🪙{Number(coins).toFixed(0)}</div>
      <div className='container alignContainer'>
      <button className='bgmBTN1' onClick={playSound} disabled={isPlaying}>
        Play Sound
      </button>
      <button className='bgmBTN2' onClick={pauseSound} disabled={!isPlaying}>
        Pause Sound
      </button>
      <img onClick={()=> {
        swal("고양이", `코인을 모으면 다양한 곳에 사용할 수 있습니다`, {
          buttons: {
            bgm: {
              text:"BGM 바꾸는 법",
              value:"bgm"
            },
            catch: {
              text: "특별 게임 하는 법",
              value: "catch",
            },
            easter: {
              text: "이스터에그 힌트",
              value: "easter",
            },
            back: {
              text: "배경 컬러 바꾸는 법",
              value: "back",
            },
          },
          icon: luckcat,
        }).then((value) => {
          switch (value) {
            case "bgm":
              swal("BGM을 바꾸려면 새로고침 해야합니다","검색창에 BGM을 입력(ENTER)하고 10000코인을 내면 BGM을 바꿀 수 있습니다");
              break;
            case "catch":
              swal("검색창에 SPECIAL을 입력(ENTER)하고 50000코인을 내면 특별 게임을 할 수 있습니다");
              break;
            case "easter":
              swal("검색창에 EASTER을 입력(ENTER)하고 5000코인을 내면 힌트를 얻을 수 있습니다");
              break;
            case "back":
              swal("BACKGROUND를 바꾸려면 새로고침 해야합니다","검색창에 BACK을 입력(ENTER)하고 5000코인을 내면 배경을 바꿀 수 있습니다");
              break;
          }
        })
      }}  src={luckcat} className='luckCat'/>
      <input
        className='search'
        type="text" 
        placeholder="search it 🔍"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => activeEnter(e)}
      />
        <Card idnum='0' inputText={inputText} onGamefunc={props.onGame} imgLink={scissor} title={"가위바위보"} des={"점수당 60코인"}/>
        <Card idnum='1' inputText={inputText} onGamefunc={props.onGame} imgLink={dollar} title={"동전뒤집기"} des={"맞추면 코인4배"}/>
        <Card idnum='2' inputText={inputText} onGamefunc={props.onGame} imgLink={location} title={"반속테스트"} des={"빠른만큼 코인"}/>
        <Card idnum='3' inputText={inputText} onGamefunc={props.onGame} imgLink={folder} title={"대전기록지"} des={""}/>
      </div>
    </div>
  );
  }
function Flip(props) {
  const [cnt, setCnt] = useState(4.5);
  const [a, setA] = useState(true);
  const rand = props.rand
  useEffect(() => {
    const id = setInterval(() => {
      setCnt(cnt => cnt - 0.5); 
    }, 500);
    if(cnt === 0){
      
      swal(rand==props.isfront?"맞췄습니다":"틀렸습니다", {
        buttons: {
          cancel: "메뉴 화면으로",
        },
        icon: rand?catFront:catBack,
      })
      .then((value) => {
        switch (value) {
          default:
            swal("돌아왔습니다");
            props.setmode("CHOOSE")
        }
      });
    }
    return () => {
      clearInterval(id);
    }
  }, [cnt]);
  if (a){
    console.log("in")
    
    setA(false)
  }
  
  if (rand){
    
    window.localStorage.setItem('FLIP', '앞면')
    
    return (
        <video onClick={()=>{
          console.log("hello wrold")
        }} autoPlay muted>
          <source src={flipVideo1} type="video/mp4"/>
        </video>
    );
  } else {
    window.localStorage.setItem('FLIP', '뒷면')
    return (
      <video onClick={()=>{
        console.log("hello world")
      }} autoPlay muted>
        <source src={flipVideo2} type="video/mp4"/>
      </video>
    );
  }
}

const Speed = (props) => {
	const [state, setState] = useState("waiting");
	const [message, setMessage] = useState("클릭해서 시작하세요.");
	const [result, setResult] = useState([99999]);
	const timeout = useRef(null);
	const startTime = useRef();
	const endTime = useRef();
	const onClickScreen = () => {
		if (state === "waiting") {
			setState("ready");
			setMessage("초록색이 되면 클릭하세요.");
			timeout.current = setTimeout(() => {
				setState("now");
				setMessage("지금 클릭!");
				startTime.current = new Date();
			}, Math.floor(Math.random() * 1000) + 2000);
		} else if (state == "ready") { // 성급하게 클릭
			clearTimeout(timeout.current);
			setState("waiting");
			setMessage("성급하셨군요!");
		} else if (state == "now") { // 반응속도 체크
      endTime.current = new Date();
			setState("waiting");
			setMessage("클릭해서 시작하세요."); 
			setResult([endTime.current - startTime.current]);
      console.log(result)
      // 400보다 작은 만큼 코인
      if (result.reduce((a, c) => a + c) < 400){
        localStorage.setItem("COIN", Number(localStorage.getItem("COIN"))+(400-result.reduce((a, c) => a + c)))
      }
      if (result.reduce((a, c) => a + c) && result.reduce((a, c) => a + c) < localStorage.getItem("SPEED")){
        console.log(result, "asdsad")
        localStorage.setItem("SPEED", result[0])
      }
    }
	}
	const renderAverage = () => {
		return result.length === 0
		? null 
		: <div>시간 : {result.reduce((a, c) => a + c)}ms</div>
	};

	const Reset = () => {
				setResult([99999]);
			}
	return (
		<div className={localStorage.getItem("BACKGROUND")}>
      <div className='container alignContainer'>
        <div id="screen" className={`${state}`} onClick={onClickScreen}>
          {message}
        </div>		
        <div className="avgScore">{renderAverage()}</div>
        <button className="resetBTN" onClick={Reset}>RESET</button>
        <h1 onClick={()=>{
            swal("돌아가시겠습니까?", {
              buttons: {
                catch: {
                  text: "계속 할래용",
                  value: "catch",
                },
                cancel: "메뉴 화면으로",
              },
              icon: catWhy,
            })
            .then((value) => {
              if (result.reduce((a, c) => a + c) && result.reduce((a, c) => a + c) < localStorage.getItem("SPEED")){
                console.log(result, "asdsad")
                localStorage.setItem("SPEED", result[0])
              }
              if (result.reduce((a, c) => a + c) < 400){
                localStorage.setItem("COIN", Number(localStorage.getItem("COIN"))+(400-result.reduce((a, c) => a + c)))
              }
              switch (value) {
                case "catch":
                  break;
                default:
                  swal("돌아왔습니다");
                  props.setmode("CHOOSE")
              }
            });
          }} className='backBTN'>돌아가기
          </h1>
      </div>
    </div>
	)
}
// function App(props) {
//   return (
    
//   );
// }

function PaperBTN(props) {
  return (
    <div onClick={()=>{
      props.onclick()
    }} className='imgCover'>
      <img src={props.imgLink}/>
    </div>
  );
}
function Paper(props) {
  const [count, setCount] = useState(200000)
  const [score, setScore] = useState(0)
  const [handIndex, setHandIndex] = useState(0) 
  const [handList, setHandList] = useState([scissor, sphere, file])
  const [randInt, setRandInt] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => (count - 0.5).toFixed(2)); 
    }, 50);
    if(Math.ceil(count) === 0){
      clearInterval(id);
    }
    return (()=>
      clearInterval(Math.ceil(id)));
  }, [count]);
  return(
    <div className={localStorage.getItem("BACKGROUND")}>
      <div className='container'>
        <div className='alignContainer'>
          <h1 className='timer' id='paperScore'>{score}</h1>
          <h1 onClick={()=>{
            swal("돌아가시겠습니까?", {
              buttons: {
                catch: {
                  text: "계속 할래용",
                  value: "catch",
                },
                cancel: "메뉴 화면으로",
              },
              icon: catWhy,
            })
            .then((value) => {
              switch (value) {
                case "catch":
                  break;
                default:
                  swal("돌아왔습니다");
                  props.setmode("CHOOSE")
              }
            });
          }} className='timer' id='paperScore1'>{(score/(200000-count)*1000).toFixed(2)==0?
                                                "돌아가기":
                                                (score/(200000-count)*1000).toFixed(2)}
          </h1>
          <img className='paperImg' src={handList[randInt]}/>
          <div className='alignContainer'>
            <PaperBTN onclick={()=>{
              setRandInt(Math.floor(Math.random()*3))
              if (randInt==0){
                setScore(score+1)
              }
              else{
                window.localStorage.setItem('SCISSOR', score)
                window.localStorage.setItem(
                  'COIN', 
                  Number(window.localStorage.getItem('COIN'))+score*60)
                setScore(0)
                setCount(200000)
              }
            }} imgLink={sphere}/>
            <PaperBTN onclick={()=>{
              setRandInt(Math.floor(Math.random()*3))
              if (randInt==1){
                setScore(score+1)
              }
              else{
                window.localStorage.setItem('SCISSOR', score)
                window.localStorage.setItem(
                  'COIN', 
                  Number(window.localStorage.getItem('COIN'))+score*60)
                setScore(0)
                setCount(200000)
              }
            }} imgLink={file}/>
            <PaperBTN onclick={()=>{
              setRandInt(Math.floor(Math.random()*3))
              if (randInt==2){
                setScore(score+1)
              }
              else{
                window.localStorage.setItem('SCISSOR', score)
                window.localStorage.setItem(
                  'COIN', 
                  Number(window.localStorage.getItem('COIN'))+score*60)
                setScore(0)
                setCount(200000)
              }
            }} imgLink={scissor}/>
          </div>
        </div>
      </div>
    </div>
  );
}
function Card1(props) {
  return (
    <div style={{marginTop:"165px"}} onClick={
      ()=>{props.onclick('CHOOSE')}
    } className='card-box'>
      <div className='text-wrap'>
        <h1>{window.localStorage.getItem(props.keyValue)}</h1>
        <p>{props.title}</p>
      </div>
      <div className='imgCover1'>
        <img src={props.imgLink}/>
      </div>
    </div>
  );
}
function Record(props) {
  return (
    <div className={localStorage.getItem("BACKGROUND")}>
      <div className='container alignContainer'>
        <img className='title' src={imgLogo}></img>
        <Card1 onclick={()=>{}} keyValue='SCISSOR' idnum='0' imgLink={scissor} title={"가위바위보"}/>
        <Card1 onclick={()=>{}} keyValue='FLIP' idnum='1' imgLink={dollar} title={"동전뒤집기"}/>
        <Card1 onclick={()=>{}} keyValue='SPEED' idnum='2' imgLink={location} title={"반속테스트"}/>
        <Card1 onclick={()=>{
          props.setmode('CHOOSE')
        }} keyValue='BACK' idnum='3'  imgLink={folder} title={"대전기록지"}/>
      </div>
    </div>
  );
}
function Easter(){
  const [audio] = useState(new Audio(soundEffect));
  const [isPlaying, setIsPlaying] = useState(false);
  // function playSound() {
  //   audio.play();
  //   setIsPlaying(true);
  // }
  
  // function pauseSound() {
  //   audio.pause();
  //   setIsPlaying(false);
  // }
  
  // function stopSound() {
  //   audio.pause();
  //   audio.currentTime = 0;
  //   setIsPlaying(false);
  // }
  setTimeout(()=> audio.pause(), 2999)
  audio.play();
  audio.volume = 0.2;
  return (
    <div>
      <img src={popcat}/>
      <img src={happycat}/>
      <img src={popcat}/>
    </div>
  );
}
function App() {
  const [isFront, setIsFront] = useState(false)
  const [mode, setMode] = useState("WELCOME");
  const rand = Math.floor(Date.now() / 1000)%2
  window.localStorage.setItem('BACK', "돌아가기")
  let content;
  if (mode === "WELCOME"){
    content = <Welcome onStart={(isEaster) => {
      if (isEaster){
        setMode('EASTER');
        setTimeout(() => setMode('CHOOSE'), 3000);
      }
      else{
        setMode('CHOOSE');
      }
    }}/>;
  }
  else if(mode === "EASTER"){
    content = <Easter />
  }
  else if (mode === "CHOOSE"){
    content = <Choose onGame={(int) => {
      if (int==0){
        setMode('PAPER');
      }
      else if (int==1){
        swal("앞? 뒤?", {
          buttons: {
            bgm: {
              text:"앞",
              value:"front"
            },
            catch: {
              text: "뒤",
              value: "back",
            },
          },
          icon: luckcat,
        }).then((value) => {
          switch (value) {
            case "front":
              setIsFront(true)
              setMode('FLIP');
              break;
            case "back":
              setIsFront(false)
              setMode('FLIP');
              break;
          }
        })
        
      }
      else if (int==2){
        setMode('FAST');
      }
      else{
        setMode('RECORD');
      }
    }}/>;
  }
  else if (mode === "FLIP"){
    if (isFront==Boolean(rand)){
      console.log("right")
      localStorage.setItem("COIN", Number(localStorage.getItem("COIN"))*2)
    }
    else{
      console.log("wrong")
      localStorage.setItem("COIN", Number(localStorage.getItem("COIN"))/2)
    }
    content = <Flip setmode={setMode} isfront={isFront} rand={rand}/>;
  }
  else if (mode === "PAPER"){
    content = <Paper setmode={setMode}/>;
  }
  else if (mode === "FAST"){
    content = <Speed setmode={setMode}/>
  }
  else if (mode === "RECORD"){
    content = <Record setmode={()=>setMode("CHOOSE")}/>
  }
  return (
    content
  );
}

export default App;
