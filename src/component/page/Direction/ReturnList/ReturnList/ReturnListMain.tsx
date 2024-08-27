import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { fomatDate, formatWon } from "../../../../common/fomatData";

export interface IReturnList {
    return_order_date: number;
    signYN: string;
    return_count: number;
    item_name: string;
    return_price: number;
}

export interface IReturnListJsonResponse {
    listCount : number;
    returnList : IReturnList[];
}

export const ReturnListMain = () => {
    const { search } = useLocation();
    const [ returnList, setReturnList ] = useState<IReturnList[]>([]);
    const [ listCount, setListCount ] = useState<number>(0);
    const [ currentParam, setCurrentParam] = useState<number | undefined>();

    useEffect(() => {
        searchReturnList();
    }, [search]);

    const searchReturnList = (cpage?:number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        axios.post('/direction/returnListJson.do', searchParam).then((res: AxiosResponse<IReturnListJsonResponse>) => {
            setReturnList(res.data.returnList);
            setListCount(res.data.listCount);
            setCurrentParam(cpage);
        })
    }




    return (
        <>
            총 갯수 : {listCount} 현재 페이지 : {currentParam}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={25}>반품신청일자</StyledTh>
                        <StyledTh size={20}>제품명</StyledTh>
                        <StyledTh size={15}>반품개수</StyledTh>
                        <StyledTh size={30}>금액</StyledTh>
                        <StyledTh size={30}>반품상태</StyledTh> 
                    </tr>
                </thead>

                <tbody>
                    {returnList.length > 0 ? (
                        returnList.map((a) => {
                            return (
                                <tr>
                                    <StyledTd>{fomatDate(a.return_order_date)}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>{a.return_count}</StyledTd>
                                    <StyledTd>{formatWon(a.return_price)}</StyledTd>
                                    <StyledTd>{a.signYN}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={5}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={listCount}
                onChange={searchReturnList}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
        </>
    );
}