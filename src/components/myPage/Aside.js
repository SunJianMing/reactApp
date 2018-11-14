import S from './style.scss'
import cfg from 'config/config.json'

export default class Aside extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inEdit:false,
      editValue:''
    }
    this.editMe = this.editMe.bind(this)
    this.changeEditValue = this.changeEditValue.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
  }
  editMe(){
    let {user_intro} = this.props.userInfo;
    this.setState({
      inEdit:true,
      editValue:user_intro
    })
  }
  changeEditValue(ev){
    let {value} = ev.target
    this.setState({
      editValue:value
    })
  }
  cancelEdit(ev){
    ev.stopPropagation()
    ev.preventDefault()
    this.setState({
      inEdit:false,
      editValue:''
    })
  }
  saveEdit(ev){
    ev.stopPropagation()
    ev.preventDefault()
    let {editValue} = this.state;
    let {userInfo:{user_id}} = this.props

    $.post(`${cfg.url}/editIntro`,{user_intro:editValue,user_id})
    .done(({code})=>{
      if(code === 0){
        this.props.updateUserIntro(editValue)
        this.setState({
          inEdit:false
        })
      }

    })

  }
    render(){
        let {noteBooks,userInfo,isMe,changeNoteBooks} = this.props

        let {user_id,user_intro} = userInfo
        let {inEdit,editValue} = this.state;

        noteBooks = noteBooks.map((elt,i)=>{
            let {id:collection_id,collection_name} = elt;
            return (
                <div
                  className="item" key={i}
                  onClick={ev=>changeNoteBooks(collection_id,collection_name)}
                  >
                     <i className="book icon"></i>
                     <div className="content">
                         {collection_name}
                     </div>
                </div>
            )
        })
        return (
            <div className={S.aside}>
                <div className="introduce">
                    <div className="title">
                        个人介绍

                        {isMe && (
                          <div
                            className="ui button tiny basic right floated"
                            onClick = {
                                this.editMe
                            }
                            >
                            <i className="icon write"></i>编辑
                          </div>
                        )}
                          <div className="ui divider hidden"></div>
                          {
                            inEdit?(
                              <form className='ui form' onSubmit={
                                this.saveEdit
                              }>
                                <div className="field">
                                  <textarea value={editValue} onChange={this.changeEditValue}></textarea>
                                </div>
                                <button
                                  className="ui button positive"
                                  type="subimt"
                                  >提交</button>
                                <button
                                  className="ui button negative"
                                  type="subimt"
                                  onClick = {
                                    this.cancelEdit
                                  }
                                  >取消</button>
                              </form>
                            )
                            :(<p>{user_intro}</p>)}

                    </div>
                </div>
                <div className="ui divider hidden"></div>
                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                            {noteBooks}
                    </div>
                </div>
            </div>
        )
    }
}
Aside.propTypes = {
    noteBooks:PT.array
}
