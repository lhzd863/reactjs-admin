import React, { Component } from 'react';
import './admin.css';
import '../config.js';
import { Dialog,Form,Tooltip,Input,Button,Message,Select } from 'element-react';
import 'element-theme-default';
//import IsNameCharFunc from '../common/IsNameCharFunc.js';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';

class FieldCn2EnDialog extends Component {

  constructor(props) {
        super(props)
        this.state = { target_text: '',
                       source_text:'',
                       tbdatasource:[],
                       display_table:'none',
                       lang2: 'cn2en',
                       dialogvisible:props.dialogvisible||false,
                       field_cnname:props.field_cnname1||'',
                       field_enname: '',
                       field_type: '',
                       field_tag: ''
                     };
       
  }

  onClickDialogButton(e){
     this.props.dialogVisibleDataCreate(e);
  }
  
  handleClickOp(op){
     this.onClickDialogButton(false);
     var input_cnname = this.refs.input_dialog_field_cnname.props.value;
     if (input_cnname===undefined||input_cnname.length<1) {
        Message({
           message: '警告,中文名称未填写或长度为0',
           type: 'error'
        });
        return;
     }

     var input_enname = this.refs.input_dialog_field_enname.props.value;
     if (input_enname===undefined||input_enname.length<1) {
        Message({
           message: '警告,简写英文名称未填写或长度为0',
           type: 'error'
        });
        return;
     }

     var input_type = this.refs.input_dialog_field_type.props.value;
     if (input_type===undefined||input_type.length<1) {
        Message({
           message: '警告,字段类型未填写或长度为0',
           type: 'error'
        });
        return;
     }
    
    const const_field_tag = this.props.field_tag;
    if (const_field_tag===undefined||const_field_tag.length<1) {
        Message({
           message: '警告,字段标签未填写或长度为0',
           type: 'error'
        });
        return;
    }

    let accesstoken = '';
    if (JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0]===undefined||
          JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username===undefined){
          accesstoken = global.constants.const_default_accesstoken
    }else{
          accesstoken = JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].accesstoken;
    }
    let url = global.constants.const_api_url + "/app/field/"+op+"?accesstoken=" + accesstoken;
    fetch(url,{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        cnname: input_cnname,
        enname: input_enname,
        type: input_type,
        tage: const_field_tag,
      })
     })
     .then((response) =>{ 
        return  response.json();
     })
     .then((dat) => {
         this.onClickDialogButton(false);
     })
     .catch(function (err) {
        Message({
           message: '警告,提交报错',
           type: 'error'
        });
        console.log(err);
     });

  }
 
  handleClickDialogSelectChangeType(e) {
      if (e===undefined) {
          this.props.fieldTagDataCreate('其他');
      }else{
          this.props.fieldTagDataCreate(e)
      }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const const_dialogvisible = this.props.dialogvisible;
    const const_field_cnname = this.props.field_cnname;
    const const_field_enname = this.props.field_enname;
    const const_field_type = this.props.field_type;
    const const_field_tag = this.props.field_tag;

    const dialogSelectOptions = [{
              value: '金融',
              label: '金融'
          }, {
              value: '广告',
              label: '广告'
          }, {
              value: '其他',
              label: '其他'
          }];

    return (
       <div>
          <Dialog
             title={global.constants.const_app_chart_dialog_title}
             visible={ const_dialogvisible  }
             size = "small"
             onCancel={ () => {this.onClickDialogButton(false) } }
          >
                <Dialog.Body>
                   <Form labelWidth="150" >
                      <Form.Item
                            label={<span><Tooltip className="item" effect="dark" content="字段中文名" placement="top" >字段中文名</Tooltip>
                                   </span>
                                  }
                      >
                            <Input {...getFieldProps('input_dialog_field_cnname')} 
                                   ref="input_dialog_field_cnname"
                                   style={{ width: '80%' }} 
                                   placeholder={const_field_cnname}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="字母简写名" placement="top" >字母简写名</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_dialog_field_enname')}
                                   ref="input_dialog_field_enname"
                                   style={{ width: '80%' }} 
                                   placeholder={const_field_enname}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="字段类型" placement="top" >字段类型</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_dialog_field_type')}
                                   ref="input_dialog_field_type"
                                   style={{ width: '80%' }} 
                                   placeholder={const_field_type}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="分类" placement="top" >分类</Tooltip>
                               </span>
                            }
                      >
                            <Select value={const_field_tag} onChange ={(e) =>this.handleClickDialogSelectChangeType(e)} >
                            {
                                dialogSelectOptions.map(el => {
                                      return <Select.Option key={el.value} label={el.label} value={el.value} />
                                })
                            }
                            </Select>
                      </Form.Item>
                   </Form>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                     <Button type="danger" onClick={ () => { this.handleClickOp('remove') } }>删 除</Button>
                     <Button type="info" onClick={ () => { this.handleClickOp('add') } }>提 交</Button>
                     <Button  onClick={ () => { this.onClickDialogButton(false) } }>取 消</Button>
                </Dialog.Footer>
           </Dialog>
        </div>
    );
  }
    static propTypes = {
       dialogvisible: PropTypes.bool,
       dialogVisibleDataCreate: PropTypes.func,
       field_cnname: PropTypes.string,
       fieldCnNameDataCreate: PropTypes.func,
       field_enname: PropTypes.string,
       fieldEnNameDataCreate: PropTypes.func,
       field_type: PropTypes.string,
       fieldTypeDataCreate: PropTypes.func,
       field_tag: PropTypes.string,
       fieldTagDataCreate: PropTypes.func,
    }
}
const FieldCn2EnDialogWrapper = createForm()(FieldCn2EnDialog);
export default FieldCn2EnDialogWrapper;

