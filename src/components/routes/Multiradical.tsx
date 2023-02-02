import React, { useEffect, useState } from "react";
import styled from "styled-components"
import StateButton from "../buttons/StateButton"

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

interface Props {}

interface RadicalData {
  [key: number]: string;
}

interface RadicalState {
  [key: string]: number;
}

const Multiradical: React.FC<Props> = () => {
  // 0 = disabled, 1 = unselected, 2 = selected
  const [radicalState, setRadicalState] = useState<RadicalState>({})
  const [selectedRadicals, setSelectedRadicals] = useState<string[]>([])

  useEffect(() => {
    const state:RadicalState = {}
    console.log('loading radical state')
    for (const key in radicals) {
      state[radicals[key] as keyof RadicalState] = 1
    };

    setRadicalState(state)
  }, []);

  function arrayRemove(arr: string[], val: string): string[] { 
    return arr.filter(function(ele) {
        return ele !== val; 
    });
  }

  function handleSelection(radical: string): void {
    if (selectedRadicals.includes(radical)) {
      setSelectedRadicals(arrayRemove(selectedRadicals, radical))
    }
    const newSelected = selectedRadicals.concat(radical)
    console.log(`newSelected: ${newSelected}`)
    setSelectedRadicals(newSelected)
  }

  const buttonList = Object.entries(radicals).map(([key, value], i) => {
    return value.split("").map((r: string, j: number) => {
      return <StateButton key={`${i+j}`} radical={r} state={radicalState[r]} handleClick={() => handleSelection} />
    })
  });

  return (
    <div>
      {buttonList}
    </div>
  );
}

export default Multiradical;
