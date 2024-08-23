import { FC, useEffect, useState } from "react";
import { ProductModalStyled, ProductModalTableStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { Button } from "../../../common/Button/Button";
import { postProductApi } from "../../../../api/postProductApi";
import { ProductApi } from "../../../../api/api";
import { nullCheck } from "../../../../common/nullCheck";
import { Navigate, useNavigate } from "react-router-dom";

export interface IProductModalProps {
    onPostSuccess: () => void;
    itemCode: string;
    setItemCode: (itemCode: string) => void;
    buy: boolean;
    setBuy: (buy: boolean) => void;
}

export interface IPostResponse {
    result: string;
}

export interface IProduct {
    item_code: string;
    item_name: string;
    item_price: number;
    major_class: string;
    sub_class: string;
    manufac: string;
    item_stand: string;
    item_surtax: number;
    item_note: string;
    provide_value: number;
    equipment_type: string;
    img_path: string;
    product_detail: string;
}

export interface IProductDetailJsonResponse {
    productInfo: IProduct;
}

export const ProductModal: FC<IProductModalProps> = ({ onPostSuccess, itemCode, setItemCode, buy, setBuy }) => {
    const [modal, setModal] = useRecoilState(modalState);
    const [product, setProduct] = useState<IProduct>();
    const [itemCount, setItemCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (modal) searchProductDetail(itemCode);
    }, [modal]);

    useEffect(() => {
        if (product?.item_price) setTotalPrice(itemCount * product?.item_price);
    }, [itemCount]);

    const searchProductDetail = async (itemCode: string) => {
        const postSearchProduct = await postProductApi<IProductDetailJsonResponse>(ProductApi.detailProductJson, { item_code: itemCode });
        if (postSearchProduct) {
            setProduct(postSearchProduct.productInfo);
        }
    };

    const handlerProductCart = async () => {
        if (!nullCheck([{ inval: itemCount, msg: "수량을 입력해주세요" }])) {
            return;
        }
        const postProductCart = await postProductApi<string>(ProductApi.saveCartProductJson, { item_code: itemCode, obtain_count: itemCount });
        if (postProductCart && postProductCart === "success") {
            alert("제품이 장바구니에 추가되었습니다.");
            onPostSuccess();
        }
    };

    const handlerProductPay = async () => {
        if (!nullCheck([{ inval: itemCount, msg: "수량을 입력해주세요" }])) {
            return;
        }

        if (!window.confirm("해당 상품을 결제하시겠습니까?")) {
            return;
        }

        const postProductPay = await postProductApi<string>(ProductApi.savePayProductJson, { item_code: itemCode, count: itemCount });
        if (postProductPay) {
            alert("결제가 완료되었습니다.");
            if (!window.confirm("쇼핑을 계속 하시겠습니까?")) {
                navigate("/react" + postProductPay);
            }
            onPostSuccess();
        }
    };

    const cleanUp = () => {
        setItemCode("");
        setProduct(undefined);
        setItemCount(0);
        setTotalPrice(0);
        setBuy(true);
    };

    return (
        <ProductModalStyled isOpen={modal} ariaHideApp={false} onAfterClose={cleanUp}>
            <div className="wrap">
                <div className="header">제품 상세정보</div>
                <ProductModalTableStyled>
                    <tbody>
                        <tr>
                            <th>제품명</th>
                            <td>
                                <input type="text" name="itemName" defaultValue={product?.item_name} readOnly></input>
                            </td>
                        </tr>
                        <tr>
                            <th>장비구분</th>
                            <td>
                                <input type="text" name="equipmentType" defaultValue={product?.equipment_type} readOnly></input>
                            </td>
                        </tr>
                        <tr>
                            <th>제품정보</th>
                            <td>
                                <textarea name="productDetail" defaultValue={product?.product_detail} readOnly></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>제조사</th>
                            <td>
                                <input type="text" name="manufac" defaultValue={product?.manufac} readOnly></input>
                            </td>
                        </tr>

                        <tr>
                            <th>가격</th>
                            <td>
                                <input type="text" id="itemPrice" name="itemPrice" defaultValue={product?.item_price.toLocaleString("ko-kr")} readOnly></input>
                                <span>원</span>
                            </td>
                        </tr>
                        {buy ? (
                            <>
                                <tr>
                                    <th>
                                        수량<span style={{ color: "red" }}>*</span>
                                    </th>
                                    <td>
                                        <input type="number" id="count" name="count" value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} min={0} required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>총가격</th>
                                    <td>
                                        <input type="text" id="totalPrice" name="totalPrice" value={totalPrice.toLocaleString("ko-kr")} readOnly></input>
                                        <span>원</span>
                                    </td>
                                </tr>
                            </>
                        ) : null}
                    </tbody>
                </ProductModalTableStyled>
                <div className="btn-group">
                    {buy ? (
                        <>
                            <Button onClick={handlerProductPay}>결제</Button>
                            <Button onClick={handlerProductCart}>담기</Button>
                        </>
                    ) : null}

                    <Button onClick={() => setModal(!modal)}>닫기</Button>
                </div>
            </div>
        </ProductModalStyled>
    );
};
