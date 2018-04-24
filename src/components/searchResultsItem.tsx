import { AccountDisplay } from '@src/components/accountDisplay';
import { Account, AccountFields} from '@src/generated/sobs';
import { Form } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';

interface SearchResultsItemProps {
    acc: AccountFields;
    onAccountClick?: (account: AccountFields) => void;
}

export class SearchResultsItem extends React.Component<SearchResultsItemProps, {}> {

    public handleAccountClick = () => {
        this.props.onAccountClick(this.props.acc);
    }

    public render() {
        return (
            <li onClick={this.handleAccountClick}>
                {this.props.acc.name}
            </li>
        );
    }
}