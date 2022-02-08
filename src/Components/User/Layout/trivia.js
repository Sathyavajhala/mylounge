
import formElement from './formElement.json';
import { FaArrowRight } from "react-icons/fa";
import Logo from "./myLogo.png"
import Drawer from '@material-ui/core/Drawer';
import NavbarCustom from '../../../navbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { PieChart } from 'react-minimal-pie-chart';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import idea from '../idea.svg'
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AdaptiveImage from 'react-adaptive-image';
import List from '@material-ui/core/List';
import Group1 from '../Group1.png'
import Group3 from '../Group3.png'
import Collapse from '@mui/material/Collapse';
import Group2 from '../Group2.png'
import Background from '../background.png'
import Alert from '@mui/material/Alert';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { BsThreeDotsVertical } from "react-icons/bs"
import { Component } from 'react';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import Question1 from "../../../JsonData/question1.json"
import Checkbox from '@material-ui/core/Checkbox';
import DescriptionIcon from '@mui/icons-material/Description';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'; import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import windowSize from 'react-window-size';
import CssBaseline from '@mui/material/CssBaseline';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
// import windowSize from 'react-window-size';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@material-ui/core/Button"
import Dimensions from "react"
import myFont from "../../../App.css"
import MediaQuery from 'react-responsive';
import ButtonGroup from '@mui/material/ButtonGroup';
import myLogo from "../myLogo.png"
import { set } from 'lodash';
import WeeklyZine from './weeklyZine';
import { width } from '@mui/system';
const buttons = [
    <Button style={{ width: '100%' }} key="one">A Option</Button>,
    <Button key="two">B OpTion </Button>,
    <Button key="three">C</Button>,
    <Button key="three">D</Button>,

]
const OptionKeys =
    { 'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D' }

const pie = [
    { title: 'One', value: 8, color: '#1D7B84', label: '80%' },
    { title: 'Two', value: 2, color: '#359DA7', label: '20%' },
]

const percentage = 70;

class Trivia extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: "",
            answer: "",
            windowWidth: '',
            begin: true,
            errormsg: false,
            option1: false,
            option2: false,
            weeklyZine:false,
            activeDiv: '',
            alreadySubmitted:false,
            openAlert: false,
            option3: false,
            results: false,
            option4: false,
            userProfile: "",

            drawer: false,
            mobiledrawer: false,
            myQuestionView: false
        }
        this.handleDrawer = this.handleDrawer.bind(this)
        // this.handleDivInput1=this.handleDivInput1.bind(this)

    }

    ResponsiveDrawer(props) {
        const { window } = props;
        this.setState({ mobiledrawer: false })
        // const [mobileOpen, setMobileOpen] = React.useState(false);

        const handleDrawerToggle = () => {
            this.setState({ mobiledrawer: !this.state.mobiledrawer })
        };
    }
    //questionsinboundSize

    componentDidMount() {
        console.log(this.props, this.props.match.params.name)
        this.fetchData()
        //this.fetchAxios()
        console.log(this.state.question, "fetched data")
    }
    componentWillUnmount() {

    }

    // fetchAxios() {
    //     axios({
    //         method: 'get',
    //         url: 'http://ec2-13-232-42-3.ap-south-1.compute.amazonaws.com:9093/employeeportal/gettokenuser',
    //         headers: { token: `${this.props.match.params.name}`, 'Content-Type': 'application/json' }
    //     }).then(function (response) {
    //         // handle success
    //         console.log('axios1', response);
    //         console.log(response);
    //         let data = JSON.parse(response.data)
    //         console.log('data',data.payload)
    //       }).catch(function (error) {
    //         // handle error
    //         console.log('axios', error);
    //     })
    //         .then(function (response) {
    //             console.log('axios2', response);
    //             // always executed
    //         });

    // }

    fetchData() {
        const requestOptions = {
            method: 'GET',
            headers: { token: `${this.props.match.params.name}`, 'Content-Type': 'application/json' }
        }
        fetch("http://ec2-13-232-42-3.ap-south-1.compute.amazonaws.com:9093/employeeportal/gettokenuser", requestOptions).then(res => 
        { console.log(res); return res.json() }).then((result) => {
            if(result.statusCode==200){

            
            console.log('result123', result)

            this.fetchQuestion()
            this.setState({
                isLoaded: true,
                userProfile: result.payload
            });
        }else{
            this.setState({question:'error'})
        }
        },
            // (error) => {
            //     this.setState({
            //         isLoaded: true,
            //         error
            //     });

            // }
        ).catch((e) => console.log('e', e))
    }

    fetchQuestion() {
        console.log('question',`${this.props.match.params.name}`)
        const requestOptions = {
            method: 'GET',
            headers: { 'token': `${this.props.match.params.name}`, 'Content-Type': 'application/json' }
        }
        fetch("http://ec2-13-232-42-3.ap-south-1.compute.amazonaws.com:9093/employeeportal/nextquestion", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('result', result)
                    if(result.statusCode === 500){
                        this.fetchQuestion()
                    }else if( result.payload== "all questions answered successfully"  ){
                        console.log('here')
                        this.setState({results:true,question:result,myQuestionView:false,begin:false})
                    }
                    else{
                        result.payload.Option[0].d = 'None'
                    this.setState({
                        isLoaded: true,
                        question: result.payload
                    });
                  
                    // console.log(this.state.question, "quest")
                }
                },

            ).catch((err) =>

                // this.setState({ question: '',alreadySubmitted:true, })
                console.log(err, 'error here ')
                // if(err.status !=='200'){
                //     this.setstate({sessionExpired :true})
                // }
            )

    }

    handleSUbmit = () => {
        if (this.state.answer) {
            // let count = this.state.question.id + 1
            // console.log("submitted", this.state.answer, count, `question${count}`)
            // this.setState({
            //     errormsg: false, question: question1[count], answer: ""
            // })

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": this.state.question.id,
                    "question": this.state.question.question,
                    "questiontype": this.state.question.questiontype,
                    "user": this.state.question.user,
                    "validOption": this.state.question.validOption,
                    "userSelOption": "c",
                    "Option": this.state.question.Option
                })
            };
            console.log('request', requestOptions)
            fetch('http://ec2-13-127-183-236.ap-south-1.compute.amazonaws.com:9093/employeeportal/userAnsweredQuestionResponse', requestOptions)
                .then(response => {
                    console.log('value', response)
                    if (response.ok) {
                        this.setState({ answer: "" })
                        this.fetchQuestion()
                    }
                });
        }


        else {
            this.setState({
                errormsg: true
            })

        }
    }

    handleOnchange = (value) => {
        this.setState({
            answer: value.target.name
        })
        console.log(value.target.name, "value")
    }

    handleDivInput1(divName) {
        console.log("my data div", divName.target.id)

        if (divName.target.id ) {
            this.setState({ activeDiv: divName.target.id,option:false })
            this.setState({ answer: this.state.activeDiv })
        }else{
            this.setState({ option: true,answer:'None' })
 
        }

    }
    startTest() {
        console.log(this.state.alreadySubmitted,'already submitted')

        if(   this.state.begin ){
            this.setState({results:false,myQuestionView:true,begin:false})
            
        }else if(   this.state.myQuestionView){
            this.setState({begin:false})


        }
        else if(this.state.results ){

            this.setState({myQuestionView:false,begin:false,})

        }       
        // else{
        // this.setState({ begin: false, myQuestionView: true,alreadySubmitted:false })
        // }

    }

    handleNext() {
        console.log('this.state',this.state.question)
this.setState({activeDiv:'',option:false})
        // if (this.state.answer == null || this.state.answer == '') {
        //     this.setState({ openAlert: true, })
        // }
        // else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',token: `${this.props.match.params.name}` },
                body: JSON.stringify({
                    "id": this.state.question.id,
                    "question": this.state.question.question,
                    "questiontype": this.state.question.questiontype,
                    "user": this.state.question.user,
                    "validOption": this.state.question.validOption,
                    "userSelOption": "c",
                    "Option": this.state.question.Option
                })
            };
            console.log('request', requestOptions)
            fetch('http://ec2-13-232-42-3.ap-south-1.compute.amazonaws.com:9093/employeeportal/userAnsweredQuestionResponse', requestOptions)
                .then(response => {
                    console.log('value', response)
                    if (response.ok) {
                        // this.setState({ answer: "" })
                        this.fetchQuestion()
                    }
                });
           // this.setState({ results: true, myQuestionView: false })

       // }


    }


    


}