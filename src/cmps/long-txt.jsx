import { useState } from "react"

export function LongTxt({ txt, length }) {
    const [isLongTxtShown, setLongTxtShown] = useState(false)

    function getTxtToShow(isLongTxtShown, txt, length) {
        return (txt.length < length || isLongTxtShown) ? txt : txt.substring(0, length + 1) + '...'
    }

    function onToggleLongTxt(ev) {
        console.log(ev);
        
        ev.stopPropagation()
        setLongTxtShown((prevLongTxtShown) => !prevLongTxtShown)
    }

    return <span>
        <span>{getTxtToShow(isLongTxtShown, txt, length)}</span>
        {txt.length > length && <a className="pointer" onClick={onToggleLongTxt}>{isLongTxtShown ? '  READ LESS' : 'READ MORE'}</a>}
    </span>
}