
export const filterImage = (data, e) => {
	let result = true;
	if(data.class_type != 'all') result &&= (data.class_type == e.class_type)
	if(data.profile_type != 'all') result &&= (data.profile_type == e.profile_type)
	if(data.gender_type != 'all') result &&= (data.gender_type == e.gender_type)
	return result
}