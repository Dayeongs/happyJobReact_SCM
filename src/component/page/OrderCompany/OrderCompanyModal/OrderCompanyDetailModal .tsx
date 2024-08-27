import React, { FC, useEffect, useState } from "react";
import { OrderCompanyModalStyled } from "./styled";
import { Button } from "../../../common/Button/Button";
import axios, { AxiosResponse } from "axios";
import { StyledTable, StyledTd } from "../../../common/styled/StyledTable";

export interface IOrderCompanyModalProps {
    onSuccess: () => void;
    company_seq:number;
}

export interface IOrderCompanyDetailList {
    company_seq:number,
    company_name:string, 
    item_code:string,
    item_name:string
}

export interface IOrderCompanyDetailListJsonResponse{
    orderCompanyDetailList : IOrderCompanyDetailList[];
}

export interface IItemList{
    item_code:string,
    item_name:string
}

export interface IItemListJsonResponse{
    itemList: IItemList[];
}

export interface IPostResponse {
    resultMsg: string;
}


export const OrderCompanyDetailModal: FC<IOrderCompanyModalProps> = ({ onSuccess, company_seq }) => {
    const [registModal, setRegistModal] = useState<boolean>(true);
    const [orderCompanyDetailList, setOrderCompanyDetailList] = useState<IOrderCompanyDetailList[]>([]);
    const [itemList, setItemList] = useState<IItemList[]>([]);
    const [item_code, setItem_code] = useState<string>('');

    useEffect(() => {
        searchOrderCompanyDetailList(company_seq);
        searchItemList(company_seq);
    }, []);

    const searchOrderCompanyDetailList = (company_seq: number) => {
        const searchParam = new URLSearchParams();

        searchParam.append('company_seq', company_seq.toString());

        axios.post('/management/orderCompanyDetailJson.do', searchParam).then((res: AxiosResponse<IOrderCompanyDetailListJsonResponse>) => {
            setOrderCompanyDetailList(res.data.orderCompanyDetailList);
        });
    };

    const searchItemList = (company_seq: number) => {
        const searchParam = new URLSearchParams();

        searchParam.append('company_seq', company_seq.toString());

        axios.post('/management/orderComSelectItemJson.do',searchParam).then((res: AxiosResponse<IItemListJsonResponse>) => {
            setItemList(res.data.itemList);
        });
    };

    const selectItem = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setItem_code(e.target.value);
    }

    const handlerNewItem = (company_seq:number, item_code:string) => {
        if(window.confirm('해당 아이템을 추가하시겠습니까?')){
            const searchParam = new URLSearchParams();
    
            searchParam.append('company_seq', company_seq.toString());
            searchParam.append('item_code', item_code);
    
            axios.post('/management/newItemSaveJson.do',searchParam).then((res: AxiosResponse<string>) => {
                if(res.data ==='SUCCESS'){
                    alert('아이템이 추가되었습니다.');
                    searchOrderCompanyDetailList(company_seq);
                    searchItemList(company_seq);

                } else {
                    alert('아이템 추가 중 오류가 발생하였습니다.');
                }
            });
        } else {
            alert('아이템 추가를 취소하였습니다.');
        }
    }

    return(
        <>
            <OrderCompanyModalStyled isOpen={registModal} ariaHideApp={false}>
                <div className="wrap">
                    <div className="title">상세보기</div>
                    <StyledTable>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>업체이름</th>
                                <th>물품이름</th>
                            </tr>
                            {orderCompanyDetailList.length > 0 ? (
                            orderCompanyDetailList?.map((a) => {
                                return (
                                    <tr>
                                        <StyledTd>{a.company_name}</StyledTd>
                                        <StyledTd>{a.item_name}</StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                            </tr>
                            )}
                        </tbody>
                    </StyledTable>
                    <div className="bottom">
                        <span>물품추가</span>
                        <select defaultValue={""} onChange={selectItem}>
                            {itemList?.map((item) => {return (
                                    <option key={item.item_code} value={item.item_code}>{item.item_name}</option>
                                )})}
                        </select>
                    </div>
                    <div className = 'btn-group'>
                        <Button onClick={() => handlerNewItem(company_seq,item_code)}>추가</Button>
                        <Button onClick={() => setRegistModal(!registModal)}>취소</Button>
                    </div>
                </div>
            </OrderCompanyModalStyled>
        </>
    );
};