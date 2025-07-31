import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import '../../styles/main.scss'
import { cardList } from '../../utils/list'
import SelectModal from './components/SelectModal'
import vsicon from '../../assets/images/madcup_vs.png'
import classNames from 'classnames'
import _ from 'lodash'
import { pickRandomItems } from '../../utils/shuffle'
const rawImages = import.meta.glob('../../assets/images/*', { eager: true });
const images = Object.fromEntries(
  Object.entries(rawImages).map(([key, value]) => [key.normalize('NFC'), value])
);
const Select = () => {
	const {id} = useParams()
	const [open, setOpen] = useState(true)
	const [item, setItem] = useState({})
	const [count, setCount] = useState(4)
	const [selectList, setSelectList] = useState([])
	const [nextList, setNextList] = useState([])
	const [currentSelect, setCurrentSelect] = useState('')
	const navigate = useNavigate()
	const [currentIndex, setCurrentIndex] = useState(0)
	const getImageByName = (fileName) => {
		if(!fileName) return null;
		const normalized = fileName.normalize('NFC');
		const path = `../../assets/images/${normalized}`;
		return images[path]?.default || null;  // 이미지가 없으면 null
	  };
	const handleClick = (index) => {
		setCurrentSelect(index)
		const next = [...nextList, selectList[currentIndex]]
		setNextList(next)
		setTimeout(() => {
			setCurrentSelect('')
			if(currentIndex == (count - 2)){
				if(count == 2){
					setCurrentSelect(index)
				}
				else{
					const tmp = pickRandomItems(next, count / 2)
					setSelectList(tmp)
					setNextList([])
					setCount(count / 2)
					setCurrentIndex(0)
				}
			}
			else{
				setCurrentIndex(currentIndex + 2)
			}
		},2000)
	}
	useEffect(() => {
		if(!id) navigate('/')
		else{
			const find = cardList.find(e => e.id == id)
			if(find){
				setItem(find)
			}
		}
	},[id])
	return(
		<div className='test-background'>
			<Header/>
			<div className='select-background'>
				<div className='select-background2'>
					<div style={{width:'100%', position:'absolute',zIndex:100, top:0, color:"#fff", fontSize:44, backgroundColor:"rgba(0,0,0,0.5)", fontFamily:'open-sans'}}>{`${item.name} ${count == 2 ? '결승' : count + '강'} ${(currentIndex/2) + 1}/${count/2}`}</div>
					{selectList.length > 0 &&
						<>
							<img src={vsicon} className="vs-icon-style"/>
							<img
								src={getImageByName(selectList[currentIndex]?.name)}
								className={classNames(
										"select-image-left", 
										{"selected":currentIndex === currentSelect},
										{"left-exit":(currentSelect !== '') && (currentIndex !== currentSelect)},	
								)}
								onClick={() => {
									handleClick(currentIndex)
								}}
							/>
							<img
								src={getImageByName(selectList[currentIndex + 1]?.name)}
								className={classNames(
										"select-image-right", 
										{"selected":(currentIndex + 1) === currentSelect},
										{"right-exit":(currentSelect !== '') && ((currentIndex + 1) !== currentSelect)},	
								)}
								onClick={() => {
									handleClick(currentIndex + 1)
								}}
							/>
						</>
					}
				</div>
			</div>
			<SelectModal setSelectList={setSelectList} count={count} setCount={setCount} open={open} setOpen={setOpen} item={item}/>
		</div>
	)
}
export default Select