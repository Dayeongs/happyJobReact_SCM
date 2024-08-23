import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { fomatDate } from "../../../../../common/fomatData";



export interface IReturnList {
    seq: number;
    item_code: string;
    item_name: string;
    obtain_date: number;
    return_count: number;
    item_price: number;
    return_order_date: number;
    return_processing_date: number;
}

export interface IOrderListJsonResponse {
    returnCnt: number;
    returnList: IReturnList[];
}

export const ReturnMain = () => {
    const { search } = useLocation();
    const [returnList, setReturnList] = useState<IReturnList[]>([]);
    const [listCount, setListCount] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    
    useEffect(() => {
        searchOrderList();
    }, [search]);

    const searchOrderList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        axios.post('/mypage/returnHistoryJson.do', searchParam).then((res: AxiosResponse<IOrderListJsonResponse>) => {
            setReturnList(res.data.returnList);
            setListCount(res.data.returnCnt);
            setCurrentParam(cpage);
        });
    };
    
    return  (
        <>
        총 갯수 : {listCount} 현재 페이지 : {currentParam}
        <StyledTable>
            <colgroup>
                <col width="10%"/>
                <col width="25%"/>
                <col width="15%"/>
                <col width="10%"/>
                <col width="15%"/>
                <col width="15%"/>
                <col width="10%"/>
            </colgroup>
            <thead>
                <tr>
                    <StyledTh>제품코드</StyledTh>
                    <StyledTh>제품명</StyledTh>
                    <StyledTh>주문일자</StyledTh>
                    <StyledTh>수량</StyledTh>
                    <StyledTh>금액</StyledTh>
                    <StyledTh>반품신청일</StyledTh>
                    <StyledTh>반품완료일</StyledTh>
                </tr>
            </thead>
            <tbody>
                {returnList.length > 0 ? (
                    returnList?.map((a) => {
                        return (
                            <tr key={a.seq}>
                                <StyledTd>{a.item_code}</StyledTd>
                                <StyledTd>{a.item_name}</StyledTd>
                                <StyledTd>{fomatDate(a.obtain_date)}</StyledTd>
                                <StyledTd>{a.return_count}</StyledTd>
                                <StyledTd>{(a.return_count * a.item_price).toLocaleString("ko-kr")} 원</StyledTd>
                                <StyledTd>{fomatDate(a.return_order_date)}</StyledTd>
                                <StyledTd>{fomatDate(a.return_processing_date)}</StyledTd>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <StyledTd colSpan={7}>데이터가 없습니다.</StyledTd>
                    </tr>
                )}
            </tbody>
        </StyledTable>
        <PageNavigate
            totalItemsCount={listCount}
            onChange={searchOrderList}
            itemsCountPerPage={5}
            activePage={currentParam as number}
        ></PageNavigate>
    </>
    );
}