import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_action/user_action';

function RegisterPage(props) {
    
    const dispatch = useDispatch(); //redux 사용 위함
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    //Button 눌러 입력값 submit하기 위함. <form> 안에서 호출된다.
    const onSubmitHandler = (event) => {
        event.preventDefault(); //Default버튼 눌렀을때 refresh 되는것 방지

        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let parem = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(parem))
            .then(response => {
                if(response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
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
                
                <label>Name</label>
                <input type="text" value = {Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value = {Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value = {ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type = "submit">
                    Sign Up
                </button>
            
            </form>
        </div>
    )
}

export default RegisterPage
