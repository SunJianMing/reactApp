import PreviewList from 'layout/preview/PreviewList'
import Recommend from 'components/home/Recommend'

export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      previewList : []
    }
  }
  componentWillMount(){
    axios.post('http://api.noods.me/getPreview').then((res)=>{
      console.log(res);
    })
  }
  render(){
    return (
      <div className='ui grid container'>
        <div className="column twelve wide">
              <PreviewList/>
        </div>
        <div className="column four wide">
            <Recommend/>
        </div>
      </div>
    )
  }
}
