import React, { Component } from 'react';
import { Layout } from 'antd';
import '../../node_modules/antd/dist/antd.css';
import './admin.css';
import AdminSider from './AdminSider.js';
import AdminHeader from './AdminHeader.js';
import '../config.js';
import FieldCn2EnContainers from '../redux/containers/FieldCn2EnContainers.js';

const { Header, Content } = Layout;

class AdminFieldCn2En extends Component {

  constructor(props) {
        super(props)
        this.state = { admin_title:'',collapsed: true
        }
  }

  render() {
    return (
     <Layout style={{ minHeight: '100vh' }}>
        <AdminSider />
        <Layout>
          <Header className="antd-adm-header">
              <AdminHeader title={global.constants.const_adm_field_cn2en} style={{margin: '16px 0'}} />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
          <FieldCn2EnContainers />
          </Content>
        </Layout>
      </Layout>

    );
  }

}

export default AdminFieldCn2En;

