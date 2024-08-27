import { FC, useEffect, useState } from "react"
import { ObtainModalStyled } from "./styled"
import axios, { AxiosResponse } from "axios";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { detailDate, fomatDate } from "../../../../../common/fomatData";
import { Button } from "../../../../common/Button/Button";
import { findstatusJsonResponse, IDeliveryMan, IFindDeliveryStatus, IObtainDetail, IObtainModalProps, IStorageInfo } from "../../../../../models/interface/Obtain/ObtainModel";

export const ObtainModal: FC<IObtainModalProps> = ({seq})=>{
    
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<IObtainDetail>();
    const [deliveryMans, setDeliveryMans] = useState<IDeliveryMan[]>([]);
    const [storage_item_code, setStorage_item_code] = useState<string>();
    const [storageInfo, setStorageInfo] = useState<IStorageInfo[]>([]);
    const [invenCnt, setInvenCnt] = useState<number>(0);
    const [storage_code, setStorage_code] = useState<string>();
    const [storage_name, setStorage_name] = useState<string>();
    const [deliveryInfo, setDeliveryInfo] = useState<IFindDeliveryStatus>();
    const [deliveryCheck, setDeliveryCheck] = useState<number>(1);
    const [chageDeleveryMan, setChageDeleveryMan] = useState<string>();
    
    useEffect(()=>{
        if(storage_item_code){
            findStorage()
        }
        if(detail){
            findDeliveryStatus()
        }
    },[storage_item_code])

     useEffect(()=>{
        otainDetail()
        deliveryMan()
     },[seq])

     const otainDetail = ()=>{
         axios
         .post(`/business/obtainDetailJson.do`, {seq})
         .then((res)=>{
             setDetail(res.data.list)
             setStorage_item_code(res.data.list.item_code)
         })
         .catch((err)=>{
             console.error(err)
         })
     }
     
     const deliveryMan = ()=>{
        axios
         .post(`/business/deliveryMan.do`, {seq})
         .then((res)=>{
            setDeliveryMans(res.data)
         })
         .catch((err)=>{
             console.error(err)
         })
     }
     const findStorage = ()=>{
        axios
         .post(`/business/findStorage.do`, {storage_item_code : storage_item_code})
         .then((res)=>{
            setStorageInfo(res.data)
         })
         .catch((err)=>{
             console.error(err)
         })
     }
    
     const chageStorage = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedCode = e.target.value;
        const selectedStorage = storageInfo.find(storage => storage.storage_code === selectedCode);
        if (selectedStorage) {
            setInvenCnt(selectedStorage.inventory_count);
            setStorage_code(selectedStorage.storage_code)
            setStorage_name(selectedStorage.storage_name)
        }
     }

     const chageDeliveryMan = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedCode = e.target.value;
        const selectedMan = deliveryMans.find(man => man.name === selectedCode);
        if (selectedMan) {
            setChageDeleveryMan(selectedMan.name);
        }
     }
    
     const findDeliveryStatus = ()=>{
        if(detail){
            axios
             .post(`/business/findstatusJson.do`, {item_code : detail.item_code , obtain_date: detailDate(detail.obtain_date)})
             .then((res:AxiosResponse<findstatusJsonResponse>)=>{
                if(res.data.status === 0){
                    setDeliveryCheck(res.data.status)
                }else{
                    setDeliveryInfo(res.data.list)
                }
             })
             .catch((err)=>{
                 console.error(err)
             })
        }
     }
    
     const save = ()=>{
        if(detail && storageInfo){
            axios
                .post(`/business/deliveryInsert.do`, {
                    delivery_end_loc: detail.addr,
                    obtain_count: detail.obtain_count,
                    delivery_name: chageDeleveryMan,
                    item_code: detail.item_code,
                    storage_code: storage_code,
                    seq: detail.seq
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

     const update = ()=>{
        if(chageDeleveryMan == null || storage_name == null){
            alert("선택하셈")
            return;
        }
        if(deliveryInfo){
            axios
                .post(`/business/deliveryUpdate.do`, {
                    delivery_name: chageDeleveryMan,
                    storage_name: storage_name,
                    delivery_num: deliveryInfo.delivery_num
                })
                .then((res)=>{
                    if(res.data === 1){
                        alert('수정완료')
                        window.location.reload();
                    }
                })
                .catch((err)=>{
                    console.error(err)
                })
        }
     }
     
    return(
        <ObtainModalStyled>
        <div className="container">
            <div className="head">
                {   
                        deliveryCheck === 1
                        ?
                        <strong>배송지시서 수정</strong>
                        :
                        <strong>배송지시서 작성</strong>
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
                            <th>배송담당자</th>
                            <th>입금여부</th>
                        </tr>
                    </thead>
                    <tbody id='deliveryModalInfo'>
                        {
                            detail &&(
                                <tr>
                                    <td id='seq'>{detail.seq}</td>
                                    <td id='obtain_date'>{fomatDate(detail.obtain_date)}</td>
                                    <td id='cust_name'>{detail.cust_name}</td>
                                    <td id='item_name'>{detail.item_name}</td>
                                    <td id='obtain_count'>{detail.obtain_count}</td>
                                    <td>
                                        <select name='' id='insert_deliveryName' onChange={chageDeliveryMan}>  
                                            <option value={""}>배송담당자</option>
                                        {
                                            deliveryMans.length ? 
                                                deliveryMans.map((a,i)=>{
                                                    return(
                                                        <option value={a.name} key={i}>{a.name}</option>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                        </select>
                                       
                                    </td>
                                    <td id='depositYN'>{detail.depositYN}</td>
                                </tr>
                            )
                    }
                    </tbody>
                </table>
                <div className="modalMiddle">
                    <select name="select_storage" id="select_storage" onChange={chageStorage}>
							  <option value="">창고선택</option>
                              {
                                storageInfo ?
                                    storageInfo.map((a,i)=>{
                                        return(
                                            <option value={a.storage_code} key={i} >{a.storage_name}</option>
                                        )
                                    })
                                    :
                                    null
                              }
                    </select>
                    <label className="select_storage_count">재고수량</label><input id="select_storage_count" type="text" readOnly value={invenCnt}/>
                </div>
                <div>
                    <table>
							<thead>
								<tr>
									<th>배송번호</th>
									<th>배송일자</th>
									<th>제품명</th>
									<th>배송수량</th>
									<th>배송창고</th>
									<th>출발지역</th>
									<th>배송지</th>
									<th>배송담당자</th>
								</tr>
							</thead>
                            <tbody id = "deliveryTableBody">
                                {
                                    deliveryInfo
                                    ? 
                                    (
                                        <tr>
                                            <td>{deliveryInfo.delivery_num}</td>
                                            <td>{fomatDate(deliveryInfo.delivery_date as number)}</td>
                                            <td>{deliveryInfo.item_name}</td>
                                            <td>{deliveryInfo.obtain_count}</td>
                                            <td>{deliveryInfo.storage_name}</td>
                                            <td>{deliveryInfo.storage_loc}</td>
                                            <td>{deliveryInfo.delivery_end_loc}</td>
                                            {
                                                chageDeleveryMan 
                                                ? 
                                                <td>{chageDeleveryMan}</td>
                                                :
                                                <td>{deliveryInfo.delivery_name}</td>
                                            }
                                        </tr>
                                    ) 
                                    : 
                                    (
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                    </table>
                </div>
                <div className="buttonDiv">
                    {
                        deliveryCheck === 1
                        ?
                        <Button onClick={update}>수정</Button>
                        :
                        <Button onClick={save}>저장</Button> 
                    }
                    <Button onClick={()=>{setModal(!modal)}}>닫기</Button>
                </div>
            </div>
        </div>
        </ObtainModalStyled>
    )
}