import { FC, useState } from "react";
import { OrderCompanyModalStyled } from "./styled";
import { Button } from "../../../common/Button/Button";
import axios, { AxiosResponse } from "axios";

export interface IOrderCompanyModalProps {
    onSuccess: () => void;
}


export const OrderCompanyModal: FC<IOrderCompanyModalProps> = ({ onSuccess }) => {
    const [registModal, setRegistModal] = useState<boolean>(true);
    const [company_name, setCompany_name] = useState<string>('');

    const handlerRegist = () => { 
        if(company_name.trim() === ''){
            alert('업체 이름을 입력하세요.');
            return;
        }
        handlerSave();
    };
    
    const handlerSave = () => {
        if(window.confirm('해당 업체를 등록하시겠습니까?')){
            axios
            .post('/management/newCompanySaveJson.do', {
                company_name
            }) 
            .then((res: AxiosResponse<string>) => {
                if (res.data === 'SUCCESS'){
                    setRegistModal(!registModal);
                    onSuccess();
                    alert('업체가 등록되었습니다.');
                    window.location.reload();
                }
            })
        } else {
            alert('업체 등록을 취소하였습니다.');
        }
    };

    return(
        <>
            <OrderCompanyModalStyled isOpen={registModal} ariaHideApp={false}>
                <div className="wrap">
                    <div className="title">발주 업체 등록</div>
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>업체이름</th>
                                <td>
                                    <input 
                                        type="text"
                                        onChange={(e) => {setCompany_name(e.target.value)}}>
                                    </input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className = 'btn-group'>
                        <Button onClick={handlerRegist}>저장</Button>
                        <Button onClick={() => setRegistModal(!registModal)}>취소</Button>
                    </div>
                </div>
            </OrderCompanyModalStyled>
        </>
    );
};