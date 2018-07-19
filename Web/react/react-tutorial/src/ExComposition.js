import React, {Component} from 'react';

// children prop to pass children elements directly into their output
// props의 children 요소를 통해 directive를 사용할 때 자식으로 추가된 요소들에 접근할 수 있다.
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

export function WelcomeDialog() {
    return (
        <FancyBorder color='blue'>
            <h1 className='Dialog-title'>Welcome</h1>
            <p className='Dialog-message'>Thank you for visiting out spacecraft!</p>
        </FancyBorder>
    );
}

// children 말고 자신만의 고유한 컨벤션을 만들어 자식 요소를 넘기는 방법
function SplitPane(props) {
    return (
        <div className='SplitPane'>
            <div className='SplitPane-left'>
                {props.left}
            </div>
            <div className='SplitPane-right'>
                {props.right}
            </div>
        </div>
    );
}

function Contacts() {
    return <div className="Contacts">Contacts</div>;
  }
  
  function Chat() {
    return <div className="Chat">Chat</div>;
  }

export function App(props) {
    return (
        <SplitPane left={<Contacts/>} right={<Chat />} />
    );
}

/**
 *  Specialization
 * SpecialDialog is a special case of Dialog.
 * generic한 Dialog 컴포넌트를 생성한 후, props를 사용하여 특별하게 만든다.
 */
function Dialog(props) {
    return (
        <FancyBorder color='blue'>
            <h1 className='Dialog-title'>
                {props.title}
            </h1>
            <p className='Dialog-message'>
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

export function SpecialDialog(props) {
    return (
        <Dialog
            title='Welcome'
            message='Thank you for visiging our spacecraft!' />
    );
}

export default class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    render() {
        return (
            <Dialog 
                title='Mars Exploration Program'
                message='How should we refer to you?'>
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>

        );
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp(e) {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}