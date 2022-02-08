import { Container, Paper, Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent, Input, TextField, IconButton } from "@material-ui/core";
import { DataGrid, } from "@material-ui/data-grid";
import Snackbar from '@mui/material/Snackbar'
import Add from "@material-ui/icons/Add"
import ShareIcon from '@mui/icons-material/Share';
import ClearIcon from '@mui/icons-material/Clear';
import CategoryIcon from '@mui/icons-material/Category';
import { Component } from "react";
// import moment from "react-moment";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../../../Api/index.js'
// import DatePicker from "react-date-picker";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Backdrop from "@mui/material/Backdrop"
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Route from "react-router-dom"
import absyz from '../../../Utils/images/absyz.png';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@material-ui/icons/Close'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CloseButton from 'react-bootstrap/CloseButton'
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CircularProgress from "@mui/material/CircularProgress"
const rows = [
  { id: 1, employeeName: 'surya', designation: 'Senior Software Engineer', age: 27, isactive: true },
  { id: 2, employeeName: 'kesav', designation: 'Senior Software Engineer', age: 28, isactive: true },
  { id: 3, employeeName: 'sathya', designation: 'Software Engineer', age: 23, isactive: false },
  { id: 4, employeeName: 'vamsi', designation: 'Software Engineer', age: 23, isactive: false },
  { id: 5, employeeName: 'Jeena', designation: 'Software Engineer', age: 24, isactive: false },
  { id: 6, employeeName: 'Lokesh', designation: 'Software Engineer', age: 22, isactive: false },
  { id: 7, employeeName: 'Ayush', designation: 'Senior Software Engineer', age: 28, isactive: false },
  { id: 8, employeeName: 'Nageshwar', designation: 'Senior Software Engineer', age: 27, isactive: false },
  { id: 9, employeeName: 'Ronn', designation: 'Senior Software Engineer', age: 26, isactive: false },
]
var phone = "+91"
const api = API.Api;
export default class AllUsers extends Component {
  constructor() {
    super()
    this.state = {
      data: rows,
      currentRow: "",
      showDialog: false,
      snackbar: false,
      myCandidateName: '',
      showaddRow: false,
      myEmpId: "",
      employeeUserName: "",
      maxQuestions: '10',
      employeeLastName: "",
      maxQuestion: "",
      addUserCategory: '',
      myCandidateTemplate: false,
      phoneNumber: "",
      empDOJ: "",
      newPopupRows: [],
      editRowsModel: {},
      role: "",
      emailID: "",
      toBeDeletedIndex: "",
      allCategories: [],
      age: "",
      showSelection: false,
      showErrorMessage: false,
      categoryData: {},
      selectOrDelete: true,
      category: '',
      backdrop: false,
      popUpUsername: '',
      rowsSelectedData: [],
      notYetAnswered: false,
      popUpRows: [
        {
          id: '1',
          testname: "Test1_Technical",
          score: 5,
          total: 5,
          submittedDate: "2021-11-07T14:47:07.035758",
          updatedDate: "2021-11-07T14:31:15.631235"
        },
        {
          id: '2',
          testname: "Test2_Technical",
          score: 3,
          total: 5,
          submittedDate: "2021-11-07T14:48:47.284782",
          updatedDate: "2021-11-07T14:47:50.605148"
        }
      ],
      popUpColumns: [
        { field: 'testname', headerName: 'Test Name', width: 150 },
        { field: 'score', headerName: 'Score', width: 115 },
        { field: 'total', headerName: 'Total', width: 120 },
        { field: 'submittedDate', headerName: 'Completed on', width: 165 },
        { field: 'updatedDate', headerName: 'Sent On', width: 130 },
        // {
        //   field: 'linkSharedBy', headerName: 'Sent by', width: 130, renderCell: () => {
        //     return 'ADMIN'
        //   }
        // },
      ],
      columns: [
        { field: 'id', headerName: 'ID', width: 95 },
        {
          field: 'username',
          headerName: 'Employee name',
          width: 180,
          editable: true,

          renderCell: (params) => {
            if (params == undefined) {
              this.setState({ notYetAnswered: true })
            }
            // console.log(params, "params onclick")
            return <Button onClick={() => this.showTemplate(params.row)} > {params.row.username}   </Button>

          }
        },
        {
          field: 'desc',
          headerName: 'Designation',
          width: 160,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          // type: 'number',
          width: 220,
          editable: true,
        },
        {
          field: 'maxQuest',
          headerName: 'Max Questions',
          // type: 'number',
          width: 150,
          editable: true,
        },

        {
          field: 'category',
          headerName: 'Category',
          width: 150,
          editable: false,
          renderCell: (params) => {
            // console.log(params, "params")
            return <FormControl variant="standard" sx={{ minWidth: 120, marginLeft: 0.75 }}>
              <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={this.state.categoryData[params.row.id]}
                onChange={(item) => this.handleSelect(item, params)}
                label="Category"
              >
                {this.state.allCategories.map((ele) => <MenuItem value={ele}>{ele}</MenuItem>)}
              </Select>
            </FormControl>
          }
        },
        {
          field: 'doj',
          headerName: 'Date of Joining',
          // type: 'number',
          width: 160,
          editable: true,
        },
        {
          field: 'status',
          headerName: 'Active',
          width: 120,
          editable: false

        },
        {
          field: 'phone',
          headerName: 'Phone',
          width: 135,
          editable: 'true'
        },
        {
          field: 'LinkShare',
          headerName: 'Notify',
          width: 140,
          disableClickEventBubbling: true,
          renderCell: (params) => {

            return <Button color="primary" onClick={() => this.linkToShare(params)}
              size="small">
              <p>LinkShare</p>
            </Button>;
          }
        },
        // {
        //   field: 'Edit',
        //   headerName: 'Update',
        //   width: 140,
        //   disableClickEventBubbling: true,
        //   renderCell: (params) => {

        //     return <Button  color="primary"
        //       size="small">
        //       <p>Edit</p>
        //     </Button>;
        //   }
        // },
        // {
        //   field: 'action',
        //   headerName: 'Action',
        //   width: 120,
        //   disableClickEventBubbling: true,
        //   renderCell: (params) => {
        //     const myId = params.row

        //     const onClick = (row) => {
        //       console.log(row.target, "rowww")
        //       const rows = [...this.state.data];
        //       const index = this.state.data.findIndex((item) => item.id === this.state.currentRow.id)
        //       console.log(index, "my index")
        //       rows.splice(index, 1)
        //       this.setState({ data: rows });
        //     };
        //     return <Button id={this.state.currentRow.id} onClick={onClick} value={myId} color="black"
        //       size="small"
        //       aria-label="delete" >
        //       <DeleteIcon fontSize="small" />
        //     </Button>;
        //   }
        // },

      ]

    }
    this.showTemplate = this.showTemplate.bind(this)
  }


  candidatesResults(name, username) {
    const requestOptions = {
      method: "GET",
      headers: {
        'username': name,
        token: 'qwerty', 'Content-Type': 'application/json'
      },
    }
    fetch(`${api}/employeeportal/getresults`, requestOptions).then((res) => res.json())
      .then((res) => {
        // res.payload.map(ele => { return ele['id'] = ele.testname })
        // if (res.payload == undefined) {
        //   console.log("true")
        //   alert(" not yet answered")
        //   this.setState({ notYetAnswered: true, myCandidateTemplate: false })
        // }
        this.setState({ newPopupRows: res.payload });

        console.log('candidate results', this.state.newPopupRows)
      })
      .catch((err) => console.log("err", err))

  }

  AllCategories() {
    const requestOptions = {
      method: 'GET',
      headers: { token: 'qwerty', 'Content-Type': 'application/json' },
    };
    console.log(requestOptions, " get all categories")
    fetch(`${api}/employeeportal/getcategories`, requestOptions)
      .then(response => response.json())
      .then(data => { this.setState({ allCategories: data.payload }); console.log("categories ", data) });
  }

  handleSelect = (event, params) => {
    console.log(event.target.value, "category")
    console.log(params.row, "my cat")
    params.row.category = event.target.value
    let value = params.row
    value['category'] = event.target.value
    const updatedCell = this.state.rowsSelectedData.map(item => item.id === params.row.id ? value : item);
    console.log(updatedCell, "updated cell")
    this.setState({ rowsSelectedData: updatedCell, categoryData: { ...this.state.categoryData, [params.row.id]: event.target.value } })

  };

  handleAddSelect(event) {
    this.setState({ addUserCategory: event.target.value });
  }

  handleChange = (e) => {
    this.setState({
      currentRow: { ...this.state.currentRow, [e.target.name]: e.target.value }
    })
    console.log(this.state.currentRow, "current row")

  }

  componentDidMount() {
    console.log(API,'my url')
    this.fetchAllUsers();
    this.fetchAxios();
    this.AllCategories();
  }

  updateRow = () => {
    const updatedCell = this.state.data.map(item => item.id === this.state.currentRow.id ? this.state.currentRow : item);
    this.setState({
      data: updatedCell,
      showDialog: false
    })
  }

  addRow = (data, userName) => {
    const emailRegex =
      /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        .test(this.state.emailID)
    if (this.state.employeeUserName == "" || this.state.employeeUserName == null || this.state.employeeUserName.length < 3) {
      this.setState({ showErrorMessage: true})

    } else if (this.state.employeeLastName == "" || this.state.employeeLastName == null) {
      this.setState({ showErrorMessage: true })
    }
    else if (this.state.role == "" || this.state.role == null) {
      this.setState({ showErrorMessage: true })
    }
    else if (this.state.emailID == "" || this.state.emailID == null) {
      this.setState({ showErrorMessage: true })
    }
    else if (this.state.phoneNumber == "" || this.state.phoneNumber == null) {
      this.setState({ showErrorMessage: true })
    }
    else if (this.state.empDOJ == "" || this.state.empDOJ == null) {
      this.setState({ showErrorMessage: true })
    }
    else if (emailRegex == false) {
      alert("Please provide valid Email of User ")
    }
    else {
      const requestOptions = {
        method: 'POST',
        headers: { token: 'qwerty', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "username": this.state.employeeUserName,
          "firstname": this.state.employeeUserName,
          "lastname": this.state.employeeLastName,
          //"maxQuestion": this.state.maxQuestion,
          "designation": this.state.role,
          "email": this.state.emailID,
          "phone": this.state.phoneNumber,
          // "category": this.state.addUserCategory,
          "doj": this.state.empDOJ,
          "maxQuestion": this.state.maxQuestions,
          "status": "true"
        })
      };
      console.log(requestOptions, "this console")
      fetch( `${api}/employeeportal/notifyuser`, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.fetchAllUsers();
          console.log(data.message,data.statusCode, "my  payload data")
          // if(data.message)
        }
        );
      this.clearALl();
      this.setState({ backdrop: true, showaddRow: false })
    }
  }

  clearALl() {
    this.setState({
      employeeUserName: "",
      employeeLastName: "",
      maxQuestion: "",
      role: "",
      emailID: "",
      phoneNumber: "",
      empDOJ: "",
    })
  }

  sendLinkToShare = (data) => {
    console.log(data, 'hi')
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: 'qwerty' },
      body: JSON.stringify({
        "username": data.row.username,
        "firstname": data.row.username,
        "lastname": "",
        "designation": data.row.desc,
        "email": data.row.email,
        "maxQuestion": data.row.maxQuest,
        "status": true,
        "phone": data.row.phone,
        "category": this.state.categoryData[data.row.id],
        "doj": data.row.doj
      })
    };
    console.log(requestOptions, "this data") 

    fetch( `${api}/employeeportal/notifyuser`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "this response");

        if (res.statusCode == 200) {
          alert("Successfully shared the link")
        }
        else if (res.statusCode == 403) {
          alert(res.payload)
        }
      })
      .catch(error => {
        console.log(error)

      })
  }

  linkToShare = (data) => {
    this.sendLinkToShare(data)
  }
  handleId = (data) => {
    this.setState({ myEmpId: data.target.value })
  }
  handleEmpName = (data) => {
    this.setState({ employeeUserName: data.target.value })
  }
  handleEmpLastName = (data) => {
    this.setState({ employeeLastName: data.target.value })
  }
  handleMaxQuestion = (data) => {
    this.setState({ maxQuestions: data.target.value })
  }
  handleRole = (data) => {
    this.setState({ role: data.target.value })
  }
  handleEmail = (data) => {
    this.setState({ emailID: data.target.value })
  }
  handlePhone = (data) => {
    this.setState({ phoneNumber: data.target.value })
  }
  handleAge = (data) => {
    this.setState({ age: data.target.value })
  }
  handleDOB = (data) => {
    console.log(data, "dob data")
    this.setState({ empDOJ: data })
  }
  myrowDelete = () => {
    const rows = [...this.state.data];
    const index = this.state.toBeDeletedIndex - 1
    console.log(rows)
    this.state.toBeDeletedIndex.forEach(index => {
      rows.forEach(item => {
        if (item.id == index) {
          console.log('row', item, index)
          rows.splice(index - 1, 1)
        }
      })
    })
    console.log("indexxxxx", rows)
    // rows.splice(index)
    this.setState({ data: rows });
    this.setState({
      showSelection: !this.state.showSelection,
      selectOrDelete: !this.state.selectOrDelete
    })
  }
  checkBoxData = (data) => {
    console.log(data, "my row check data")
    this.setState({ toBeDeletedIndex: data })
  }

  uploadQuestions = () => {
    console.log('hit')
    console.log(this.state.toBeDeletedIndex, this.state.data)
  }

  handleBackdrop() {
    this.setState({ backdrop: false, showaddRow: false, snackbar: true })
  }
  handleSnackClose() {
    this.setState({ snackbar: false })
  }

  fetchAxios() {
    axios({
      method: 'get',
      url: `${api}/employeeportal/allusers`,
      headers: { token: `qwerty`, 'Content-Type': 'application/json' }
    }).then(function (response) {
      console.log('axios1', response);
      console.log(response);
      let data = JSON.parse(response.data)
      console.log('data', data.payload)
    }).catch(function (error) {
      console.log('axios', error);
    })
      .then(function (response) {
        console.log('axios2', response);
      });
  }

  fetchAllUsers() {
    const requestOptions = {
      method: 'GET',
      headers: { token: "qwerty", 'Content-Type': 'application/json' }
    };

    fetch( `${api}/employeeportal/allusers`, requestOptions).then(res => res.json()).then(res => {
      console.log(res.payload, 'this is main response Payload ')
      res.payload.map(ele => { return ele['id'] = ele.userpk, ele['maxQuest'] = this.state.maxQuestions, ele['category'] = '' })
      this.setState({ rowsSelectedData: res.payload, })
      this.addRow(res)
    }).catch((error) => { console.log(error); this.setState({ error }) })
  }

  handleEditRowsModelChange = (event) => {
    console.log(event, "main data")
    this.setState({ editRowsModel: event })
    
  }

  showTemplate(name) {
    this.setState({ popUpUsername: name.username })
    console.log(this.state.popUpUsername, "my pop daata")
    this.candidatesResults(name.username);
    this.setState({ myCandidateTemplate: true, myCandidateName: name })
  }
  showingAddRow(){
    this.setState({ showaddRow: !this.state.showaddRow,showErrorMessage:false })

  }
  render() {
    return (
      <div>
        <Container>
          {this.state.currentRow && (
            <Dialog open={this.state.showDialog}>
              <DialogTitle>
                Employee's Record
              </DialogTitle>
              <DialogContent>
                <TextField onChange={this.handleChange} label="Employee Name" value={this.state.currentRow.employeeName} place Holder="Enter Name" name="employeeName" fullWidth />
                <TextField onChange={this.handleChange} label="Employee Designation" value={this.state.currentRow.designation} place Holder="Enter Designation" name="designation" fullWidth />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={this.updateRow} color="primary">Update</Button>
                <Button variant="outlined" onClick={() => this.setState({ showDialog: false })} color="primary">Cancel</Button>
              </DialogActions>
            </Dialog>
          )}
          <div style={{ display: 'flex', flexDirection: 'row', width: '23%', marginBottom: '3%', backgroundColor: 'inherit', marginTop: '3%', justifyContent: 'space-between' }}>
            {/* <IconButton variant="contained" style={{  height: "3%", backgroundColor: "white",  }} onClick={() => this.setState({ showDialog: true })} disabled={!this.state.currentRow} >
            < EditIcon  color='white'/>
             </IconButton> */}
            {/* {this.state.selectOrDelete ? <IconButton variant="contained" style={{backgroundColor:'white' }} onClick={() => this.setState({ showSelection: !this.state.showSelection, selectOrDelete: !this.state.selectOrDelete })} color="primary">
           <PlaylistAddCheckIcon/></IconButton> : <IconButton variant="contained" style={{ backgroundColor:'white'}} onClick={() => this.setState({showSelection: !this.state.showSelection, selectOrDelete: !this.state.selectOrDelete})} >         <ClearIcon/>  </IconButton>}
            {this.state.selectOrDelete ? null: <IconButton variant="contained" style={{ backgroundColor:'white' }} onClick={() => this.uploadQuestions()}>   <ShareIcon  color="white"/>  </IconButton>}*/}
            <IconButton style={{ fontSize: 20, backgroundColor: "white", display: "flex", alignSelf: "flex-end" }} onClick={() => this.showingAddRow()              } color="white">  <Add color='white' />  </IconButton>
          </div>
          <Paper component={Box} width={1} height={600} style={{ marginTop: '3%' }}>
            <DataGrid
              checkboxSelection={this.state.showSelection}
              onSelectionModelChange={this.checkBoxData}
              onCellDoubleClick={() => this.showTemplate}
              onRowClick={(item) => this.setState({ currentRow: item.row })}
              onRowSelected={(item) => console.log(item)}
              rows={this.state.rowsSelectedData}
              columns={this.state.columns}
              // apiRef={useGridApiRef()}
              pageSize={15}
              editRowsModel={this.state.editRowsModel}
              onEditRowsModelChange={this.handleEditRowsModelChange}
            />

          </Paper>
          {this.state.myCandidateTemplate ?
            <Dialog open={this.state.myCandidateTemplate} maxWidth='md' fullWidth   >
              <DialogActions>
                <IconButton variant="outlined" onClick={() => this.setState({ myCandidateTemplate: false })} color="primary">  < HighlightOffIcon sx={{width:35,height:35,color:'#1D7B84' }}/> </IconButton>
              </DialogActions>
              <DialogContent style={{ paddingBottom: '5%' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ flexDirection: 'row', display: 'flex' }}> Candidate Name :- <p style={{ textDecorationLine: 'underline',textTransform:'capitalize' }} > {this.state.popUpUsername} </p> </p>
                  <p style={{ marginLeft: '2%' }}> Point of Contact : Admin  </p>
                </div>
                <Paper component={Box} width={1} height={400} >
                  <DataGrid
                    columns={this.state.popUpColumns}
                    getRowId={(r) => r.testname}
                    rows={this.state.newPopupRows}
                  />
                </Paper>
              </DialogContent>
            </Dialog>
            : null
          }
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={this.state.backdrop}
            transitionDuration={0}
            onClick={this.handleBackdrop.bind(this)}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Dialog open={this.state.showaddRow} maxWidth='sm' fullWidth >

            {this.state.showErrorMessage ? <Alert variant='standard' action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  this.setState({ showErrorMessage: false })
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            } style={{ zIndex: 1000 }} severity='error'>Please Provide all details</Alert> : null}
            <DialogTitle>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center", alignItems: "center", alignContent: "center" }}>
                {/* <a href="https://absyz.com">   <img src={absyz} alt="Logo" style={{ width: 90, height: 50 }} />  </a> */}
                <h4 style={{ paddingTop: "1%" }}>  New  Employee's Record</h4>
              </div>
            </DialogTitle>
            <DialogContent>
              <div style={{ display: 'flex', flexDirection: "row" }} >
                <AccountCircleRoundedIcon sx={{ marginTop: 2.5 }} color='inherit' />
                <TextField required onChange={this.handleEmpName} style={{ left: 5 }} value={this.state.employeeUserName} fullWidth label=" Username" place Holder="Enter  Username" name="username" />
              </div>
              <div style={{ display: 'flex', flexDirection: "row" }} >
                <AccountCircleRoundedIcon sx={{ marginTop: 2.5 }} />
                <TextField required label=" Lastname" style={{ left: 5 }} value={this.state.employeeName} fullWidth onChange={this.handleEmpLastName} place Holder="Enter  LastName" name="employeeLastName" />
              </div>
              <div style={{ display: 'flex', flexDirection: "row" }} >
                <AlternateEmailIcon sx={{ marginTop: 2.5 }} />
                <TextField required label=" Mail" style={{ left: 5 }} onChange={this.handleEmail} value={this.state.emailID} fullWidth place Holder="Enter Mail" name="mail" />
              </div>
              <div style={{ display: 'flex', flexDirection: "row" }} >
                <DescriptionIcon sx={{ marginTop: 2.5 }} />
                <TextField required type='number' label="MaxQuestions" style={{ left: 5 }} value={this.state.maxQuestions} fullWidth onChange={this.handleMaxQuestion} place Holder=" Maximum no of Questions" name="maxQuest" />
              </div>
              <div style={{ display: 'flex', flexDirection: "row" }} >
                <FilterNoneIcon sx={{ marginTop: 2.5 }} />
                <TextField required label=" Designation" style={{ left: 5 }} onChange={this.handleRole} value={this.state.role} fullWidth place Holder="Enter Designation" name="role" />
              </div>
              <div style={{ display: 'flex', flexDirection: "row" }} >
                <PhoneIcon sx={{ marginTop: 2.5 }} />
                <TextField required label=" Phone" onChange={this.handlePhone} fullWidth style={{ left: 5 }} inputProps={{ maxLength: 10 }} InputProps={{ startAdornment: <InputAdornment position='start' >+91</InputAdornment> }} value={this.state.phoneNumber} place Holder="Enter Phone" name="phone" />
              </div>
              <div style={{ display: "flex", flexDirection: "row", paddingTop: "1.5%" }}>
                <CalendarTodayIcon sx={{ marginTop: '3.5%', }} />
                <div style={{ display: "flex", flexDirection: "row", marginLeft: '2%' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      label="Date of Joining"
                      sx={{ color: 'white' }}
                      onChange={this.handleDOB}
                      value={this.state.empDOJ}
                      // inputFormat={(date) => moment(new Date()).format('MM-DD-YYYY')}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={this.addRow} color="primary">Add</Button>
              <Button variant="outlined" onClick={() => this.setState({ showaddRow: false })} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={this.state.snackbar}
            autoHideDuration={6000}
            onClose={this.handleSnackClose.bind(this)}
            message="Successfully added"
          />
        </Container>
      </div>
    )
  }
}
