import {Link,withRouter} from 'react-router-dom'
import S from './style.scss'

 function Preview(props){

    let {
        article_id,
        article_title,
        avatar,
        previewContent,
        user_intro,
        user_name,
        user_id,
        createdAt,
        initMyPage,
        history
    } = props

    user_id = user_id?user_id:1
    createdAt = new Date(createdAt).toLocaleString()
    return (
        <div className={S.note}>
            <div className="ui divider hidden">
                <div className={S.content}>
                    <div className={S.author}>
                        <Link to='/my_page'
                            onClick={ev=>{
                                ev.stopPropagation()
                                ev.preventDefault()
                                history.push({
                                    pathname:'/my_page',
                                    state:{
                                        userInfo:{
                                            user_id,
                                            user_name,
                                            avatar,
                                            user_intro
                                        }
                                    }
                                })

                                initMyPage(user_id,{user_id},'所有文章')
                            }}
                            className='avatar'
                        >
                            <img src={avatar} className="ui avatar image" alt=""/>
                        </Link>
                        <div className={S.name}>
                            <Link to=''>{user_name}</Link>
                            <span className='time'>{createdAt}</span>
                        </div>
                    </div>
                    <Link to='' className={S.title}>{article_title}</Link>
                    <p className={S.abstract}>
                        {previewContent}
                    </p>
                    <div className={S.meta}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Preview)
