import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css'; //CSS 프레임워크 npm install antd --save
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

//여기 안에 보여지고 싶은 컴포넌트를 넣는다
//concurrently는? client server와 back server를 같이 켜주기 위함
//-> "dev": "concurrently \"npm run nodemon\" \"npm run start --prefix client\""
ReactDOM.render(
  <Provider store = {createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <App />
  </Provider>,
  document.getElementById('root') //index.html에 id가 root인 부분
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//Props vs State
//Props: properties. 부모 컴퍼넌트안에 자식 컴퍼넌트가 있다. 부모에서 자녀로만 데이터를 보낼 수 있다.
//Props에서 부모에서 자식으로 내려줬을 때 자식에서 받은 값을 변경할 순 없다.
//State: 컴퍼넌트 안에서 데이터를 교환, 전달할 때 state 사용.
//state는 mutable. Data는 re-rendering으로 변경 가능
//EX) Props
//  <ChatMessages
//    messages = {messages}
//  />
//EX) State
//  state = {
//    message: ''      
//  } 

//Redux: Store를 통해 state를 감싸주어 관리
//Redux 설치: npm install redux react-redux redux-promise redux-thunk --save
//redux-promise, redux-thunk는 미들웨어이다
//Redux data flow:
//action -> reducer -> store ---subscribe--> react component --dispatch--> action

//React Hook: functional component에서도 lifecycle을 사용할 수 있게 하는 것
//React Hook Ex) const [Name, setName] = useState("") //this.state 대신 사용하는 것
//React Hook Ex) useEffect(() => {~~}) //componentDidMount() 대신 사용하는 것