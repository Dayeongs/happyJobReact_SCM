import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { fomatDate } from "../../../../../common/fomatData";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../../common/potal/Portal";
import { OrderModal } from "../OrderModal/OrderModal";
import axios, { AxiosResponse } from "axios";

export interface IOrderList{

    seq: number;
    obtain_date: number;
    cust_name: string;
    item_name: string;
    obtain_count: number;
    item_code: string;
    inventory_count: number;
    
}


export interface IOrderListJsonResponse{
    
    orderList: IOrderList[];
    orderListCnt :number;

}


export const OrderMain = () => {

    const { search } = useLocation();
    const [ orderList, setOrderList ] = useState<IOrderList[]>([]);
    const [ orderListCnt, setOrderListCnt ] = useState<number>(0);
    const [ currentParam, setCurrentParam ] = useState<number | undefined>();
    const [ modal, setModal ] = useRecoilState<boolean>(modalState);
    const [ seq, setSeq ] = useState<number>(0);
    const [props, setProps] = useState<IOrderList>();

    useEffect(() => {
        searchOrderList();
    }, [search])

    const searchOrderList = (cpage? : number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        axios.post('/business/orderListJson.do', searchParam).then((res:AxiosResponse<IOrderListJsonResponse>) => {
            console.log(res.data)
            setOrderList(res.data.orderList)
            setOrderListCnt(res.data.orderListCnt)
            setCurrentParam(cpage)
            
        })
        .catch((error) => (
            console.error(error)
        ))
    }


    const openModal = () => {
            setModal(!modal)
            setSeq(seq)
};





    return (
<>
    총 갯수 : {orderListCnt} 현재 페이지 : {currentParam}
            <StyledTable>
            <thead>
                <tr>
                    <StyledTh size={10}>주문번호</StyledTh>
                    <StyledTh size={15}>주문일자</StyledTh>
                    <StyledTh size={15}>주문기업명</StyledTh>
                    <StyledTh size={10}>주문제품명</StyledTh>
                    <StyledTh size={15}>주문개수</StyledTh>
                    <StyledTh size={10}>발주지시서 작성</StyledTh>
                </tr>
            </thead>
            <tbody>
                { orderList.length > 0 ? (
                        orderList.map((a)=>{
                            return(
                                <tr key={a.seq}>
                                    <StyledTd>{a.seq}</StyledTd>
                                    <StyledTd>{fomatDate(a.obtain_date)}</StyledTd>
                                    <StyledTd>{a.cust_name}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>{a.obtain_count}</StyledTd>
                                    <StyledTd>
                                        <button onClick={()=>{openModal(); setProps(a)}}>발주지시서작성</button>
                                    </StyledTd>
                                </tr>
                            )
                        })
                    ) 
                    : 
                    (
                        <tr>
                            <StyledTd colSpan={6}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )
                }
            </tbody>
        </StyledTable>
        <PageNavigate            
            totalItemsCount={orderListCnt} 
            onChange={searchOrderList}
            itemsCountPerPage={5}
            activePage={currentParam as number}
            ></PageNavigate>

            { modal ? 
                <Protal>
                    <OrderModal props={props}/>
                </Protal> 
                : 
                null
            }
    </>
    )

};