import { useColorScheme } from '@mui/material/styles'
// import select mode
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
//Icon
import LightModeIcon from '@mui/icons-material/LightMode'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    // setAge(event.target.value)
    setMode(event.target.value)
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-dark-light">Mode</InputLabel>
      <Select
        labelId="demo-select-dark-light"
        id="demo-select-dark-light"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <div style={{ display:'flex', alignItem: 'center', gap:'6px' }}>
            <LightModeIcon fontSize='small'/>  Light
          </div>
        </MenuItem>

        <MenuItem value='dark'>
          <div style={{ display:'flex', alignItem: 'center', gap:'6px' }}>
            <NightsStayIcon fontSize='small'/>  Dark
          </div> </MenuItem>

        <MenuItem value='system'>
          <div style={{ display:'flex', alignItem: 'center', gap:'6px' }}>
            <SettingsSuggestIcon fontSize='small'/>  System
          </div> </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        // height: { theme.trello.}
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect/>
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        // height: { theme.trello.}
        height: (theme) => theme.trello.boardBarHeight,
        alignItems: 'center',
        display: 'flex'
      }}>   Box 2    </Box>
      <Box sx={{
        width: '100%',
        // height: { theme.trello.}
        height: (theme) => `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
        alignItems: 'center',
        display: 'flex'
      }}>Box 3</Box>
    </Container>
  )
}

export default App
