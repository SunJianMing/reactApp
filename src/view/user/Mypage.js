import PreviveList from 'layout/preview/PreviewList'
import AuthorInfo from 'components/myPage/AuthorInfo'
import Aside from 'components/myPage/Aside'

export default class MyPage extends React.Component {
    render(){
        let {previewsName,myPagePreviews,noteBooks,location} = this.props
            console.log(location);
        let {userInfo} = location.state
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
                        previews:myPagePreviews
                    }}/>
                </div>
                <div className="four wide column">
                    <Aside {...{
                        noteBooks,
                        userInfo
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
