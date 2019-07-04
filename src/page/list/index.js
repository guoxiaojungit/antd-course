import React from 'react'
import {Table,Modal,Button,Form,Input,Icon,message} from 'antd'
import {connect} from 'dva'
import SampleChart from '../../components/SampleChart'
const FormItem=Form.Item;
const namespace='cards';

class List extends React.Component{
    state={
        visible:false,
        statisticVisible:false,
        id:null
    };

    columns=[
        {title:'名称',dataIndex:'name'},
        {title:'描述',dataIndex:'desc'},
        {title:'链接',dataIndex:'url',render:value=> <a href={value}>{value}</a>},
        {
            title:'图表',
            dataIndex:'_',
            render:(_,{ id })=>{
                return(
                    <Button onClick={()=>{this.showStatistic(id);}}>图表</Button>
                )
            }
        },
        {
            title:'删除',
            dataIndex:'_',
            render:(_,{id})=>{
                return(
                    <Icon type={'delete'} onClick={() => this.deleteOne(id)} />
                )
            }
        }
    ];
    componentDidMount() {
       this.queryList()
    }
    queryList=()=>{
        this.props.dispatch({
            type:`${namespace}/queryList`
        })
    };
    showModal=()=>{
        this.setState({visible:true})
    };
    handleCancel=()=>{
        this.setState({visible:false})
    };
    handleOk=()=>{
        const {dispatch,form:{validateFields}}=this.props;
        validateFields((err,values)=>{
            if(!err){
                dispatch({
                    type:`${namespace}/addOne`,
                    payload:values
                });
                this.setState({visible:false})
            }
        })
    };
    deleteOne=(id)=>{
        this.props.dispatch({
            type:`${namespace}/deleteOne`,
            payload: id
        }).then(()=>{
            message.success('delete success,refresh');
            this.queryList()
        })
    };
    showStatistic=(id)=>{
        this.props.dispatch({
            type:`${namespace}/getStatistic`,
            payload:id,
        });
        this.setState({id,statisticVisible:true})
    };
    handleStatisticCancle=()=>{
        this.setState({
            statisticVisible:false
        })
    };
    render() {
        const {cardsList,cardsLoading,form:{getFieldDecorator},statistic}=this.props;
        const {visible,statisticVisible,id}=this.state;
        return(
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id"/>
                <Button onClick={this.showModal}>新建</Button>
                <Modal
                    title='新建记录'
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem label="名称">
                            {getFieldDecorator('name',{
                                rules:[{required:true}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('desc')(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url',{
                                rules:[{type:'url'}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancle}>
                    <SampleChart data={statistic[id]}/>
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        cardsList:state[namespace].cardsList,
        cardsLoading:state.loading.effects[`${namespace}/queryList`],
        statistic:state[namespace].statistic
    }
}
export default connect(mapStateToProps)(Form.create()(List));