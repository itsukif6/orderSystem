import React from 'react';
import './Order.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    key: 'sub01',
    label: 'Contact',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Web Developer',
        type: 'group',
        children: [
          {
            key: '11',
            label: 'GitHub',
          },
          {
            key: '12',
            label: 'Gmail',
          },
        ],
      },
      {
        key: 'g2',
        label: 'Restaurant Owner',
        type: 'group',
        children: [
          {
            key: '13',
            label: 'Gmail',
          },
        ],
      },
    ],
  },
  {
    key: 'sub02',
    label: 'Pages',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '21',
        label: 'Welcome',
      },
      {
        key: '22',
        label: 'Log In',
      },
      {
        key: '23',
        label: 'Menu',
      },
      {
        key: '24',
        label: 'Shopping Cart',
      },
      {
        key: '25',
        label: 'Order Info',
      },
      {
        key: '26',
        label: 'Order Track',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub03',
    label: 'Setting',
    icon: <SettingOutlined />,
    children: [
      {
        key: '31',
        label: 'Log Out',
      },
    ],
  },
];
const Order = () => {
  
  // logout
  const logout = () => {
    // Simple GET request using fetch
    fetch('http://localhost:5000/logOut')
      .then(response => response.json())
      .then(data => this.setState({ totalReactPackages: data.total }));
  }

  const onClickMenu = (e) => {
    // click items component links
    console.log('click ', e);
    if (e.key === "11") {
      // github API
      window.open("https://github.com/itsukif6", "_blank", "width=1200,height=800");
    } else if (e.key === "12") {
      // developer gmail API
      window.open("https://mail.google.com/mail/u/0/?hl=zh-TW#inbox?compose=DmwnWrRlQQMQvfXBMvcxvHpDlgNdsDzJqzRpSTmgjPjzRdKFfGWcnJvhksBPPrZtKqcmnjqjWjCv", "_blank", "width=1200,height=800");
    } else if (e.key === "13") {
      // owner gmail API
      window.open("https://mail.google.com/mail/u/0/?hl=zh-TW#inbox?compose=DmwnWrRlQQMQvfXBMvcxvHpDlgNdsDzJqzRpSTmgjPjzRdKFfGWcnJvhksBPPrZtKqcmnjqjWjCv", "_blank", "width=1200,height=800");
    } else if (e.key === "21") {
      // root API
      window.location.assign("http://localhost:3000");
    } else if (e.key === "22") {
      // login API
      window.location.assign("http://localhost:3000/Login");
    } else if (e.key === "23") {
      // menu API
      window.location.assign("http://localhost:3000/Menu");
    } else if (e.key === "24") {
      // order API
      window.location.assign("http://localhost:3000/ShoppingCart");
    } else if (e.key === "25") {
      // shopping cart API
      window.location.assign("http://localhost:3000/Order");
    } else if (e.key === "26") {
      // order track API
      window.location.assign("http://localhost:3000/Track");
    } else if (e.key === "31") {
      // log Out
      logout();
      window.location.assign("http://localhost:3000/Login");
    }

  };
  return (
    <div id='menu'>
      <Menu
        onClick={onClickMenu}
        style={{
          width: 170,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Order;