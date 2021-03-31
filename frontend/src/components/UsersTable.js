import React, {Component} from 'react';

import '../assets/css/datatable.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import moment from 'moment'

const MySwal = withReactContent(Swal)

const $ = require('jquery');
$.DataTable = require('datatables.net');

if(localStorage.getItem('user')){    
    var user = JSON.parse(localStorage.getItem('user'));
    var Store = user.default_store;
    var Type = user.type;
}


class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload : false
        }
        window.toggle = (rowData) => {
            this.props.toggle (rowData);
        }

        window.deleteUser = (id) => {
            var _this = this;
            MySwal.fire({
                title: <p>Do you want to deleete!!!</p>,
                confirmButtonText: 'Delete',
                showCancelButton: true
              }).then(({ isConfirmed }) => {
                  //console.log(isConfirmed);
                  if(isConfirmed){
                    $.post('http://'+process.env.REACT_APP_HOST+'/api/users/delete',{
						id: id
					},
					function(data) {
						//console.log(data);
						//var json = JSON.parse(data);
						_this.fetchData();
						return MySwal.fire(<p>User delete successfully</p>)

					});	
                  }
                  else{
                      return MySwal.fire(<p>User delete cancelled</p>)
                  }
              })
            

        }
    }
    fetchData = function() {           
    
        var userData = localStorage.getItem("user");
        var user = JSON.parse(userData);

        $(this.refs.main).DataTable({
            "ajax": {
                "url": 'http://'+process.env.REACT_APP_HOST+'/api/users/list',
                "type":"get",
                "data": { 
                           "Store" : Store,
                           "Type" : Type
                        },
                "dataSrc": function(users){
                    //console.log(prop)
                    return users;
                }
            },
            "scrollX":true,
            "destroy": true,
            "order": [[ 3, "desc" ]],
            "iDisplayLength": 50,
            "columns": [
                { "title": "Name", "data": "name", "width": "15%", "className":"link" },
                { "title": "Email", "data": "email", "width": "15%", "className":"link" },
                { "title": "Member Since", "data": "added_on", "width": "15%", "className":"link" },
                { "title": "Last Login", "data": "last_login", "width": "15%", "className":"link" },
                { "title": "Type", "data": "type", "width": "15%", "className":"link" },
                { "title": "Age", "data": "age", "width": "15%", "className":"link" },
                { "title": "Salary", "data": "salary", "width": "15%", "className":"link" },
                { "title": "Status", "data": "status", "className":"link" },
                { "title": "Action", "width": "20%", "data": null, "className":"link" }
            ],
            "columnDefs":
            [		
                    {
                        'targets': 2,
                        'searchable': false,
                        'render': function (data, type, row) {
                            if(!data) return '';
                            return moment(data).format('DD-MM-Y h:mm:ss A')
                        }
                    },
                    {
                        'targets': 3,
                        'searchable': false,
                        'render': function (data, type, row) {
                            if(!data) return '';
                            return moment(data).format('DD-MM-Y h:mm:ss A')
                        }
                    },
                    {
                        'targets': 6,
                        'render': function (data, type, row) {
                            if(!data) return '';
                            return data.toString();
                        }
                    },
                    {
                        'targets': 8,
                        'searchable': false,
                        'orderable': false,
                        'render': function (data, type, row) {
                            var deleteBtn = '';
                            if(user.type === 5){
                                deleteBtn =  '    <button type="button" onClick="window.deleteUser(\''+ row.uuid +'\')" data-toggle="modal" class="btn btn-danger btn-sm" >' +
                                '		<i class="fa fa-window-close"></i>' +
                                '	</button>';
                            }
                            return '<div class="btn-group btn-group-xs">' +
                                    '	<button type="button" onClick="window.toggle('+JSON.stringify(row).replace(/'/g, '&apos;').replace(/"/g, '&quot;') +')" data-toggle="modal" class="btn btn-primary btn-sm" >' +
                                    '		<i class="fa fa-edit"></i>' +
                                    '	</button>&nbsp;&nbsp;'+ deleteBtn +
                                    '</div>';
                        }
                    }
            ],
            dom: 'Bfrtip'
        });
    }
    componentDidMount() {     
        this.fetchData();
        
    }

    componentDidUpdate() { 
        if(this.state.reload !== this.props.reload){
            this.fetchData();        
            this.setState({reload : !this.state.reload});
        }    
    }

    render() {
        return (
            <div>
                <table ref="main" />
            </div>);
    }
}


export default UsersTable;