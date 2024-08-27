import { useRef, useState } from "react";
import { ReturnListSearchStyled } from "./styled"
import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/Button/Button";

export const ReturnListSearch = () => {
        const [startDate, setStartDate] = useState<string>();
        const [endDate, setEndDate] = useState<string>();
        const title = useRef<HTMLInputElement>(null);
        const navigate = useNavigate();
    
        const handlerSearch = () => {
            // 검색 버튼을 누르면, 조회.
            const query: string[] = [];
            !title.current?.value || query.push(`searchTitle=${title.current?.value}`);
            !startDate || query.push(`startDate=${startDate}`);
            !endDate || query.push(`endDate=${endDate}`);
    
            const queryString = query.length > 0 ? `?${query.join('&')}` : '';
            navigate(`/react/direction/returnList.do${queryString}`);
        };
    
        return (
            <ReturnListSearchStyled>
                반품 제품명 : 
                <input ref={title}></input>
                <input type="date" onChange={(e) => setStartDate(e.target.value)}></input>
                <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
                <Button onClick={handlerSearch}>검색</Button>
            </ReturnListSearchStyled>
        );
    
};