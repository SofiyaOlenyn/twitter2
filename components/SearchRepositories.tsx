import React from "react";
import {Button, TextInput, View} from "react-native";
import ProfileLine from "./ProfileLine";
//import { gql, graphql } from 'react-apollo';
export default class SearchRepositories extends React.Component {
    static navigationOptions = {
        title: 'Search for repositories',
    };

    state = {
        searchText: '',
        activeSearch: null,
    };

    handleChange = text => {
        this.setState({
            searchText: text,
        });
    };

    handlePerformSearch = () => {
        if (this.state.searchText.length > 3) {
            this.setState({
                activeSearch: this.state.searchText,
            });
        }
    };

    renderResult() {
        if (this.state.activeSearch) {

            return (
                <ProfileLine
                    userId="3b3eb13b-7acf-4596-99be-807ed63b30a1"
                        //{this.state.activeSearch}
                />

            );
        }
    }

    render() {
        return (
            <View>
                <View
                    //style={styles.inputContainer}
                    //
                    >
                    <TextInput
                      //  style={styles.input}
                        value={this.state.searchText}
                        onChangeText={this.handleChange}
                    />
                    <Button title="Search" onPress={this.handlePerformSearch} />
                </View>
                {this.renderResult()}
            </View>
        );
    }
}
