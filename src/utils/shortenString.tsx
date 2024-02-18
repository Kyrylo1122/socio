const shortenString = (name: string): string =>
  name.length > 30 ? `${name.slice(0, 10)}...` : name;

export default shortenString;
