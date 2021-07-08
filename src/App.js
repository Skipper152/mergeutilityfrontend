import React, {Component} from 'react'
import {Menu} from 'antd';
import {Link, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import {SettingOutlined} from '@ant-design/icons';
import Home from "./component/home";
import UploadFile from './component/uploading'
import {withRouter} from 'react-router'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: ''
        };
    }

    handleClick = e => {
        console.log('click ', e);
        //this.setState({current: e.key});
    };

    render() {
        const {current} = this.state;

        return (
            <div>
                <Menu onClick={this.handleClick}
                      selectedKeys={[current]}
                      mode="horizontal" theme="dark"
                >
                    <Menu.Item key="home" icon={<SettingOutlined/>}>
                        <Link to={"/"}>
                            home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="file" icon={<SettingOutlined/>}>
                        <Link to={"/uploadFile"}>
                            upload
                        </Link>
                    </Menu.Item>
                </Menu>

                <div>
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/uploadFile" component={UploadFile}/>
                    </Switch>
                </div>
            </div>
        );
    }

}

export default withRouter((App));

