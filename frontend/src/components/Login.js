import styled from "styled-components"
import {Link} from "react-router-dom"
import {useState} from "react";
import UserService from "../services/UserService";

const LoginStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Div = styled.div`
    display: flex;                          
    flex-direction: row;
    justify-content: center;
`

const LoginText = styled.text`
    font-size: 30px;
    font-weight: bold;
    width: auto;
    margin-top: 100px;
`

const LoginInput = styled.input`
    margin: 0 auto;
    margin-top: 10px;
    width: 200px;
    height: 20px;
`

const LoginButton = styled.button`
    :hover {
        color: grey;
    }
    cursor: pointer;
    background-color: white;
    width: 80px;
    height: 30px;
    margin: 10px 10px;
`

export default () => {
    const initInfo = {
        userId: "",
        userPassword: ""
    }
    const [info, setInfo] = useState(initInfo);
    const onChange = e => {
        const {name, value} = e.target;
        setInfo({...info, [name]: value});
    }
    const submit = e => {
        UserService.get(info.userId)
            .then(response => {
                if (response.data.length > 0) {
                    if (response.data[0].userPassword === info.userPassword) {
                        window.location.replace("/main")
                    } else {
                        alert('존재하지 않는 아이디이거나 비밀번호가 틀렸습니다.');
                    }
                } else {
                    alert('존재하지 않는 아이디입니다.');
                }
            })
    }

    return (
        <LoginStyle>
            <LoginText>
                로그인
            </LoginText>
            <Form>
                <LoginInput placeholder="id를 입력하세요" onChange={onChange} value={info.userId} name='userId' id='userId'/>
                <LoginInput placeholder="password를 입력하세요" onChange={onChange} value={info.userPassword}
                            name='userPassword' id='userPassword'/>
                <Div>
                    <LoginButton type='submit' onClick={submit}>
                        로그인
                    </LoginButton>
                    <Link to="/signup">
                        <LoginButton>
                            회원가입
                        </LoginButton>
                    </Link>
                </Div>
            </Form>
        </LoginStyle>

    )
};