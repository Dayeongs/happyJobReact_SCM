import { FC, useEffect, useState} from "react";
import { LoginModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { PersonalRegisterModal } from "./PersonalRegisterModal";
import { CompanyMainModal } from "./CompanyMainModal";
import { Button } from "../../../common/Button/Button";

export interface ILoginModalProps {
    onSuccess: ( ) => void;
}

export const LoginModal:FC<ILoginModalProps> = ({onSuccess}) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [category, setCategory] = useState<string>('');

    function removeBtn() {
        const btnContainer = document.getElementById('btn-group');
        const registBtn = document.getElementById('registBtn');

        if(registBtn && btnContainer){
            btnContainer.removeChild(registBtn);
        }
    }

    const handlerCategory = (e:React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        setCategory(target.value);
        removeBtn();
    }

    useEffect(() => {}, [modal]);

    return(
        <>
            <LoginModalStyled isOpen={modal} ariaHideApp={false}>
                <div className="wrap">
                    <div className="header">
                        회원가입
                    </div>
                    <div className="category">
                        <input 
                            type="radio"
                            id="personal" 
                            name="category" 
                            value="personal"
                            onChange={handlerCategory}>
                        </input>
                        <label htmlFor="personal">개인&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input 
                            type="radio" 
                            id="company" 
                            name="category" 
                            value="company"
                            onChange={handlerCategory}>
                        </input>
                        <label htmlFor="company">기업</label>
                    </div>
                    {category === 'personal' && <PersonalRegisterModal onSuccess={onSuccess}></PersonalRegisterModal>}
                    {category === 'company' && <CompanyMainModal onSuccess={onSuccess}></CompanyMainModal>}
                    <div className="btn-group" id="btn-group">
                        {category === '' && <Button onClick={() => setModal(!modal)}>취소</Button>}
                    </div>
                </div>
            </LoginModalStyled>
        </>
    );
}