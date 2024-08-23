import { ProductProvider } from "../api/provider/ProductProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ProductMain } from "../component/page/Product/ProductMain/ProductMain";
import { ProductSearch } from "../component/page/Product/ProductSearch/ProductSearch";

export const Product = () => {
    return (
        <ProductProvider>
            <ContentBox>제품</ContentBox>
            <ProductSearch />
            <ProductMain />
        </ProductProvider>
    );
};
