import {Link} from 'react-router-dom'

import Preview from './Preview'

export default function(props) {
    let {previews} = props;
    previews = []

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
        let {avatar, user_name, user_intro} = user
        return (
            <Preview
                      {...{
                        article_id,
                        article_title,
                        previewContent,
                        collection_id,
                        collection_name,
                        user_id,
                        user_name,
                        user_intro
                      }}
                       key={i}
                       >
              <link to=''>{collection_name}</link>
          </Preview>
      )
    })

    return (<div>{previews}</div>)
}
