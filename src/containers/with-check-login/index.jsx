import { connect } from 'react-redux';


const withCheckLogin = WrappedComponent => {
    return connect(
        (state) => ({token: state.user.token }),
        null
    )(
    class extends Component {
        render() {
            const { pathname } = this.props.location;

            if(pathname === '/login'){
            }else{
            }
            return <WrappedComponent />;
        }
    }
    )
    return
};

export default withCheckLogin;