import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ExecutivePnLMain } from "../component/page/Executives/ExecutivesPnLMain/ExecutivePnLMain";
import { ExecutivesPnLSearch } from "../component/page/Executives/ExecutivesPnLSearch/ExecutivesPnLSearch";

export const ExecutivesPnL = () => {
    return (
        <>
            <ContentBox>손익 그래프</ContentBox>
            <ExecutivesPnLSearch />
            <ExecutivePnLMain />
        </>
    );
};
