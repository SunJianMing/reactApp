import {Link} from 'react-router-dom'
import Author from './Author'
import S from './style.scss'

export default function({authors}){
  // authors= []
  
  return (
    <div className={S.recommend}>
        <div>
          <span>作者列表</span>
        </div>
        <div className="ui items">
          {
            authors.map((elt,i)=>{
              return (
                <Author
                  {...{
                    user:elt
                  }}
                  key={i}
                />)
            })
          }
        </div>
    </div>
  )
}
