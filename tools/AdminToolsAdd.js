import React, { Component } from 'react';
import { Layout } from 'antd';
import '../../../node_modules/antd/dist/antd.css';
import '../admin.css';
import AdminSider from '../AdminSider.js';
import AdminHeader from '../AdminHeader.js';
import '../../config.js';
import AdminAudioAddDataContainers from '../../redux/containers/AdminAudioAddDataContainers.js';

const { Header } = Layout;

class AdminAudioAdd extends Component {

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
              <AdminHeader title={global.constants.const_adm_audio} style={{margin: '16px 0'}} />
          </Header>
          <div style={{  padding: 12 }}> </div>
          <AdminToolsAddDataContainers />
        </Layout>
      </Layout>

    );
  }

}

export default AdminAudioAdd;

