import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);


    //reset the form after sumbit
    const onSubmit = (e) =>{

        //this prevent submit to a page
        e.preventDefault();

        if(!text){
            alert('Please add a task')
            return
        }else if(!day){
            alert('Please add a day.')
            return
        }

       onAdd({text, day, reminder})

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>

            {/*create a html form to add the content of the task*/}
            <div className='form-control'>
                <label> Task </label>
                <input type='text' placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

            </div>

            {/*add the date & time*/}
            <div className='form-control'>
                <label> Day & Time</label>
                <input type='text' placeholder='Day & Time'
                    value={day}
                    onChange={(e) => setDay(e.target.value)} />

            </div>

            <div className='form-control form-control-check'>
                <label> Set Reminder </label>
                <input type='checkbox' 
                value={reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)}/>

            </div>

            <input className="btn btn-block" type='submit' value='Save Task' />

        </form>
    )
}

export default AddTask
