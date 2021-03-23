import React, {useEffect} from 'react';
import axios from 'axios';

//Axios: Client에서 Server로 Request를 보낼때 사용: npm install axios --save
//Proxy: Client와 Server간 연결을 위해 사용: npm install http-proxy-middleware --save
//Proxy를 설정해 CORS 이슈를 해결 가능 (Client, Server단 포트 다름 등등..)
//Proxy를 위해-> src/setupProxy.js 생성
//Proxy 서버 사용 이유: 인터넷 사용 제어, 캐시 이용해 더 빠른 인터넷 이용 제공, 더 나은 보안 제공, 이용 제한된 사이트 접근 가능

function LandingPage() {

    //useEffect: LandingPage가 실행되면 자동으로 실행되는 메소드
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {console.log(response.data)})
    }, [])

    return (
        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'}}>
            <h2>LandingPage</h2>
        </div>
    )
}

export default LandingPage
