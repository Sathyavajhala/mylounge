import { Container, Paper, Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, IconButton } from "@material-ui/core";
import { DataGrid, } from "@material-ui/data-grid";
import Add from "@material-ui/icons/Add"
//import { XGrid } from "@material-ui/x-grid"
import { useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Logo from "./myLogo.png"
import { BsThreeDotsVertical } from "react-icons/bs"
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { SettingsInputAntenna } from "@material-ui/icons";
import { Component } from "react";
const rows = [
    { id: 1, employeeName: 'Surya', designation: 'Senior Software Engineer', age: 27, isactive: true },
    { id: 2, employeeName: 'Sathya', designation: 'Software Engineer', age: 22, isactive: true },
    { id: 3, employeeName: 'Shravan', designation: 'Software Engineer', age: 23, isactive: false },
    { id: 4, employeeName: 'Vamsi', designation: 'Software Engineer', age: 23, isactive: true },
    { id: 5, employeeName: 'Jeena', designation: 'Software Engineer', age: 24, isactive: true },
    { id: 6, employeeName: 'Lokesh', designation: 'Software Engineer', age: 22, isactive: false },
    { id: 7, employeeName: 'Ayush', designation: 'Senior Software Engineer', age: 28, isactive: false },
    { id: 8, employeeName: 'Nageshwar', designation: 'Senior Software Engineer', age: 27, isactive: false },
    { id: 9, employeeName: 'Ronn', designation: 'Senior Software Engineer', age: 26, isactive: false },
]
export default class  AddUser extends Component {
    constructor(){
        super()
        this.state={
            data:rows,
            currentRow:"",
            showDialog:false,
            showaddRow:false,
            myEmpId:"",
            employeeName:"",
            designation:"",
            toBeDeletedIndex:"",
            age:"",
            showSelection:false,
            selectOrDelete:true,
            columns : [
                { field: 'id', headerName: 'EMP ID', width: 150 },
                {
                    field: 'employeeName',
                    headerName: 'employee name',
                    width: 250,
                    editable: true,
                },
                {
                    field: 'designation',
                    headerName: 'Designation',
                    width: 200,
                    editable: true,
                },
                {
                    field: 'age',
                    headerName: 'Age',
                    type: 'number',
                    width: 110,
                    editable: true,
                },
                {
                    field: 'isactive',
                    headerName: 'Active',
                    width: 120,
                    editable: false
            
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    width: 120,
                    disableClickEventBubbling: true,
                    renderCell: (params) => {
                        const myId = params.row

                      const onClick = (row) => {
                          console.log(row.target,"rowww")
                                        const rows = [...this.state.data];
                                       const index = this.state.data.findIndex((item) => item.id === this.state.currentRow.id )
                                       console.log(index,"my index")
                                       rows.splice(index,1)
                                        this.setState({ data: rows });
                                    };
                        return <Button id={this.state.currentRow.id} onClick={onClick} value={myId}   color="black"
                        size="small"
                        aria-label="delete" >
                            <DeleteIcon  fontSize="small" />
                        </Button>;
                    }
                },
            ]
        }
    }
     handleChange = (e )=> {
         this.setState({
             currentRow:{ ...this.state.currentRow, [e.target.name]: e.target.value }
         })
         console.log(this.state.currentRow,"current row")

    }
     updateRow = () => {
        const updatedCell = this.state.data.map(item => item.id === this.state.currentRow.id ? this.state.currentRow : item);
        this.setState({
            data:updatedCell,
            showDialog:false
        })

    }
     addRow=(data)=>{
        console.log(data,"my pushed data")
        var mynewRow=[this.state.myEmpId,this.state.employeeName,this.state.designation,this.state.age]
        console.log(mynewRow,"mynew row")
        this.setState({
            showaddRow:false
        })
    }
     handleId=(data)=>{ this.setState({ myEmpId:data.target.value})
    }
     handleEmpName =(data)=>{
         this.setState({employeeName:data.target.value})
    }
     handleDesignation = (data)=>{
         this.setState({designation:data.target.value})
    }
     handleAge=(data)=>{
         this.setState({age:data.target.value})
    }
    myrowDelete=()=>{
        const rows = [...this.state.data];
        const index = this.state.toBeDeletedIndex-1
        console.log("indexxxxx")
        rows.splice(index)
         this.setState({ data: rows });
        this.setState ({ showSelection:! this.state.showSelection,
            selectOrDelete:!this.state.selectOrDelete 
        })
    }
    checkBoxData=(data)=>{
        console.log(data,"my row check data")
        this.setState({toBeDeletedIndex:data})
    }
    render(){
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
                        <Button variant="outlined"  onClick={() => this.setState({showDialog:false})} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            )}
            <Button variant="contained" style={{margin:"3%",height:"3%"}} onClick={() => this.setState({showDialog:true})} disabled={! this.state.currentRow} color="primary">Edit </Button>
        {this.state.selectOrDelete ?     <Button variant="contained"  style={{margin:'3%'}} onClick={() => this.setState ({ showSelection:! this.state.showSelection,selectOrDelete:!this.state.selectOrDelete })}  color="primary">Select  </Button>  :<Button variant="contained"  style={{margin:'3%'}}   onClick={() => this.myrowDelete()} color="primary">Delete  </Button>  }
             <IconButton  style={{margin:"3%",fontSize:20,borderWidth:1}}  onClick={() => this.setState({showaddRow:!this.state.showaddRow})} color="primary"> Add <Add/>  </IconButton>
             <Paper component={Box} width={1} height={600} style={{marginTop:"5%"}}  >
                <DataGrid  
                checkboxSelection={this.state.showSelection} 
                onSelectionModelChange={this.checkBoxData} 
                onRowClick={(item) =>  this.setState({currentRow:item.row}) } 
                onRowSelected={(item) => console.log(item)} 
                rows={this.state.data} 
                columns={this.state.columns} 
                pageSize={10} />
            </Paper>
                  <Dialog open={this.state.showaddRow}>
                  <DialogTitle>
                      Employee's Record
                  </DialogTitle>
                  <DialogContent>
                      <TextField onChange={this.handleId} value={this.state.myEmpId} label="Employee Id"  place Holder="Enter Employee Id" name="id" fullWidth />
                      <TextField label="Employee Name" value={this.state.employeeName} onChange={this.handleEmpName} place Holder="Enter Name" name="employeeName" fullWidth />
                      <TextField label="Employee Designation" value={this.state.designation} onChange={this.handleDesignation} place Holder="Enter Designation" name="designation" fullWidth />
                      <TextField  label="Employee Age" onChange={this.handleAge} value={this.state.age}  place Holder="Enter Age" name="age" fullWidth />

                  </DialogContent>
                  <DialogActions>
                      <Button  onClick={this.addRow} style={{backgroundColor:'#1D7B84'}}>Add</Button>
                      <Button  onClick={() => this.setState({showaddRow: false})} color="primary">Cancel</Button>
                  </DialogActions>
              </Dialog>
        </Container>

</div>
    )
            }
}
































































































































































// import React, { Component, useState } from "react";
// import ReactDataGrid from "react-data-grid"

// import { DataGrid } from "@material-ui/data-grid";

// import Container from "react-bootstrap/Container"


// var myRowsSelected


// export default class Employee extends Component {
//     constructor() {
//         super()
//         this.state = {
//             checkSelect: false,
//             rows: [
//                 { id: 1, employeeName: 'Surya', designation: 'Senior Software Engineer', age: 27, isactive: true },
//                 { id: 2, employeeName: 'Sathya', designation: 'Software Engineer', age: 22, isactive: true },
//                 { id: 3, employeeName: 'Shravan', designation: 'Software Engineer', age: 23, isactive: false },
//                 { id: 4, employeeName: 'Vamsi', designation: 'Software Engineer', age: 23, isactive: true },
//                 { id: 5, employeeName: 'Jeena', designation: 'Software Engineer', age: 24, isactive: true },
//                 { id: 6, employeeName: 'Lokesh', designation: 'Software Engineer', age: 22, isactive: false },
//                 { id: 7, employeeName: 'Ayush', designation: 'Senior Software Engineer', age: 28, isactive: false },
//                 { id: 8, employeeName: 'Nageshwar', designation: 'Senior Software Engineer', age: 27, isactive: false },
//                 { id: 9, employeeName: 'Ronn', designation: 'Senior Software Engineer', age: 26, isactive: false },
//             ],
//             columns: [
//                 { field: 'id', headerName: 'EMP ID', width: 150 },
//                 {
//                     field: 'employeeName',
//                     headerName: 'employee name',
//                     width: 250,
//                     editable: true,
//                 },
//                 {
//                     field: 'designation',
//                     headerName: 'Designation',
//                     width: 200,
//                     editable: false,
//                 },
//                 {
//                     field: 'age',
//                     headerName: 'Age',
//                     type: 'number',
//                     width: 110,
//                     editable: false,
//                 },
//                 {
//                     field: 'isactive',
//                     headerName: 'Active',
//                     width: 120,
//                     editable: false

//                 },
//                 {
//                     field: 'action',
//                     headerName: 'Action',
//                     width: 120,
//                     disableClickEventBubbling: true,
//                     renderCell: (params) => {
//                         const myId = params.row.id
//                         const onClick = (row) => {
//                             const myRowId = row
//                             const rows = [...this.state.rows];
//                             rows.splice(params.row.id, 1);
//                             this.setState({ rows: rows });
//                         };
//                         return <button onClick={onClick} value={myId} className="fa fa-remove" ></button>;
//                     }
//                 },
//             ]
//         }

//     }

//     cellSelected = (celldata) => {
//         // Mydata= celldata.row
//         // console.log(Mydata.designation, "cell data")
//     }

//     setSelect = () => {
//         this.setState({
//             checkSelect: !this.state.checkSelect
//         })
//     }
//     getCellActions = (column, row) => {
//         console.log(column, row, "your data")
//         const cellActions = [
//             {
//                 icon: <button>renove</button>,
//                 callback: () => {
//                     const rows = [...this.state.rows];
//                     rows.splice(row.index, 1); //
//                     this.setState({ rows: rows });
//                 }
//             }
//         ];
//         return column.key === "action" ? cellActions : null
//     };

//     onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//         this.setState(state => {
//             const rows = state.rows.slice();
//             for (let i = fromRow; i <= toRow; i++) {
//                 rows[i] = { ...rows[i], ...updated };
//             }
//             return { rows };
//         });
//     };

//     handleMultipleCheck = (data) => {
//         console.log(data, "my rows selected")
//         myRowsSelected=data
//     }

//     handlePurge = (data) => {


//     }

//     render() {
//         return (
//             <div>
//                 <Navbar style={{ backgroundColor: 'white', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 100, boxShadow: "3px 9px 3px #a2a8a3" }} className="z-depth-5">
//                     <img src={Logo} alt="Logo" style={{ width: 140, height: 80, marginLeft: "3%" }} />
//                     <Container>
//                         <Navbar.Toggle />
//                         <Navbar.Collapse className="justify-content-end">
//                             <Navbar.Text >
//                                 <p style={{ display: "flex", flexDirection: "row", marginTop: "20%" }} >      Signed in as:<p style={{ textDecorationLine: 'underline' }}> Sathya Vajhala </p></p>
//                             </Navbar.Text>
//                         </Navbar.Collapse>
//                     </Container>
//                     <button className="btn" onClick={() =>
//                         this.setState({
//                             moreButton: !this.state.moreButton
//                         })
//                     } >
//                         <BsThreeDotsVertical size="18" style={{ marginRight: "3%", marginTop: "15%" }} />
//                     </button>
//                 </Navbar>
//                 <div style={{ height: 500, width: '100%' }}>
//                     <DataGrid
//                         columns={this.state.columns}
//                         rows={this.state.rows}
//                         onRowClick={this.cellSelected}
//                         rowGetter={i => this.state.rows[i]}
//                         onRowSelected={this.handleRowSelection}
//                         rowsCount={this.state.rows.length}
//                         onGridRowsUpdated={this.onGridRowsUpdated}
//                         checkboxSelection={this.state.checkSelect}
//                         enableCellSelect={true}
//                         onSelectionModelChange={this.handleMultipleCheck}
//                         className="primary"
//                         getCellActions={this.getCellActions}
//                         style={{ textDecorationColor: "white" }}
//                     />
//                     <button className="btn btn-primary" onClick={this.setSelect} style={{ margin: 5 }}>Select</button>
//                     <button className="btn btn-primary" onClick={this.handlePurge.bind(this)} style={{ margin: 5 }} >Delete</button>
//                 </div>
//             </div>
//         )
//     }
// }  


// import * as React from 'react';
// import { DataGrid } from '@material-ui/data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataTable() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//         disableSelectionOnClick

//       />

//       <DataGrid
//         checkboxSelection={this.state.showSelection}
//         onSelectionModelChange={this.checkBoxData}
//         onRowClick={(item) => this.setState({ currentRow: item.row })}
//         onRowSelected={(item) => console.log(item)}
//         rows={rows}
//         columns={columns}
//         pageSize={10} />
//     </div>
//   );
// }
