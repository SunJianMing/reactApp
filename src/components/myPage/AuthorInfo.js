import S from './style.scss'
import {Link} from 'react-router-dom'
export default function AuthorInfo(props){
    let {avatar,user_name,user_id} = props.userInfo;

    return (
        <div className={S.author_info}>
            <Link to='/my_page' className={S.avatar}>
                <img src={avatar} alt=""/>
            </Link>
                <div className={S.title}>
                    <Link to='/my_page' className={S.name}>{user_name}</Link>
                </div>
        </div>
    )
}
AuthorInfo.propTypes = {
    userInfo:PT.object
}
