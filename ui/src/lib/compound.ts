export interface IInputParams {
  years : number
  timesPerYear : number
  returnPerYear : number
  depositPerMonth : number
  startingBalance : number
}
export interface IPeriod {

}
export interface IOutput {
  months: IPeriod[],
  balance: number
}
function getCompoundedIntervals(params: IInputParams): IOutput
{
  // const years = 20
  // const timesPerYear = 12
  // const returnPerYear = 10
  // const depositPerMonth = 1000
  // const startingBalance = 0
  const yearlyTax = 15.3
  const earlyPenalty = 60

  let balance = params.startingBalance

  // let totalTax = 0
  for (let current = 1; current <= params.years; current++) {
    let yearInterest = 0
    for (let return_period = 0; return_period < params.timesPerYear; return_period++) {
      const deposit = params.depositPerMonth * (12 / params.timesPerYear)
      const interest = (balance * (params.returnPerYear / params.timesPerYear)) / 100
      // console.log(interest)
      yearInterest = yearInterest + interest
      balance = deposit + interest + balance
    }

    // console.log("interest: "+yearInterest)
    // const tax = (yearInterest) * yearlyTax / 100
    // totalTax = totalTax + tax
    // balance = balance - tax
    // console.log(tax)
    // console.log("after tax: " + balance)
  }
  // console.log(totalTax)
  // console.log(`final: ${balance * (100 - earlyPenalty) / 100}`)

  const returned: IOutput = {
    months: [],
    balance
  }
  return returned
}

console.log(getCompoundedIntervals({
  years : 20,
  timesPerYear : 12,
  returnPerYear : 10,
  depositPerMonth : 1000,
  startingBalance : 0,
}))