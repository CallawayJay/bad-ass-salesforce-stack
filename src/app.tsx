import { AccountDisplay } from '@src/components/accountDisplay';
import { SearchDisplay } from '@src/components/searchDisplay';
import {Account, AccountFields} from '@src/generated/sobs';
import { Layout } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';

interface AppState {
  selectedAccount: AccountFields;
}

class App extends React.Component<{}, AppState> {

  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: null,
    };
  }

  public setAccount = (account) => {
    this.setState({selectedAccount: account});
  }

  public clearAccount = () => {
    this.setState({selectedAccount: null});
  }

  public render() {
    if (this.state.selectedAccount) {
      return (
        <div style={{ marginTop: 50, padding: 50}}>
          <AccountDisplay account={this.state.selectedAccount} onBackClick={this.clearAccount} />
        </div>
      );
    }
    return (
      <div style={{ marginTop: 50, padding: 50}}>
        <SearchDisplay setAccount={this.setAccount}/>
      </div>
    );
  }
}

export default hot(module)(App);
