const getNumberColor = (number) => {
    if(!number || typeof number !== 'number') return '';
    if(number < -9 && number > -12) return ' throw-attempt';
    if(number < -11 && number > -15) return ' jab-punish';
    if(number < -14 && number > -17) return ' combo-punish';
    if(number < -16 && number > -18) return ' launch-punishable';
    if(number < -17) return ' ded';
    if(number > 9 && number < 12) return ' throw-attempt';
    if(number > 11 && number < 15) return ' jab-punish';
    if(number > 14 && number < 17) return ' combo-punish';
    if(number > 16 && number < 18) return ' launch-punishable';
    if(number > 17) return ' ded';
    return '';
    
}

export default getNumberColor;