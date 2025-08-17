import * as fs from "fs"
export interface IInputParams {
  years : number
  timesPerYear : number
  returnPerYear : number
  depositPerMonth : number
  startingBalance : number
}
export interface IPeriod {
  balance: number
  interest: number
}
export interface IOutput {
  years: {
    months: IPeriod[]
  }[],
  totalInterest: number
  balance: number
}
export function getCompoundedIntervals(params: IInputParams): IOutput
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
  let years: {months: IPeriod[]}[] = []
  let totalInterest = 0
  for (let current = 1; current <= params.years; current++) {
    let yearInterest = 0
    let months: IPeriod[] = []
    for (let return_period = 0; return_period < params.timesPerYear; return_period++) {
      const deposit = params.depositPerMonth * (12 / params.timesPerYear)
      const interest = (balance * (params.returnPerYear / params.timesPerYear)) / 100
      // console.log(interest)
      yearInterest = yearInterest + interest
      balance = deposit + interest + balance
      months.push({
        balance,
        interest
      })
    }
    totalInterest = totalInterest + yearInterest
    years.push({months})

    // console.log("interest: "+yearInterest)
    // const tax = (yearInterest) * yearlyTax / 100
    // totalTax = totalTax + tax
    // balance = balance - tax
    // console.log(tax)
    // console.log("after tax: " + balance)
  }
  // console.log(totalTax)
  // console.log(`final: ${balance * (100 - earlyPenalty) / 100}`)

  return {
    years, 
    balance,
    totalInterest
  }
}