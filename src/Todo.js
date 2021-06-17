import React, { useState } from 'react';

const Todo = () => {
	const [inputData, setInputData] = useState('');
	const [items, setItems] = useState([{ id: 1, task: "Coding" },]);
	const [editIndex, setEditIndex] = useState();
	const [btnflag, setbtnflag] = useState(true);

	const addtodo = ()=>{
		if (inputData) {
			const count = items.length;
			setItems([...items, { id: count + 1, task: inputData }])
			setInputData('');
		} else {
			alert("Please enter todos");
		}
	}

	const deleteItem = (val) => {
		console.log(val)
		const filterData = items.filter((elem, index) => {
			return val !== index
		})
		setItems(filterData);
	}

	const editItem = (val) => {
		let findItem = items.find((ele) => {
			return ele.id === val;
		})
		setInputData(findItem.task);
		setEditIndex(val);
		setbtnflag(false);
	}

	const updateItem = ()=>{
		setItems(
			items.map((ele)=>{
				if(ele.id===editIndex){
					return{...ele,task:inputData}
				}
				return ele;
			})
		)
		setInputData('');
		setbtnflag(true);
		setEditIndex();
	}

	return (
		<div className="container">
			<div className="wrapper">
				<h1>React To-Do</h1>
				<div className="todo-form">
					<input type="text" placeholder="Enter your todo" value={inputData} onChange={(e) => setInputData(e.target.value)} />
					{btnflag ? <button onClick={addtodo} className="addbtn">ADD</button>:
					<button className="updatebtn" onClick={updateItem}>Update</button>}
				</div>
				<div className="todo-item">
					<ul className="todos">
						{
							items.map((elem, index) => {
								return (
									<li className="todo" key={elem.id}>
										<span>{elem.task}</span>
										<div>
											<button className="del" onClick={() => deleteItem(index)}>Del</button>
											<button className="del" onClick={() => editItem(index+1)}>Edit</button>
										</div>
									</li>
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
