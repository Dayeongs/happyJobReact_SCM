import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { OrderListMain } from "../component/page/Direction/OrderList/OrderList/OrderListMain";
import { OrderListSearch } from "../component/page/Direction/OrderList/OrderListSearch/OrderListSearch";

export const OrderList = () => {
    return (
        <>  <ContentBox>발주지시서 현황</ContentBox>
            <OrderListSearch />
            <OrderListMain />
        </>
    );
};