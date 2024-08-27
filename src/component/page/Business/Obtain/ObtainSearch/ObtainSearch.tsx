import { useEffect, useRef, useState } from "react";
import { ObtainSearchStyled } from "./styled"
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../common/Button/Button";

export const ObtainSearch = ()=>{
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const title = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { search } = useLocation();
    
    useEffect(() => {
        if (
          title.current?.value === "" ||
          startDate?.length === 0 ||
          endDate?.length === 0
        ) {
          navigate(`/react/business/obtain.do`);
        }
      }, [search]);

    const handlerSearch = () => {
        // 검색 버튼을 누르면, 조회가 된다.
        const query: string[] = [];
        !title.current?.value || query.push(`searchTitle=${title.current?.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        navigate(`/react/business/obtain.do${queryString}`);
    };
    return(
        <ObtainSearchStyled>
            고객기업명<input ref={title}></input>
            기간 <input type="date" onChange={(e) => setStartDate(e.target.value)}></input>
            ~<input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
            <Button onClick={handlerSearch}>검색</Button>
        </ObtainSearchStyled>
    )
}