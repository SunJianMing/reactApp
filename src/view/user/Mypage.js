import PreviveList from 'layout/preview/PreviewList'
import AuthorInfo from 'components/myPage/AuthorInfo'
import Aside from 'components/myPage/Aside'

export default class MyPage extends React.Component {
    render(){
        let {previewsName,myPagePreviews,noteBooks,location,myInfo,initMyPage,updateUserIntro} = this.props

        let {userInfo} = location.state
        let isMe = false;
        if(myInfo){
          isMe = myInfo.user_id === userInfo.user_id
        }
        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo {...{
                        userInfo
                    }}/>
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviveList {...{
                        previews:myPagePreviews,
                        initMyPage
                    }}/>
                </div>
                <div className="four wide column">
                    <Aside {...{
                        noteBooks,
                        userInfo,
                        isMe,
                        updateUserIntro
                    }}/>
                </div>
            </div>
        )
    }
}

MyPage.propTypes = {
    myPagePreviews:PT.array,
    noteBooks:PT.array,
    previewsName:PT.string
}
