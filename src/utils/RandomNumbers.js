//Çağrıldığında girilen argümanlara göre rastgele sayı üretme

function randomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default randomNumbers;
