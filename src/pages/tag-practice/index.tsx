import { PageContainer } from '@ant-design/pro-components';
import {Button, Card, message, Modal, Tag} from 'antd';
import { useEffect, useState } from 'react';
type Tag = {
  id: number;
  name: string;
  status: status;
};
type status = 'selected' | 'added' | 'removed' | 'normal';
export default () => {
  //标签弹窗
  const [tagModalVisible, setTagModalVisible] = useState<boolean>(false);
  //提交Loading
  const [sumbitLoading, setSumbitLoading] = useState<boolean>(false);
  //全部的标签
  const [companyTagList, setCompanyTagList] = useState<Tag[]>([]);
  //提交标签方法
  const sumbitTags = ()=> {
    setSumbitLoading(true)
    setTimeout(()=>{
      setCompanyTagList([
        { id: 1, name: '测试', status: 'normal' },
        { id: 2, name: '增加', status: 'normal' },
        { id: 3, name: '客户', status: 'normal' },
        { id: 4, name: '公司', status: 'normal' },
        { id: 5, name: '危险', status: 'normal' },
      ]);
      setTagModalVisible(false)
      setSumbitLoading(false)
      message.success('标签修改成功!')
    },2000)
  }
  //初始加载全部标签
  useEffect(() => {
    console.log('加载初始')
    setCompanyTagList([
      { id: 1, name: '测试', status: 'normal' },
      { id: 2, name: '增加', status: 'normal' },
      { id: 3, name: '客户', status: 'normal' },
      { id: 4, name: '公司', status: 'normal' },
      { id: 5, name: '危险', status: 'normal' },
    ]);
  }, []);
  return (
    <PageContainer>
      <Card>
        <Button
          onClick={() => {
            setTagModalVisible(true);
            const usersTagList = [1, 3, 5];
            setCompanyTagList(
              companyTagList.map((item) => {
                if (usersTagList.includes(item.id)) {
                  item.status = 'selected';
                }
                return item;
              }),
            );
          }}
        >
          新建标签
        </Button>
        <Modal open={false}></Modal>
      </Card>
      <Modal
        title="客户标签"
        open={tagModalVisible}
        onCancel={() => {
          setTagModalVisible(false)
          setCompanyTagList([
            { id: 1, name: '测试', status: 'normal' },
            { id: 2, name: '增加', status: 'normal' },
            { id: 3, name: '客户', status: 'normal' },
            { id: 4, name: '公司', status: 'normal' },
            { id: 5, name: '危险', status: 'normal' },
          ]);
        }}
        destroyOnClose={true}
        confirmLoading={sumbitLoading}
        onOk={sumbitTags}
      >
        {companyTagList.map((item) => (
          <Tag.CheckableTag
            key={item.id}
            checked={item.status === 'selected' || item.status === 'added'}
            onChange={(checked) => {
              setCompanyTagList((pre) => {
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
                  }else{
                    return tag
                  }
                });
              });
            }}
            style={{
              backgroundColor:
                item.status === 'added'
                  ? '#87d068' // 新增标签颜色
                  : item.status === 'removed'
                    ? 'transparent' // 已删除标签颜色
                    : item.status === 'selected'
                      ? '#108ee9' // 选中的标签颜色
                      : 'transparent', // 默认颜色
              color:
                item.status === 'added' || item.status === 'selected'
                  ? 'white' // 选中或新增标签字体颜色
                  : 'black', // 默认字体颜色
            }}
          >
            {item.name}
          </Tag.CheckableTag>
        ))}
      </Modal>
    </PageContainer>
  );
};
