async function main() {
  const Bicho = await ethers.getContractFactory("Bicho");
  const greeter = await Bicho.deploy();

  console.log("Bicho deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
