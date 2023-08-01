import style from './Header.module.scss';
import { FC } from 'react';


const Header: FC = ()=> {


  return (
    <header className={style.headerContainer}>
      <div className={style.container}>
        <div className={style.titleBlock}>
          <h1 className={style.visuallyHidden}>Загрузчик файлов на Яндекс диск</h1>
          <h2 className={style.title}>Загрузка файлов на Яндекс диск</h2>
        </div>
      </div>
    </header>
  )

};

export default Header;