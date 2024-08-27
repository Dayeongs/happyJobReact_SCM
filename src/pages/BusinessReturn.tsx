import { ContentBox } from "../component/common/ContentBox/ContentBox"
import { ReturnList } from "../component/page/Business/Return/ReturnList/ReturnList"
import { ReturnSearch } from "../component/page/Business/Return/ReturnSearch/ReturnSearch"

export const BusinessReturn = ()=>{
    return(
        <>
            <ContentBox>반품내역</ContentBox>
            <ReturnSearch></ReturnSearch>
            <ReturnList></ReturnList>
        </>
    )
}