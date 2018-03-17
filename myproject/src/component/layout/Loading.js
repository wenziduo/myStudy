import React,{ Component } from 'react';
import Loading_img from '../../assets/img/loading.png'
import { connect } from 'react-redux'

class Loading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    componentWillReceiveProps(nextProps) {
        //判断loading是否显示
        const layout = this.props.layout;
        if ( layout ) {
            this.setState({
                loading: layout.loading
            })
        }
    }
    render() {
        const { loading } = this.state;
        return (
            <div id="loading" style={loading ? { display: 'block' } : { display: 'none' }}>
                <div className="box">
                    <div className='loading_img' style={{background: `url(${Loading_img}) no-repeat center center`, backgroundSize: 'cover'}}/>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Loading)