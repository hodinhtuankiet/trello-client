import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { createNewColumnAPI, fetchBoardDetailsAPI, createNewCardAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'
function _id() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // tại thời fix cứng boardId , sd react-router-dom để lấy
    const boardId = '65b262a107e5cd6761df3266'
    fetchBoardDetailsAPI(boardId).then(board => {
      // Handle when dragging a card into an empty column
      // board.columns.forEach(column => {
      //   if (isEmpty(column.cards)) {
      //     column.cards = [generatePlaceholderCard(column)]
      //     column.cardOrderIds = [generatePlaceholderCard(column)._id]
      //   }
      // })
      // console.log(board)
      setBoard(board)
      // console.log(response)
    })
  }, [])

  // Function have mission call API create new Column & Refresh data Sate Board
  const createNewColumn = async (dataColumnAPI) => {
    const createdColumn = await createNewColumnAPI({
      // spread operator (...) là một cách tiện lợi để tạo ra một bản sao của
      // đối tượng dataColumnAPI với thêm một thuộc tính mới boardId.
      ...dataColumnAPI,
      // khi tạo mới Column và Card dều có boardId nên phải truyền props như vậy
      boardId: board._id
    })
    createdColumn.card = [generatePlaceholderCard(createdColumn)],
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // create copies without changing the data
    // SET STATE OF COLUMNS
    const copyPropertiesBoard = { ...board }
    // Cuz when create new column , state do not set , so copy PropertiesBoard and set new data column
    // Sử dụng unshift để đẩy createdColumn vào đầu mảng columns thay vì dùng push
    copyPropertiesBoard.columns.unshift(createdColumn)
    // Nếu bạn muốn giữ nguyên các phần tử cũ của columnOrderIds và chỉ thêm createdColumn._id vào đầu mảng,
    // bạn có thể sử dụng spread operator như sau:
    copyPropertiesBoard.columnOrderIds = [createdColumn._id, ...copyPropertiesBoard.columnOrderIds]

    setBoard(copyPropertiesBoard)
  }
  const createNewCard = async (dataCardAPI) => {
    const createdCard = await createNewCardAPI({
      // spread operator (...) là một cách tiện lợi để tạo ra một bản sao của
      // đối tượng dataCardAPI với thêm một thuộc tính mới boardId.
      ...dataCardAPI,
      // khi tạo mới Column và Card dều có boardId nên phải truyền props như vậy
      boardId: board._id
    })
    // create copies without changing the data
    // SET STATE OF COLUMNS
    const copyPropertiesBoard = { ...board }
    const columnWhenCreateNewCard = copyPropertiesBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnWhenCreateNewCard) {
      // Cuz when create new column , state do not set , so copy PropertiesBoard and set new data column
      // Sử dụng unshift để đẩy createdColumn vào đầu mảng columns thay vì dùng push
      columnWhenCreateNewCard.cards.unshift(createdCard)
      // Nếu bạn muốn giữ nguyên các phần tử cũ của CardOrderIds và chỉ thêm createdCard._id vào đầu mảng,
      // bạn có thể sử dụng spread operator như sau:
      columnWhenCreateNewCard.cardOrderIds.push(createdCard._id)
    }

    setBoard(copyPropertiesBoard)
  }
  const deleteColumnDetails = (columnId) => {
    //
    console.log('asdsa ds', columnId)
  }
  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      <AppBar/>
      {/* hồi trước là dùng mockData?.board */}
      <BoardBar board={board} />
      <BoardContent
      // props đặt tên như nào cũng được để đẩy xuống Column
        board={board}
        funcCreateNewColumn={createNewColumn}
        funcCreateNewCard={createNewCard}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}
export default _id