const shortenString = (name: string): string =>
  name.length > 50 ? `${name.slice(0, 10)}...` : name;

export default shortenString;
