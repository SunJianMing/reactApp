import PreviewList from 'layout/preview/PreviewList'
import Recommend from 'components/home/Recommend'

import cfg from 'config/config'

export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      previews:[],
      authors:[]
    }
  }
  componentDidMount(){
    axios.post(`${cfg.url}/getPreview`)
        .then(({code,data})=>{
          if(code ===0){
            this.setState({
              previews:data
            })
          }
        })

    axios.post(`${cfg.url}/getAuthor`)
        .then((res)=>{

          this.setState({
            authors:res.data.splice(0,10)
          })
        })
  }
  render(){
    let {previews,authors} = this.state
    return (
      <div className='ui grid container'>
        <div className="column twelve wide">
              <PreviewList {...{previews}}/>
        </div>
        <div className="column four wide">
            <Recommend
              {...{
                authors
              }}
            />
        </div>
      </div>
    )
  }
}
