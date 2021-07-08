import React, {Component} from "react";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "MergeUtility"
        };
    }


    render() {
        return (

            <header>
                <br/>
                <h1 align="center">{this.state.content}</h1>
            </header>

        );
    }
}
