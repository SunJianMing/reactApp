import {Route} from 'react-router-dom'
import Nav from 'layout/nav/Nav'
import Home from 'view/home/Home'
import S from './style.scss'

export default class extends React.Component {
  render(){
    return (
      <div className={S.layout}>
          <Nav/>
          <Route exact path='/' component={Home}></Route>
      </div>
    )
  }
}
