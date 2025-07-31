import React, {useState} from 'react'
import '../../styles/main.scss'
import { useNavigate } from 'react-router-dom';
import { BsFillCaretRightFill } from "react-icons/bs";
import classNames from 'classnames';
import { useEffect } from 'react';
import { classList, imgList, genderList, profileList, cardList } from '../../utils/list';
import Header from '../../components/Header';
import generateId from '../../utils/generateId';
import { filterImage } from '../../utils/filtering';
const rawImages = import.meta.glob('../../assets/images/*', { eager: true });
const images = Object.fromEntries(
  Object.entries(rawImages).map(([key, value]) => [key.normalize('NFC'), value])
);

const Main = () => {
	const [classType, setClassType] = useState('all')
	const [profileType, setProfileType] = useState('all')
	const [genderType, setGenderType] = useState('all')
	const [list, setList] = useState(cardList)
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const handleSearch = () => {
		if(search){
			setClassType('all')
			setProfileType('all')
			setGenderType('all')
			setList(cardList.filter(e2 => e2.name.replace(/\s+/g, "").includes(search)))
		}
	}
	const handleKeyDown = (e) => {
		if(e.key === "Enter") handleSearch()
	};
	const getImageByName = (fileName) => {
		const normalized = fileName.normalize('NFC');
		const path = `../../assets/images/${normalized}`;
		return images[path]?.default || null;  // 이미지가 없으면 null
	  };
	const filtering = (e) => {
		let result = true
		if(classType != 'all') result &&= (e.class_type == classType)
		if(profileType != 'all') result &&= (e.profile_type == profileType)
		if(genderType != 'all') result &&= (e.gender_type == genderType)
		return result
	}
	const getTwoUniqueRandom = (min, max) => {
		const arr = Array.from({ length: max - min + 1 }, (_, i) => i + min);
		arr.sort(() => Math.random() - 0.5); // 셔플
		return [arr[0], arr[1]];
	  };
	const getList = () => {
		setList(cardList.filter(e => filtering(e)))
		setSearch('')
	}
	useEffect(() => {
		getList()
	},[classType, profileType, genderType])
    return (
        <div className='test-background'>
			<Header/>
			<div className="test-card-background">
				<div className='test-card-container'>
					<div className='select-btn-group'>
						{classList.map(data => {
							return(
								<div className={classNames('select-btn', {'clicked': classType == data.value})} onClick={() => setClassType(data.value)} key={data.value}>
									{data.label}
								</div>
							)
						})}
					</div>
					<div className='select-btn-group'>
						{profileList.map(data => {
							return(
								<div className={classNames('select-btn', {'clicked': profileType == data.value})} onClick={() => setProfileType(data.value)} key={data.value}>
									{data.label}
								</div>
							)
						})}
					</div>
					<div className='select-btn-group'>
						{genderList.map(data => {
							return(
								<div className={classNames('select-btn', {'clicked': genderType == data.value})} onClick={() => setGenderType(data.value)} key={data.value}>
									{data.label}
								</div>
							)
						})}
					</div>
					<div className='select-btn-group'>
						<input placeholder='제목으로 검색해주세요.' onKeyDown={handleKeyDown} value={search} onChange={(e) => setSearch(e.target.value)}/>
						<div className='select-btn clicked' onClick={() => handleSearch()}>
							검색
						</div>
					</div>
				</div>
				<div style={{display:'flex', flexWrap:'wrap', gap:10, marginTop:45}}>
					{list?.map(data => {
						const imageFilter = imgList.filter(e => filterImage(data, e))
						const randomNumArr = getTwoUniqueRandom(0, imageFilter.length - 1)
						let first = randomNumArr[0]
						let second = randomNumArr[1]
						return(
							<div className="test-card" key={data.id} onClick={() => navigate('/madcup/' + data.id)}>
								{imageFilter.length >= 2 && 
									<div style={{display:'flex'}}>
										<img 
											style={{width:143, height:200}}
											src={getImageByName(imageFilter?.[first]?.name)}
										/>
										<img 
											style={{width:143, height:200}}
											src={getImageByName(imageFilter?.[second]?.name)}
										/>
									</div>
								}
								<div style={{display:'flex', marginBottom:5, backgroundColor:"#fff", alignItems:"flex-start", flexDirection:'column'}}>
									<div className='card-title'>
										{data.name}
									</div>
								</div>
								<div style={{display:'flex', margin:5}}>
									<div className='start-btn'>
										<BsFillCaretRightFill style={{marginRight:5}}/>
										시작하기
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
    )
}
export default Main