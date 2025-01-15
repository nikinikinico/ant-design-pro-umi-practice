import { PageContainer } from '@ant-design/pro-components';
import {Avatar, Badge, Button, Card, Drawer, List, message, Modal, Space, Spin, Tag, Timeline} from 'antd';
import {memo, useCallback, useEffect, useState} from 'react';

//标签选择颜色
const tagSelectColorMap = {
  added: '#87d068',
  removed: 'transparent',
  selected: '#108ee9',
  normal: 'transparent',
};

export default () => {
  //---给客户打标签相关逻辑--
  const [customerTagModalVisible, setCustomerTagModalVisible] = useState(false);
  const [customerTagModalId, setCustomerTagModalId] = useState(null);
  //_____________________
  //企业微信标签记录相关逻辑
  const [companyTagRecVisible, setCompanyTagRecVisible] = useState(false);
  const [companyTagRelationId, setCompanyTagRelationId] = useState();
  const companyTagClose = () => {
    setCompanyTagRecVisible(false);
    setCompanyTagRelationId(null);
  }
  //--------------------
  //打标签记录相关逻辑
  const [customerTagRecVisible, setCustomerTagRecVisible] = useState(false);
  const [customerTagRecUnionId, setCustomerTagRecUnionId] = useState();
  return (
    <PageContainer>
      <Card>
        <Button
          onClick={() => {
            setCustomerTagModalVisible(true);
            // TODO:设置标签ID
            setCustomerTagModalId(1);
          }}
        >
          打客户标签
        </Button><Button
          onClick={() => {
            setCustomerTagRecUnionId(11);
            setCustomerTagRecVisible(true);
          }}
        >
          客户标签记录
        </Button><Button
          onClick={() => {
            setCompanyTagRelationId(1);
            setCompanyTagRecVisible(true);
          }}
        >
        相关企业微信标签记录
        </Button>

      </Card>
      {/*企业微信标签记录*/}
      <CompanyWxTagRecordDraw
        visible={companyTagRecVisible}
        onClose={companyTagClose}
        relationID={companyTagRelationId}
      ></CompanyWxTagRecordDraw>
      {/* 客户标签记录*/}
      <CustomerTagRecordDraw
        visible={customerTagRecVisible}
        onClose={() => {
          setCustomerTagRecVisible(false);
          setCustomerTagRecUnionId(null);
        }}
        unionId={customerTagRecUnionId}
      ></CustomerTagRecordDraw>
      {/*打客户标签*/}
      <CustomerTagSetModal
        visible={customerTagModalVisible}
        onCancel={() => {
          setCustomerTagModalVisible(false);
          setCustomerTagModalId(null);
        }}
        id={customerTagModalId}
      ></CustomerTagSetModal>
    </PageContainer>
  );
};

//企业微信标签记录
const CompanyWxTagRecordDraw = ({ visible, onClose, relationID }) => {
  const [companyWXTagRecList, setCompanyWXTagRecList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (visible) {
      setLoading(true);
      setTimeout(() => {
        setCompanyWXTagRecList([{
          action: '新增',
          tag: '异常客户',
          time: '2021/11/11 11:00:00',
          flowId: '111-0000',
          status: 'success',
        }]);
        setLoading(false);
      }, 1000);
    } else {
      setCompanyWXTagRecList([]);
    }
  }, [visible]);
  return (
    <Drawer
      width={'450px'}
      open={visible}
      onClose={onClose}
      title={
        <Space direction={'vertical'}>
          <h3>企业微信标签记录</h3>
          <div>关系ID:{relationID}</div>
        </Space>
      }
      closable={false}
      destroyOnClose
    >
      {loading ? (
        <div style={{ width: '100%', height: '500px', textAlign: 'center', lineHeight: '500px' }}>
          <Spin tip="Loading" size="large"></Spin>
        </div>
      ) : (
        <Timeline>
          <Timeline.Item className="companyTagRecItem">
            <Space direction={'vertical'}>
              <b>20201/11/11 11:00:00</b>
              <b>
                关系
                <span className="green">新增</span>
                企业微信标签[
                <span className="blue">异常客户</span>]
              </b>
              <div>
                <Badge status="success" text="成功" />
                &nbsp;相关批次ID和流水号: 1111-001,11221-222
              </div>
              <b>失败原因报错:</b>
              <b>error</b>
            </Space>
          </Timeline.Item>
          <Timeline.Item className="companyTagRecItem">
            <Space direction={'vertical'}>
              <b>20201/11/11 11:00:00</b>
              <b>
                关系
                <span className="green">新增</span>
                企业微信标签[
                <span className="blue">异常客户</span>]
              </b>
              <div>
                <Badge status="success" text="成功" />
                &nbsp;相关批次ID和流水号: 1111-001,11221-222
              </div>
              <b>失败原因报错:</b>
              <b>error</b>
            </Space>
          </Timeline.Item>
        </Timeline>
      )}
    </Drawer>
  );
};
//客户标签记录
const CustomerTagRecordDraw = ({ visible, onClose, unionId }) => {
  console.log('客户标签记录')
  const [customerTagRecordList, setCustomerTagRecordList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (unionId && visible) {
      setLoading(true);
      setTimeout(() => {
        setCustomerTagRecordList([
          { name: '系统', tag: '异常客户', flowId: '1111-01', time: '2021/11/11 11:00:00' },
        ]);
        setLoading(false);
      }, 1000);
    } else {
      setCustomerTagRecordList([]);
    }
  }, [unionId, visible]);
  return (
    <Drawer open={visible} onClose={onClose} title="打标签记录" width={'450px'}>
      {loading ? (
        <div style={{ width: '100%', height: '500px', textAlign: 'center', lineHeight: '500px' }}>
          <Spin tip="Loading" size="large"></Spin>
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={customerTagRecordList}
          renderItem={(item) => (
            <List.Item className="customerTagRecItem">
              <Space size="large" align="start">
                <Avatar size="large" src="https://joeschmoe.io/api/v1/random" />
                <Space direction="vertical">
                  <b>
                    &#123;<span className="blue">系统</span>&#125;给客户新增了标签&#123;
                    <span className="blue">异常客户</span>&#125;
                  </b>
                  <div>
                    <div>相关批次ID和流水号: 1111-01</div>
                    <b>2021/11/11 110:00:00</b>
                  </div>
                </Space>
              </Space>
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};
//打客户标签
const CustomerTagSetModal = ({ visible, onCancel, id }) => {
  console.log('打客户标签')
  const [initialTagList, setInitialTagList] = useState([]);
  const [allTagList, setAllTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('触发打标签弹窗初始useEffect');
    setLoading(true);
    setTimeout(() => {
      const initialTag = [
        { id: 1, name: '测试', status: 'normal' },
        { id: 2, name: '增加', status: 'normal' },
        { id: 3, name: '客户', status: 'normal' },
        { id: 4, name: '公司', status: 'normal' },
        { id: 5, name: '危险', status: 'normal' },
      ];
      setInitialTagList(initialTag);
      setAllTagList(initialTag);
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (visible && id) {
      setLoading(true);
      setTimeout(() => {
        const ids = [1, 3, 5];
        setAllTagList((pre) => {
          return pre.map((tag) => {
            if (ids.includes(tag.id)) {
              tag.status = 'selected';
            }
            return tag;
          });
        });
        setLoading(false);
      }, 1000);
    } else {
      setAllTagList(initialTagList);
    }
  }, [visible, id]);
  const handleCustomerTagChange = (item) => {
    setAllTagList((pre) => {
      return pre.map((tag) => {
        if (tag.id === item.id) {
          switch (item.status) {
            case 'normal':
              return { ...tag, status: 'added' };
            case 'added':
              return { ...tag, status: 'normal' };
            case 'selected':
              return { ...tag, status: 'removed' };
            case 'removed':
              return { ...tag, status: 'selected' };
            default:
              return tag; // 可以添加默认的处理，避免出现未知状态
          }
        } else {
          return tag;
        }
      });
    });
  };
  return (
    <Modal title="打标签" open={visible} onCancel={onCancel}  bodyStyle={{
      height: '400px',  // 设置固定高度
      overflowY: 'auto',  // 内容超出时显示滚动条
    }}>
      {loading ? (
        <div style={{ width: '100%', height: '200px', textAlign: 'center', lineHeight: '200px' }}>
          <Spin tip="Loading" size="large"></Spin>
        </div>
      ) : (
        <Space>
          {allTagList.map((item) => {
            return (
              <Button
                key={item.id}
                style={{
                  boxSizing: 'border-box',
                  backgroundColor: tagSelectColorMap[item.status],
                  color: ['added', 'selected'].includes(item.status) ? 'white' : 'black',
                  border: ['added', 'selected'].includes(item.status)
                    ? `1px solid ${tagSelectColorMap[item.status]}`
                    : '1px solid #ccc',
                }}
                type="link"
                onClick={() => handleCustomerTagChange(item)}
              >
                {item.name}
              </Button>
            );
          })}
        </Space>
      )}
    </Modal>
  );
};
