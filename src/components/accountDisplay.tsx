// simple example of a react component, which renders all fields of a given account
import { Account, AccountFields} from '@src/generated/sobs';
import { Card, Form} from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';

interface AccountDisplayProps {
  acc: AccountFields;
  onBackClick: (account: AccountFields) => void;
}

export class AccountDisplay extends React.Component<AccountDisplayProps, {}> {

  constructor(props) {
    super(props);
  }

  public handleBackClick = () => {
    this.props.onBackClick(null);
  }

  public render() {
    if (!this.props.acc) {
      return <div>No Account Found</div>;
    }

    return (
      <div>
        <span className='back-btn' onClick={this.handleBackClick}>
          Back
        </span>
        <h2>{this.props.acc.name}</h2>
        <ul className='acc-list'>
          {this.renderFields()}
        </ul>
      </div>
    );
  }

  private renderFields = () => {
    return Object.keys(this.props.acc).map((key: keyof AccountFields) => {
      const meta = Account.FIELDS[key];
      if (meta && this.props.acc[key]) {
        return <li><span>{meta.salesforceLabel}:</span> {this.props.acc[key].toString()}</li>;
      }
      return null;
    });

  }
}
