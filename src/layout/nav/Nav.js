import {Link, NavLink} from 'react-router-dom'
import S from './style.scss'

export default function Nav(props) {

        let {myInfo,loginout} = props;
        
        let userLink = null;

        if(myInfo){
            userLink = (
                <NavLink to='/my_page'
                    className={`${S.avatar} item`}
                >
                    <img src={myInfo.avatar} className='ui image avatar' alt=""/>
                    <div className={S.dropDown}>
                        <p onClick={ev=>{
                            ev.stopPropagation()
                            ev.preventDefault()
                            loginout()
                        }}>注销</p>
                    </div>
                </NavLink>
            )
        }else{
            userLink = [
                (<NavLink to='/sign_in' className='item' key={1}>登录</NavLink>),
                (<NavLink to='/sign_up' className='item' key={2}>注册</NavLink>)]
        }

        return (<div className={`ui menu fixed secondary pointing ${S.nav}`}>
            <div className="ui container">
                <Link to='/' className='header item'>Noods</Link>
                <NavLink to='/' exact className='item'>首页</NavLink>
                <div className="menu right">
                    {userLink}

                    <NavLink to='/write' className='item'>写文章</NavLink>
                </div>
            </div>
        </div>)

}

Nav.propTypes = {
    myInfo:PT.object,
    loginout:PT.func
}
