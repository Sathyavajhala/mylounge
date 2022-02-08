import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { height, style } from '@mui/system';
import AppBar from '@material-ui/core/AppBar';
import API from '../../../Api/index.js'
const api = API.Api;

var htmlPage = 'ABSYZ Monthly NewsLetters'

class NewsLetter extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getNewsLetters();
    }
    
    getNewsLetters() {
        const requestOptions = {
            method: 'POST',
            headers: { 'token': 'qwerty', 'Content-Type': 'application/json' }
        }
        fetch(`${api}/employeeportal/getMailChimpHtml`, requestOptions)
            .then((res) => res.json())
            .then((res) => htmlPage = res.newsHtmlData);
    }

    myNewsLettersHtmlContent() {
        console.log(htmlPage, 'my html')
        return { __html: `${htmlPage}` }
    }
    render(html) {
        const myHtmlStyles={
            width:200,
            height:'90%',
            display:'flex',
            
        }
    
        console.log(this.props.windowWidth)
        return (
            <div>
                {this.props.windowWidth > 770 ?
                    <div>
                        <div style={{ width: '100%', position: 'fixed', height: '9.5', backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center' }}>
                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', marginLeft: '20%' }}>News Letters </p>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', marginLeft: '10%', alignSelf: 'center', paddingTop: '5%' }}>
                            <div  dangerouslySetInnerHTML={this.myNewsLettersHtmlContent()}>
                            </div>
                        </div>
                    </div>
    
                    :
                    <div >
                        <div style={{ width: '100%', height: 65, backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center',marginTop:'10%' }}>
    
                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', }}>News Letters</p>
                        </div>
                        <div  dangerouslySetInnerHTML={this.myNewsLettersHtmlContent()} style={{display:'inherit'}}>
                           
                        </div>
                    </div>
                }
            </div>
        )

            }
   
    
}
NewsLetter.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default windowSize(NewsLetter)











