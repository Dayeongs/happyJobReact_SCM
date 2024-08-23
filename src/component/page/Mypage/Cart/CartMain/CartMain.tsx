import { useEffect, useState } from "react";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../../common/potal/Portal";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import axios, { AxiosResponse } from "axios";
import { Button } from "../../../../common/Button/Button";

export interface ICartList {
    loginID: string;
    equipment_type: string;
    item_name: string;
    manufac: string;
    count: number;
    total: number;
    item_code: string;
}

export interface ICart {
    item_code: string;
}

export interface ICartListRequest {
    list: ICart[];
}


export interface ICartListJsonResponse {
    cartCnt: number;
    cartInfo: ICartList[];
    loginId: string;
}

export interface IPostResponse {
    result: string;
}

export const CartMain = () => {
    const [cartList, setCartList] = useState<ICartList[]>([]);
    const [listCount, setListCount] = useState<number>(0);
    const [loginID, setLoginID] = useState<string>("");
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [checkedListById, setCheckedListById] = useState<string[]>([]);
    const numChecked = checkedListById.length;
    const [totalSum, setTotalSum] = useState<number>(0);
    const [itemCount, setitemCount] = useState<string>();
    const [itemCode, setItemCode] = useState<string>();

    useEffect(() => {
        searchCartList();
    }, []);

    useEffect(() => {
        setTotalSum(
            cartList.reduce(
                (sum, item) => (checkedListById.includes(item.item_code) ? sum + (item.total || 0) : sum),
                0
            )
        );
    }, [checkedListById, cartList]);

    useEffect(()=>{
        changeCount()
    },[itemCount])

    const handleOnChange = (id: string) => {
        const isChecked = checkedListById.includes(id);
        if (isChecked) {
            setCheckedListById((prev) => prev.filter((el) => el !== id));
        } else {
            setCheckedListById((prev) => [...prev, id]);
        }
    };

    const toggleAllCheckedByItemCode = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
        if (checked) {
            console.log("맹구", checkedListById);
            setCheckedListById(cartList.map((a) => a.item_code));
        } else {
            setCheckedListById([]);
        }
    };

    const searchCartList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams();

        axios.post("/mypage/cartListJson.do", searchParam).then((res: AxiosResponse<ICartListJsonResponse>) => {
            setCartList(res.data.cartInfo);
            setListCount(res.data.cartCnt);
            setLoginID(res.data.loginId);
            setCurrentParam(cpage);
        });
    };

    const changeCount = () => {
        
        axios
            .post("/mypage/cartCountChangeJson.do", {
                item_code: itemCode,
                loginID: loginID,
                obtain_count: itemCount
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("수정 되었습니다.");
                    searchCartList();
                }
            });
    };

    const cartDelete = (itemCode: string) => {
        axios
            .post("/mypage/cartDeleteJson.do", {
                item_code: itemCode,
                loginID: loginID,
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("삭제 되었습니다.");
                    searchCartList();
                }
            });
    };

    const productBuy = () => {
        axios
            .post(`/mypage/productBuyJson.do`, {
                item: checkedListById
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("결제 되었습니다.");
                    searchCartList();
                }
            });
    };
    return (
        <>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={4}>
                            <input
                                type="checkbox"
                                id="selectAll"
                                onChange={toggleAllCheckedByItemCode}
                                checked={numChecked === cartList.length}
                            />
                        </StyledTh>
                        <StyledTh size={10}>장비구분</StyledTh>
                        <StyledTh size={20}>제품명</StyledTh>
                        <StyledTh size={20}>제조사</StyledTh>
                        <StyledTh size={10}>수량</StyledTh>
                        <StyledTh size={15}>가격</StyledTh>
                        <StyledTh size={5}>삭제</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {cartList.length > 0 ? (
                        cartList?.map((a, i) => {
                            return (
                                <tr key={a.item_code}>
                                    <StyledTd>
                                        <input
                                            type="checkbox"
                                            name="checkbox"
                                            defaultValue={a.item_code}
                                            onChange={() => handleOnChange(a.item_code)}
                                            checked={checkedListById.includes(a.item_code)}
                                        />
                                    </StyledTd>
                                    <StyledTd>{a.equipment_type}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>{a.manufac}</StyledTd>
                                    <StyledTd>
                             
                                        <input type="text" name="count" defaultValue={a.count} onChange={(e)=>{
                                            setItemCode(a.item_code)
                                            setitemCount(e.target.value)
                                        }} />
                                     
                                    </StyledTd>
                                    <StyledTd>{a.total}</StyledTd>
                                    <StyledTd onClick={() => cartDelete(a.item_code)}>삭제</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <div>총합: {totalSum} <Button onClick={productBuy}>결제</Button></div>
        </>
    );
};
