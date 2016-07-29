/**
 * 
 */
function paddingLeft(str,lenght){
	if(str.length >= lenght)
	return str;
	else
	return paddingLeft("0" +str,lenght);
}
function paddingRight(str,lenght){
	if(str.length >= lenght)
	return str;
	else
	return paddingRight(str+"0",lenght);
}