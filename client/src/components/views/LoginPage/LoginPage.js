import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_action/user_action';

function LoginPage(props) {
    const dispatch = useDispatch(); //redux 사용 위함
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    //Button 눌러 입력값 submit하기 위함. <form> 안에서 호출된다.
    const onSubmitHandler = (event) => {
        event.preventDefault(); //Default버튼 눌렀을때 refresh 되는것 방지

        let parem = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(parem))
            .then(response => {
                //page 이동
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert ('Error')
                }
            })

        
    }
    
    return (
        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'}}>
            
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value = {Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value = {Password} onChange={onPasswordHandler} />

                <br />
                <button type = "submit">
                    Login
                </button>
            
            </form>
        </div>
    )
}

export default LoginPage
