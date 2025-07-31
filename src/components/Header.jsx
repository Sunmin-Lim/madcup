import { useNavigate } from 'react-router-dom'
import MadCamp from '../assets/images/madcamp.png'
const Header = () => {
	const navigate = useNavigate()
	return (
		<div style={{position:'fixed', top:0, height:50, width:'100%', display:'flex'}}>
			<div 
				style={{cursor:'pointer', height:'100%', padding:'0 10px', background:'#1ab394', color:"#fff", display:'flex', alignItems:'center', justifyContent:'center'}}
				onClick={() => {
					navigate('/')
				}}
			>
				<img src={MadCamp} style={{width: 30, height: 30, marginRight:10}}/>
				MADCUP
			</div>
			<div style={{display:'flex', flex:1, background:'#fff', height:'100%'}}></div>
		</div>
	)
}
export default Header