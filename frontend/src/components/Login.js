import styled from "styled-components"
import {Link} from "react-router-dom"

const LoginStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
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
    width: 60px;
    height: 30px;
    margin: 10px auto;
`

export default () => {
    return(
        <LoginStyle>
            <LoginText>
                로그인
            </LoginText>
            <Form>
                <LoginInput placeholder="id를 입력하세요" />
                <LoginInput placeholder="password를 입력하세요" />
                <Link to="/main">
                    <LoginButton>
                        로그인
                    </LoginButton>
                </Link>
            </Form>
        </LoginStyle>

    )
}