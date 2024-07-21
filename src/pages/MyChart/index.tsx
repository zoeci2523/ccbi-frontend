import { listMyChartByPageUsingPost } from '@/services/ccbi/chartDetailController';
import { useModel } from '@@/exports';
import { Avatar, Card, Input, List, message, Result } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

import DefaultAvatar from '../../../public/images/default-avatar.jpg';

const { Search } = Input;

/**
 * My chart page
 * @returns
 */
const MyChart: React.FC = () => {
  const initQueryParams = {
    current: 1,
    pageSize: 6,
    sortField: 'createdTime',
    sortOrder: 'desc',
  };

  const [queryParam, setQueryParam] = useState<API.ChartQueryRequest>({ ...initQueryParams });
  const [chartList, setChartList] = useState<API.ChartVO[]>([]);
  // 全局变量：在用户登录后将用户信息保存进去了
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPost(queryParam);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        // hide the title
        if (res.data.records) {
          res.data.records.forEach((item) => {
            if (item.status === 'succeed') {
              const chartOption = JSON.parse(item.generateChart ?? '');
              chartOption.title = undefined;
              item.generateChart = JSON.stringify(chartOption);
            }
          });
        }
      } else {
        throw new Error('Failed to fetch my data');
      }
    } catch (e: any) {
      message.error('Failed to fetch my data, ' + e.message);
    }
    setLoading(false);
  };

  const onSearch = (value: string) => {
    // 当用户出发搜索时，需要重置搜索条件，让用户回到第一页
    setQueryParam({
      ...queryParam,
      title: value,
    });
  };

  // 当DOM首次挂载和queryParam改变时，重新加载数据
  useEffect(() => {
    loadData();
  }, [queryParam]);

  return (
    <div className="my-chart">
      <div
        className="margin-bottom-md"
        style={{
          backgroundColor: 'rgb(255, 255, 255)',
          position: 'fixed',
          top: 0,
          zIndex: 1000,
          width: '100%',
        }}
      >
        <Search
          placeholder="Search"
          allowClear
          onSearch={onSearch}
          loading={loading}
          style={{ width: '65%', marginTop: 10 }}
        />
      </div>
      <div className="margin-top" />
      <List
        itemLayout="vertical"
        // responsive
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setQueryParam({
              ...queryParam,
              current: page,
              pageSize,
            });
          },
          current: queryParam.current,
          pageSize: queryParam.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={currentUser?.avatar ?? DefaultAvatar} />}
              title={
                <div style={{ color: 'rgb(0, 34, 135)', fontSize: 24, fontWeight: 'bold' }}>
                  {item.title}
                </div>
              }
              description={
                item.chartType
                  ? 'Chart type: ' + item.chartType + ', Goal: ' + item.goal
                  : undefined
              }
            />
            <>
              {item.status === 'waiting' && (
                <>
                  <Result
                    status="warning"
                    title="Chart is watiing for processing"
                    subTitle={item.execMessage ?? 'Busy processing...'}
                  />
                </>
              )}
              {item.status === 'running' && (
                <>
                  <Result status="info" title="Chart is processing" subTitle={item.execMessage} />
                </>
              )}
              {item.status === 'succeed' && (
                <>
                  <Card className="margin-bottom-sm" style={{ width: '100%' }}>
                    <ReactECharts option={JSON.parse(item.generateChart ?? '{}')} />
                  </Card>
                  <Card
                    className="margin-bottom-md"
                    style={{ backgroundColor: 'rgb(159, 174, 217, 0.2)', color: 'rgb(0, 18, 41)' }}
                  >
                    <div>
                      <p style={{ fontWeight: 'bold' }}>AI Analysis Result: </p>
                      {item.generateResult}
                    </div>
                  </Card>
                </>
              )}
              {item.status === 'failed' && (
                <>
                  <Result
                    status="error"
                    title="Failed to process chart"
                    subTitle={item.execMessage}
                  />
                </>
              )}
            </>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyChart;
