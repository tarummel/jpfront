import React, { useEffect, useState } from "react";
import StateButton from "../buttons/StateButton"

interface Props {}

interface RadicalData {
  [key: number]: string;
}

interface RadicalState {
  [key: string]: number;
}

const radicals:RadicalData = {
  1:	"一｜丶ノ乙亅",
  2:	"𠂉九二亠人⺅𠆢儿入ハ丷冂冖冫几凵刀⺉力勹匕匚十卜卩厂厶又マユ乃",
  3:	"亡口囗土士夂夊夕大女子宀寸小⺌尢尸屮山巛川工已巾干幺广廴廾弋弓ヨ彑彡彳⺖扌⺡⺨⺾⻌⻏⻖也及久",
  4:	"尤心戈戸手支攵文斗斤方无日曰月木欠止歹殳毋比毛氏气水火⺣爪父爻爿片牙牛犬王⺭⺹元井勿五屯巴",
  5:	"母玄瓜瓦甘生用田疋⽧癶白皮皿目矛矢石示⽱禾穴立⺲⻂世巨冊",
  6:	"竹米糸缶羊羽而耒耳聿肉自至臼舌舟艮色虍虫血行衣西",
  7:	"臣舛見角言谷豆豕豸貝赤走足身車辛辰邑酉釆里麦",
  8:	"金長門隶隹雨青非斉奄岡免",
  9:	"品面革韋韭音頁風飛食首香",
  10:	"馬骨高髟鬥鬯鬲鬼竜",
  11:	"魚鳥鹵鹿麻黄黒亀啇",
  12:	"無黍黹歯",
  13:	"黽鼎鼓鼠",
  14:	"鼻齊",
  17:	"龠"
}

const Multiradical: React.FC<Props> = () => {
  // 0 = disabled, 1 = unselected, 2 = selected
  const [radicalState, setRadicalState] = useState<RadicalState>({})
  const [selectedRadicals, setSelectedRadicals] = useState<string[]>([])

  useEffect(() => {
    const state:RadicalState = {}
    for (const key in radicals) {
      const value = radicals[key]
      for (var i = 0; i < value.length; i++) {
        const pair = getPair(value, i)
        if (pair) {
          state[pair as keyof RadicalState] = 1
          // skip the next element since its been consumed
          i++
        } else {
          state[value[i] as keyof RadicalState] = 1
        }
      }
    };
    setRadicalState(state)
  }, []);

  const arrayRemove = (arr: string[], val: string): string[] => { 
    return arr.filter(function(ele) {
        return ele !== val; 
    });
  }

  const getPair = (chars: string, index: number): string | null => {
    if (index === chars.length - 1) {
      return null
    }
  
    const left = chars[index].charCodeAt(0)
    const right = chars[index+1].charCodeAt(0)

    let char = null
    if ((55296 <= left && left <= 57343) && (55296 <= right && right <= 57343) ) {
      // left/right surrogate pair
      char = String.fromCharCode(left) + String.fromCharCode(right);
    }
    return char
  }

  const handleSelection = (radical: string): void => {
    
    if (selectedRadicals.includes(radical)) {
      const newSelected = arrayRemove(selectedRadicals, radical)
      setSelectedRadicals(newSelected)
      setRadicalState({...radicalState, [radical]: 1})
    } else {
      const newSelected = selectedRadicals.concat(radical)
      setSelectedRadicals(newSelected)
      setRadicalState({...radicalState, [radical]: 2})
    }
    console.log(`handleSelection: ${radical} ${radicalState[radical]}`)
    console.log(radicalState)
  }

  const radicalButtonsArray = (): React.ReactElement[] => {
    let buttons: React.ReactElement[] = []

    for (const key in radicals) {
      const rads = radicals[key]
      for (var i = 0; i < rads.length; i++) {
        const eKey = `${key}${i}`
        const pair = getPair(rads, i)
        if (pair) {
          buttons.push(<StateButton key={eKey} display={pair} radical={pair} state={radicalState[pair]} handleClick={handleSelection} />)
          // skip the next element since its been consumed
          i++
        } else {
          buttons.push(<StateButton key={eKey} display={rads[i]} radical={rads[i]} state={radicalState[rads[i]]} handleClick={handleSelection} />)
        }
      }
    }

    return buttons
  };

  return (
    <div>
      {radicalButtonsArray()}
    </div>
  );
}

export default Multiradical;
