import S from './style.scss'
import Vaildator from 'plugins/validation'

export default class SignInPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            passw:'',
            userErr:false,
            passwErr:false
        }
        this.Vaildator = new Vaildator()
        this.Vaildator.addByValue('username',[
            {strategy:'isEmpty',errorMsg:'用户名不能为空'},
            {strategy:'hasSpace',errorMsg:'用户名不能有空格'},
            {strategy:'maxLength:6',errorMsg:'用户名不能有空格'}
        ])

        this.Vaildator.addByValue('passw',[
            {strategy:'isEmpty',errorMsg:'用户名不能为空'},
            {strategy:'hasSpace',errorMsg:'用户名不能有空格'},
            {strategy:'maxLength:6',errorMsg:'用户名不能有空格'}
        ])
        this.nameChange = this.nameChange.bind(this)
        this.passChange = this.passChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    nameChange(ev){
        let {target} = ev;
        let msg = this.Vaildator.valiOneByValue('username',target.value)

         this.setState({
             username:target.value,
             userErr:msg
         })
    }
    passChange(ev){
        let {target} = ev;
        let msg = this.Vaildator.valiOneByValue('passw',target.value)

         this.setState({
             passw:target.value,
             passwErr:msg
         })
    }
    onSubmit(ev){
        ev.stopPropagation()
        ev.preventDefault()
        let {nameDom,passwDom} = this.refs;
        let userErr = this.Vaildator.valiOneByValue('username',nameDom.value)
        let passwErr = this.Vaildator.valiOneByValue('passw',passwDom.value)

        this.setState({
            userErr,
            passwErr
        })

        if(!userErr && !passwErr){
            this.props.signInAjax({
                username:nameDom.value,
                passw:passwDom.value
            })
        }

    }
    render(){

        let {username,passw,userErr,passwErr} = this.state;
        let {signInMsg} = this.props;
        let signInErrMsg = null;
        if(signInMsg && signInMsg.code !== 0){

            signInErrMsg = (
                <div className="ui error message"><p>{signInMsg.msg}</p></div>
            )
        }
        let userErrMsg = userErr?(<p className={S.err}>{userErr}</p>):null;
        let passwErrMsg = passwErr?(<p className={S.err}>{passwErr}</p>):null;
        return (
            <div className={S.sign_panel}>
                {signInErrMsg}
                <form className='ui form' onSubmit={this.onSubmit}>
                    <div className={`field ${userErrMsg?'error':''}`}>
                        <input type="text"
                            placeholder='用户名'
                             ref='nameDom'
                             value={username}
                             onChange={this.nameChange}
                         />
                         {userErrMsg}
                    </div>
                    <div className={`field ${passwErrMsg?'error':''}`}>
                        <input
                            type="text"
                            placeholder='密码'
                            ref='passwDom'
                            value={passw}
                            onChange={this.passChange}
                        />
                        {passwErrMsg}
                    </div>
                    <div className="field">
                        <button type='submit' className="ui button fluid primary">登录</button>
                    </div>
                </form>
            </div>
        )
    }
}

SignInPanel.propTypes = {
    signInAjax:PT.func,
    signInMsg:PT.object
}
