import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { Button } from '@mui/material'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  return (
    // trong TH này là list nằm nghang nên dùng horizontal list sorting
  // SortableContext yêu cầu items là một dạng mảng ['id-1,'id-2'] chứ không phải [{id:'id-1}'], [{id:'id-2}']
  // Nếu không đúng vẫn kéo được nhưng ko có animations
    <SortableContext items={columns?.map( c => c._id )} strategy={ horizontalListSortingStrategy }>
      <Box
        sx={{
          // background kế thừa từ thẻ cha ở ngoài
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          display: 'flex',
          overflowY: 'hidden',
          // margin left thanh scroll ra 2px
          '&::-webkit-scrollbar-track': { m: 2 }
        }}>

        {/* map dữ liệu đổ ra columns  */}
        {/* Khi chỉ có 1 tham số thì không cần (column) || => { } chuyền thành => () coi như là có return  */}
        {/* Thường thì có return thì trước nó sẽ là xử lí gì gì đó , hoặc return 1 nhiều cái thì có dấu () không thì bỏ lun   */}
        {/* columns: là truyền một props để truyền tiếp đến file Column.jsx tiếp theo  */}
        {columns.map(column => <Column key={column._id} column={column}/>)}

        {/* Box Add New Card  */}
        <Box
          sx={{
            minWidth: '180px',
            maxWidth: '180px',
            // backgroundColor: (theme) => (theme.colorSchemes.dark.palette.primary.main),
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content'
          }}
        >
          <Button startIcon={ <NoteAddIcon/> }
            sx={{
              width: '100%',
              pr: 3
            }}
          >ADD NEW CARD</Button>
        </Box>

      </Box>
    </SortableContext>
  )
}

export default ListColumns