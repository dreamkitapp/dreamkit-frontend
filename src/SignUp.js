import React, { PureComponent } from 'react';

import './SignUp.css';

var SignUpPage = {
    FIRST_NAME: 0,
};

// SignUp Component
class SignUp extends PureComponent {
    constructor() {
        super();
        this.state = {
            page_state: SignUpPage.FIRST_NAME,
            progress: 0,
        }
    }

    componentDidMount() {
        //
    }

    handleSubmitForm = (result) => {
        this.setState({
            progress: this.state.progress + 1,
        })
        console.log(result);
    }

    render() {

        var currentForm;
        switch (this.state.page_state) {
            case 0:
                currentForm = <FirstNameForm handleSubmit={this.handleSubmitForm} />;
                break;
            default:
                currentForm = <FirstNameForm handleSubmit={this.handleSubmitForm} />;
                break;
        }

        return (
            <div className="SignUp">
                <ProgessBar progress={this.state.progress} />
                <button className="Cancel"></button>
                {currentForm}
            </div>
        );
    }
}

// Progress bar on top of everything
class ProgessBar extends PureComponent {

    constructor() {
        super();
        var p = ["Progress"]
        for (var i = 0; i < 6; i++) { p.push("Progress Hide"); }
        this.state = {
            progressClass: p,
        }
    }

    render() {

        var progress = this.props.progress;

        if (progress !== 0 || progress >= 7)
        {
            var temp_p = this.state.progressClass;
            temp_p[progress - 1] = "Progress Hide";
            temp_p[progress] = "Progress";
        }

        return (
            <div className="ProgressBar">
                <hr className="Background" />
                <span className={this.state.progressClass[0]}></span>
                <span style={ {left: '14.5%'} } className={this.state.progressClass[1]}></span>
                <span style={ {left: '29%'} } className={this.state.progressClass[2]}></span>
                <span style={ {left: '43.5%'} } className={this.state.progressClass[3]}></span>
                <span style={ {left: '58%'} } className={this.state.progressClass[4]}></span>
                <span style={ {left: '72.5%'} } className={this.state.progressClass[5]}></span>
                <span style={ {left: '87%'} } className={this.state.progressClass[6]}></span>
            </div>
        );
    }
}

// Screen 14
class FirstNameForm extends PureComponent {
    constructor() {
        super();
        this.state = {
            value: '',
        }
    }

    inputChanged = (event) => {
        this.setState({
            value: event.target.value,
        })
    }

    handleSubmit = (event) => {
        this.props.handleSubmit(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="FirstNameForm">
                <form onSubmit={this.handleSubmit}>
                    <p className="Header">My first</p>
                    <p className="Header">name is</p>
                    <label className="Label">
                        <input className="InputText" type="text" value={this.state.value} onChange={this.inputChanged} />
                        <span className="InputBorder"></span>
                    </label>
                    <p className="InputLabel">This is how it will appear on DreamKit</p>
                    <input type="submit" value="next" />
                </form>
            </div>
        );
    }
}

export default SignUp;
