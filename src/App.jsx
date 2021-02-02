import React from 'react';
// import axios from 'axios';
// import Nav from './Nav'
// import About from './About'
// import Shop from './Shop';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './components/auth/styles.css'
import ValidatedLoginForms from './components/auth/ValidatedLoginForms';
import ValidatedRegisterForms from './components/auth/ValidatedRegisterForms';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogginActive: true
		};
	}

	componentDidMount() {
		this.rightSide.classList.add('right');
	}

	changeState() {
		const { isLogginActive } = this.state;

		if (isLogginActive) {
			this.rightSide.classList.remove('right');
			this.rightSide.classList.add('left');
		} else {
			this.rightSide.classList.remove('left');
			this.rightSide.classList.add('right');
		}
		this.setState((prevState) => ({ isLogginActive: !prevState.isLogginActive }));
	}

	render() {
		const { isLogginActive } = this.state;
		const current = isLogginActive ? 'Register' : 'Login';
		const currentActive = isLogginActive ? 'login' : 'register';
		return (
			<header className="">
				<div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
					<div className="login">
						<div className="container" ref={(ref) => (this.container = ref)}>
							{isLogginActive && <ValidatedLoginForms containerRef={(ref) => (this.current = ref)} />}
							{!isLogginActive && <ValidatedRegisterForms containerRef={(ref) => (this.current = ref)} />}
						</div>
						<RightSide
							current={current}
							currentActive={currentActive}
							containerRef={(ref) => (this.rightSide = ref)}
							onClick={this.changeState.bind(this)}
						/>
					</div>
				</div>
			</header>
		);
	}
}

const RightSide = (props) => {
	return (
		<div className="right-side" ref={props.containerRef} onClick={props.onClick}>
			<div className="inner-container">
				<div className="text">{props.current}</div>
			</div>
		</div>
	);
};

// export default App;

// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//   </div>
// )

export default App;
