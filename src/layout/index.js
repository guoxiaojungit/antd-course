import {Component} from 'react';
import {Layout,Menu,Icon} from 'antd';
import Link from 'umi/link';
const {Header,Footer,Sider,Content}=Layout;
const SubMenu=Menu.SubMenu;
export default class BasicLayout extends Component{
    render() {
        return(
            <Layout>
                <Sider width={256} style={{minHeight:'100vh'}}>
                    <div style={{height:'32px',background:'rgba(255,255,255,.2)',margin:'16px'}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/helloworld">
                                <Icon type="pie-chart" />
                                <span>HelloWorld</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user" /><span>User</span></span>}
                        >
                            <Menu.Item key="3"><Link to="/dashboard/analysis">分析页</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/dashboard/monitor">监控页</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="6">
                            <Link to="/puzzlecards">
                                <Icon type="tag" />
                                <span>PuzzleCards</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/list">
                                <Icon type="tag" />
                                <span>List</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background:'#fff',textAlign:'center',padding:0}}>Header</Header>
                    <Content style={{margin:'24px 16px 0'}}>
                        <div style={{padding:24,background:'#fff',minHeight:360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign:'center'}}>Ant Design ©2018 Created by Ant UDE</Footer>
                </Layout>
            </Layout>
        )
    }
}
