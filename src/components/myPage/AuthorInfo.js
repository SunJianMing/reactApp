import S from './style.scss'
import {Link} from 'react-router-dom'
export default function AuthorInfo(props){
    let {avatar,user_name,user_id} = props.userInfo;

    return (
        <div className={S.author_info}>
            <Link to='/my_page'
             className={S.avatar}
             onClick={
               ev => {
                 ev.preventDefault()
                 ev.stopPropagation()
                 props.initMyPage(user_id,{user_id},'所以文章')
               }
             }
             >
                <img src={avatar} alt=""/>
            </Link>
                <div className={S.title}>
                    <span  className={S.name}>{user_name}</span>
                </div>
        </div>
    )
}
AuthorInfo.propTypes = {
    userInfo:PT.object
}
