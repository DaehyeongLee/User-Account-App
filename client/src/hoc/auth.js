import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_action/user_action';


export default function (SpecificComponent, option, adminRoute = null) {

    //option parameter
    //1. null => 아무나 출입이 가능한 페이지
    //2. true => 로그인한 유저만 출입이 가능한 페이지
    //3. false => 로그인한 유저는 출입 불가능한 페이지

    //adminRoute parameter
    //1. true => Admin user만 접근 가능
    //2. null => default는 null

    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log(response)

                //로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    //로그인하지 않은 상탠데 option true이면 로그인화면으로 돌려보낸다
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        //관리자 권한이 아닌데 관리자 유저만 접근 가능한 페이지라면 landing으로 돌려보낸다.
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            //로그인한 상탠데 option false이면 landing으로 돌려보낸다.
                            props.history.push('/')
                        }
                    }
                }

            })

        }, [])

        return (
            <SpecificComponent />
        )

    }
    return AuthenticationCheck
}