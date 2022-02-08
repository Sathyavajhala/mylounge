import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import { Component } from 'react';
import Card from '@mui/material/Card';
import clsx from 'clsx';
// import { useMemo } from 'react';
import { Parser } from 'html-to-react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { height } from '@mui/system';
import Container from '@material-ui/core/Container';
import zine1 from "../zine1.png"
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import ReactHtml from 'raw-html-react';
import InnerHTML from 'dangerously-set-html-content'
// import renderHTML from 'react-render-html';
import API from '../../../Api/index.js'
const renderHTML = require('react-render-html');
const ReactDOMServer = require('react-dom/server');
const HtmlToReactParser = require('html-to-react').Parser;
const api = API.Api;
var htmlPage;
class WeeklyZine extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getWeeklyZine();
    }
    getWeeklyZine() {
        const requestOptions = {
            method: 'POST',
            headers: { 'token': 'qwerty', 'Content-Type': 'application/json' }
        }
        fetch(`${api}/employeeportal/getMailChimpHtml`, requestOptions)
            .then((res) => res.json())
            .then((res) => htmlPage = res.weeklyZineHtmlData)
    }
    myWeeklyZineHtmlContent() {
        return { __html: `${htmlPage}` }
    }

    render() {
        // const container = window !== undefined ? () => window().document.body : undefined;
        console.log(this.props.windowWidth)
        return (
            <div  >
                {this.props.windowWidth > 770 ?
                    <div>
     <div style={{ width: '100%', position: 'fixed', height: '9.5%', zIndex: 1000, backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center',top:0 }}>
                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', marginLeft: '20%' }}>Weekly Zine  </p>
                        </div>
                        <div style={{width: '90%', display: 'flex', justifyContent: 'center', marginLeft: '10%', alignSelf: 'center', paddingTop: '5%' }}>
                            <div dangerouslySetInnerHTML={this.myWeeklyZineHtmlContent()}>
                            </div>
                        </div>

                   
                    </div>
                    :
                    <div>
                        <div style={{ width: '100%', height: 65, backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center' }}>

                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', }}>Weekly Zine </p>
                        </div>
                        <div dangerouslySetInnerHTML={this.myWeeklyZineHtmlContent()}>
                        </div>
                    </div>
                }
            </div>

        )
    }
}
WeeklyZine.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default windowSize(WeeklyZine)




