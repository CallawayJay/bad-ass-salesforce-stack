import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';
const FormItem = Form.Item;

interface SearchControlsProps {}

export class SearchControls extends React.Component<SearchControlsProps, {}> {
    constructor(props) {
        super(props);
      }
    
    public render() {
        return (
            <Form layout='inline' style={{clear: 'both'}}>
                <FormItem>
                    <Input style={{ color: 'rgba(0,0,0,.25)' }} />
                </FormItem>
                <FormItem>
                    <Button 
                        type='primary'
                        htmlType='submit'
                    >
                        Search
                    </Button>
                </FormItem>
            </Form>
        );
    }
}