import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { fomatDate } from "../../../../../common/fomatData";
import { StyledTdN, StyledTdY } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ObtainModal } from "../ObtainModal/ObtainModal";
import { Protal } from "../../../../common/potal/Portal";
import { IObtainList, IObtainListJsonResponse } from "../../../../../models/interface/Obtain/ObtainModel";

export const ObtainList = ()=>{
    const { search } = useLocation();
    const [obtainList, setObtainList] = useState<IObtainList[]>([]);
    const [obtainCnt, setObtainCnt] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [seq, setSeq] = useState<number>(0);

    useEffect(()=>{
        searchObtainList();
    },[search])

    const searchObtainList = (cpage?: number)=>{
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '10');

        axios.post(`/business/obtainListJson.do`, searchParam)
            .then((res:AxiosResponse<IObtainListJsonResponse>)=>{
                setObtainList(res.data.list)
                setObtainCnt(res.data.obtainListCnt)
                setCurrentParam(cpage)
            })
            .catch((err)=>{
                console.error(err)
            })
    }
 
    const openModal = (seq: number)=>{
        setModal(!modal)
        setSeq(seq)

      
    }
   
    return(
        <>
            <StyledTable>
            <thead>
                <tr>
                    <StyledTh size={10}>주문번호</StyledTh>
                    <StyledTh size={15}>주문일자</StyledTh>
                    <StyledTh size={15}>고객기업명</StyledTh>
                    <StyledTh size={10}>주문개수</StyledTh>
                    <StyledTh size={15}>재고개수</StyledTh>
                    <StyledTh size={10}>입금여부</StyledTh>
                    <StyledTh size={15}>배송지시서</StyledTh>
                </tr>
            </thead>
            <tbody>
                {
                    obtainList.length > 0 ? (
                        obtainList.map((a,i)=>{
                            return(
                                <tr key={a.seq}>
                                    <StyledTd>{a.seq}</StyledTd>
                                    <StyledTd>{fomatDate(a.obtain_date)}</StyledTd>
                                    <StyledTd>{a.cust_name}</StyledTd>
                                    <StyledTd>{a.obtain_count}</StyledTd>
                                    <StyledTd>{a.inventory_count}</StyledTd>
                                    {
                                        a.depositYN === 'N' ? 
                                        (
                                            <StyledTdN>{a.depositYN}</StyledTdN>
                                        ) 
                                        : 
                                        (
                                            <StyledTdY>{a.depositYN}</StyledTdY>  
                                        )
                                    }
                                    {
                                        a.depositYN === 'Y' ? 
                                        (
                                            <StyledTd>
                                                <button onClick={()=>{openModal(a.seq as number)}}>배송지시서작성</button>
                                            </StyledTd>
                                        ) 
                                        : 
                                        (
                                            <StyledTd>
                                                <button disabled>배송지시서작성</button>
                                            </StyledTd>
                                        )
                                    }
                                </tr>
                            )
                        })
                    ) 
                    : 
                    (
                        <tr>
                            <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )
                }
            </tbody>
        </StyledTable>
        <PageNavigate
                totalItemsCount={obtainCnt}
                onChange={searchObtainList}
                itemsCountPerPage={10}
                activePage={currentParam as number}
            ></PageNavigate>
            {
                modal 
                ? 
                <Protal>
                    <ObtainModal seq={seq}/>
                </Protal> 
                : 
                null
            }
    </>
    )

}