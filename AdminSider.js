import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import '../../node_modules/antd/dist/antd.css';
import './admin.css';

const {Sider} = Layout;
const { SubMenu } = Menu;

class AdminSider extends Component {

  constructor(props) {
        super(props)
        this.state = { admin_title:'',collapsed: false
        }
  }

  onClickMenu(url){
      window.location.href = global.constants.const_url+url;
  }
  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };


  render() {
    const collapsed = this.state.collapsed;
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['201']}>
            <Menu.Item key="1">
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
            </Menu.Item>
            <SubMenu
                key="2"
                title={
                    <span>
                        <Icon type="database" />
                        <span>{global.constants.const_adm_edw}</span>
                    </span>
                }
            >
                <Menu.Item key="201" onClick={()=>{this.onClickMenu('/admin/field')}} >
                   <Icon type="bank" />
                   <span>{global.constants.const_adm_field_cn2en}</span>
                </Menu.Item>
                <Menu.Item key="202" onClick={()=>{this.onClickMenu('/admin/scriptpackage')}} >
                   <Icon type="setting" />
                   <span>{global.constants.const_adm_script_package}</span>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="3"
                title={
                    <span>
                        <Icon type="play-circle" />
                        <span>{global.constants.const_adm_audio}</span>
                    </span>
                }
            >
                <Menu.Item key="301" onClick={()=>{this.onClickMenu('/admin/audio/add')}} >
                   <Icon type="plus-circle" />
                   <span>添加音频</span>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="4"
                title={
                    <span>
                        <Icon type="play-circle" />
                        <span>{global.constants.const_adm_tools}</span>
                    </span>
                }
            >
                <Menu.Item key="401" onClick={()=>{this.onClickMenu('/tools/register')}} >
                   <Icon type="plus-circle" />
                   <span>添加工具</span>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }

  static propTypes = {
      admim_title: PropTypes.string,
      adminTitleContextCreater: PropTypes.func
  }
}

export default AdminSider;

