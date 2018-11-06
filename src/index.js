
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Frame from 'layout/frame/Frame'

//nodes.microbu.com
import 'semantic/dist/semantic.min.css'
import 'semantic/dist/semantic.min'



ReactDom.render(
    <Router>
      <Route path='/' component={Frame}/>
    </Router>
  ,document.getElementById('root'))
