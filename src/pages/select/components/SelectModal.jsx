import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import MadCamp from '../../../assets/images/madcamp.png'
import NvSelect from "../../../components/NvSelect";
import { filterImage } from "../../../utils/filtering";
import { imgList } from "../../../utils/list";
import { pickRandomItems } from "../../../utils/shuffle";
// 접근성을 위해 root 설정
Modal.setAppElement("#root");
const customStyles = {
    overlay:{
      zIndex: 35000,
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
      content: {
        top: '23%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        overflow: 'unset',
        border: 0
      },
};
const SelectModal = ({open, setOpen, setSelectList, item, count, setCount}) => {
	const [list, setList] = useState([{label:'4강', value:4}])
	const [totalImageList, setTotalImgaeList] = useState([])
	const generateTournamentRounds = (length) => {
		const result = [];
		let n = 4; // 최소 4강부터 시작
	  
		while (n <= length) {
		  result.push({ label: `${n}강`, value: n });
		  n *= 2; // 2배씩 증가 (4 → 8 → 16 → 32 ...)
		}
	  
		return result;
	  };
	  const handleClose = () => {
		const result = pickRandomItems(totalImageList, count)
		setSelectList(result)
		setOpen(false)
	  }
	useEffect(() => {
		if(item?.name){
			const filteredList = imgList.filter(e => filterImage(item, e))
			const roundsList = generateTournamentRounds(filteredList.length)
			setTotalImgaeList(filteredList)
			setList(roundsList)
		}
	},[item])
	return (
		<Modal
			isOpen={open}
			ariaHideApp={false}
			enforceFocus={false}
			style={customStyles}
		>
			<div style={{width: 600}}>
				<div style={{padding:10, display:'flex', flexDirection:'column', alignItems:'center', borderBottom:'1px solid #e5e5e5'}}>
					<img src={MadCamp} style={{width: 80, height: 80}}/>
					<div style={{fontSize:26, color:'#676a6c', marginTop:5}}>
						{item?.name}
					</div>
				</div>
				<div style={{padding:10, color:"#676a6c", fontSize:13, backgroundColor:"#f8fafb"}}>
					<div style={{fontWeight:'bold', marginBottom:5}}>총 라운드를 선택하세요.</div>
					<NvSelect
						defaultValue={count}
						list={list}
						onChange={(v) => setCount(v)}
					/>
					<div style={{marginBottom:5}}>총 {totalImageList.length}명의 후보 중 무작위 {count}명이 대결합니다.</div>
				</div>
				<div style={{padding: 10, display:'flex', alignItems:'center', justifyContent:'center'}}>
					<div 
						className="modal-btn"
						onClick={() => {
							handleClose()
						}}
					>
						시작하기
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default SelectModal;
