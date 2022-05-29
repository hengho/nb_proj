import {useEffect, useState} from "react";
import styled from "styled-components";
import Calendar from 'react-calendar'
import Select from 'react-select'
import './Calendar.css'
import DateService from "../services/DateService";

const Table = styled.table`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin: 20px auto;
    border: 1px solid black;
    text-align: center;
    th, td {
        padding: 10px 20px;
        border: 1px solid black;
    }
`

const Td = styled.td`
    text-overflow: ellipsis;
`

const Th = styled.th`
    width: auto;
`

const Tr = styled.tr`
    
`

const Button = styled.button`
    :hover {
        color: grey;
    }
    cursor: pointer;
    width: 50px;
    height: 30px;
    background-color: white;
`

const Input1 = styled.input`
    width: 100px;
    height: 30px;
`

const Input2 = styled.input`
    width: 250px;
    height: 30px;
`

export default () => {
    const options = [
        {value: true, label: '수입'},
        {value: false, label: '지출'}
    ];

    const initialPrice = {
        id: 0,
        dateId: 0,
        state: true,
        num: null,
        title: ""
    }

    const [value, setValue] = useState(new Date());
    const [dateId, setDateId] = useState(value.getFullYear() * 10000 + value.getMonth() * 100 + value.getDate());
    const [data, setData] = useState([]);
    const [content, setContent] = useState(0);
    const [option, setOption] = useState({value: true, label: '수입'});
    const [price, setPrice] = useState(initialPrice);
    const [sum, setSum] = useState(0);
    const [monthlySum, setMonthlySum] = useState(0);

    const changeDateId = value => {
        setDateId(value.getFullYear() * 10000 + value.getMonth() * 100 + value.getDate());
    };

    useEffect(() => {
        getDate()
    }, [value]);

    useEffect(() => {
        calcSum()
        calcMonthlySum()
    }, [data])

    const calcSum = () => {
        let ret = 0;
        for (let i = 0; i < data.length; i++) {
            console.log(i)
            data[i].state === true ? ret += data[i].num : ret -= data[i].num
        }
        setSum(ret);
    };

    const calcMonthlySum = () => {
        let ret = dateId;
        ret = parseInt(ret / 100)
        ret *= 100
        DateService.getMonthly(ret)
            .then(response => {
                setMonthlySum(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const getDate = () => {
        DateService.get(dateId)
            .then(response => {
                setData(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const createDate = () => {
        if (typeof price.title !== "string" || price.title.length === 0)
            alert("입력값이 없거나 잘못 되었습니다. 다시 입력해주세요.")
        else {
            const data = {
                dateId: dateId,
                state: option.value,
                num: price.num,
                title: price.title
            };

            DateService.create(data)
                .then(response => {
                    setPrice({
                        id: 0,
                        dateId: dateId,
                        state: true,
                        num: null,
                        title: ""
                    })
                })
                .catch(e => {
                    console.log(e);
                });
            alert("생성이 완료되었습니다.");
            window.location.replace("/main")
        }
    };

    const deleteDate = (e) => {
        DateService.remove(e.target.value)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        alert("삭제되었습니다.");
        window.location.replace("/main")
    };

    const onChange = e => {
        const {name, value} = e.target;
        setPrice({...price, [name]: value});
    }

    return (
        <>
            <Calendar onChange={value => {
                setValue(value)
                changeDateId(value)
            }} value={value} onClick={changeDateId}/>
            {content === 0 &&
                <Table>
                    <tbody>
                    <Tr>
                        <Th>수입/지출</Th>
                        <Th>금액</Th>
                        <Th>내용</Th>
                        <Th>
                            <Button type="submit" onClick={() => setContent(1)}>
                                생성
                            </Button>
                        </Th>
                    </Tr>
                    {data && data.map(item =>
                        <Tr>
                            <td>{item.state === true ? "수입" : "지출"}</td>
                            <td>{item.num}</td>
                            <td>{item.title}</td>
                            <td>
                                <Button type="submit" value={item.id} onClick={deleteDate}>
                                    삭제
                                </Button>
                            </td>
                        </Tr>
                    )}
                    {data.length >= 1 &&
                        <Tr>
                            <Th>총액</Th>
                            <Th>{sum}</Th>
                        </Tr>
                    }
                    <Tr>
                        <Th>이번 달 총액</Th>
                        <Th>{monthlySum}</Th>
                    </Tr>
                    </tbody>
                </Table>
            }
            {content === 1 &&
                <Table>
                    <tbody>
                    <Tr>
                        <Th>수입/지출</Th>
                        <Th>금액</Th>
                        <Th>내용</Th>
                        <Th>생성</Th>
                        <Th>취소</Th>
                    </Tr>
                    <Tr>
                        <td>
                            <Select
                                defaultValue={option}
                                onChange={setOption}
                                options={options}
                            />
                        </td>
                        <td>
                            <Input1 placeholder='금액을 입력하세요' onChange={onChange} type="number" value={price.num}
                                    name='num' id='num'/>
                        </td>
                        <td>
                            <Input2 placeholder='내용을 입력하세요' onChange={onChange} value={price.title} name='title'
                                    id='title'/>
                        </td>
                        <td>
                            <Button type="submit" onClick={() => {
                                createDate();
                                setContent(0);
                            }}>
                                생성
                            </Button>
                        </td>
                        <td>
                            <Button type="submit" onClick={() => setContent(0)}>
                                취소
                            </Button>
                        </td>
                    </Tr>
                    </tbody>
                </Table>
            }
        </>
    );
};