
import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

const App = () => {
	const [input, setInput] = useState('0')
	const [current, setCurrent] = useState('')
	const [pervious, setPervious] = useState('')
	const [operator, setOperator] = useState(null)

	useEffect(() => {
		if (current) setInput(current)
	}, [current])

	const equal = () => {
		if (operator) {
			setInput('')
			setCurrent('')
			setPervious(String(handelOperation(operator)))
		}
	}

	const handelOperation = (operator) => {
		switch (operator) {
			case '/':
				return parseFloat(pervious) / parseFloat(current)
			case 'x':
				return parseFloat(pervious) * parseFloat(current)
			case '+':
				return parseFloat(pervious) + parseFloat(current)
			case '-':
				return parseFloat(pervious) - parseFloat(current)

			default:
				throw new Error('Unknown operator')
		}
	}

	const addNumber = (e) => {
		const { innerText } = e.target

		if (!(current.includes('.') && innerText === '.')) {
			current ? setCurrent((prevState) => prevState + innerText) : setCurrent(innerText)
		}
	}

	const operatorType = (e) => {
		setOperator(e.target.innerText)

		if (current === '') {
			return
		}

		if (pervious !== '') {
			equal()
		} else {
			setPervious(current)
			setCurrent('')
		}
	}

	const clear = () => {
		setPervious('')
		setCurrent('')
		setInput('0')
	}

	const minusPlus = () => {
		current[0] === '-' ? setCurrent(current.slice(1)) : setCurrent('-' + current)
	}

	const percent = () => {
		if (pervious) {
			console.log({ input, current, pervious, operator })
		} else if (input !== '0' || input === '.') {
			setCurrent(String(parseFloat(current) / 100))
		}
	}

	const Screen = () => {
		if (input !== '') {
			return (
				<NumberFormat
					value={input}
					displayType='text'
					thousandSeparator
					renderText={(value, props) => (
						<div className='screen' {...props}>
							{value}
						</div>
					)}
				/>
			)
		}
		return (
			<NumberFormat
				value={pervious}
				displayType='text'
				thousandSeparator
				renderText={(value, props) => (
					<div className='screen' {...props}>
						{value}
					</div>
				)}
			/>
		)
	}

	return (
		<div className='container'>
			<Screen />
			<div className='wrapper'>
                <div className='btn gray' onClick={clear}>C</div>
                <div className='btn gray' onClick={minusPlus}>-/+</div>
                <div className='btn gray' onClick={percent}>%</div>
                <div className='btn orange' onClick={operatorType}>/</div>
                <div className='btn' onClick={addNumber}>7</div>
                <div className='btn' onClick={addNumber}>8</div>
                <div className='btn' onClick={addNumber}>9</div>
                <div className='btn orange' onClick={operatorType}>x</div>
                <div className='btn' onClick={addNumber}>4</div>
                <div className='btn' onClick={addNumber}>5</div>
                <div className='btn' onClick={addNumber}>6</div>
                <div className='btn orange' onClick={operatorType}>-</div>
                <div className='btn' onClick={addNumber}>1</div>
                <div className='btn' onClick={addNumber}>2</div>
                <div className='btn' onClick={addNumber}>3</div>
                <div className='btn orange' onClick={operatorType}>+</div>
                <div className='btn zero' onClick={addNumber}>0</div>
                <div className='btn' onClick={addNumber}>.</div>
                <div className='btn orange' onClick={equal}>=</div>
			</div>
		</div>
	)
}

export default App

