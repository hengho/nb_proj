import {useState} from "react";
import styled from "styled-components";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Table = styled.table`
    font-size: 14px;
    margin: 20px;
    border: 1px solid black;
    text-align: center;
    th, td {
        padding: 10px 9px;
        border: 1px solid black;
    }
`

const Td = styled.td`
    text-overflow: ellipsis;
`

const Th = styled.th`
    width: 80px;
`

const Button = styled.button`
    width: 50px;
`

export default () => {
    const [value, setValue] = useState(new Date());
    const [dateId, setDateId] = useState(value.getFullYear() * 10000 + value.getMonth() * 100 + value.getDate());
    // const [data, setData] = useState(value.);

    const changeDateId = () => {
        let dId = value.getFullYear() * 10000 + value.getMonth() * 100 + value.getDate()
        setDateId(dId)
    }

    return (
        <>
            {dateId}
            <Calendar onChange={setValue} value={value} onClick={changeDateId}/>
            <Table>
                <tbody>
                <tr>
                    <Th>수입/지출</Th>
                    <Th>금액</Th>
                    <Th>내용</Th>
                </tr>
                </tbody>
            </Table>
        </>
    )
}