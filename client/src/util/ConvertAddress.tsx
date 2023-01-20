export const codeToAddress = (code: number) => {
  if (code !== null) {
    switch (code) {
      case 11680:
        return '강남구';
      case 11740:
        return '강동구';
      case 11305:
        return '강북구';
      case 11500:
        return '강서구';
      case 11620:
        return '관악구';
      case 11215:
        return '광진구';
      case 11530:
        return '구로구';
      case 11545:
        return '금천구';
      case 11350:
        return '노원구';
      case 11320:
        return '도봉구';
      case 11230:
        return '동대문구';
      case 11590:
        return '동작구';
      case 11440:
        return '마포구';
      case 11410:
        return '서대문구';
      case 11650:
        return '서초구';
      case 11200:
        return '성동구';
      case 11290:
        return '성북구';
      case 11710:
        return '송파구';
      case 11470:
        return '양천구';
      case 11560:
        return '영등포구';
      case 11170:
        return '용산구';
      case 11380:
        return '은평구';
      case 11110:
        return '종로구';
      case 11140:
        return '중구';
      case 11260:
        return '중랑구';
    }
  }
};

export const addressToCode = (address: string) => {
  if (address !== null) {
    switch (address) {
      case '강남구':
        return '11680';
      case '강동구':
        return '11740';
      case '강북구':
        return '11305';
      case '강서구':
        return '11500';
      case '관악구':
        return '11620';
      case '광진구':
        return '11215';
      case '구로구':
        return '11530';
      case '금천구':
        return '11545';
      case '노원구':
        return '11350';
      case '도봉구':
        return '11320';
      case '동대문구':
        return '11230';
      case '동작구':
        return '11590';
      case '마포구':
        return '11440';
      case '서대문구':
        return '11410';
      case '서초구':
        return '11650';
      case '성동구':
        return '11200';
      case '성북구':
        return '11290';
      case '송파구':
        return '11710';
      case '양천구':
        return '11470';
      case '영등포구':
        return '11560';
      case '용산구':
        return '11170';
      case '은평구':
        return '11380';
      case '종로구':
        return '11110';
      case '중구':
        return '11140';
      case '중랑구':
        return '11260';
    }
  }
};
