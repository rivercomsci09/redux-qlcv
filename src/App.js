import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import Demo from './training/Demo'

//test
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //id, name, status
      isDisplayForm: false,
      tasksEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1
    }
  }

  //Khi truy cap toi (F5: refresh), ham duoi se duoc tu dong goi va chi goi 1 lan
  //Dung de gan lai cai state tu localStorage 
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4();
  }
  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name: 'Hoc lap trinh',
        status: true
      },
      {
        id: this.generateID(),
        name: 'Hoc lap trinh 02',
        status: false
      },
      {
        id: this.generateID(),
        name: 'Hoc lap trinh 03',
        status: true
      }
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onToggleForm = () => { // Them tasks
    if (this.state.isDisplayForm && this.state.tasksEditing !== null) {
      this.setState({
        isDisplayForm: true,
        tasksEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        tasksEditing: null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      tasksEditing: null
    });
    // console.log(this.state.tasks)
    // console.log(this.state.tasksEditing);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        return result = index;
      }
    });
    return result;
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.onCloseForm();
    }
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }
  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var tasksEditing = tasks[index];
    this.setState({
      tasksEditing: tasksEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
    
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
  }
  render() {
    var { tasks, isDisplayForm, tasksEditing, filter, keyword, sortBy, sortValue } = this.state; //var tasks = this.state.tasks 
    if(sortBy === 'name'){
      tasks.sort((a,b) => {
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a,b) => {
        if(a.staus > b.status) return -sortValue;
        else if(a.status < b.status) return sortValue;
        else return 0;
      });
    }
    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} task={tasksEditing} /> : '';
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }

    if(keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }
    return (
      <div className="container">
        <h1>Quản Lý Công Việc</h1>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {/*Form */}
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            {/* <button type="button" className="btn btn-success ml-5" onClick={this.onGenerateData}>
              Generate Data
            </button> */}
            {/* Search - Sort */}
            <Control onSearch = {this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
            {/** List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate} onFilter={this.onFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;