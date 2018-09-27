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
    searchResults: Account[];
}

export class SearchDisplay extends React.Component<SearchDisplayProps, SearchDisplayStates> {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResults: null,
        };
    }

    public render() {
        return (
            <div>
                <SearchControls 
                    searchValue={this.state.searchValue}
                    updateSearchValue={this.updateSearchValue}
                    runSearch={this.runSearch}
                />
                <ul>
                    {this.renderSearchItems(this.props.setAccount, this.state.searchResults)}
                </ul>
            </div>
        );
    }

    private updateSearchValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          searchValue: evt.target.value,
        });
    }

    private runSearch = () => {
        Account
        .retrieve(`SELECT ${generateSelect(Object.values(Account.FIELDS))} 
        FROM Account WHERE Name LIKE '%${this.state.searchValue}%'`)
        .then((accs) => this.setState({searchResults: accs}));
    }

    private renderSearchItems = (setAccount, searchResults) => {
        if (searchResults) {
            return searchResults.map((account, i) => {
                return(
                    <SearchResultsItem acc={account} onAccountClick={setAccount} key={i}/>
                );
            });
        } else {
            return null;
        }
    }
}

/* SEARCH CONTROLS */

interface SearchControlProps {
    searchValue: string;
    updateSearchValue: (e) => void;
    runSearch: () => void;
 }

const SearchControls: React.SFC<SearchControlProps> = (props) => {
    return (
        <Form layout='inline' style={{clear: 'both'}}>
            <SearchBox searchValue={props.searchValue} updateSearchValue={props.updateSearchValue}/>
            <SearchButton searchValue={props.searchValue} runSearch={props.runSearch}/>
        </Form>
    );
};

/* SEARCH BOX */

interface SearchBoxProps {
    searchValue: string;
    updateSearchValue: (e) => void;
}

const SearchBox: React.SFC<SearchBoxProps> = (searchValue, updateSearchValue) => {
    return (
        <FormItem>
            <Input 
                id='search-box'
                value={searchValue}
                onChange={updateSearchValue}
                style={{ color: 'rgba(0,0,0,.25)' }}
            />
        </FormItem>
    );
};

/* SEARCH BUTTON */

interface SearchButtonProps {
    searchValue: string;
    runSearch: () => void;
}

const SearchButton: React.SFC<SearchButtonProps> = (searchValue, runSearch) => {
    if (searchValue && searchValue.children.toString.length >= 1) {
        return (
            <FormItem>
                <Button 
                    type='primary'
                    htmlType='submit'
                    onClick={runSearch}
                >
                    Search
                </Button>
            </FormItem>
        );
    } else {
        return null;
    }
};
