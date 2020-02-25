import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import '../../node_modules/antd/dist/antd.css';
import './admin.css';
import AdminSider from './AdminSider.js';
import AdminGridLayout from './AdminGridLayout.js';
import ToolboxLayout from './ToolBox.js';

const { Header, Content } = Layout;

class AdminDemo extends Component {

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
          <Header style={{ background: '#fff', padding: 0 }}>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
          <ToolboxLayout />
          </Content>
        </Layout>
      </Layout>

    );
  }

  static propTypes = {
      admim_title: PropTypes.string,
      adminTitleContextCreater: PropTypes.func
  }
}

export default AdminDemo;

