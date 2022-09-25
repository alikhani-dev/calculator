import { FC, MouseEvent, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

type Operator = '/' | 'x' | '+' | '-'

const App = () => {
	const [input, setInput] = useState('0')
	const [current, setCurrent] = useState('')
	const [pervious, setPervious] = useState('')
	const [operator, setOperator] = useState<Operator>()

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

	const handelOperation = (operator: Operator) => {
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

	const addNumber = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		const { innerText } = e.currentTarget

		if (!(current.includes('.') && innerText === '.')) {
			current ? setCurrent(prevState => prevState + innerText) : setCurrent(innerText)
		}
	}

	const operatorType = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		setOperator(e.currentTarget.innerText as Operator)

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
		pervious
			? setCurrent(String((parseFloat(current) / 100) * Number(pervious)))
			: setCurrent(String(parseFloat(current) / 100))
	}

	const Screen: FC = () => {
		if (input !== '') {
			return (
				<NumericFormat
					value={input}
					displayType='text'
					thousandSeparator
					renderText={value => <div className='screen'>{value}</div>}
				/>
			)
		}
		return (
			<NumericFormat
				value={pervious}
				displayType='text'
				thousandSeparator
				renderText={value => <div className='screen'>{value}</div>}
			/>
		)
	}

	return (
		<div className='container'>
			<Screen />
			<div className='wrapper'>
				<div className='btn gray' onClick={clear}>
					C
				</div>
				<div className='btn gray' onClick={minusPlus}>
					-/+
				</div>
				<div className='btn gray' onClick={percent}>
					%
				</div>
				<div className='btn orange' onClick={operatorType}>
					/
				</div>
				<div className='btn' onClick={addNumber}>
					7
				</div>
				<div className='btn' onClick={addNumber}>
					8
				</div>
				<div className='btn' onClick={addNumber}>
					9
				</div>
				<div className='btn orange' onClick={operatorType}>
					x
				</div>
				<div className='btn' onClick={addNumber}>
					4
				</div>
				<div className='btn' onClick={addNumber}>
					5
				</div>
				<div className='btn' onClick={addNumber}>
					6
				</div>
				<div className='btn orange' onClick={operatorType}>
					-
				</div>
				<div className='btn' onClick={addNumber}>
					1
				</div>
				<div className='btn' onClick={addNumber}>
					2
				</div>
				<div className='btn' onClick={addNumber}>
					3
				</div>
				<div className='btn orange' onClick={operatorType}>
					+
				</div>
				<div className='btn zero' onClick={addNumber}>
					0
				</div>
				<div className='btn' onClick={addNumber}>
					.
				</div>
				<div className='btn orange' onClick={equal}>
					=
				</div>
			</div>
		</div>
	)
}

export default App
