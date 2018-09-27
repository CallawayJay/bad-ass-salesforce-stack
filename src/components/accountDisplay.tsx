// simple example of a react component, which renders all fields of a given account
import { Account, AccountFields} from '@src/generated/sobs';
import { Button, Card, Form} from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';

interface AccountDisplayProps {
  account: AccountFields;
  onBackClick: () => void;
}

export class AccountDisplay extends React.Component<AccountDisplayProps, {}> {

  constructor(props) {
    super(props);
  }

  public handleBackClick = () => {
    this.props.onBackClick();
  }

  public render() {
    if (!this.props.account) {
      return <div>No Account Found</div>;
    }

    return (
      <div>
        <Button
          type='primary'
          htmlType='submit'
          onClick={this.handleBackClick}
        >back
        </Button>
        <h2>{this.props.account.name}</h2>
        <ul className='acc-list'>
          {this.renderFields()}
        </ul>
      </div>
    );
  }

  private renderFields = () => {
    return Object.keys(this.props.account).map((key: keyof AccountFields) => {
      const meta = Account.FIELDS[key];
      if (meta && this.props.account[key]) {
        return <li><span>{meta.salesforceLabel}:</span> {this.props.account[key].toString()}</li>;
      }
      return null;
    });

  }
}
