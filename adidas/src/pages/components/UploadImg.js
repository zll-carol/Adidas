import React,{Component} from "react";
import { Upload, Icon, Modal } from 'antd';
import PropTypes from "prop-types";
import"../../css/UploadImg.css";

class UploadImg extends Component {
  static propTypes={
  	getImgList:PropTypes.func.isRequired,
  	max:PropTypes.number.isRequired,
  	action:PropTypes.string.isRequired,
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange(event){ //handleChange这个事件有两个属性，一个是file,一个是fileList
  	// console.log("event:",event);
  	console.log("fileList:",event.fileList);
  	this.setState({ fileList:event.fileList });
  	const imgList=event.fileList.map((file)=>(file.response))  /*fileList是一个数组，
  	数组里每个元素又是一个对象，照片的路径就存在response属性上，对fileList进行遍历，
  	获取到每一张照片的路径*/
  	console.log("imgList:",imgList);
  	this.props.getImgList(imgList); //将获取到的照片路径传到父组件
  } 

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const {max,action}=this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={action}  /*将照片上传到服务器上，在后台监听的是upload这
个路由，故这里传进来的action应该是“http://192.168.1.210:3000/upload”,为了
方便维护，所以这里定义action接口*/
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange.bind(this)}
        >
          {fileList.length >= max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}> 
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>       
      </div>
    );
  }
}

export default UploadImg;