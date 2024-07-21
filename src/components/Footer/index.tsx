import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/zoeci2523/ccbi',
          blankTarget: true,
        },
        {
          key: 'CCBI Design',
          title: 'CCBI Design',
          href: 'https://github.com/zoeci2523/ccbi',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
