import PreviveList from 'layout/preview/PreviewList'
import AuthorInfo from 'components/myPage/AuthorInfo'
import Aside from 'components/myPage/Aside'

export default class MyPage extends React.Component {
    constructor(props){
      super(props)
      this.collectionClick = this.collectionClick.bind(this)
      this.changeNoteBooks = this.changeNoteBooks.bind(this)
    }
    collectionClick(collection_id,collection_name,userInfo){
          this.props.changePreview({collection_id},collection_name)
    }
    changeNoteBooks(collection_id,collection_name){
      this.props.changePreview({collection_id},collection_name)
    }
    render(){
        let {previewsName,myPagePreviews,noteBooks,location,myInfo,initMyPage,updateUserIntro} = this.props

        let {userInfo} = location.state
        let isMe = false;
        if(myInfo){
          isMe = myInfo.user_id === userInfo.user_id
          userInfo = myInfo
        }
        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo {...{
                        userInfo,
                        initMyPage
                    }}/>
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviveList {...{
                        previews:myPagePreviews,
                        initMyPage,
                        collectionClick:this.collectionClick
                    }}/>
                </div>
                <div className="four wide column">
                    <Aside {...{
                        noteBooks,
                        userInfo,
                        isMe,
                        updateUserIntro,
                        changeNoteBooks:this.changeNoteBooks
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
