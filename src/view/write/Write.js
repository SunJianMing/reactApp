// import S from './style.scss'
import cfg from 'config/config.json'

export default class extends React.Component {
  constructor(props){

    super(props)
    this.state = {
      collections:[],
      cltId:null,
      titleValue:'',
      cltValue:'',
      contentValue:''
    }
    this.titleChange = this.titleChange.bind(this)
    this.cltValueChange = this.cltValueChange.bind(this)
    this.contentChange = this.contentChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addCollection = this.addCollection.bind(this)

    this.collectionName = {}
  }
  titleChange(ev){
    let {value} = ev.target
    this.setState({
      titleValue:value
    })
  }
  cltValueChange(ev){
    let {value} = ev.target
    this.setState({
      cltValue:value
    })
  }
  contentChange(ev){
    let {value} = ev.target
    this.setState({
      contentValue:value
    })
  }

  onSubmit(ev){
      ev.stopPropagation()
      ev.preventDefault()


      let {value:cltId} = this.refs.cltIdInput
      if(!cltId) return ;
      let {
        titleValue:article_title,
        contentValue:article_content
      } = this.state
      let {user_id} = this.props.myInfo
      let collection_name = this.collectionName[cltId]
      $.post(`${cfg.url}/addArticle`,{
        article_title,
        article_content,
        user_id,
        collection_id:cltId,
        collection_name
      })
      .done(({code})=>{
        if(code === 0){
          this.setState({
            titleValue:'',
            contentValue:''
          })
        }
      })
  }
  addCollection(ev){
    let {user_id} = this.props.myInfo;
    let {cltValue:name} = this.state;
    if(ev.keyCode === 13){
      $.post(`${cfg.url}/addCollection`,{
        name,
        user_id
      })
      .done(({code,data})=>{
        if(code === 0){
          this.setState({
            cltValue:'',
            collections:data
          })
        }
      })
    }
  }
  componentDidMount(){
    let {user_id} = this.props.myInfo

    $.post(`${cfg.url}/getCollection`,{user_id})
    .done(({code,data})=>{
      if(code === 0){
        this.setState({
          collections:data
        })
      }
    })
    $(this.refs.dropdown).dropdown()
  }
  render(){
    let {collections,titleValue,cltValue,contentValue} = this.state;
    let {titleChange,cltValueChange,contentChange,collectionName,addCollection} = this;
    collections = collections.map(({id,collection_name},i)=>{
      collectionName[id] = collection_name
      return (
        <div className="item" key={i} data-value={id}>{collection_name}</div>
      )
    })

    return (
      <div className="ui container">
        <header className="ui header dividing">
          <h1>写文章</h1>
        </header>
        <form  className="ui form" onSubmit = {this.onSubmit}>
          <div className="field">
            <input
              type="text"
              value={titleValue}
              className="form-control"
              placeholder="标题"
              onChange={titleChange}
            />
          </div>

          <div className="fields">
            <div className="field five wide column required">
              <div className="ui selection dropdown" ref='dropdown' id="writeArtcal">
                <input type="hidden" name="album" ref="cltIdInput"/>
                <div className="default text">选择一个标题</div>
                <div className="dropdown icon"></div>
                <div className="menu">
                  {collections}
                </div>
              </div>
            </div>
            <div className="field eleven wide column">
              <input type="text"
                className=""
                value={cltValue}
                onChange={cltValueChange}
                onKeyDown = {addCollection}
                placeholder="回车，增加文章"/>
            </div>
          </div>
          <div className="field">
            <textarea  value={contentValue} onChange={contentChange}  className="" placeholder="随便写点文字。。。" rows="16"></textarea>
          </div>
          <div className="field">
            <button type="submit" className="ui button primary">保存</button>
          </div>
        </form>
      </div>
    )
  }
}
