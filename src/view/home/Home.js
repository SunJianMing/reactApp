import PreviewList from 'layout/preview/PreviewList'
import Recommend from 'components/home/Recommend'

import cfg from 'config/config.json'

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      previews : [],
      authors:[]
    }
  }
  componentDidMount(){
      let getPreviews = ()=>{
          return axios.post(`${cfg.url}/getPreview`)
      }
      let getAuthors = ()=>{
          return axios.post(`${cfg.url}/getAuthor`)
      }
      axios.all([getPreviews(),getAuthors()])
      .then(axios.spread(({data:previews},{data:authors})=>{
          this.setState({
              previews,
              authors:authors.splice(0,5)
          })
      }))

  }
  render(){
      let {previews,authors} = this.state;
        let {initMyPage,history} = this.props
    return (
      <div className='ui grid container'>
        <div className="column twelve wide">
              <PreviewList {...{previews,initMyPage}}/>
        </div>
        <div className="column four wide">
            <Recommend {...{authors}}/>
        </div>
      </div>
    )
  }
}
Home.propTypes = {
    initMyPage:PT.func
}
