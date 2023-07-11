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
import swal from 'sweetalert';

function Welcome(props) {
  // const [play] = useSound(boopSfx);
  const [user1Img, setUser1Img] = useState(imgUser1)
  const [user2Img, setUser2Img] = useState(imgUser2)
  // const [name1, setName1] = useState(document.getElementById('userInput1'))
  // const [name2, setName2] = useState("asds")
  // const [charactorList, setCharactorList] = useState(['김규민', '안예성', '오창민', '김상윤', '최성훈', '이재현'])
  const [charactorList, setCharactorList] = useState([imgUser1, imgUser2, imgUser3, imgUser4, imgUser5, imgUser6])
  return (
    <div className='background'>
      <div className='container'>
        <img className='title' src={imgLogo}></img>
        <form className='startButton' onClick={event => {
            event.preventDefault()
            console.log("play Sound")
            props.onStart()
          }}>
          <input type="submit" value="Start!"></input>
        </form>
        <div className='user' >
          <img title="눌러바" onClick={()=>{
            setUser1Img(charactorList[Math.floor(Math.random() * 6)])
          }} className='userbunny1' src={user1Img}></img>
          <input id='userInput1' placeholder='이름' type='text'></input>
        </div>
        <div className='user'>
          <img title="눌러바" onClick={()=>{
            setUser2Img(charactorList[Math.floor(Math.random() * 6)])
          }} className='userbunny2' src={user2Img}></img>
          <input id='userInput2' placeholder='이름' type='text'></input>
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
        </div>
        <input value="" type="submit"/>
        <div className='imgCover1'>
          <img src={props.imgLink}/>
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
  const [inputText, setInputText] = useState("");
  const [haveClick, setHaveClick] = useState(false)
  const activeButton = () => {
    alert(`${inputText} 입력 완료`);
  } 
  const activeEnter = (e) => { 
    if(e.key === "Enter") {
      activeButton();
    }
  }
  return (
    <div className='background'>
      <div className='container alignContainer'>
      <img onClick={()=> {
        swal("행운의 고양이입니다", {
          buttons: {
            cancel: "귀엽죠",
          },
          icon: luckcat,
        })
        setHaveClick(true)
      }} style={{display:haveClick?"none":"block"}} src={luckcat} className='luckCat'/>
      <input 
      className='search'
        type="text" 
        placeholder="검색창"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => activeEnter(e)}
      />
        <Card idnum='0' inputText={inputText} onGamefunc={props.onGame} imgLink={scissor} title={"가위바위보"}/>
        <Card idnum='1' inputText={inputText} onGamefunc={props.onGame} imgLink={dollar} title={"동전뒤집기"}/>
        <Card idnum='2' inputText={inputText} onGamefunc={props.onGame} imgLink={location} title={"순발력게임"}/>
        <Card idnum='3' inputText={inputText} onGamefunc={props.onGame} imgLink={folder} title={"대전기록지"}/>
      </div>
    </div>
  );
}
function Flip(props) {
  const [cnt, setCnt] = useState(4.5);
  const [rand, setRand] = useState(Math.floor(Math.random() * 2))
  useEffect(() => {
    const id = setInterval(() => {
      setCnt(cnt => cnt - 0.5); 
    }, 500);
    if(cnt === 0){
      swal(rand?"앞면!":"뒷면!", {
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
function Circle(props) {
  if (props.visible){
    return (
      <div onClick={()=>props.onclick()} style={{visibility:'visible'}} className='circleBTN'>
        <h1>눌러</h1>
      </div>
    );
  }else{
    return (
      <div onClick={()=>props.onclick()} style={{visibility:'hidden'}} className='circleBTN'>
        <h1>눌러</h1>
      </div>
    );
  }
  
}
function Speed(props) {
  // 첫번째 사람이 클릭하고 다음 사람이 클릭해서 기록 비교
  const [count, setCount] = useState(0.00);
  const [userA, setUserA] = useState();
  const [userB, setUserB] = useState();
  const [decrease, setDecrease] = useState(0.05)
  const [nextTurn, setNextTurn] = useState("시작하기");
  const [getBack, setGetBack] = useState("돌아가기");

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => (count - decrease).toFixed(2)); 
    }, 50);
    if(Math.ceil(count) === 0){
      clearInterval(id);
    }
    return (()=>
      clearInterval(Math.ceil(id)));
  }, [count]);
  const [visibleIndex, setVisibleIndex] = useState(-1)
  return (
    <div className='background'>
      <div className='container'>
        <div className='alignContainer'>
          <h1 className='timer'>{(6-count).toFixed(2)}</h1>
          <Circle onclick={()=>{
            window.localStorage.setItem('SPEED', (6-count).toFixed(2))
            setDecrease(0)
            setNextTurn("다시시작")
          }} visible={visibleIndex==0?true:false} />
          <Circle visible={false} />
          <Circle onclick={()=>{
            window.localStorage.setItem('SPEED', (6-count).toFixed(2))
            setDecrease(0)
            setNextTurn("다시시작")
          }}e visible={visibleIndex==1?true:false} />
          {/*다음차례*/}
          <h1 onClick={()=>{
            setCount(6)
            setDecrease(0.05)
            setNextTurn("")
            setVisibleIndex(Math.floor(Math.random() * 2))
          }} className='strtButton'>{nextTurn}</h1>
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
          }} className='backButton'>{getBack}</h1>
        </div>
      </div>
    </div>
  );
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
    <div className='background'>
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
    <div onClick={
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
    <div className='background'>
      <div className='container alignContainer'>
        <img className='title' src={imgLogo}></img>
        <Card1 onclick={()=>{}} keyValue='SCISSOR' idnum='0' imgLink={scissor} title={"가위바위보"}/>
        <Card1 onclick={()=>{}} keyValue='FLIP' idnum='1' imgLink={dollar} title={"동전뒤집기"}/>
        <Card1 onclick={()=>{}} keyValue='SPEED' idnum='2' imgLink={location} title={"순발력게임"}/>
        <Card1 onclick={()=>{
          props.setmode('CHOOSE')
        }} keyValue='BACK' idnum='3'  imgLink={folder} title={"대전기록지"}/>
      </div>
    </div>
  );
}

function App() {
  
  const [mode, setMode] = useState("WELCOME");
  window.localStorage.setItem('BACK', "돌아가기")
  let content;
  if (mode === "WELCOME"){
    content = <Welcome onStart={() => {
      setMode('CHOOSE');
    }}/>;
  }
  else if (mode === "CHOOSE"){
    content = <Choose onGame={(int) => {
      if (int==0){
        setMode('PAPER');
      }
      else if (int==1){
        setMode('FLIP');
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
    content = <Flip setmode={setMode}/>;
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
