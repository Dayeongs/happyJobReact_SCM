import { FC, useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { OrderModalStyled } from "./styled";
import { Button } from "../../../../common/Button/Button";
import { fomatDate } from "../../../../../common/fomatData";
import axios from "axios";
import { IOrderList } from "../OrderMain/OrderMain";

export interface IOrderDetail{
    addr:string;
    cust_name:string;
    depositYN:string;
    inventory_count: number;
    item_code: string;
    item_name:string;
    obtain_count: number;
    obtain_date:number;
    seq: number;
}



export interface IOrderModalProps{
    props?:IOrderList;
}

export interface ICompany{
    company_name: string;
    company_seq : string;
}

export const OrderModal: FC<IOrderModalProps> = ({props}) => {
    
    const [ modal, setModal ] = useRecoilState<boolean>(modalState);
    const [ company, setCompany ] = useState<ICompany[]>();
    const [ selectCompany, setSelectCompany] = useState<string>();
    

    useEffect(()=>{
        findCompany();
     },[props])


    
    const findCompany = ()=>{
        if(props){
            axios
         .post(`/business/findOrderCompany.do`, {item_code: props.item_code})
         .then((res)=>{
            console.log(res.data)
            setCompany(res.data)
         })
         .catch((err)=>{
             console.error(err)
         })
        }
        
    }


    const changeCompany = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        if(company){
            const selectedCode = e.target.value;
            const selectedCompany = company.find(company => company.company_name === selectedCode);
            if (selectedCompany) {
                setSelectCompany(selectedCode)
            }}
        
    }
    
    

    const save = ()=>{
        if(props){
            axios
                .post(`/business/OrderInsert.do`, {
                    item_code : props.item_code,
                    product_name : props.item_name,
                    order_count : props.obtain_count-props.inventory_count,
                    obtain_date : props.obtain_date,
                    company_seq : selectCompany
                })
                .then((res)=>{
                    if(res.data === 1){
                        alert('저장완료')
                        window.location.reload();
                    }
                })
                .catch((err)=>{
                    console.error(err)
                })
        }
    }
    
    
    return (
        <OrderModalStyled>
        <div className="container">
            <div className="head">
                {   
                        <strong>발주지시서 작성</strong>
                    }
                
                <div className="x" onClick={()=>{setModal(!modal)}}>X</div>
            </div>
            <div className="content">
                <table>
                    <thead>
                        <tr>
                            <th>주문번호</th>
                            <th>주문일자</th>
                            <th>기업명</th>
                            <th>제품명</th>
                            <th>주문수량</th>
                            <th>발주회사</th>
                            <th>발주수량</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            props &&(
                                <tr>
                                    <td id='seq'>{props.seq}</td>
                                    <td id='obtain_date'>{fomatDate(props.obtain_date)}</td>
                                    <td id='cust_name'>{props.cust_name}</td>
                                    <td id='item_name'>{props.item_name}</td>
                                    <td id='obtain_count'>{props.obtain_count}</td>
                                    <td>
                                        <select name='' id='insert_companyName' onChange={changeCompany}>  
                                            <option value={""}>발주회사</option>
                                            {
                                                company && company.length > 0
                                                ?
                                                (
                                                    company.map((a,i)=>{
                                                        return(
                                                            <option value={a.company_seq} key={i}>{a.company_name}</option>
                                                        )
                                                    })
                                                )
                                                :
                                                (<></>)
                                            }
                                        </select>
                                    </td>
                                    <td id='obtain_count'>{props.obtain_count-props.inventory_count}</td>
                                </tr>
                            )
                    }
                    </tbody>
                </table>
                
                
                <div className="buttonDiv">
                    {
                        <Button onClick={save}>작성</Button> 
                    }
                    <Button onClick={()=>{setModal(!modal)}}>닫기</Button>
                </div>
            </div>
        </div>
        </OrderModalStyled>
    )
}