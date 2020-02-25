import React, { Component } from 'react';
import { List,Row, Col,Button,Input,message } from 'antd';
import '../../node_modules/antd/dist/antd.css';
import './admin.css';
import '../config.js';
import { Table } from 'element-react';
import 'element-theme-default';
import IsNameCharFunc from '../common/IsNameCharFunc.js';
import { createForm } from 'rc-form';
import FieldCn2EnDialogContainers from '../redux/containers/FieldCn2EnDialogContainers.js';
import PropTypes from 'prop-types';

const { TextArea } = Input;

class FieldCn2En extends Component {

  constructor(props) {
        super(props)
        this.state = { target_text: '',
                       source_text:'',
                       tbdatasource:[],
                       display_table:'none',
                       lang2: 'cn2en',
                       field_cnname: '',
                       field_enname: '',
                       field_type: '',
                       field_tag: ''
                     };
  }

  onChangeInput=(e)=>{
     if(e && e.target && e.target.value){
         this.setState({source_text: (e.target.value).trim()});
     }
  }
  
  onClickTableSelect(e){
    if(e.length>0){
      this.props.dialogVisibleDataCreate(true);
      this.props.fieldCnNameDataCreate(e[0].cnname);
      this.props.fieldEnNameDataCreate(e[0].enname);
      this.props.fieldTypeDataCreate(e[0].type);
      this.props.fieldTagDataCreate(e[0].tag);
      this.setState({field_cnname:e[0].cnname});
    }
  }

  onClickAdd(){
      this.props.dialogVisibleDataCreate(true);
      this.props.fieldCnNameDataCreate('');
      this.props.fieldEnNameDataCreate('');
      this.props.fieldTypeDataCreate('');
      this.props.fieldTagDataCreate('');
  }
  onClickSearch(){
    var data=[];
    let accesstoken = '';
    if (JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0]===undefined||
          JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username===undefined){
          accesstoken = global.constants.const_default_accesstoken
    }else{
          accesstoken = JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].accesstoken;
    }
    const const_source_text = (this.state.source_text).replace('\n','');
    let url = global.constants.const_api_url + "/app/field/qry?accesstoken=" + accesstoken;
    fetch(url,{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        rege:const_source_text,
      })
     })
     .then(response => response.json())
     .then((dat) => {
         data=dat;
         var const_source_text_type='cn2en';
         if(IsNameCharFunc(const_source_text)){
            const_source_text_type='en2cn';
         }
         if(data.length>0){
           var tmp_target_text = dat[0].enname;
           if(const_source_text_type==='cn2en'){
               tmp_target_text = dat[0].enname;
           }else {
               tmp_target_text = dat[0].cnname;
           } 
           for(var j = 0,len=dat.length; j < len; j++) {
               if(const_source_text_type==='cn2en'&&dat[j].cnname===const_source_text){
                  tmp_target_text = dat[j].enname;
                  break;
               }else if(const_source_text_type==='en2cn'&&dat[j].cnname===const_source_text) {
                  tmp_target_text = dat[0].cnname;
                  break;
               } 
           }
           this.setState({target_text: tmp_target_text,display_table: 'block',tbdatasource:data});
         }else{
               message.info('This is no data result');
               this.setState({target_text: '',display_table: 'none',tbdatasource:[]});
         }
     })
     .catch(function (err) {
          console.log(err);
     }); 
  }

  render() {
    const fieldcontext = this.state.target_text;
    const const_tbdatasource = this.state.tbdatasource;
    const const_display_table = this.state.display_table;
    const tbcolumns = [
          {
             type: 'selection'
          },
          {
             label: '中文名',
             prop: 'cnname',
          },
          {
             label: '字母简写',
             prop: 'enname',
          },
          {
             label: '类型',
             prop: 'type',
          },
          {
             label: '标签',
             prop: 'tage',
          },
          {
             label: '更新时间',
             prop: 'cts',
          },
          {
             label: '提交人',
             prop: 'contributor',
          },
         ];

    return (
       <div>
          <div>
          <Row>
              <Col span={2}><Button type={'link'} icon="edit" onClick={()=>{this.onClickAdd()}} >新增</Button></Col>
              <Col span={2}><Button type={'link'} icon="search" onClick={()=>{this.onClickSearch()}} >Search</Button></Col>
          </Row>
          <List grid={{ column: 2 }} >
               <List.Item><TextArea key="i1" ref='source_text' rows={9} onChange={(e)=>{this.onChangeInput(e)}} /></List.Item>
               <List.Item><TextArea key="i2" rows={9} value={fieldcontext} /></List.Item>
          </List>
          </div>
          <div style={{ display: const_display_table }} >
              <Table 
               data={const_tbdatasource} 
               columns={tbcolumns} 
               onSelectChange={(selection) => { this.onClickTableSelect(selection) }}
              />
          </div>
          <FieldCn2EnDialogContainers />
       </div>
    );
  }

   static propTypes = {
       dialogvisible: PropTypes.bool,
       dialogVisibleDataCreate: PropTypes.func,
       fieldCnNameDataCreate: PropTypes.func,
       fieldEnNameDataCreate: PropTypes.func,
       fieldTypeDataCreate: PropTypes.func,
       fieldTagDataCreate: PropTypes.func,
   }

}
const FieldCn2EnWrapper = createForm()(FieldCn2En);
export default FieldCn2EnWrapper;

