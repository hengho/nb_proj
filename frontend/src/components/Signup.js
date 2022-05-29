import styled from "styled-components"
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
        id: 0,
        userId: "",
        userPassword: ""
    }
    const [info, setInfo] = useState(initInfo)

    const onChange = e => {
        const {name, value} = e.target;
        setInfo({...info, [name]: value});
    }

    const submit = e => {
        UserService.get(info.userId)
            .then(response => {
                if(response.data.length === 0) {
                    UserService.create({
                        userId: info.userId,
                        userPassword: info.userPassword
                    }).then(response => {
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    alert("회원가입이 완료되었습니다.")
                    window.location.replace("/")
                } else {
                    alert("이미 존재하는 id 입니다.")
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <LoginStyle>
            <LoginText>
                회원가입
            </LoginText>
            <Form>
                <LoginInput placeholder="id를 입력하세요" onChange={onChange} value={info.userId} name='userId' id='userId'/>
                <LoginInput placeholder="password를 입력하세요" onChange={onChange} value={info.userPassword} name='userPassword' id='userPassword'/>
                <Div>
                    <LoginButton type='submit' value={info.id} onClick={submit}>
                        회원가입
                    </LoginButton>
                </Div>
            </Form>
        </LoginStyle>

    )
};