import { useContext, useEffect, useState } from "react";
import { ProductMainStyled } from "./styled";
import { ProductContext } from "../../../../api/provider/ProductProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { Button } from "../../../common/Button/Button";
import { postProductApi } from "../../../../api/postProductApi";
import { ProductApi } from "../../../../api/api";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { ProductModal } from "../ProductModal/ProductModal";

export interface IProduct {
    item_code: string;
    item_name: string;
    item_price: number;
    major_class: string;
    sub_class: string;
    manufac: string;
    equipment_type: string;
}

export interface IProductListJsonResponse {
    productList: IProduct[];
    totalCnt: number;
}

export const ProductMain = () => {
    const { searchKeyword } = useContext(ProductContext);
    const [productList, setProductList] = useState<IProduct[]>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [modal, setModal] = useRecoilState(modalState);
    const [itemCode, setItemCode] = useState<string>("");
    const [buy, setBuy] = useState<boolean>(true);

    useEffect(() => {
        searchProductList();
    }, [searchKeyword]);

    const searchProductList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const postSearchProduct = await postProductApi<IProductListJsonResponse>(ProductApi.listProductJson, {
            ...searchKeyword,
            cpage: currentPage,
            pageSize: 10,
        });
        if (postSearchProduct) {
            setProductList(postSearchProduct.productList);
            setTotalCnt(postSearchProduct.totalCnt);
            setCurrentPage(currentPage);
        }
    };

    const handlerModal = (buy: boolean, itemCode: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setItemCode(itemCode);
        setModal(!modal);
        setBuy(buy);
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchProductList(currentPage);
    };

    return (
        <ProductMainStyled>
            <StyledTable>
                <colgroup>
                    <col width="15%" />
                    <col width="40%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh>장비구분</StyledTh>
                        <StyledTh>제품명</StyledTh>
                        <StyledTh>제조사</StyledTh>
                        <StyledTh>가격</StyledTh>
                        <StyledTh></StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {productList && productList.length > 0 ? (
                        productList.map((product) => {
                            return (
                                <tr key={product.item_code} onClick={(e) => handlerModal(!buy, product.item_code, e)}>
                                    <StyledTd>{product.equipment_type}</StyledTd>
                                    <StyledTd>{product.item_name}</StyledTd>
                                    <StyledTd>{product.manufac}</StyledTd>
                                    <StyledTd>{product.item_price.toLocaleString("kr-KO")} 원</StyledTd>
                                    <StyledTd>
                                        <button onClick={(e) => handlerModal(buy, product.item_code, e)}>구매</button>
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={5}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate totalItemsCount={totalCnt} onChange={searchProductList} itemsCountPerPage={10} activePage={currentPage as number}></PageNavigate>
            <ProductModal onPostSuccess={onPostSuccess} itemCode={itemCode} setItemCode={setItemCode} buy={buy} setBuy={setBuy}></ProductModal>
        </ProductMainStyled>
    );
};
