const data: any[] = [];

export const getData = async (): Promise<any[]> => {
  return data;
};

export const addData = async (item: any): Promise<void> => {
  data.push(item);
};

export const deleteData = async (id: number): Promise<void> => {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data.splice(index, 1);
  }
};

export const updateData = async (id: number, updatedData: any): Promise<void> => {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
  }
};

export const clearData = async (): Promise<void> => {
  data.length = 0;
};
