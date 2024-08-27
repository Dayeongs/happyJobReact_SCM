import { FC, useRef, useState } from "react";
import { LoginModalTableStyled } from "./styled";
import { Button } from "../../../common/Button/Button";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import AddrModal from "../AddrModal/AddrModal";
import axios, { AxiosResponse } from "axios";

export interface INewCompanyModalProps {
    onSuccess: ( ) => void;
}

export interface IPostResponse {
    resultMsg: 'SUCCESS';
}

export const NewCompanyModal:FC<INewCompanyModalProps> = ({ onSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [cust_name, setCust_name] = useState<string>('');
    const [biz_num, setBiz_num] = useState<string>('');
    const [cust_ph, setCust_ph] = useState<string>('');
    const [cust_fax, setCust_fax] = useState<string>('');
    const [industry_code, setIndustry_code] = useState<string>('');
    const cust_zip = useRef<HTMLInputElement | null>(null);
    const cust_addr = useRef<HTMLInputElement | null>(null);
    const cust_detail_addr = useRef<HTMLInputElement | null>(null);
    const cust_person = useRef<HTMLInputElement | null>(null);
    const [user_tel1, setUser_tel1] = useState<string>('');
    const [user_tel2, setUser_tel2] = useState<string>('');
    const [user_tel3, setUser_tel3] = useState<string>('');

    // 사업자 번호 형식 확인
    const handlerBizNum = (biz_num:string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, '');

        setBiz_num(input.value);
    };

    // 회사 연락처 형식 확인
    const handlerCustPh = (cust_ph:string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, '');

        setCust_ph(input.value);
    };

    // 팩스 번호 형식 확인
    const handlerCustFax = (cust_fax:string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, '');

        setCust_fax(input.value);
    };


    // 전화번호 형식 확인
    const handlerUserTel = (part: 'tel1' | 'tel2' | 'tel3') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, '');

        if (part === 'tel1') {
            setUser_tel1(input.value);
        } else if (part === 'tel2') {
            setUser_tel2(input.value);
        } else if (part === 'tel3') {
            setUser_tel3(input.value);
        }
    };

    // 기업 등록
    const handlerSave = ( ) => {
        axios
            .post('/cust/CustSaveJson.do', {
                cust_name,
                cust_ph,
                cust_fax,
                cust_person : cust_person.current?.value,
                user_tel1,
                user_tel2,
                user_tel3,
                cust_zip : cust_zip.current?.value,
                cust_addr : cust_addr.current?.value,
                cust_detail_addr : cust_detail_addr.current?.value,
                biz_num,
                industry_code
            }) 
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.resultMsg === 'SUCCESS'){
                    setModal(!modal);
                    onSuccess();
                    alert('신규 기업 등록이 완료되었습니다.');
                }
            })
    };

    const handlerRegist = () => { 
        
        if(cust_name.trim() === ''){
            alert('기업명을 입력하세요.');
            return;
        } 
        if(biz_num.trim() === ''){
            alert('사업자 번호를 입력하세요.');
            return;
        } 
        if(cust_ph.trim() === ''){
            alert('회사 연락처를 입력하세요.');
            return;
        }
        if(cust_fax.trim() === ''){
            alert('팩스 번호를 입력하세요.');
            return;
        }
        if(industry_code.trim() === ''){
            alert('산업군을 입력하세요.');
            return;
        }
        if(cust_zip.current?.value === ''){
            alert('주소를 입력하세요.');
            return;
        }
        if(user_tel1.trim() === '' || user_tel2.trim() === '' || user_tel3.trim() === ''){
            alert('담당자 전화번호를 입력하세요.');
            return;
        }
        handlerSave();
    };

    return (
        <>
            <div className="title">신규 기업</div>
            <LoginModalTableStyled>
                <thead></thead>
                <tbody>
                    <tr>
                        <th>기업명 <span className="font_red">*</span></th>
                        <td colSpan={3}>
                            <input 
                                type="text"
                                placeholder="기업명을 입력하세요"
                                onChange={(e) => {setCust_name(e.target.value)}}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th>사업자 번호 <span className="font_red">*</span></th>
                        <td colSpan={3}>
                            <input 
                                type="text"
                                onChange={handlerBizNum(biz_num)}
                                placeholder="숫자만 입력하세요">
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th>회사 연락처<span className="font_red">*</span></th>
                        <td>
                            <input 
                                type="text"
                                onChange={handlerCustPh(cust_ph)}
                                placeholder="숫자만 입력하세요">
                            </input>
                        </td>
                        <th>fax번호<span className="font_red">*</span></th>
                        <td>
                            <input 
                                type="text"
                                onChange={handlerCustFax(cust_fax)}
                                placeholder="숫자만 입력하세요">
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th>산업군 입력<span className="font_red">*</span></th>
                        <td colSpan={3}>
                            <input 
                                type="text"
                                onChange={(e) => {setIndustry_code(e.target.value)}}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th>우편번호<span className="font_red">*</span></th>
                        <td colSpan={3}>
                            <input
                                type="text"
                                className="width_150" 
                                ref={cust_zip}
                                readOnly>
                            </input>
                            <AddrModal
                                zipCodeRef={cust_zip}
                                addressRef={cust_addr}
                            ></AddrModal>
                        </td>
                    </tr>
                    <tr>
                        <th>주소<span className="font_red">*</span></th>
                        <td colSpan={3}>
                            <input
                                type="text"
                                ref={cust_addr}
                                readOnly>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th>상세주소</th>
                        <td colSpan={3}>
                            <input 
                                type="text"
                                ref={cust_detail_addr}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th>담당자 명</th>
                        <td colSpan={3}>
                            <input 
                                type="text"
                                ref={cust_person}>
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <th>담당자 전화번호<span className="font_red">*</span></th>
                        <td colSpan={3}>
                            <input
                                type="text"
                                name="user_tel1"
                                className="width_150"
                                onChange={handlerUserTel("tel1")}
                                maxLength={3}>
                            </input>
                            -
                            <input 
                                type="text" 
                                name="user_tel2" 
                                className="width_150"
                                onChange={handlerUserTel("tel2")}
                                maxLength={4}>
                            </input>
                            -
                            <input 
                                type="text" 
                                name="user_tel3" 
                                className="width_150"
                                onChange={handlerUserTel("tel3")}
                                maxLength={4}>
                            </input>
                        </td>
                    </tr>
                </tbody>
            </LoginModalTableStyled>
            <div className="btn-group">
                <Button onClick={handlerRegist}>기업 등록</Button>
                <Button onClick={() => setModal(!modal)}>취소</Button>
            </div>
        </>
    );
}