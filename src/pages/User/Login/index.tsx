import { Footer } from '@/components';
import { getLoginUserUsingGet, userLoginUsingPost } from '@/services/ccbi/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, history, useModel } from '@umijs/max';
import { Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Login: React.FC = () => {
  // const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  /**
   * Get user info after sucessfully sign in
   */
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGet();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = 'Successfully login in!';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = 'failed to login in, please try again';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  // const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'Sign in'}- {Settings.title}
        </title>
      </Helmet>
      {/* <Lang /> */}
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="CCBI"
          subTitle={'A Chart Assistant that ease your life'}
          // 修改登录按钮的文字
          submitter={{ searchConfig: { submitText: 'Submit' } }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Sign in',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter username'}
                rules={[
                  {
                    required: true,
                    message: 'username is required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter password'}
                rules={[
                  {
                    required: true,
                    message: 'password is required!',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="user/register">Sign Up</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

// const Login: React.FC = () => {
//   // const [userLoginState] = useState<API.LoginResult>({});
//   const [type, setType] = useState<string>('account');
//   const { setInitialState } = useModel('@@initialState');
//   const { styles } = useStyles();
//   /**
//    * Get user info after sucessfully sign in
//    */
//   const fetchUserInfo = async () => {
//     const userInfo = await getLoginUserUsingGet();
//     if (userInfo) {
//       flushSync(() => {
//         setInitialState((s) => ({
//           ...s,
//           currentUser: userInfo,
//         }));
//       });
//     }
//   };
//   const handleSubmit = async (values: API.LoginParams) => {
//     try {
//       const res = await userLoginUsingPost(values);
//       if (res.code === 0) {
//         const defaultLoginSuccessMessage = 'Successfully login in!';
//         message.success(defaultLoginSuccessMessage);
//         await fetchUserInfo();
//         const urlParams = new URL(window.location.href).searchParams;
//         history.push(urlParams.get('redirect') || '/');
//         return;
//       } else {
//         message.error(res.message);
//       }
//     } catch (error) {
//       const defaultLoginFailureMessage = 'failed to login in, please try again';
//       console.log(error);
//       message.error(defaultLoginFailureMessage);
//     }
//   };
//   // const { status, type: loginType } = userLoginState;
//   return (
//     <div className={styles.container}>
//       <Helmet>
//         <title>
//           {'Sign in'}- {Settings.title}
//         </title>
//       </Helmet>
//       {/* <Lang /> */}
//       <div
//         style={{
//           flex: '1',
//           padding: '32px 0',
//         }}
//       >
//         <Form
//         name="normal_login"
//         className="login-form"
//         initialValues={{ remember: true }}
//         onFinish={async (values) => {
//           await handleSubmit(values as API.LoginParams);
//         }}
//       >
//         <Form.Item
//           name="username"
//           rules={[{ required: true, message: 'Please input your Username!' }]}
//         >
//           <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ccbi-test" />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: 'Please input your Password!' }]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="ccbi-cool"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" className="login-form-button">
//             Log in
//           </Button>
//           Or <a href="">register now!</a>
//         </Form.Item>
//       </Form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// const Login: React.FC = () => {
//   const onFinish = (values: any) => {
//     console.log('Submited with form of values: ', values);
//   };

//   return (
//     <Form
//       name="normal_login"
//       className="login-form"
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         name="username"
//         rules={[{ required: true, message: 'Please input your Username!' }]}
//       >
//         <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ccbi-test" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[{ required: true, message: 'Please input your Password!' }]}
//       >
//         <Input
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           placeholder="ccbi-cool"
//         />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="login-form-button">
//           Log in
//         </Button>
//         Or <a href="">register now!</a>
//       </Form.Item>
//     </Form>
//   );
// };

export default Login;
