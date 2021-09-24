import React from 'react';
import '../img/style.css';
import Header from './Header'

export default function ProblemReport(props) {

		return (
            <>
            <Header/>
            <div>
                <div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <h2>Problem Report</h2>
                </div>
            </div>
            </>
		);
}