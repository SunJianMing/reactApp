import {Link} from 'react-router-dom'
import S from './style.scss'

import Preview from './Preview'
import cfg from 'config/config.json'

export default function PreviewList(props) {
    let {previews,initMyPage,collectionClick} = props;


    previews = previews.map((elt,i) => {
        let {
            id: article_id,
            preview: previewContent,
            article_title,
            createdAt,
            collection_name,
            user_id,
            collection_id,
            user,

        } = elt;
        user = user?user:{}
        let {avatar,user_name,user_intro} = user;
        avatar = cfg.url+(avatar?avatar:'/initAvatar.jpg')
        return (
            <Preview
                      {...{
                        article_id,
                        article_title,
                        previewContent,
                        avatar,
                        user_id,
                        user_name,
                        createdAt,
                        user_intro,
                        initMyPage
                      }}
                       key={i}
                       >
              {collection_id && (<Link to='' onClick={
                ev=>{
                  ev.preventDefault()
                  ev.stopPropagation()

                  collectionClick && collectionClick(
                    collection_id,
                    collection_name,
                    {
                      user_id,
                      user_name,
                      avatar,
                      user_intro
                    }
                  )
                }
              } className={S.tag}>{collection_name}</Link>)}
          </Preview>
      )
    })

    return (<div>{previews}</div>)
}

PreviewList.propTypes = {
    previews:PT.array,
    initMyPage:PT.func
}
