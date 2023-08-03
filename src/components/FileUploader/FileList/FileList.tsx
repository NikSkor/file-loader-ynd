import style from './FileList.module.scss';
import { FC } from 'react';


interface INameObj {
  id: string,
  file: File
}

interface IItem {
  item: INameObj,
  delItem: Function
}

const FileList: FC<IItem> = ({item, delItem}) => {

  const deleteElemHandler = (e: any) => {
    e.preventDefault();
    delItem(e.target.id);
    // console.log(e.target.id);
  }

  return (
    // <h4>dfs</h4>
    <li className={style.listItem}>
      <span>{item.file.name}</span>
      <button className={style.delBtn} id={item.id} onClick={deleteElemHandler}>
    </button>
    </li>
          
  )
};

export default FileList;