import { generateChartUsingPost } from '@/services/ccbi/chartDetailController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, message, Row, Select, Space, Spin, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

/**
 * Add chart page (sync)
 * @returns
 */
const AddChartSync: React.FC = () => {
  // 使用useState可以让变量让react去管理状态，使得当变量发生变化时通知组件重新渲染
  const [chart, setChart] = useState<API.ChartResponse>();
  const [option, setOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    // TODO 需要校验每一个参数都填上，尤其是file
    console.log('Add Chart Request Received: ', values.file[0].originFileObj);
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await generateChartUsingPost(params, {}, values.file[0].originFileObj);
      if (!res?.data) {
        message.error('Analysis error');
      } else {
        // message 是 ant design 提供的 message 组件
        message.success('Successfully added chart');
        const chartOption = JSON.parse(res.data.generateChart ?? '');
        if (!chartOption) {
          throw new Error('Failed to paerse chart');
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (error: any) {
      message.error('Failed to add chart, ' + error.message);
    }
    setSubmitting(false);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Add Chart">
            <Form
              name="add-chart"
              labelAlign="left"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={onFinish}
              initialValues={{}}
            >
              {/* name 表示了请求后端对应的字段名称 */}
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please give me a name!' }]}
              >
                <TextArea placeholder="Please enter the chart title" />
              </Form.Item>
              <Form.Item name="goal" label="Goal">
                <TextArea placeholder='Please enter the analysis goal, for instance, "Analyzing the number of users"' />
              </Form.Item>

              <Form.Item name="chartType" label="Select">
                <Select
                  options={[
                    { value: 'bar chart', label: 'Bar Chart' },
                    { value: 'box plot', label: 'Box Plot' },
                    { value: 'column chart', label: 'Column Chart' },
                    { value: 'heatmaps', label: 'Heatmap' },
                    { value: 'histogram', label: 'Histogram' },
                    { value: 'line chart', label: 'Line Chart' },
                    { value: 'pie chart', label: 'Pie Chart' },
                    { value: 'scatter chart', label: 'Scatter Chart' },
                  ]}
                ></Select>
              </Form.Item>

              <Form.Item
                name="file"
                label="Raw data"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Please feed me the data!' }]}
              >
                <Upload name="logo" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload CSV data</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                  <Button htmlType="reset">Reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="AI Result">
            {chart?.generateResult ?? <div>Submit first to get the result</div>}
            <Spin spinning={submitting} />
          </Card>
          <Divider />
          <Card title="AI Chart">
            {/* 如果为空再渲染组件 */}
            {option ? <ReactECharts option={option} /> : <div>Submit first to get the result</div>}
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddChartSync;
