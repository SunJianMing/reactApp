import SignUpPanel from 'components/user/SignUpPanel'
import EntryPanel from 'components/user/Panel'


export default class SignUp extends React.Component {
    componentWillUnmount(){
        this.props.clearfixSignMsg()
    }
    render(){
        let {signUpAjax,signUpMsg} = this.props
        return (
            <EntryPanel>
                <SignUpPanel
                    {...{
                        signUpAjax,
                        signUpMsg
                    }}
                />
            </EntryPanel>
        )
    }
}

SignUp.proptypes = {
    signUpMsg:PT.object,
    signUpAjax:PT.func,
    clearfixSignMsg:PT.func
}
