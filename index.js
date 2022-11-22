const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/task');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.urlencoded());


// static files
app.use(express.static('assets'));



app.get('/', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log('Error in fetching task from DB');
            return;
        }

        return res.render('home', {
            title: "Task List",
            task_list: tasks
        });
    })
});


app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "EJS practice"
    });
});


app.post('/create-task', function (req, res) {
    Task.create({
        task: req.body.task,
        category: req.body.category == undefined ? 'OTHER' : req.body.category,
        deadline: req.body.deadline == '' ? 'No deadline' : getDate(req.body.deadline)
    }, function (err, newTask) {
        if (err) {
            console.log('error in creating a task!');
            return;
        }

        return res.redirect('back');
    })
});

function getDate(date) {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);

    let str = "";
    if (month == '01') str += "JAN "
    else if (month == '02') str += "FEB "
    else if (month == '03') str += "MAR "
    else if (month == '04') str += "APR "
    else if (month == '05') str += "MAY "
    else if (month == '06') str += "JUN "
    else if (month == '07') str += "JUL "
    else if (month == '08') str += "AUG "
    else if (month == '09') str += "SEP "
    else if (month == '10') str += "OCT "
    else if (month == '11') str += "NOV "
    else if (month == '12') str += "DEC "

    str += day + ", " + year;
    return str;
}


app.get('/delete-task', function (req, res) {
    let tbd_tasks_id = req.query;
    console.log(tbd_tasks_id);
    var len = Object.keys(tbd_tasks_id).length;

    for(let task_id = 0; task_id < len; task_id++) {
        Task.findByIdAndDelete(Object.keys(tbd_tasks_id)[task_id], function(err) {
            if(err) {
                console.log("Error, can't delete this task!");
                return;
            }
        });

    }
    return res.redirect('back');
})


app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server', err);
    }

    console.log('Yup! My server is running on Port 8000');
});