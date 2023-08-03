import { INameObj } from '../../../models/interfaces';
import style from './FileList.module.scss';
import { FC } from 'react';
interface IItem {
  item: INameObj,
  delItem: Function
}

const FileList: FC<IItem> = ({item, delItem}) => {

  const deleteElemHandler = (e: any) => {
    e.preventDefault();
    delItem(e.target.id);
  }

  return (
    <li className={style.listItem}>
      <span>{item.file.name}</span>
      <button className={style.delBtn} id={item.id} onClick={deleteElemHandler}>
    </button>
    </li>
  )
};

export default FileList;