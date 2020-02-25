import React, { Component } from 'react';
import '../admin.css';
import '../../config.js';
import { Form,Input,Select,Tooltip,Button,Message } from 'element-react';
import 'element-theme-default';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';

function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}


class AudioAdd extends Component {

  constructor(props) {
        super(props)
        this.state = { target_text: ''
                     };
  }

  handleClickSubmit(){
    var input_audio_name = this.refs.input_audio_name.props.value;
    if (input_audio_name===undefined||input_audio_name.length<1) {
        Message({
           message: '警告,中文名称未填写或长度为0',
           type: 'error'
        });
        return;
    }
    this.props.audioPlayCatalogCreate(input_audio_name);

    var input_audio_context = this.refs.input_audio_context.props.value;
    if (input_audio_context===undefined||input_audio_context.length<1) {
        Message({
           message: '警告,简介未填写或长度为0',
           type: 'error'
        });
        return;
    }
    this.props.audioPlayContextCreate(input_audio_context);    

    var input_audio_url = this.refs.input_audio_url.props.value;
    if (input_audio_url===undefined||input_audio_url.length<1) {
        Message({
           message: '警告,URL未填写或长度为0',
           type: 'error'
        });
        return;
    }
    this.props.audioPlayUrlCreate(input_audio_url);

    var input_audio_amount = this.refs.input_audio_amount.props.value;
    if (input_audio_amount===undefined||input_audio_amount.length<1) {
        Message({
           message: '警告,集数未填写或长度为0',
           type: 'error'
        });
        return;
    }
    this.props.audioPlayAmountCreate(input_audio_amount);

    var input_audio_img = this.refs.input_audio_img.props.value;
    if (input_audio_img===undefined||input_audio_img.length<1) {
        Message({
           message: '警告,封面URL未填写或长度为0',
           type: 'error'
        });
        return;
    }
    this.props.audioPlayImgCreate(input_audio_img);

    var input_audio_author = this.refs.input_audio_author.props.value;
    if (input_audio_author===undefined||input_audio_author.length<1) {
        Message({
           message: '警告,作者未填写或长度为0',
           type: 'error'
        });
        return;
    }
    this.props.audioPlayAuthorCreate(input_audio_author);

    var input_audio_announcer = this.refs.input_audio_announcer.props.value;
    if (input_audio_announcer===undefined||input_audio_announcer.length<1) {
        Message({
           message: '警告,演播人未填写或长度为0',
           type: 'error'
        });
        return;
    }
    this.props.audioPlayAnnouncerCreate(input_audio_announcer);

    let accesstoken = '';
    if (JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0]===undefined||
          JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username===undefined){
          accesstoken = global.constants.const_default_accesstoken
    }else{
          accesstoken = JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].accesstoken;
    }
    const const_input_audio_status = this.props.audio_play_status;
    const const_input_audio_catalog = this.props.audio_play_catalog;
    let url = global.constants.const_api_url + "/audio/add?accesstoken=" + accesstoken;
    fetch(url,{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        catalog: const_input_audio_catalog,
        name: input_audio_name,
        amount: input_audio_amount,
        img: input_audio_img,
        url: input_audio_url,
        context: input_audio_context,
        status: const_input_audio_status,
        author: input_audio_author,
        announcer: input_audio_announcer,
      })
     })
     .then(response => response.json())
     .then((dat) => {
        Message({
           message: '提交成功',
           type: 'success'
        });
        sleep(2000);
        window.location.href = global.constants.const_url+"/admin/audio/add";
     })
     .catch(function (err) {
          console.log(err);
     }); 
  }

  handleClickSelectCatalog(e) {
     if(e===undefined||e.length<1){
       console.log(e);
     }else{
       this.props.audioPlayCatalogCreate(e);
     }
  }

  handleClickSelectStatus(e) {
     if(e===undefined||e.length<1){
       console.log(e);
     }else{
       this.props.audioPlayStatusCreate(e);
     }  
  }

  render() {
    const { getFieldProps } = this.props.form;
    const catalogSelectOptions = [{
              value: '玄幻小说',
              label: '玄幻小说'
          }, {
              value: '官场商战',
              label: '官场商战'
          },{
              value: '有声文学',
              label: '有声文学'
          },{
              value: '音乐',
              label: '音乐'
          },{
              value: '评书',
              label: '评书'
          },{
              value: '其他',
              label: '其他'
          }];
     const statusSelectOptions = [{
              value: '更新中',
              label: '更新中'
          }, {
              value: '完成',
              label: '完成'
          },{
              value: '断更',
              label: '断更'
          },{
              value: '其他',
              label: '其他'
          }];


    return (
       <div>
                  <Form labelWidth="150" >
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="名称" placement="top" >名称</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_audio_name')}
                                   ref="input_audio_name"
                                   style={{ width: '80%' }}
                                   placeholder={''}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="音频URL" placement="top" >音频URL</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_audio_url')}
                                   ref="input_audio_url"
                                   style={{ width: '80%' }}
                                   placeholder={''}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="分类" placement="top" >分类</Tooltip>
                               </span>
                            }
                      >
                            <Select value={''} onChange ={(e) =>this.handleClickSelectCatalog(e)} >
                            {
                                catalogSelectOptions.map(el => {
                                      return <Select.Option key={el.value} label={el.label} value={el.value} />
                                })
                            }
                            </Select>
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="集" placement="top" >集</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_audio_amount')}
                                   ref="input_audio_amount"
                                   style={{ width: '80%' }}
                                   placeholder={''}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="封面图片URL" placement="top" >封面图片URL</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_audio_img')}
                                   ref="input_audio_img"
                                   style={{ width: '80%' }}
                                   placeholder={''}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="状态" placement="top" >状态</Tooltip>
                               </span>
                            }
                      >
                            <Select value={''} onChange ={(e) =>this.handleClickSelectStatus(e)} >
                            {
                                statusSelectOptions.map(el => {
                                      return <Select.Option key={el.value} label={el.label} value={el.value} />
                                })
                            }
                            </Select>
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="作品简介" placement="top" >作品简介</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_audio_context')}
                                   type="textarea"
                                   ref="input_audio_context"
                                   style={{ width: '80%' }}
                                   placeholder={''}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="作者" placement="top" >作者</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_audio_author')}
                                   ref="input_audio_author"
                                   style={{ width: '80%' }}
                                   placeholder={''}
                            />
                      </Form.Item>
                      <Form.Item
                            label={
                               <span><Tooltip className="item" effect="dark" content="演播人" placement="top" >演播人</Tooltip>
                               </span>
                            }
                      >
                            <Input {...getFieldProps('input_audio_announcer')}
                                   ref="input_audio_announcer"
                                   style={{ width: '80%' }}
                                   placeholder={''}
                            />
                      </Form.Item>
                      <Form.Item>
                          <Button type="primary" onClick={ () => { this.handleClickSubmit() } }>提交</Button>
                          <Button>取消</Button>
                      </Form.Item>
                   </Form>
       </div>
    );
  }

   static propTypes = {
    audio_play_catalog: PropTypes.string,
    audioPlayCatalogCreate: PropTypes.func,
    audio_play_name: PropTypes.string,
    audioPlayNameCreate: PropTypes.func,
    audio_play_info: PropTypes.string,
    audioPlayInfoCreate: PropTypes.func,
    audio_play_sequence: PropTypes.string,
    audioPlaySequenceCreate: PropTypes.func,
    audio_play_context: PropTypes.string,
    audioPlayContextCreate: PropTypes.func,
    audio_play_amount: PropTypes.string,
    audioPlayAmountCreate: PropTypes.func,
    audio_play_img: PropTypes.string,
    audioPlayImgCreate: PropTypes.func,
    audio_play_status: PropTypes.string,
    audioPlayStatusCreate: PropTypes.func,
    audio_play_url: PropTypes.string,
    audioPlayUrlCreate: PropTypes.func,
    audio_play_author: PropTypes.string,
    audioPlayAuthorCreate: PropTypes.func,
    audio_play_announcer: PropTypes.string,
    audioPlayAnnouncerCreate: PropTypes.func,
   }

}
const AudioAddWrapper = createForm()(AudioAdd);
export default AudioAddWrapper;

