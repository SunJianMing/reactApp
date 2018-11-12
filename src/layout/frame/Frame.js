import {Route, Redirect} from 'react-router-dom'
import Nav from 'layout/nav/Nav'
import Home from 'view/home/Home'
import SignIn from 'view/user/SignIn'
import SignUp from 'view/user/SignUp'
import MyPage from 'view/user/Mypage'

import cfg from 'config/config.json'
import S from './style.scss'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg: null,
            hasLogin:false,
            myPagePreviews:[],
            noteBooks:[],
            previewsName:'所有文章'
        }
        this.signInAjax = this.signInAjax.bind(this)
        this.signUpAjax = this.signUpAjax.bind(this)
        this.clearfixSignMsg = this.clearfixSignMsg.bind(this)
        this.initMyInfo = this.initMyInfo.bind(this)
        this.loginout = this.loginout.bind(this)

        this.getPreview = this.getPreview.bind(this)
        this.initMyPage = this.initMyPage.bind(this)
        this.changePreviewName = this.changePreviewName.bind(this)

    }
    signInAjax(reqData) {
        $.post(`${cfg.url}/login`, reqData).done(res => {
            let {code, data} = res;
            if (code === 0) {
                this.initMyInfo(res.data)
            } else {
                this.setState({signInMsg: res})
            }
        })
    }
    signUpAjax(reqData) {
        $.post(`${cfg.url}/register`, reqData).done(res => {
            let {code, data} = res
            this.setState({signUpMsg: res})
        })
    }

    initMyInfo(myInfo) {
        if(myInfo){

            myInfo.avatar = cfg.url + myInfo.avatar
        }
        this.setState({myInfo})

    }

    clearfixSignMsg() {
        this.setState({signInMsg: null, signUpMsg: null})
    }
    loginout(){
        $.post(`${cfg.url}/logout`)
        .done(({code})=>{
            if(code === 0){
                this.initMyInfo(null)
            }
        })
    }
    getPreview(data){
        $.post(`${cfg.url}/getPreview`,data)
        .done(({code,data})=>{

            this.setState({
                myPagePreviews:data
            })
        })

    }
    initMyPage(user_id,previewsData,previewsName){

            this.getPreview(previewsData)
            $.post(`${cfg.url}/getCollection`,{user_id})
            .done(({code,data})=>{
                console.log();
                if(code === 0){
                    this.setState({
                        noteBooks:data,
                        previewsName
                    })
                }
            })
    }
    changePreviewName(previewsName){
        this.setState({
            previewsName
        })
    }
    componentDidMount(){
        $.post(`${cfg.url}/autologin`)
        .done(({code,data})=>{
            if(code === 0){
                this.initMyInfo(data)
            }
            this.setState({
                hasLogin:true
            })
        })
        let {state,pathname} = this.props.location
        console.log(state);
        if(state){
            let {user_id} = state;
            if(pathname === '/my_page'){
                this.initMyPage(user_id,{user_id},'所有文章')
            }
        }
    }
    render() {
        let {signInMsg, signUpMsg, myInfo,hasLogin,myPagePreviews,noteBooks,previewsName} = this.state;
        if(!hasLogin){
            return (<div></div>)
        }
        return (<div className={S.layout}>
            <Nav {...{
                myInfo,
                loginout:this.loginout
            }}/>
            <Route exact path='/' render={
                (props)=>(
                    <Home
                        {...{
                        initMyPage:this.initMyPage
                    }}
                    {...props}
                />
                )
            }></Route>
            <Route exact path='/sign_in' render={(props) =>
                    (myInfo
                        ? (<Redirect to='/'/>
                    )
                        : (<SignIn {...{
                                signInAjax:this.signInAjax,
                                signInMsg,
                                clearfixSignMsg:this.clearfixSignMsg
                                }}/>))
                } />
            <Route exact path='/sign_up' render={(props) => (
                    myInfo
                    ? (<Redirect to='/'/>)
                    : (<SignUp {...{
                        signUpMsg,
                        signUpAjax:this.signUpAjax,
                        clearfixSignMsg:this.clearfixSignMsg
                    }}/>))}></Route>

            <Route exact path='/my_page' render={
                (props)=>(
                    <MyPage {...{
                        myPagePreviews,
                        noteBooks,
                        previewsName
                    }}
                    {...props}
                />
                )
            }/>
        </div>)
    }
}
