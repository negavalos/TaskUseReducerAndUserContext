import React, {useState, useReducer, useRef} from 'react';
const TASK = 'TASK';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const initialState = {
    id: 0,
    task: '',
    descrption: '',
    completed: false,
    level: ''
}
const TaskContainer = () => {
    
    const [id, setId] = useState(1);

    const TaskReducer = (state, action) =>{
        let task;
        switch (action.type) {
            case TASK:
                task = [...state];
                task.push(action.payload);
                return task;
            case UPDATE:
                const newstate = state.map(ob =>{
                    if (ob.id === action.payload.id) {
                        return {...ob, completed: action.payload.completed}
                    }
                    return ob
                })
                return newstate
                
            case DELETE: 
                task = state.filter(item => item.id !== action.payload.id);;
                return task;
                
            default:
                break;
        }
    }
    const [state, dispatch] = useReducer(TaskReducer, [initialState]);
    const myContext = React.createContext(null);

   
    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const levelRef = useRef('Normal');
    const addTask = (e) =>{
        e.preventDefault();
        setId(id + 1);
        
        
        if(nameRef.current.value && descriptionRef.current.value && levelRef.current.value){
            dispatch({
                type: TASK,
                payload: {
                    id: id,
                    task: nameRef.current.value, 
                    descrption: descriptionRef.current.value,
                    completed:  false,
                    level: levelRef.current.value
                }
            })
        } else {
           alert("it is necessary to fill in all the fields");
        }
        
    }
    const taskCompleted = {
        color: 'gray',
        fontWeight: 'bold',
        textDecoration: 'line-through'
    }

    const taskPending = {
        fontWeight: 'bold',
        color: 'tomato'
    }

    return (
        <myContext.Provider value={state}>
            <div>
                    <form  onSubmit={addTask}>
                        <input ref={nameRef} type="text" placeholder='Task' name='taskForm' id='taskForm'/>
                        <input ref={descriptionRef} type="text" placeholder="Description" name='descriptionForm' id='descriptionForm' />
                        <select ref={levelRef} defaultValue={state.level} name='levelForm' id='levelForm'>
                            <option value='Normal'>Normal</option>
                            <option value='Urgent'>Urgent</option>
                            <option value='Blocking'>Blocking</option>
                        </select>
                        
                        <button type='submit'> 
                            crear task
                        </button>
                    </form>
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Task</th>
                        <th scope="col">Description</th>
                        <th scope="col">Level</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                    { state.map((  state, index )=>{
                    if(state.id > 0 && state.name !== null && state.descrption && state.level){
                        return (
                                    <tr key={index} style={state.completed ? taskCompleted : taskPending}>
                                        <th scope="row">#</th>
                                        <td>{state.task}</td>
                                        <td>{state.descrption}</td>
                                        <td>{state.level}</td>
                                        <td onClick={()=> dispatch({
                                            type: DELETE,
                                            payload: {
                                                id: state.id
                                            }
                                        })}><i className="bi bi-trash3-fill task-action" style={{color: 'tomato'}}></i></td>
                                        <td>
                                        
                                            {
                                                state.completed ? 
                                                (<i className="bi bi-toggle2-on task-action" style={{color: 'green'}} onClick={()=>dispatch({
                                                    type: UPDATE,
                                                    payload: {
                                                        id: state.id,
                                                        completed: !state.completed
                                                    }
                                                })} ></i>)
                                                : 
                                                (<i className="bi bi-toggle2-off task-action" style={{color: 'grey'}} 
                                                onClick={()=>dispatch({
                                                    type: UPDATE,
                                                    payload: {
                                                        id: state.id,
                                                        completed: !state.completed
                                                    }
                                                })}
                                                ></i>)
                                            }
                                        
                                        </td>
                                    </tr>
                    

                        )}        
                    
                })}
                    
                    </tbody>
                    </table>
                
                
                
                
                    
                
            </div>
        </myContext.Provider>
    );
}

export default TaskContainer;



