import React, {Component} from "react";
import {Button, Col, Layout, Row} from "antd";
import axios from "axios";
import Text from "antd/es/typography/Text";

const { Content } = Layout;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.handleChangeForFirstFile = this.handleChangeForFirstFile.bind(this);
        this.handleChangeForSecondFile = this.handleChangeForSecondFile.bind(this);

        this.upload = this.upload.bind(this);
        //this.upload1 = this.upload1.bind(this);

        this.state = {
            isLoaded: false,

            fileFirst: null,
            fileSecond: null,

            data: null,

            counter: 0
        };
    }

    handleChangeForFirstFile = (e) => {
        this.setState({fileFirst: e.target.files[0]})
    }

    handleChangeForSecondFile = (e) => {
        this.setState({fileSecond: e.target.files[0]})
    }

    upload() {
        const formData = new FormData();

        formData.append(
            "fileFirst",
            this.state.fileFirst
        );

        formData.append(
            "fileSecond",
            this.state.fileSecond
        );

        axios.post("http://localhost:8080/upload", formData).then(response => {
            this.setState({
                data : response.data,
                isLoaded : true
            })

            console.log(response)

        });

    }

    /*upload1() {
        console.log(this.state.fileFirst);

        let fr = new FileReader()
        fr.readAsText(this.state.fileFirst)
        fr.onload = function () {
            const file = JSON.parse(fr.result);

            console.log(JSON.parse(fr.result))
            axios.post("http://localhost:8080/upload1", file);

        }
    }*/

    render() {
        const {data} = this.state;

        let counter = this.state.counter;

        let renderSwitchMandatoryFields;
        renderSwitchMandatoryFields = (Obj, field, number, spaceNumber) => {
            if (number === 0) {
                counter += 1;
                switch (Obj.operationType) {
                    case 'DELETED':
                        return <div style={{color: 'red'}}>
                                    {counter-1}
                                    {getSpace(spaceNumber).map(function(i) {
                                        return i;
                                    })}
                                    {field}
                               </div>;
                    case 'ADDED':
                        return <div style={{color: 'green'}}>{counter-1}<br/></div>;
                    case 'UPDATED':
                        return <div style={{color: 'orange'}}>
                                    {counter-1}
                                    {getSpace(spaceNumber).map(function(i) {
                                        return i;
                                    })}
                                    {field}
                               </div>;
                    case 'NONE':
                        return <div>{counter-1}
                                    {getSpace(spaceNumber).map(function(i) {
                                        return i;
                                    })}
                                    {field}
                               </div>;
                    default:
                        return <div>Unvalid data!</div>;
                }
            } else {
                counter += 1;
                switch (Obj.operationType) {
                    case 'DELETED':
                        return <div style={{color: 'red'}}>{counter-1}<br/></div>;
                    case 'ADDED':
                        return <div style={{color: 'green'}}>
                                    {counter-1}
                                    {getSpace(spaceNumber).map(function(i) {
                                        return i;
                                    })}
                                    {field}
                               </div>;
                    case 'UPDATED':
                        return <div style={{color: 'orange'}}>
                                    {counter-1}
                                    {getSpace(spaceNumber).map(function(i) {
                                        return i;
                                    })}
                                    {field}
                               </div>;
                    case 'NONE':
                        return <div>{counter-1}
                                    {getSpace(spaceNumber).map(function(i) {
                                        return i;
                                    })}
                                    {field}
                               </div>;
                    default:
                        return <div>Unvalid data!</div>;
                }
            }
        }

        let renderSwitchObjectEnd;
        renderSwitchObjectEnd = (Obj, field, number, spaceNumber) => {
            if (Obj != null) {
                if (number === 0) {
                    counter += 1;
                    switch (Obj.operationType) {
                        case 'DELETED':
                            return <div style={{color: 'red'}}>
                                {counter - 1}
                                {getSpace(spaceNumber).map(function (i) {
                                    return i;
                                })}
                                {field} {Obj.oldValue}
                            </div>;
                        case 'ADDED':
                            return <div style={{color: 'green'}}>{counter - 1}<br/></div>;
                        case 'UPDATED':
                            return <div style={{color: 'orange'}}>
                                {counter - 1}
                                {getSpace(spaceNumber).map(function (i) {
                                    return i;
                                })}
                                {field} {Obj.oldValue}
                            </div>;
                        case 'NONE':
                            return <div>{counter - 1}
                                {getSpace(spaceNumber).map(function (i) {
                                    return i;
                                })}
                                {field} {Obj.oldValue}
                            </div>;
                        default:
                            return <div>Unvalid data!</div>;
                    }
                } else {
                    counter += 1;
                    switch (Obj.operationType) {
                        case 'DELETED':
                            return <div style={{color: 'red'}}>{counter - 1}<br/></div>;
                        case 'ADDED':
                            return <div style={{color: 'green'}}>
                                {counter - 1}
                                {getSpace(spaceNumber).map(function (i) {
                                    return i;
                                })}
                                {field} {Obj.newValue}
                            </div>;
                        case 'UPDATED':
                            return <div style={{color: 'orange'}}>
                                {counter - 1}
                                {getSpace(spaceNumber).map(function (i) {
                                    return i;
                                })}
                                {field} {Obj.newValue}
                            </div>;
                        case 'NONE':
                            return <div>{counter - 1}
                                {getSpace(spaceNumber).map(function (i) {
                                    return i;
                                })}
                                {field} {Obj.newValue}
                            </div>;
                        default:
                            return <div>Unvalid data!</div>;
                    }
                }
            }
        }

        let renderSwitchArrFields;
        renderSwitchArrFields = (field, spaceNumber) => {
            counter += 1;
            return <div>{counter-1}
                        {getSpace(spaceNumber).map(function(i) {
                            return i;
                        })}
                        {field} [
                   </div>;
        }

        let renderSwitchArrService;
        renderSwitchArrService = (Obj, number) => {
            return <div>
                        {
                            Obj.map(function(item) {
                                return <div>
                                    {getSpaceForArr(6).map(function(i) {
                                        return i;
                                    })}
                                    &#123;
                                    {renderSwitchObjectEnd(item.serviceShortName, "\"service-short-name\":", number, 6)}
                                    {renderSwitchObjectEnd(item.serviceName, "\"service_name\":", number, 6)}
                                    {renderSwitchObjectEnd(item.artifactType, "\"artifact_type\":", number, 6)}
                                    {renderSwitchObjectEnd(item.dockerRegistry, "\"docker_registry\":", number, 6)}
                                    {renderSwitchObjectEnd(item.dockerImageName, "\"docker_image_name\":", number, 6)}
                                    {renderSwitchObjectEnd(item.dockerTag, "\"docker_tag\":", number, 6)}
                                    {renderSwitchObjectEnd(item.force, "\"force\":", number, 6)}
                                    {renderSwitchObjectEnd(item.githubRepository, "\"github_repository\":", number, 6)}
                                    {renderSwitchObjectEnd(item.githubBranch, "\"github_branch\":", number, 6)}
                                    {renderSwitchObjectEnd(item.githubHash, "\"github_hash\":", number, 6)}
                                    {renderSwitchMandatoryFields(item.hashesMerge, "\"hashes\":", number, 6)}
                                    {getSpaceForArr(7).map(function(i) {
                                        return i;
                                    })}
                                    &#123;
                                    {renderSwitchObjectEnd(item.hashesMerge.sha1, "\"sha1\":", number, 7)}
                                    {renderSwitchObjectEnd(item.hashesMerge.sha256, "\"sha256\":", number, 7)}
                                    {getSpaceForArr(7).map(function(i) {
                                        return i;
                                    })}
                                    &#125;
                                    <br/>
                                    {getSpaceForArr(6).map(function(i) {
                                        return i;
                                    })}
                                    &#125;,
                                </div>
                            })
                        }
                        <div>
                            {getSpaceForArr(3).map(function(i) {
                                return i;
                            })}
                            ]
                        </div>
                   </div>;
        }

        let renderSwitchArrArtifact;
        renderSwitchArrArtifact = (Obj, number) => {
            return <div>
                {
                    Obj.map(function(item) {
                        if (item.mvn === 0) {
                            return <div>
                                {getSpaceForArr(6).map(function (i) {
                                    return i;
                                })}
                                &#123;
                                {
                                    <div>
                                        {item.serviceShortName != null &&
                                            renderSwitchObjectEnd(item.serviceShortName, "\"service-short-name\":", number, 6)}
                                        {renderSwitchObjectEnd(item.serviceName, "\"service_name\":", number, 6)}
                                        {renderSwitchMandatoryFields(item.hashesMerge, "\"hashes\":", number, 6)}
                                        {getSpaceForArr(7).map(function (i) {
                                            return i;
                                        })}
                                        &#123;
                                        {renderSwitchObjectEnd(item.hashesMerge.sha1, "\"sha1\":", number, 7)}
                                        {renderSwitchObjectEnd(item.hashesMerge.sha256, "\"sha256\":", number, 7)}
                                        {getSpaceForArr(7).map(function (i) {
                                            return i;
                                        })}&#125;
                                        <br/>
                                        {renderSwitchArrFields("\"file\":", 6)}
                                        {renderSwitchObjectEnd(item.fileMerges[0].file, "", number, 7)}
                                        {getSpaceForArr(7).map(function (i) {
                                            return i;
                                        })}
                                        ]
                                        {renderSwitchObjectEnd(item.targetRepository, "\"target_repository\":", number, 6)}
                                    </div>
                                }
                                {getSpaceForArr(6).map(function (i) {
                                    return i;
                                })}
                                &#125;,
                            </div>;
                        } else {
                            return <div>
                                        {getSpaceForArr(6).map(function (i) {
                                            return i;
                                        })}
                                        &#123;
                                        {renderSwitchArrFields("\"mvn\":", 6)}

                                        {renderSwitchArrMVN(item.mvnMerges, 0)}

                                        {getSpaceForArr(6).map(function (i) {
                                            return i;
                                        })}
                                        ]
                                        {item.targetRepository != null &&
                                        renderSwitchObjectEnd(item.targetRepository, "\"target_repository\":", number, 6)}

                                        {getSpaceForArr(6).map(function (i) {
                                            return i;
                                        })}
                                        &#125;,
                                   </div>;
                        }
                    })
                }
                <div>
                    {getSpaceForArr(3).map(function(i) {
                        return i;
                    })}
                    ]
                </div>
            </div>;
        }

        let renderSwitchArrMVN;
        renderSwitchArrMVN = (Obj, number) => {
            return <div>
                        {
                            Obj.map(function(item) {
                                return <div>
                                            {getSpaceForArr(7).map(function (i) {
                                                return i;
                                            })}
                                            &#123;
                                            {renderSwitchObjectEnd(item.groupId, "\"groupId\":", number, 8)}
                                            {renderSwitchObjectEnd(item.artifactId, "\"artifactId\":", number, 8)}
                                            {renderSwitchObjectEnd(item.version, "\"version\":", number, 8)}
                                            {item.serviceName != null &&
                                             renderSwitchObjectEnd(item.serviceName, "\"service_name\":", number, 8)}
                                            {item.classifier != null &&
                                             renderSwitchObjectEnd(item.classifier, "\"classifier\":", number, 8)}
                                            {item.mvnType != null &&
                                             renderSwitchObjectEnd(item.mvnType, "\"mvn_type\":", number, 8)}
                                            {renderSwitchObjectEnd(item.mvnRepository, "\"mvn_repository\":", number, 8)}
                                            {renderSwitchMandatoryFields(item.hashesMerge, "\"hashes\":", number, 8)}
                                            {getSpaceForArr(7).map(function (i) {
                                                return i;
                                            })}
                                            &#123;
                                            {renderSwitchObjectEnd(item.hashesMerge.sha1, "\"sha1\":", number, 7)}
                                            {renderSwitchObjectEnd(item.hashesMerge.sha256, "\"sha256\":", number, 7)}
                                            {getSpaceForArr(7).map(function (i) {
                                                return i;
                                            })}&#125;
                                            <br/>
                                            {getSpaceForArr(7).map(function (i) {
                                                return i;
                                            })}
                                            &#125;,
                                       </div>;
                            })
                        }
                  </div>;
        }

        let renderSwitchArrScript;
        renderSwitchArrScript = (Obj, number) => {
            return <div>
                        {
                            Obj.map(function(item) {
                                return <div>
                                            {getSpaceForArr(4).map(function (i) {
                                                return i;
                                            })}
                                            &#123;

                                            {renderSwitchObjectEnd(item.serviceShortName, "\"service-short-name\":", number, 5)}
                                            {renderSwitchObjectEnd(item.startPoint, "\"start-point\":", number, 5)}
                                            {renderSwitchObjectEnd(item.endPoint, "\"end-point\":", number, 5)}
                                            {renderSwitchObjectEnd(item.scriptName, "\"script_name\":", number, 5)}

                                            {renderSwitchMandatoryFields(item.hashesMerge, "\"hashes\":", number, 5)}
                                            {getSpaceForArr(5).map(function (i) {
                                                return i;
                                            })}
                                            &#123;
                                            {renderSwitchObjectEnd(item.hashesMerge.sha1, "\"sha1\":", number, 5)}
                                            {renderSwitchObjectEnd(item.hashesMerge.sha256, "\"sha256\":", number, 5)}
                                            {getSpaceForArr(5).map(function (i) {
                                                return i;
                                            })}&#125;
                                            <br/>

                                            {renderSwitchObjectEnd(item.url, "\"url\":", number, 5)}

                                            {getSpaceForArr(4).map(function (i) {
                                                return i;
                                            })}
                                            &#125;,
                                       </div>
                            })
                        }
                        <div>
                            {getSpaceForArr(3).map(function(i) {
                                return i;
                            })}
                            ]
                        </div>
                   </div>
        }

        let renderSwitchArrRPM;
        renderSwitchArrRPM = (Obj, number) => {
            return <div>
                {
                    Obj.map(function(item) {
                        return <div>
                            {getSpaceForArr(4).map(function (i) {
                                return i;
                            })}
                            &#123;

                            {renderSwitchObjectEnd(item.url, "\"url\":", number, 5)}
                            {renderSwitchObjectEnd(item.rpmRepositoryName, "\"rpm_repository_name\":", number, 5)}

                            {renderSwitchMandatoryFields(item.hashesMerge, "\"hashes\":", number, 5)}
                            {getSpaceForArr(5).map(function (i) {
                                return i;
                            })}
                            &#123;
                            {renderSwitchObjectEnd(item.hashesMerge.sha1, "\"sha1\":", number, 5)}
                            {renderSwitchObjectEnd(item.hashesMerge.sha256, "\"sha256\":", number, 5)}
                            {getSpaceForArr(5).map(function (i) {
                                return i;
                            })}&#125;
                            <br/>

                            {renderSwitchObjectEnd(item.serviceShortName, "\"service-short-name\":", number, 5)}

                            {getSpaceForArr(4).map(function (i) {
                                return i;
                            })}
                            &#125;,
                        </div>
                    })
                }
                <div>
                    {getSpaceForArr(3).map(function(i) {
                        return i;
                    })}
                    ]
                </div>
            </div>
        }

        let getSpace = (spaceNumber) => {
            let content = [];
            for (let i = 0; i < spaceNumber; i++) {
                const item = <Text>&emsp;</Text>;
                content.push(item);
            }
            return content;
        };

        let getSpaceForArr = (spaceNumber) => {
            let content = [];
            counter += 1;
            content.push(<Text>{counter-1}</Text>)
            for (let i = 0; i < spaceNumber; i++) {
                const item = <Text>&emsp;</Text>;
                content.push(item);
            }
            return content;
        };

        let drawBranch;
        drawBranch = (branch) => {
            counter = 0;
            return <Col span={12}>
                        {renderSwitchMandatoryFields(data.metadataMerge, "\"metadata\":", branch, 3)}
                        {renderSwitchMandatoryFields(data.metadataMerge.applicationMerge, "\"application\":", branch, 5)}
                        {renderSwitchObjectEnd(data.metadataMerge.applicationMerge.name, "\"name\":", branch, 8)}
                        {renderSwitchMandatoryFields(data.metadataMerge.descriptionMerge, "\"description\":", branch, 5)}
                        {renderSwitchObjectEnd(data.metadataMerge.descriptionMerge.version, "\"version\":", branch, 8)}
                        {renderSwitchArrFields("\"services\":", 3)}
                        {renderSwitchArrService(data.serviceMerges, branch)}
                        {renderSwitchArrFields("\"artifacts\":", 3)}
                        {renderSwitchArrArtifact(data.artifactMerges, branch)}
                        {renderSwitchArrFields("\"script\":", 3)}
                        {renderSwitchArrScript(data.scriptMerges, branch)}
                        {renderSwitchArrFields("\"rpm\":", 3)}
                        {renderSwitchArrRPM(data.rpmMerges, branch)}
                        {renderSwitchMandatoryFields(data.parametersMerge, "\"parameters\":", branch, 3)}
                        {renderSwitchMandatoryFields(data.parametersMerge.commonMerge, "\"common\":", branch, 5)}
                        {renderSwitchObjectEnd(data.parametersMerge.commonMerge.someParam, "\"some-param\":", branch, 8)}
                        {renderSwitchObjectEnd(data.parametersMerge.commonMerge.someOtherParam, "\"some-other-param\":", branch, 8)}
                        {renderSwitchObjectEnd(data.parametersMerge.commonMerge.someElseParam, "\"some-else-param\":", branch, 8)}
            </Col>
        }

        return (
            <div>
                <Layout>
                    <Content className="content">
                        <Row>
                            <Col span={12}>
                                <div className="choose-file">
                                    <input type="file" onChange={this.handleChangeForFirstFile} accept=".json"/>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="choose-file">
                                    <input type="file" onChange={this.handleChangeForSecondFile} accept=".json"/>
                                </div>
                            </Col>
                        </Row>
                        { this.state.isLoaded &&
                        <Row>
                            {drawBranch(0)}
                            {drawBranch(1)}
                        </Row>}
                        <Row>
                            <Col>
                                <div className="upload">
                                    <Button onClick={this.upload}>upload</Button>
                                </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        );
    }
}
