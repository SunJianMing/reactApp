import {Link} from 'react-router-dom'
import S from './style.scss'

export default function(props){

    let {
        article_id,
        article_title,
        avatar,
        previewContent,
        user_intro,
        user_name,
        createdAt
    } = props
    createdAt = new Date(createdAt).toLocaleString()
    return (
        <div className={S.note}>
            <div className="ui divider hidden">
                <div className={S.content}>
                    <div className={S.author}>
                        <Link to='/'
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
