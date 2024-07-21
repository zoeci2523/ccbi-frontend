import { generateChartUsingPost } from '@/services/ccbi/chartDetailController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, message, Select, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

/**
 * Add chart page (sync)
 * @returns
 */
const AddChart: React.FC = () => {
  const [form] = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await generateChartUsingPost(params, {}, values.file[0].originFileObj);
      if (!res?.data) {
        message.error('Analysis error');
      } else {
        message.success('Successfully added chart task into queue, check in MyChart page later');
        form.resetFields();
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
      <Card title="Add Chart">
        <Form
          name="add-chart"
          labelAlign="left"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          initialValues={{}}
        >
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
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                Submit
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddChart;
