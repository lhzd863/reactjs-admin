import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import '../../node_modules/antd/dist/antd.css';
import './admin.css';
import '../config.js';


class AdminHeader extends Component {

  constructor(props) {
        super(props)
        this.state = { title: props.title}
  }

  render() {
    let username = '';
    if (JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0]===undefined||
          JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username===undefined){
          username = global.constants.const_default_username;
    }else{
          username = JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username;
    }
    const user = username
    return (
          <div className="antd-adm-header">
             <Breadcrumb>
                 <Breadcrumb.Item href="">
                     <Icon type="home" />
                     <span className="antd-adm-header">{global.constants.const_adm_en_home}</span>
                 </Breadcrumb.Item>
                 <Breadcrumb.Item href="">
                     <Icon type="user" />
                     <span className="antd-adm-header">{user}</span>
                 </Breadcrumb.Item>
                 <Breadcrumb.Item><span className="antd-adm-header">{this.state.title}</span></Breadcrumb.Item>
             </Breadcrumb>         
         </div>
    );
  }

}

export default AdminHeader;

