import React,{ Component } from 'react';
import { connect } from 'react-redux';
import AddDetail from './AddDetail'
import Del from './Del'
import Loading from '../layout/Loading';
import { loading } from '../../containers/actions/layout';

class Address extends Component{
    constructor(props){
        super(props);
        this.state = {
            add_show: false, // 判断显示隐藏新增
            detail_show: false, // 判断显示隐藏修改
            del_show: false, // 判断显示隐藏删除
            list:[], // 列表数据
            del_id: '', // 删除的id
            detail_id: '', // 修改的id
            checked_id: 1, // 默认选择的的列表id
        }
    }
    componentDidMount(){
        const self = this;
        this.props.dispatch(loading(true));//动画开始loading
        const address = this.props.address;
        setTimeout(function(){
            self.setState({
                list: address.address
            })
            self.props.dispatch(loading(false));//动画结束loading
        }, 500)
    }
    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps)
        this.setState({
            list: nextProps.address.address
        })
    }
    //显示隐藏新增
    handleAddShow = (show) => {
        this.setState({
            add_show: show,
            detail_show: false,
            detail_id: ''
        })
    }
    //显示隐藏修改
    handleDetailShow = (show, detail_id) => {
        this.setState({
            add_show: false,
            detail_show: show,
            detail_id: detail_id
        })
    }
    //显示隐藏删除
    handleDelShow = (show, del_id) => {
        this.setState({
            del_show: show,
            del_id: del_id
        })
    }
    render(){
        const self = this;
        const { add_show, detail_show , del_show, list, del_id, detail_id, checked_id } = this.state;
        return(
            <div id="address">
                {
                    list.map(function( item, index ){
                        return(
                            <div className="list" key={ item.addr_id }>
                                <div className="box">
                                    <div className="top">
                                        <div className="left">
                                            <p>收货人: { item.name }</p>
                                        </div>
                                        <div className="right">
                                            <p>{ item.phone }</p>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <p>地址: { item.area }{ item.street }</p>
                                    </div>
                                    <div className="bottom">
                                        <div className="left">
                                            <label onClick={ () => { self.setState( { checked_id: item.addr_id } ) } }>
                                                <input type="checkbox" checked={ item.addr_id === checked_id ? (true) : (false) } readOnly={true}/>
                                                <span>设为默认</span>
                                            </label>
                                        </div>
                                        <div className="right">
                                            <span onClick = { self.handleDetailShow.bind( self, true, item.addr_id ) }>编辑</span>
                                            <span>|</span>
                                            <span onClick={ self.handleDelShow.bind( self, true, item.addr_id ) }>删除</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <AddDetail
                    data = { { add_show: add_show, detail_show: detail_show, detail_id: detail_id } }
                    change = { ( show ) => { this.setState( { detail_show: show, add_show: show } ) } }
                    del = { ( show, show_del, delId ) => { this.setState( { detail_show: show, del_show: show_del, del_id: delId } ) } }
                />
                <Del
                    data = { { show: del_show, del_id: del_id } }
                    change = { ( show ) => { this.setState( { del_show: show } ) } }
                />
                <Loading />
                <div className="add_new" onClick={ this.handleAddShow.bind( this, true ) }>
                    <span>添加新地址</span>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Address)