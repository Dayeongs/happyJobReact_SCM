import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { DeliveryListMain } from "../component/page/Direction/DeliveryList/DeliveryList/DeliveryListMain";
import { DeliverySearch } from "../component/page/Direction/DeliveryList/DeliverySearch/DeliverySearch";

export const DeliveryList = () => {
    return (
        <>
            <ContentBox>배송지시서</ContentBox>
            <DeliverySearch />
            <DeliveryListMain />
        </>
    );
};
