import React,{ Component } from 'react'
import { connect } from 'react-redux';
import { deleteAddress } from "../../containers/actions/address";
import {loading} from "../../containers/actions/layout";

class Del extends Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            del_id: '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            show: nextProps.data.show,
            del_id: nextProps.data.del_id,
        })
    }
    //关闭
    handleClose = () => {
        this.props.change(false);
    }
    //确定删除
    handleOk = (del_id) => {
        const self = this;
        self.props.change(false);
        self.props.dispatch(loading(true));//显示loading
        setTimeout(function(){
            self.props.dispatch(loading(false));//隐藏loading
            self.props.dispatch(deleteAddress(del_id))
        }, 500)
    }
    render(){
        const { show, del_id } = this.state;
        return(
            <div className='del' style={ show ? { display: 'block' } : { display : 'none' } }>
                <div className="box">
                    <p>确认要将这个地址删除吗？</p>
                    <div>
                        <button onClick={this.handleClose.bind(this)}>取消</button>
                        <button onClick={this.handleOk.bind(this,del_id)}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Del)