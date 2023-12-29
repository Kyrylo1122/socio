const createCombinedId = (id: string, secId: string) =>
  id > secId ? id + secId : secId + id;

export default createCombinedId;
