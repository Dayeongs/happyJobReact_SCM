import { userInfoModalState } from "../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { UserInfoModalStyled } from "./styled";
import { useRecoilState } from "recoil";

export interface IUserInfoModalProps {
    loginID?: string;
    onSuccess: () => void;
    setLoginID: (loginID: undefined) => void;
}

export interface IUserInfoDetail {
    loginID: string;
    password: string;
    name: string;
    user_type: string;
    hp: string;
    email: string;
    zip_code: string;
    addr: string;
    addr_detail: string;
    cust_person: string;
    cust_name: string;
}

export interface IUserInfoDetailResponse {
    userInfoListDetail: IUserInfoDetail[];
}

export interface IPostResponse {
    result: string;
}

export const UserInfoModal: FC<IUserInfoModalProps> = ({ loginID, onSuccess, setLoginID }) => {
    const [modal, setModal] = useRecoilState<boolean>(userInfoModalState);
    const [userInfoDetail, setUserInfoDetail] = useState<IUserInfoDetail[]>([]);
    const [selected, setSelected] = useState<string>("");
    const id = useRef<HTMLInputElement>(null);
    const pw = useRef<HTMLInputElement>(null);
    const hp = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const zipCode = useRef<HTMLInputElement>(null);
    const addr = useRef<HTMLInputElement>(null);
    const addrDetail = useRef<HTMLInputElement>(null);

    const selectList = [
        { value: "A", name: "임원" },
        { value: "B", name: "고객" },
        { value: "C", name: "SCM 관리자" },
        { value: "D", name: "배송 담당자" },
        { value: "E", name: "구매 담당자" },
    ];

    useEffect(() => {
        console.log("useeffect: " + loginID);
        if (loginID) {
            searchDetail();
            if (userInfoDetail[0]?.user_type) {
                setSelected(userInfoDetail[0].user_type);
            }
        }

        return () => {
            setLoginID(undefined);
        };
    }, []);

    const searchDetail = () => {
        const param = new URLSearchParams();
        param.append("loginID", loginID?.toString() as string);

        axios.post("/management/userDetailJson", param).then((res: AxiosResponse<IUserInfoDetailResponse>) => {
            if (res.data.userInfoListDetail) {
                setUserInfoDetail(res.data.userInfoListDetail);
                setSelected(res.data.userInfoListDetail[0].user_type);
            }
        });
    };

    const handlerSave = () => {
        const param = new URLSearchParams();

        param.append("loginID", id.current?.value.toString() as string);
        param.append("password", pw.current?.value.toString() as string);
        param.append("name", name.current?.value.toString() as string);
        param.append("email", email.current?.value.toString() as string);
        param.append("hp", hp.current?.value.toString() as string);
        param.append("user_type", selected);
        param.append("zip_code", zipCode.current?.value.toString() as string);
        param.append("addr", addr.current?.value.toString() as string);
        param.append("addr_detail", addrDetail.current?.value.toString() as string);

        axios.post("/management/userSave.do", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                onSuccess();
            }
        });
    };

    const handlerUpdate = () => {
        const param = new URLSearchParams();

        param.append("loginID", loginID?.toString() as string);
        param.append("password", pw.current?.value.toString() as string);
        param.append("name", name.current?.value.toString() as string);
        param.append("email", email.current?.value.toString() as string);
        param.append("hp", hp.current?.value.toString() as string);
        param.append("user_type", selected);
        param.append("zip_code", zipCode.current?.value.toString() as string);
        param.append("addr", addr.current?.value.toString() as string);
        param.append("addr_detail", addrDetail.current?.value.toString() as string);

        axios.post("/management/userUpdate.do", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                onSuccess();
            }
        });
    };

    const handlerDelete = () => {
        const param = new URLSearchParams();

        param.append("loginID", loginID?.toString() as string);

        axios.post("/management/userDelete.do", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                onSuccess();
            }
        });
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    return (
        <>
            <UserInfoModalStyled>
                <div className="container">
                    <label>
                        아이디 :
                        <input
                            type="text"
                            defaultValue={userInfoDetail[0]?.loginID}
                            ref={id}
                            disabled={loginID != null && loginID !== ""}
                        ></input>
                    </label>
                    <label>
                        비밀번호 : <input type="text" defaultValue={userInfoDetail[0]?.password} ref={pw}></input>
                    </label>
                    <label>
                        직원명 : <input type="text" defaultValue={userInfoDetail[0]?.name} ref={name}></input>
                    </label>
                    <label>
                        이메일 : <input type="text" defaultValue={userInfoDetail[0]?.email} ref={email}></input>
                    </label>
                    <label>
                        연락처 : <input type="text" defaultValue={userInfoDetail[0]?.hp} ref={hp}></input>
                    </label>

                    <label>담당업무:</label>

                    <select value={selected} onChange={handleSelect}>
                        {selectList.map((item) => (
                            <option value={item.value}>{item.name}</option>
                        ))}
                    </select>
                    <label>
                        우편번호 : <input type="text" defaultValue={userInfoDetail[0]?.zip_code} ref={zipCode}></input>
                    </label>
                    <label>
                        주소 : <input type="text" defaultValue={userInfoDetail[0]?.addr} ref={addr}></input>
                    </label>
                    <label>
                        상세주소 :
                        <input type="text" defaultValue={userInfoDetail[0]?.addr_detail} ref={addrDetail}></input>
                    </label>
                    <div className={"button-container"}>
                        <button onClick={loginID ? handlerUpdate : handlerSave}>{loginID ? "수정" : "등록"}</button>
                        {loginID ? <button onClick={handlerDelete}>삭제</button> : null}
                        <button onClick={() => setModal(!modal)}>나가기</button>
                    </div>
                </div>
            </UserInfoModalStyled>
        </>
    );
};
