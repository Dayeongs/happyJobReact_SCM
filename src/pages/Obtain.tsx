import { ContentBox } from "../component/common/ContentBox/ContentBox"
import { ObtainList } from "../component/page/Business/Obtain/ObtainList/ObtainList"
import { ObtainSearch } from "../component/page/Business/Obtain/ObtainSearch/ObtainSearch"


export const Obtain = ()=>{
    return(
        <>
            <ContentBox>수주현황</ContentBox>
            <ObtainSearch></ObtainSearch>
            <ObtainList></ObtainList>
        </>
    )
}