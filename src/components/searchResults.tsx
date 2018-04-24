
import { AccountDisplay } from '@src/components/accountDisplay';
import { SearchResultsItem } from '@src/components/searchResultsItem';
import { Account, AccountFields} from '@src/generated/sobs';
import { Form } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';

interface SearchResultsProps {
    accs: any;
}

interface SearchResultsStates {
    selectedAccount: AccountFields;
}

export class SearchResults extends React.Component<SearchResultsProps, SearchResultsStates> {

    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
        };
    }

    public setSelectedAccount = (account: AccountFields) => {
        this.setState({selectedAccount: account});
    }

    public render() {
        if (!this.props.accs) {
          return <div>No Accounts Found</div>;
        }

        if (this.state.selectedAccount) {
            return (
                <AccountDisplay acc={this.state.selectedAccount} onBackClick={this.setSelectedAccount}/>
            );
        }
    
        return (
            <ul>
                {this.renderAccounts(this.props.accs)}
            </ul>
        );
      }

    private renderAccounts = (accs) => {
        return accs.map((acc, i) => {
            return(
                <SearchResultsItem acc={acc} onAccountClick={this.setSelectedAccount} key={i}/>
            );
        });
    }
}
