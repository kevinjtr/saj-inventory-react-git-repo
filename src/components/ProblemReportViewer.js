import React from 'react';
import '../img/style.css';
import Header from './Header'

export default function ProblemReportViewer(props) {

		return (
            <>
            <Header/>
            <div>
                <div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <h2>Problem Report Viewer</h2>
                </div>
            </div>
            </>
		);
}