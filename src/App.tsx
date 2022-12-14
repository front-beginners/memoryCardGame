import { useState } from 'react'
import './App.css'

interface TCell {
  row: number
  column: number
}

function App() {
  const [grid, setGrid] = useState([
    [0, 1],
    [1, 0], //0 //1
  ])

  const [isReveled, setIsReveled] = useState(
    new Array(grid.length)
      .fill('')
      .map(() => new Array(grid[0].length).fill(false))
  )

  const [firstItem, setFirstItem] = useState<TCell>()

  function handleSelectedCard(row: number, column: number) {
    if (isReveled[row][column]) return
    const clickedNumber = grid[row][column]
    const newIsReveled = [...isReveled]
    newIsReveled[row][column] = true
    setIsReveled(newIsReveled)

    if (firstItem) {
      const firstNumberChoosed = grid[firstItem.row][firstItem.column]
      if (firstNumberChoosed !== clickedNumber) {
        setTimeout(() => {
          newIsReveled[firstItem.row][firstItem.column] = false
          newIsReveled[row][column] = false
          setIsReveled([...newIsReveled])
        }, 1000)
      } else {
        const youWon = isReveled.flat().every((state) => state)
        if (youWon) {
          setTimeout(() => {
            alert('Você ganhou, parabéns')
          })
        }
      }
      setFirstItem(undefined)
    } else {
      setFirstItem({
        row,
        column,
      })
    }
  }

  return (
    <div className='App'>
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((number, columnIndex) => (
              <div
                className={
                  'card ' + (isReveled[rowIndex][columnIndex] ? 'clicked' : '')
                }
                key={columnIndex}
                onClick={() => handleSelectedCard(rowIndex, columnIndex)}
              >
                {isReveled[rowIndex][columnIndex] ? number : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
