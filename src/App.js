import Header from './components/Header'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { FaApple } from 'react-icons/fa'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  // after refreshing the page fetch the data from the JSON 
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)

    }
    getTasks()
  }, [])// no dependency


  // Fetch Tasks
  const fetchTasks = async () => {

    //call await to ensure all data is fetched
    const res = await fetch('http://localhost:5000/tasks')

    //get the json data
    const data = await res.json()

    return data
  }
  //fetch single task 
  const fetchTask = async (id) => {

    //call await to ensure all data is fetched
    const res = await fetch(`http://localhost:5000/tasks/${id}`)

    //get the json data
    const data = await res.json()

    return data
  }

  //add Task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        //Stringify convert the javascript obejct to JSOn 
        body: JSON.stringify(task)
      })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  //delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
      { method: 'DELETE' }
    )
    setTasks(tasks.filter((task) => task.id != id))
  }

  //Toggle Reminder 

  const toggleReminder = async (id) => {

    //fetch a single taks out 
    const taksToToggle = await fetchTask(id)

    //keep all the variable same, update the reminder to its opposite
    const updatedTask = { ...taksToToggle, reminder: !taksToToggle.reminder }

    //updates in the database with put method 
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    })

    const data = res.json()
    //map the task with matching id
    //create a shadow copy of task object then update the remider to it opposite
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))

  }
  return (
    <Router>

      <div
        className='container'>
        <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} />

        <Routes>
          <Route path='/' element={
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length !== 0 ?
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> :
              <div className='noTasks'> You have no Tasks. </div>}
          </>
          } />

          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />

      </div>

    </Router>
  )

}

export default App;
