import {Link} from 'react-router-dom'
import S from './style.scss'

import Preview from './Preview'

import cfg from 'config/config.json'
export default function(props) {
    let {previews} = props;


    previews = previews.map((elt, i) => {
        let {
            id: article_id,
            preview: previewContent,
            article_title,
            createdAt,
            collection_name,
            user_id,
            collection_id,
            user
        } = elt;
        user = user?user:{}
        let {avatar, user_name, user_intro} = user

        avatar = cfg.url+(avatar?avatar:'/initAvatar.jpg')
        return (
            <Preview
                      {...{
                        article_id,
                        article_title,
                        previewContent,
                        user_id,
                        user_name,
                        createdAt,
                        user_intro,
                        avatar
                      }}
                       key={i}
                       >
              <Link to='' className={S.tag}>{collection_name}</Link>
          </Preview>
      )
    })

    return (<div>{previews}</div>)
}
