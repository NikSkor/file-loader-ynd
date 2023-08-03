import axios from "axios";
import { URL_API } from "./const";

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
              'OAuth y0_AgAAAAAAuZgcAADLWwAAAADpTQDR5aRGEktlRF6krySp7iY4p1Q4DSM',
          },
        });

        await axios.put(response.data.href, formData);
        console.log('Returned data:', response);
      } catch (e) {
        console.log(`Axios request failed: ${e}`);
        throw new Error(`Axios request failed: ${e}`);
    }
  }
};