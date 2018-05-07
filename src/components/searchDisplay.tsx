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

    public updateSearchValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
                {renderSearchControls(this.state.searchValue, this.updateSearchValue, this.runSearch)}
                <ul>
                    {this.state.searchResults && renderSearchItems(this.props.setAccount, this.state.searchResults)}
                </ul>
            </div>
            
        );
    }
}

const renderSearchControls = (searchValue, updateSearchValue, runSearch) => {

    return (
        <Form layout='inline' style={{clear: 'both'}}>
            {renderSearchBox(searchValue, updateSearchValue)}
            {renderSearchButton(searchValue, runSearch)}
        </Form>
    );
};

const renderSearchBox = (searchValue, updateSearchValue) => {
    return (
        <FormItem>
            <Input 
                id='search-box'
                value={searchValue}
                onChange={updateSearchValue}
                style={{ color: 'rgba(0,0,0,.25)' }}
            />
        </FormItem>);
};

const renderSearchButton = (searchValue, runSearch) => {
    if (searchValue && searchValue.length >= 1) {
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

const renderSearchItems = (setAccount, searchResults) => {
    return searchResults.map((account, i) => {
        return(
            <SearchResultsItem acc={account} onAccountClick={setAccount} key={i}/>
        );
    });
};
