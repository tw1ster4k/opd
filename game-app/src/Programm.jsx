import React from 'react'
import { Link } from 'react-router-dom'

const Programm = () => {
  return (
    <div>
        <Link to="/">Назад</Link>
        <br />
        <br />
        О программе <br />
        Название программы: "Экономическая игра"<br />
        Разработчики:<br />
        Курмакаев М.Р.<br />
        Нуршинов А.Р.<br />
        Руководители:<br />
        Спешилова Н.В.<br />
        Иневатова О.А. <br />
        Чмышенко Е.В.<br />
        2026
    </div>
  )
}

export default Programm