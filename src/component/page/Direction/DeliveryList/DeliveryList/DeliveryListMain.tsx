import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fomatDate } from "../../../../common/fomatData";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { StyledTable, StyledTh, StyledTd } from "../../../common/styled/StyledTable";
import { postDirectionDeliveryListApi } from "../../../../api/postDirectionDeliveryListApi";
import { DirectionDeliveryListApi } from "../../../../api/api";
import { IDeliveryList, IDeliveryListRes } from "../../../../models/interface/DirectionDelivery/DirectionDeliveryModel";



export const DeliveryListMain = ()=>{
    const { search } = useLocation();
    const [list, setList] = useState<IDeliveryList[]>([])
    const [cnt, setCnt] = useState<number>(1)
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    
    useEffect(() => {
        deliveryList()
        console.log(search)
    }, [search]);

    const deliveryList = async (cpage?:number)=>{
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('currentPage', cpage.toString());
        searchParam.append('pageSize', '10');
        
        const postSearchDeliveryList = await postDirectionDeliveryListApi<IDeliveryListRes>(DirectionDeliveryListApi.directionDeliveryListJson, {
            searchTitle : searchParam.get("searchTitle"),
            searchStDate: searchParam.get('searchStDate'),
            searchEdDate: searchParam.get('searchEdDate'),
            currentPage: cpage,
            pageSize: 10,
        })

        if(postSearchDeliveryList){
            setList(postSearchDeliveryList.list);
            setCnt(postSearchDeliveryList.cnt)
            setCurrentParam(cpage)
        }
    }
    return(

        <>
              <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={5}>배송번호</StyledTh>
                        <StyledTh size={5}>배송시작일</StyledTh>
                        <StyledTh size={5}>배송담당자</StyledTh>
                        <StyledTh size={5}>출발지</StyledTh>
                        <StyledTh size={17}>목적지</StyledTh>
                        <StyledTh size={5}>배송개수</StyledTh>
                        <StyledTh size={5}>배송상태</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {
                        list ? 
                            list.map((a,i)=>{
                                return(
                                    <tr key={i}>
                                        <StyledTd>{a.delivery_num}</StyledTd>
                                        <StyledTd>{fomatDate(a.delivery_date)}</StyledTd>
                                        <StyledTd>{a.delivery_name}</StyledTd>
                                        <StyledTd>{a.delivery_start_loc}</StyledTd>
                                        <StyledTd>{a.delivery_end_loc}</StyledTd>
                                        <StyledTd>{a.obtain_count}</StyledTd>
                                        <StyledTd>{a.delivery_state}</StyledTd>
                                    </tr>
                                )
                            })
                            :
                            <></>
                    }
                </tbody>
            </StyledTable>
            {
                <PageNavigate
                        totalItemsCount={cnt}
                        onChange={deliveryList}
                        itemsCountPerPage={10}
                        activePage={currentParam as number}
                ></PageNavigate>
            } 
        </>
    )
}