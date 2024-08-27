import { FC, useEffect, useState } from "react";
import { LoginModalTableStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { CompanyRegisterModal } from "./CompanyRegisterModal";
import { Button } from "../../../common/Button/Button";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { NewCompanyModal } from "./NewCompanyModal";

export interface ICompanyMainModalProps {
    onSuccess: ( ) => void;
}

interface ICompanyList {
    cust_name: string;
    cust_id: string;
}

interface ICompanyListJsonResponse {
    cList : ICompanyList[];
}

export const CompanyMainModal:FC<ICompanyMainModalProps> = ({onSuccess}) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [companyList, setCompanyList] = useState<ICompanyList[]>([]);
    const [btnSelect, setBtnSelect] = useState<boolean>(false);
    const [custName, setCustName] = useState<string>('');
    const [custId, setCustId] = useState<string>('');
    const [registModal, setRegistModal]= useState<boolean>(false);
    const [searchCompany, setSearchCompany] = useState<boolean>(true);
    const [newCompanyModal, setNewCompanyModal] = useState<boolean>(false);
    
    const searchCompanyList = () => {
        axios.post('/custListJson.do','').then((res: AxiosResponse<ICompanyListJsonResponse>) => {
            setCompanyList(res.data.cList);
        });
    };

    useEffect(() => {
        searchCompanyList();
    }, []);

    const handlerCompany = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        if(e.target.value) {
            const [id, name] = e.target.value.split(',');
            setCustName(name);
            setBtnSelect(true);
            setCustId(id);
        } else {
            setBtnSelect(false);
        }
    }
    
    const handlerModal = () => {
        setRegistModal(true); 
        setSearchCompany(false);
    }; 

    const handlerNewCompanyModal = () => {
        setNewCompanyModal(true);
        setSearchCompany(false);
    }
    
    return(
        <>
            {searchCompany && (
                <>
                    <LoginModalTableStyled>
                        <div className="title">기업 검색</div>
                        <div className="select">
                            <select defaultValue={""} onChange={handlerCompany}>
                                <option value="" disabled>아래 항목에서 기업을 선택해 주세요.</option>
                                {companyList?.map((company) => {return (
                                    <option key={company.cust_id} value={[company.cust_id, company.cust_name]}>{company.cust_name}</option>
                                )})}
                            </select>
                            {btnSelect && <button id="selectBtn" onClick={handlerModal}>선택</button>}
                        </div>
                    </LoginModalTableStyled>
                    <div className="btn-group">
                        <Button onClick={handlerNewCompanyModal}>신규 기업 등록</Button>
                        <Button onClick={() => setModal(!modal)}>취소</Button>
                    </div>
                </>
            )}
            {registModal && (<CompanyRegisterModal cust_id={custId} cust_name = {custName} closeModal={registModal} onSuccess={onSuccess}></CompanyRegisterModal>)}
            {newCompanyModal && (<NewCompanyModal onSuccess={onSuccess}></NewCompanyModal>)}
        </>
    );
}