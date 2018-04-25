
import { AccountDisplay } from '@src/components/accountDisplay';
import { SearchResultsItem } from '@src/components/searchResultsItem';
import { Account, AccountFields} from '@src/generated/sobs';
import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { generateSelect } from 'ts-force';
const FormItem = Form.Item;

interface SearchDisplayProps {
    setAccount(account): void;
}

interface SearchDisplayStates {
    searchValue: string;
    searchResults: any;
}

export class SearchDisplay extends React.Component<SearchDisplayProps, SearchDisplayStates> {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResults: null,
        };
    }

    public updateSearchValue = (evt) => {
        this.setState({
          searchValue: evt.target.value,
        });
      }

    public runSearch = () => {
        Account
        .retrieve(`SELECT ${generateSelect(Object.values(Account.FIELDS))} 
        FROM Account WHERE Name LIKE '%${this.state.searchValue}%'`)
        .then((accs) => this.setState({searchResults: accs}));
    }

    public render() {
        return (
            <div>
                <Form layout='inline' style={{clear: 'both'}}>
                    <FormItem>
                        <Input 
                            id='search-box'
                            value={this.state.searchValue}
                            onChange={evt => this.updateSearchValue(evt)}
                            style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                    </FormItem>
                    {this.state.searchValue && this.state.searchValue.length >= 3 &&
                        <FormItem>
                            <Button 
                                type='primary'
                                htmlType='submit'
                                onClick={this.runSearch}
                            >
                                Search
                            </Button>
                        </FormItem>
                    }
                    
                </Form>
                <ul>
                    {this.state.searchResults && this.renderSearchItems(this.props.setAccount, this.state.searchResults)}
                </ul>
            </div>
            
        );
    }

    public renderSearchItems = (setAccount, searchResults) => {
        return searchResults.map((account, i) => {
            return(
                <SearchResultsItem acc={account} onAccountClick={setAccount} key={i}/>
            );
        });
    }

}
