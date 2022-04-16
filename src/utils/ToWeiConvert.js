export default (number) => {
    return window.web3.utils.toWei(number.toString(), "ether");
  };