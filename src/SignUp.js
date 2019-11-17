import React, { PureComponent } from 'react';
import styles from './SignUp.module.css';

// SignUp Component
class SignUp extends PureComponent {

    constructor() {
        super();

        this.state = {
            progress: 0,
        }
    }

    componentDidMount() {
        //
    }

    handleSubmitForm = (result) => {
        console.log(result);
        this.setState({
            progress: this.state.progress + 1,
        })
    }

    render() {
        return (
            <div className={styles.SignUp}>
                <ProgessBar progress={this.state.progress} />
                <button className={styles.Cancel}></button>
                <div className={styles.Container}>
                    <SignUpForm shouldHide={this.state.progress !== 0 ? true : false} handleSubmit={this.handleSubmitForm} requiresInput={true} header="My first name is" headerStyle={styles.HeaderNormal}>
                        <TextInput />
                    </SignUpForm>
                    <SignUpForm shouldHide={this.state.progress !== 1 ? true : false} handleSubmit={this.handleSubmitForm} requiresInput={true} header="My birthday is" headerStyle={styles.HeaderNormal}>
                        <BirthdayInput />
                    </SignUpForm>
                    <SignUpForm shouldHide={this.state.progress !== 2 ? true : false} handleSubmit={this.handleSubmitForm} requiresInput={false} header="Add photo" headerStyle={styles.HeaderNormal}>
                        <PhotoInput />
                    </SignUpForm>
                    <SignUpForm shouldHide={this.state.progress !== 3 ? true : false} handleSubmit={this.handleSubmitForm} requiresInput={false} header="Enable location" headerStyle={styles.HeaderNormal}>
                        <LocationPhoto />
                    </SignUpForm>
                    <SignUpForm shouldHide={this.state.progress !== 4 ? true : false} handleSubmit={this.handleSubmitForm} requiresInput={true} header="Verify your phone number" headerStyle={styles.HeaderSmall}>
                        <PhoneNumberInput />
                    </SignUpForm>
                    <SignUpForm shouldHide={this.state.progress !== 5 ? true : false} handleSubmit={this.handleSubmitForm} requiresInput={true} header="What do you want to get out of DreamKit?" headerStyle={styles.HeaderSmallMargin}>
                        <SelectionInput />
                    </SignUpForm>
                </div>
            </div>
        );
    }
}

// Progress bar on top of everything
class ProgessBar extends PureComponent {

    getStyle = (progress, index) => {
        if (progress === index) {
            return styles.ProgressBarMover
        }
    }

    render() {

        var progress = this.props.progress;

        return (
            <div className={styles.ProgressBar}>
                <hr className={styles.ProgressBarBack} />
                <span className={this.getStyle(progress, 0)}></span>
                <span style={{ left: '17%' }} className={this.getStyle(progress, 1)}></span>
                <span style={{ left: '34%' }} className={this.getStyle(progress, 2)}></span>
                <span style={{ left: '51%' }} className={this.getStyle(progress, 3)}></span>
                <span style={{ left: '68%' }} className={this.getStyle(progress, 4)}></span>
                <span style={{ left: '85%' }} className={this.getStyle(progress, 5)}></span>
            </div>
        );
    }
}

class TextInput extends React.Component {
    render() {

        var errorLabelStyle = null
        var errorInputStyle = null

        if (this.props.errorInput) {
            errorLabelStyle = { color: "red" }
            errorInputStyle = { borderBottom: "3px solid red" }
        }

        return (
            <div >
                <label className={styles.Label}>
                    <input style={errorInputStyle} className={styles.InputText} type="text" value={this.props.inputValue} onChange={this.props.inputChanged} />
                    <span className={styles.InputBorder}></span>
                </label>
                <p style={errorLabelStyle} className={styles.InputLabel}>This is how it will appear on DreamKit</p>
            </div>
        )
    }
}

class BirthdayInput extends React.Component {
    render() {

        var errorInputStyle = null

        if (this.props.errorInput) {
            errorInputStyle = { borderBottom: "3px solid red" }
        }

        return (
            <div>
                <label className={styles.Label}>
                    <input style={errorInputStyle} className={styles.InputText} type="date" value={this.props.inputValue} onChange={this.props.inputChanged} />
                    <span className={styles.InputBorder}></span>
                </label>
            </div>
        )
    }
}

class PhotoInput extends React.Component {
    render() {
        return (
            <div >
                Photo Input
            </div>
        )
    }
}

class LocationPhoto extends React.Component {
    render() {
        return (
            <div>Location Photo</div>
        )
    }
}

class PhoneNumberInput extends React.Component {

    inputChanged = (event) => {
        const re = /^[0-9\b]+$/

        if (event.target.value === '' || re.test(event.target.value)) {
            this.props.inputChanged(event)
        }
    }

    render() {

        var errorInputStyle = null

        if (this.props.errorInput) {
            errorInputStyle = { borderBottom: "3px solid red" }
        }

        return (
            <div>
                <label className={styles.Label}>
                    <input style={errorInputStyle} className={styles.InputText} placeholder="Phone Number" type="text" value={this.props.inputValue} onChange={this.inputChanged} />
                    <span className={styles.InputBorder}></span>
                </label>
            </div>
        )
    }
}

class SelectionInput extends React.Component {

    constructor() {
        super()

        this.state = {
            value: [false, false, false, false, false]
        }
    }

    inputChanged = (event) => {

        this.state.value[event.target.name] = event.target.checked
        this.forceUpdate()

        event.target.value = this.state.value

        if (!this.state.value.includes(true))
        {
            event.target.value = ''
        }

        this.props.inputChanged(event)
    }

    render() {

        var errorLabelStyle = null

        if (this.props.errorInput) {
            errorLabelStyle = { color: "red" }
        }

        return (
            <div>
                <p style={errorLabelStyle} className={styles.SubHeader}>Please click at least one</p>
                <label className={styles.Option}>
                    <input name={0} type="checkbox" checked={this.state.value[0]} onChange={this.inputChanged} />
                    <div className={styles.CheckMark}
                         style={this.state.value[0] ? { background: "#B6D2B5", color: "#33882F", borderColor: "#33882F" } : { color: "#33882F", borderColor: "#33882F" }}>
                        Earn and spend points
                    </div>
                </label>
                <label className={styles.Option}>
                    <input name={1} type="checkbox" checked={this.state.value[1]} onChange={this.inputChanged} />
                    <div className={styles.CheckMark}
                         style={this.state.value[1] ? { background: "#BAD9F4", color: "#0089FF", borderColor: "#0089FF" } : { color: "#0089FF", borderColor: "#0089FF" }}>
                        Gain professional experience
                    </div>
                </label>
                <label className={styles.Option}>
                    <input name={2} type="checkbox" checked={this.state.value[2]} onChange={this.inputChanged} />
                    <div className={styles.CheckMark}
                         style={this.state.value[2] ? { background: "#E4D9B3", color: "#E1B50F", borderColor: "#E1B50F" } : { color: "#E1B50F", borderColor: "#E1B50F" }}>
                        Build a DreamKit resume
                    </div>
                </label>
                <label className={styles.Option}>
                    <input name={3} type="checkbox" checked={this.state.value[3]} onChange={this.inputChanged} />
                    <div className={styles.CheckMark}
                         style={this.state.value[3] ? { background: "#EED7F3", color: "#EA91FF", borderColor: "#EA91FF" } : { color: "#EA91FF", borderColor: "#EA91FF" }}>
                        Connect with a mentor
                    </div>
                </label>
                <label className={styles.Option}>
                    <input name={4} type="checkbox" checked={this.state.value[4]} onChange={this.inputChanged} />
                    <div className={styles.CheckMark}
                         style={this.state.value[4] ? { background: "#F99191", color: "#FF0100", borderColor: "#FF0100" } : { color: "#FF0100", borderColor: "#FF0100" }}>
                        Connect with DreamKit members
                    </div>
                </label>
            </div>
        )
    }
}

class SignUpForm extends PureComponent {

    constructor() {
        super();
        this.state = {
            value: '',
            visible: true,
            errorInput: false,
        }
    }

    setVisibility = (vis) => {
        setTimeout(() => this.setState({
            visible: vis,
        }), 300)
    }

    inputChanged = (event) => {
        this.setState({
            value: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.value === '' && this.props.requiresInput) {
            this.setState({
                errorInput: true,
            })
            return
        }
        this.props.handleSubmit(this.state.value);
    }

    render() {

        if (this.props.shouldHide && this.state.visible) {
            this.setVisibility(false);
        }
        if (!this.props.shouldHide && !this.state.visible) {
            this.setVisibility(true);
        }

        const hidden = (this.state.visible || !this.props.shouldHide) ? null : { display: "none" }

        return (
            <div className={styles.SignUpForm}>
                <form onSubmit={this.handleSubmit}>
                    <div style={hidden} className={this.props.shouldHide ? `${styles.Form} ${styles.Hide}` : styles.Form}>
                        <p className={this.props.headerStyle}>{this.props.header}</p>
                        {React.cloneElement(this.props.children, { errorInput: this.state.errorInput, inputChanged: this.inputChanged, inputValue: this.state.value })}
                    </div>
                    <input style={hidden} className={styles.Submit} type="submit" value="next" />
                </form>
            </div>
        );
    }
}

export default SignUp;
