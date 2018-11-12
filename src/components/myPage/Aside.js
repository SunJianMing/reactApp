import S from './style.scss'

export default class Aside extends React.Component{
    render(){
        let {noteBooks,userInfo} = this.props
        let {user_id,user_intro} = userInfo
        noteBooks = noteBooks.map((elt,i)=>{
            let {id:collection_id,collection_name} = elt;
            return (
                <div className="item" key={i}>
                     <i className="book icon"></i>
                     <div className="content">
                         {collection_name}
                     </div>
                </div>
            )
        })
        return (
            <div className={S.aside}>
                <div className="introduce">
                    <div className="title">
                        个人介绍
                        <div className="ui divider hidden">

                        </div>
                        <p>{user_intro}</p>
                    </div>
                </div>
                <div className="ui divider hidden"></div>
                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                            {noteBooks}
                    </div>
                </div>
            </div>
        )
    }
}
Aside.propTypes = {
    noteBooks:PT.array
}
