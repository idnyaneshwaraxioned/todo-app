import React, { useEffect, useState } from 'react';

const getLocalstorage = () => {
	let todoList = JSON.parse(localStorage.getItem("todos"));
	if (todoList) {
		return todoList;
	} else {
		return [];
	}
}

const getCount = () => {
	let todoCount = JSON.parse(localStorage.getItem("count"));
	if (todoCount) {
		return todoCount;
	} else {
		return 1;
	}
}

const Todo = () => {
	const [inputData, setInputData] = useState('');
	const [items, setItems] = useState(getLocalstorage());
	const [editIndex, setEditIndex] = useState();
	const [updateVal, setUpdateVal] = useState('')
	const [btnflag, setbtnflag] = useState(true);
	const [count, setCount] = useState(getCount());

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(items))
		localStorage.setItem("count", JSON.stringify(count))
	}, [items, count]);

	let inputHandler = (event) => {
		setInputData(event.target.value);
	}

	let updateHandler = (event) => {
		setUpdateVal(event.target.value);
	}

	const addtodo = (e) => {
		e.preventDefault();
		if (inputData) {
			setItems([...items, { id: count, task: inputData }])
			setInputData('');
		} else {
			alert("Please enter todos");
		}
		setCount(count => count + 1);
		// localStorage.setItem("todos", JSON.stringify(items))
	}

	const deleteItem = (val) => {
		const filterData = items.filter((elem, index) => {
			return val !== index
		})
		setItems(filterData);
	}

	const editItem = (val) => {
		let findItem = items.find((ele) => {
			return ele.id === val;
		})
		setUpdateVal(findItem.task);
		setEditIndex(val);
		setbtnflag(false);
		console.log(val, findItem.id)
	}

	const updateItem = (e) => {
		e.preventDefault();
		setItems(
			items.map((ele) => {
				if (ele.id === editIndex) {
					return { ...ele, task: updateVal }
				}
				return ele;
			})
		)
		setUpdateVal('');
		setbtnflag(true);
		setEditIndex();
	}

	return (
		<div className="container">
			<div className="wrapper">
				<h1>React To-Do</h1>
				<form action="" onSubmit={addtodo}>
					<input type="text" placeholder="Enter your todos" value={inputData} onChange={inputHandler} />
				</form>
				<div className="todo-item">
					<ul className="todos">
						{
							items.map((elem, index) => {
								return (
									<li className="todo" key={elem.id}>
										{(elem.id === editIndex && !btnflag) ? <form action="" className="update-form" onSubmit={updateItem}>
											<input type="text" value={updateVal} onChange={updateHandler} />
										</form> : <span onDoubleClick={() => editItem(elem.id)}>{elem.task}</span>}
										<div>
											<button className="del" onClick={() => deleteItem(index)}>Del</button>
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
