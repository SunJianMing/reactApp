import {Link} from  'react-router-dom'
import cfg from 'config/config.json'

export default function({user,collectionClick}){
    let {user_name,avatar,user_intro} = user;

    avatar = cfg.url + avatar
    return (
        <div className="item">
            <Link to='/' className="ui mini avatar image"
              onClick = {
                ev => {
                  ev.stopPropagation()
                  ev.preventDefault()
                  collectionClick && collectionClick(user.id,user_name,{user_id:user.id,avatar,user_name,user_intro})

                }
              }
            >
                <img src={avatar} alt=""/>

            </Link>
            <div className="content">
                <div className="header">{user_name}</div>
            </div>
        </div>
    )
}
