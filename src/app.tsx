import { SearchControls } from '@src/components/searchControls';
import { SearchResults } from '@src/components/searchResults';
import {Account, AccountFields} from '@src/generated/sobs';
import { Layout } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { generateSelect } from 'ts-force';

interface AppState {
  acc: AccountFields;
  accs: any;
}

class App extends React.Component<{}, AppState> {

  constructor(props) {
    super(props);

    this.state = {
      acc: null,
      accs: null,
    };
  }

  public componentDidMount() {
    // get all fields
    Account.retrieve(`SELECT ${generateSelect(Object.values(Account.FIELDS))} FROM Account`)
    .then((accs) => this.setState({accs}));
  }

  public render() {
    return (
      <div style={{ marginTop: 50, padding: 50}}>
        <SearchControls />
        <SearchResults accs={this.state.accs} />
      </div>
    );
  }
}

export default hot(module)(App);
