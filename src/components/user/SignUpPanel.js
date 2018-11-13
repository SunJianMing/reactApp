import S from './style.scss'
import Validator from 'plugins/validation'


export default class SignUpPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            passw:'',
            cfPassw:'',
            userErr:false,
            passwErr:false,
            cfPasswErr:false
        }
        this.Validator = new Validator()

        this.Validator.addByValue('username',[
            {strategy:'isEmpty',errorMsg:'用户名不能为空'},
            {strategy:'hasSpace',errorMsg:'用户名不能有空格'},
            {strategy:'maxLength:6',errorMsg:'用户名不能有空格'}
        ])

        this.Validator.addByValue('passw',[
            {strategy:'isEmpty',errorMsg:'用户名不能为空'},
            {strategy:'hasSpace',errorMsg:'用户名不能有空格'},
            {strategy:'maxLength:6',errorMsg:'用户名不能有空格'}
        ])
        this.userChange = this.userChange.bind(this)
        this.passwChange = this.passwChange.bind(this)
        this.cfPasswChange = this.cfPasswChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    userChange(ev){
        let {target} =ev
        let msg = this.Validator.valiOneByValue('username',target.value)
        this.setState({
            username:target.value,
            userErr:msg
        })
    }
    passwChange(ev){
        let {cfPasswErr} = this.state
        let {target} = ev
        let msg = this.Validator.valiOneByValue('passw',target.value)
        this.setState({
            passw:target.value,
            passwErr:msg
        })
        if(cfPasswErr){
            this.cfPasswChange()
        }

    }
    cfPasswChange(){
        let {cfPasswDom,passwDom} = this.refs;
        let msg = cfPasswDom.value === passwDom.value?'':'密码不一致'
        this.setState({
            cfPassw:cfPasswDom.value,
            cfPasswErr:msg
        })
    }
    onSubmit(ev){
        ev.preventDefault()
        ev.stopPropagation()

        let {username,passw,cfPassw} = this.state;
        let userErr = this.Validator.valiOneByValue('username',username)
        let passwErr = this.Validator.valiOneByValue('passw',passw)
        let cfPasswErr = passw === cfPassw?'':'密码不一致'

        this.setState({
            userErr,passwErr,cfPasswErr
        })

        if(!userErr && !passwErr && !cfPasswErr){
            this.props.signUpAjax({
                username,passw,cfPassw
            })
        }
    }
    render(){
        let {username,userErr,passw,passwErr,cfPassw,cfPasswErr} = this.state;

        let {signUpMsg} = this.props;
        let resInfo = null;
        if(signUpMsg){
            if(signUpMsg.code === 0){
                resInfo = (
                    <div className="ui message positive">
                        <p>{signUpMsg.msg}</p>
                        <p>马上登录</p>
                    </div>
                )
            }else{
                resInfo = (
                    <div className="ui message error">
                        <p>{signUpMsg.msg}</p>
                    </div>
                )
            }
        }

        let userErrMsg = userErr?(<p className={S.err}>{userErr}</p>):null
        let passwErrMsg = passwErr?(<p className={S.err}>{passwErr}</p>):null
        let cdPasswErrMsg = cfPasswErr?(<p className={S.err}>{cfPasswErr}</p>):null;


        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form className='ui form' onSubmit={this.onSubmit}>
                    <div className={`field ${userErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder='用户名'
                             ref='nameDom'
                             value={username}
                             onChange={this.userChange}
                         />
                         {userErrMsg}
                    </div>
                    <div className={`field ${passwErr?'error':''}`}>
                        <input
                            type="text"
                             placeholder='密码'
                             ref='passwDom'
                             value={passw}
                             onChange={this.passwChange}
                         />
                         {passwErrMsg}
                    </div>
                    <div className="field">
                        <input type="text"
                             placeholder='确认密码'
                             ref='cfPasswDom'
                            value={cfPassw}
                            onChange={this.cfPasswChange}
                         />
                         {cdPasswErrMsg}
                    </div>
                    <div className="field">
                        <button className='ui button fluid primary'>注册</button>
                    </div>
                </form>
            </div>
        )
    }
}

SignUpPanel.propsTypes = {
    signUpAjax:PT.func,
    signUpMsg:PT.object
}
