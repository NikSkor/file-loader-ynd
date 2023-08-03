import axios from "axios";
import { URL_API, token } from "./const";
interface INameObj {
  id: string,
  file: File
}

export const uploadFile = async (fileList: INameObj[]) => {
  for (let item of fileList) {
    const formData = new FormData();
    formData.append('file', item.file);

    try {
        const response = await axios.get(URL_API, {
          params: 
          { 
            path: item.file.name, 
            overwrite: true 
          },
          headers: {
            Authorization:
              `OAuth ${token}`,
          },
        });

        await axios.put(response.data.href, formData);
      } catch (e) {
        console.log(e);
        // throw new Error(`Axios request failed: ${e}`);
        return {status: true, text: 'Ошибка загрузки файлов'};
    }
  }
  return {status: true, text: 'Файлы успешно загружены'};
};