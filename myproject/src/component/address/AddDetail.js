import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {add, detailAddress} from '../../containers/actions/address'
import { loading } from "../../containers/actions/layout";

class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            add_show: false,
            detail_show: false,
            detail_id: '',
            name: '',
            phone: '',
            area: '',
            street: '',
            code: '',
            addr_id: 0,
        }
    }
    //数组找到指定位置
    indexOf = (arr, item) => {
        for (let i = 0; i < arr.length; i++){
            if (arr[i].addr_id === item){
                return i;
            }
        }
        return -1;
    }
    componentWillReceiveProps = (nextProps) => {
        //新增
        const add_show = nextProps.data.add_show;
        if(add_show){
            this.setState({
                add_show: add_show,
                detail_show: false,
                detail_id: '',
                name: '',
                phone: '',
                area: '',
                street: '',
                code: '',
            })
        }else{
            this.setState({
                add_show: add_show
            })
        }
        //详情
        const detail_show = nextProps.data.detail_show;
        const list = this.props.address.address;
        const detail_id = nextProps.data.detail_id;
        const i = this.indexOf(list,detail_id);
        if ( i !== -1 ) {
            this.setState({
                add_show: false,
                detail_show: detail_show,
                name: list[i].name,
                phone: list[i].phone,
                area: list[i].area,
                street: list[i].street,
                code: list[i].code,
                detail_id: list[i].addr_id,
            })
        }
    }
    //关闭
    handleClose = () => {
        this.props.change(false);
    }
    //删除
    handleDel = () => {
        const { detail_id } = this.state;
        this.props.del(false, true, detail_id);
    }
    //保存
    handleConsever = () => {
        const self = this;
        const { name, phone, area, street, code, detail_id, addr_id } = this.state;
        if(!detail_id){
            //新增
            this.setState({
                addr_id: addr_id + 1,
            }, function(){
                this.props.change(false);// 隐藏
                self.props.dispatch(loading(true));//显示loading
                setTimeout(function(){
                    const { name, phone, area, street, code, addr_id } = self.state;
                    let msg = {
                        name: name ,
                        phone: phone ,
                        area: area ,
                        street: street ,
                        code: code ,
                        addr_id: addr_id ,
                    };
                    self.props.dispatch(loading(false));//隐藏loading
                    self.props.dispatch(add(msg));
                }, 500)
            })
        }else{
            //详情
            self.props.change(false)
            self.props.dispatch(loading(true));//显示loading
            const msg = {
                name: name,
                phone: phone,
                area: area,
                street: street,
                code: code,
                addr_id: detail_id,
            }
            setTimeout( function(){
                self.props.dispatch(detailAddress(msg))
                self.props.dispatch(loading(false));//隐藏loading
            }, 500) //演示300毫秒清除数据(可看到效果)
        }
    }
    render(){
        const self = this;
        const { add_show, detail_show, name, phone, area, street, code } = this.state;
        return(
            <div className='detail' style={ add_show || detail_show ? { display: 'block' } : { display:'none' } }>
                <div className="box">
                    <div className="header">
                        <p>新建收获地址</p>
                        <div className="close"
                             onClick = { self.handleClose.bind(self) }
                        >x</div>
                    </div>
                    <div className="list">
                        <div className="left">
                            <span>收货人</span>
                        </div>
                        <div className="right">
                            <input type="text"
                                   placeholder='请填写收货人姓名'
                                   onChange = { (e) => {self.setState({ name: e.target.value })} }
                                   value = { name ? name : '' }
                            />
                        </div>
                    </div>
                    <div className="list">
                        <div className="left">
                            <span>手机号码</span>
                        </div>
                        <div className="right">
                            <input type="text"
                                   placeholder='请填写收货人手机号码'
                                   onChange = { (e) => { self.setState({ phone: e.target.value }) } }
                                   value={ phone ? phone : '' }
                            />
                        </div>
                    </div>
                    <div className="list">
                        <div className="left">
                            <span>区域信息</span>
                        </div>
                        <div className="right">
                            <input type="text"
                                   placeholder='请填写区域信息'
                                   onChange={ (e) => { self.setState({ area: e.target.value }) } }
                                   value={ area ? area : '' }
                            />
                        </div>
                    </div>
                    <div className="list">
                        <div className="left">
                            <span>详细信息</span>
                        </div>
                        <div className="right">
                            <input type="text"
                                   placeholder='请输入街道门牌信息'
                                   onChange={(e) => { self.setState({ street: e.target.value }) } }
                                   value={ street ? street : '' }
                            />
                        </div>
                    </div>
                    <div className="list">
                        <div className="left">
                            <span>邮政编码</span>
                        </div>
                        <div className="right">
                            <input type="text"
                                   placeholder='可以不填'
                                   onChange={ (e) => { self.setState({code: e.target.value}) } }
                                   value={ code ? code : '' }
                            />
                        </div>
                    </div>
                    <div className="btn">
                        {
                            name && phone && area && street
                                ?
                                <button onClick={ self.handleConsever.bind(self) }>保存</button>
                                :
                                <button style={ { backgroundColor: '#CCC' } }>保存</button>
                        }
                    </div>
                    <div className="btn" style={detail_show ? { display: 'block' } : { display: 'none' }}>
                        <button style={ { backgroundColor: '#CCC', marginTop: 0 } } onClick={ self.handleDel.bind(self) }>删除</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Detail)