import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import { ReturnSearchStyled } from './styled';

export const ReturnSearch = () => {
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const oneMonthAgo = new Date(); // 한 달 전 날짜를 계산하기 위한 Date 객체 생성
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // 한 달 전으로 설정
    const startDateDefault = oneMonthAgo.toISOString().split('T')[0]; // 한 달 전 날짜를 'YYYY-MM-DD' 형식으로 변환

    useEffect(() => {
        setStartDate(startDateDefault);
        setEndDate(today);
    }, [startDateDefault, today]);

    useEffect(() => {
        handlerSearch();
    }, [startDate, endDate]); // startDate와 endDate가 변경된 후에 handlerSearch 호출

    const handlerSearch = () => {
        // 검색 버튼을 누르면, 조회가 된다.
        const query: string[] = [];
        !startDate || query.push(`startDate=${startDate}`);
        !endDate || query.push(`endDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        navigate(`/react/mypage/return.do${queryString}`);
    };

   

    return (
        <ReturnSearchStyled>
        <input type="date" defaultValue={startDateDefault} onChange={(e) => setStartDate(e.target.value)}></input>
        <input type="date" defaultValue={today} onChange={(e) => setEndDate(e.target.value)}></input>
        <Button onClick={handlerSearch}>검색</Button>
    </ReturnSearchStyled>
    );
};
