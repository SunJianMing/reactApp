import SignInPanel from 'components/user/SignInPanel'
import EntryPanel from 'components/user/Panel'

export default class SignIn extends React.Component {
    componentWillUnmount(){
        this.props.clearfixSignMsg()
    }
    render(){
        let {signInAjax,signInMsg} = this.props
        return (
            <EntryPanel>
                <SignInPanel {...{
                    signInAjax,
                    signInMsg
                }}/>
            </EntryPanel>
        )
    }
}
SignIn.defaultProps = {
    signInAjax:()=>{}
}
SignIn.propTypes = {
    signInAjax:PT.func,
    signInMsg:PT.object,
    clearfixSignMsg:PT.func
}
