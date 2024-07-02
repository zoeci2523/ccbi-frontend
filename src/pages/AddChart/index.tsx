import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const AddChart: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Add Chart Request Received: ', values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="add-chart">
      <Form name="add-chart" onFinish={onFinish} initialValues={{}}>
        {/* name 表示了请求后端对应的字段名称 */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a chart title!' }]}
        >
          <TextArea placeholder="Please enter the title of chart" />
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
              { value: 'scatter chart', label: 'Pie Chart' },
            ]}
          ></Select>
        </Form.Item>

        {/* <Form.Item
          name="file"
          label="Raw data"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo">
            <Button icon={<UploadOutlined />}>Click to upload CSV data</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item label="Dragger">
          <Form.Item
            name="file"
            label="Raw data"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddChart;
