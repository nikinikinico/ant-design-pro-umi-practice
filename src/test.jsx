export const layout = ({ initialState }) => {
  // let keys = []
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,

    onPageChange: async () => {
      const { location } = history; // 如果没有登录，重定向到 login
      let menu = initialState?.menuData && commonHelper.findMenuByPath(initialState.menuData, location.pathname);
      if (![
        //临时配置的白名单 放在最上面
        '/stock-diagnose/result',
        '/customer/equity-about',
        '/operations/strategy-user-record','/operations/firm-offer-backtest',
        '/compliance/record-chat-sale',
        '/customer/interest-tags',
        '/user/login','/user/logout','/user/resetPasswords', '/enter', '/welcome', '/404',
        '/operations/tik-tok/account-oauth/success',
        '/viewer/pdf-viewer','/business/call/customer-call-history','/customer/my_serve_customer', '/compliance/group-chat', '/server/sub-account-manager', '/maintain/employee-role-manage', '/server/main-account-manage',].includes(location.pathname)) {
        if (!initialState.menuData || !menu) {
          message.error('你没有该页面的授权')
          history.push('/404');
        }
      }
      if (initialState?.menuData && initialState?.menuData?.length && !['/user/login', '/enter', '/welcome', '/404'].includes(location.pathname)) {
        commonHelper.setRecentlyUrl(initialState.menuData, location.pathname)
      }
      try {
        _czc = _czc || []
        _czc.push(["_setCustomVar", initialState?.userInfo?.realName, initialState?.userInfo?.id]);

        _czc.push(["_trackEvent", initialState?.companyInfo?.companyType, menu?.pathId, initialState?.userInfo?.realName]);
      } catch (e) {

      }

    },
    links: [],
    menu: {
      autoClose: false,
      params: initialState?.token,
      request: async (params, defaultMenuData) => {
        console.log('initialState?.token',initialState?.token)
        console.log('initialState.menuData',initialState?.menuData)

        return (initialState?.menuData && initialState?.menuData?.length) ? initialState?.menuData :  [{"name":"欢迎","key":"key1","path":"/welcome"}];
      },
    },
    menuExtraRender: ({ collapsed }) => <MenuSearch collapsed={collapsed}></MenuSearch>,
    menuProps: {
      openKeys: initialState?.menuOption?.openKeys
    },
    menuItemRender:(_, dom) => <MenuMenuItem _={_} dom={dom}></MenuMenuItem>,
    subMenuItemRender:(_, dom) => <SubMenuItem _={_} dom={dom}></SubMenuItem>,
    fixSiderbar: true,
    siderWidth: 250,
    menuHeaderRender: (logo,title)=>{
      return (<a><img style={{width:'28px'}} src={initialState?.companyInfo?.logoUrl && commonSetting.OSS_URL + initialState?.companyInfo?.logoUrl} alt="logo" /><h1>
        <div style={{marginTop:'-5px'}}>
          <div style={{fontSize:'18px'}}>{initialState?.companyInfo?.name.split('-')[0]}</div>
          <div>{initialState?.companyInfo?.name.split('-')[1]}</div>
        </div>
      </h1></a>)
    },
    onCollapse: (collapsed) => {
      console.log(collapsed, '==')
      let sideDom = document.querySelector('#logo h1')
      let headDom = document.querySelector('.ant-pro-global-header-layout-side a h1')
      let headImg = document.querySelector('.ant-pro-global-header-layout-side a img')
      if (headDom) {
        headDom.style.display = 'none'
      }
      if (headImg) {
        headImg.style.width = '28px'
      }
      console.log(sideDom)
      if(!sideDom) return
      if (collapsed) {
        sideDom.style.display = 'none'
      } else {
        sideDom.style.display = 'block'
      }
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    // logo: initialState?.companyInfo?.logoUrl && commonSetting.OSS_URL + initialState?.companyInfo?.logoUrl,
    title: initialState?.companyInfo?.name.split('-')[0]
  };
};
