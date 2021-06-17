import React, { useState } from 'react';

const Todo = () => {
	const [inputData, setInputData] = useState('');
	const [items, setItems] = useState([{ id: 1, task: "Coding" },]);

	// const addItem = () => {
	// 	const count = items.length;
	// 	setItems([...items, { id: count + 1, task:inputData }]);
	// 	setInputData('');
	// }

	const deleteItem = (val) => {
		console.log(val)
		const filterData = items.filter((elem, index) => {
			return val !== index
		})
		setItems(filterData);
	}
	return (
		<div className="container">
			<div className="wrapper">
				<h1>React To-Do</h1>
				<div className="todo-form">
					<input type="text" placeholder="Enter your todo" value={inputData} onChange={(e) => setInputData(e.target.value)} />
					<button onClick={
						() => {
							if(inputData){
								const count = items.length;
								setItems([...items, { id: count + 1, task:inputData }])
								setInputData('');
							} else {
								alert("Please enter todos");
							}
						}
					} >ADD</button>
				</div>
				<div className="todo-item">
					<ul className="todos">
						{
							items.map((elem, index) => {
								return (
								<li className="todo" key={elem.id}><span>{elem.task}</span><button className="del" onClick={() => deleteItem(index)}>Del</button></li>
								)
							})
						}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Todo;